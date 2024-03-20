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
end
