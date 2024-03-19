require "test_helper"

class LinksControllerTest < ActionDispatch::IntegrationTest
  test "creating a link requires user to be signed in" do
    post links_url, params: { "link": DataOfCreateLinkPostRequest::DIGITAL_PRODUCT },
                    headers: { "Accept" => "application/json" }
    assert_response :forbidden
  end

  test "creating a link successfully returns url path to edit product" do
    sign_in :one
    post links_url, params: { "link": DataOfCreateLinkPostRequest::DIGITAL_PRODUCT },
                    headers: { "Accept" => "application/json" }
    assert_response :ok
    response = JSON.parse(@response.body)
    assert_equal ["success", "redirect_to"].sort, response.keys.sort
    assert_equal true, response["success"]
    assert_match /\/products\/[a-z]{5}\/edit/, response["redirect_to"]
  end

  test "each create returns a unique path to edit product" do
    sign_in :one
    post links_url, params: { "link": DataOfCreateLinkPostRequest::DIGITAL_PRODUCT },
                    headers: { "Accept" => "application/json" }
    response_a = JSON.parse(@response.body)
    post links_url, params: { "link": DataOfCreateLinkPostRequest::DIGITAL_PRODUCT },
                    headers: { "Accept" => "application/json" }
    response_b = JSON.parse(@response.body)
    assert_not_equal response_a, response_b
  end

  test "creating a link creates a product" do
    sign_in :one
    products_count_before = Product.count
    post links_url, params: { "link": DataOfCreateLinkPostRequest::DIGITAL_PRODUCT },
                    headers: { "Accept" => "application/json" }
    expected_products_count = products_count_before + 1
    assert_equal expected_products_count, Product.count
  end
end

module DataOfCreateLinkPostRequest
  DIGITAL_PRODUCT = {
    name: "digital product",
    price_currency_type: "cad",
    price_range: "999",
  }
end
