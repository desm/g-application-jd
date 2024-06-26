require "test_helper"

module DataOfCreateLinkPostRequest
  DIGITAL_PRODUCT = {
    name: "digital product",
    price_currency_type: "cad",
    price_range: "999",
  }
end

def create_link_with_valid_payload
  post links_url, params: { "link": DataOfCreateLinkPostRequest::DIGITAL_PRODUCT },
                  headers: { "Accept" => "application/json" }
end

def create_link_with_missing_param
  payload = DataOfCreateLinkPostRequest::DIGITAL_PRODUCT.merge({
    price_range: nil,
  })
  post links_url, params: { "link": payload },
                  headers: { "Accept" => "application/json" }
end

class LinksControllerWhenNotAuthenticatedTest < ActionDispatch::IntegrationTest
  test "creating a link requires user to be signed in" do
    create_link_with_valid_payload
    assert_response :forbidden
  end
end

class LinksControllerTest < ActionDispatch::IntegrationTest
  def setup
    sign_in :one
  end

  test "creating a link successfully returns url path to edit product" do
    create_link_with_valid_payload
    assert_response :ok
    response = JSON.parse(@response.body)
    assert_equal ["success", "redirect_to"].sort, response.keys.sort
    assert_equal true, response["success"]
    assert_match /\/products\/[a-z]{5}\/edit/, response["redirect_to"]
  end

  test "each successful create link returns a unique permalink" do
    create_link_with_valid_payload
    path_a = JSON.parse(@response.body)["redirect_to"]
    create_link_with_valid_payload
    path_b = JSON.parse(@response.body)["redirect_to"]
    assert_not_equal path_a, path_b
  end

  test "creating a link fails when one of the inputs is missing" do
    products_count_before = Product.count
    create_link_with_missing_param
    assert_response :internal_server_error
    assert_equal ({ "success" => false }), JSON.parse(@response.body)
  end

  test "a product is not created when one of the inputs is missing" do
    products_count_before = Product.count
    create_link_with_missing_param
    assert_equal products_count_before, Product.count
  end

  test "updating a link successfully" do
    p1 = products(:p1)
    post links_update_url(p1.permalink),
         params: "&link%5Bname%5D=a_different_name&link%5Bprice_range%5D=33&link%5Bdescription%5D=%7B%22doc%22%3A%7B%22type%22%3A%22doc%22%2C%22content%22%3A%5B%7B%22type%22%3A%22paragraph%22%2C%22content%22%3A%5B%7B%22type%22%3A%22text%22%2C%22text%22%3A%22DESCRIPTION%22%7D%5D%7D%5D%7D%2C%22selection%22%3A%7B%22type%22%3A%22text%22%2C%22anchor%22%3A12%2C%22head%22%3A12%7D%7D&link%5Bcontent%5D=%7B%22doc%22%3A%7B%22type%22%3A%22doc%22%2C%22content%22%3A%5B%7B%22type%22%3A%22paragraph%22%2C%22content%22%3A%5B%7B%22type%22%3A%22text%22%2C%22text%22%3A%22CONTENT%22%7D%5D%7D%5D%7D%2C%22selection%22%3A%7B%22type%22%3A%22text%22%2C%22anchor%22%3A8%2C%22head%22%3A8%7D%7D&link%5Bdiscover_taxonomy_id%5D=266",
         headers: { "Accept" => "application/json" }
    assert_response :ok
    response = JSON.parse(@response.body)
    assert response["success"]
    @product = Product.find_by(creator_id: users(:one).id, permalink: p1.permalink)
    assert_equal "a_different_name", @product.name
  end

  test "updating a link fails when the permalink doesn't exist" do
    post links_update_url("non-existent-permalink"),
         params: "&link%5Bname%5D=a_different_name&link%5Bprice_range%5D=33&link%5Bdescription%5D=%7B%22doc%22%3A%7B%22type%22%3A%22doc%22%2C%22content%22%3A%5B%7B%22type%22%3A%22paragraph%22%2C%22content%22%3A%5B%7B%22type%22%3A%22text%22%2C%22text%22%3A%22DESCRIPTION%22%7D%5D%7D%5D%7D%2C%22selection%22%3A%7B%22type%22%3A%22text%22%2C%22anchor%22%3A12%2C%22head%22%3A12%7D%7D&link%5Bcontent%5D=%7B%22doc%22%3A%7B%22type%22%3A%22doc%22%2C%22content%22%3A%5B%7B%22type%22%3A%22paragraph%22%2C%22content%22%3A%5B%7B%22type%22%3A%22text%22%2C%22text%22%3A%22CONTENT%22%7D%5D%7D%5D%7D%2C%22selection%22%3A%7B%22type%22%3A%22text%22%2C%22anchor%22%3A8%2C%22head%22%3A8%7D%7D&link%5Bdiscover_taxonomy_id%5D=266",
         headers: { "Accept" => "application/json" }
    assert_response :not_found
    assert_equal ({ "success" => false }), JSON.parse(@response.body)
  end

  test "delete link" do
    p1 = products(:p1)
    assert_includes Product.all, p1
    delete links_delete_path(p1.permalink)
    refute_includes Product.all, p1
  end

  test "publish link" do
    p = products(:p2)
    refute p.published
    post links_publish_url(p.permalink), headers: { "Accept" => "application/json" }
    assert_response :ok
    assert_equal ({ "success" => true }), JSON.parse(@response.body)
    p = Product.find_by!(permalink: p.permalink)
    assert p.published
  end

  test "publishing an already published link does nothing" do
    p = products(:p1)
    assert p.published
    post links_publish_url(p.permalink), headers: { "Accept" => "application/json" }
    assert_response :ok
    assert_equal ({ "success" => true }), JSON.parse(@response.body)
  end

  test "unpublish link" do
    p = products(:p1)
    assert p.published
    post links_unpublish_url(p.permalink), headers: { "Accept" => "application/json" }
    assert_response :ok
    assert_equal ({ "success" => true }), JSON.parse(@response.body)
    p = Product.find_by!(permalink: p.permalink)
    refute p.published
  end

  test "unpublishing a non-published link does nothing" do
    p = products(:p2)
    refute p.published
    post links_unpublish_url(p.permalink), headers: { "Accept" => "application/json" }
    assert_response :ok
    assert_equal ({ "success" => true }), JSON.parse(@response.body)
  end
end
