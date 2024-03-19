require "test_helper"

class LinksControllerTest < ActionDispatch::IntegrationTest
  test "creating a link requires user to be signed in" do
    post links_url, params: { "link": DataOfCreateLinkPostRequest::DIGITAL_PRODUCT },
                    headers: { "Accept" => "application/json" }
    assert_response :forbidden
  end

  test "should create a new link everytime" do
    sign_in :one
    post links_url, params: { "link": DataOfCreateLinkPostRequest::DIGITAL_PRODUCT },
                    headers: { "Accept" => "application/json" }
    assert_response :ok
    expected_response = { "success" => true, "redirect_to" => "/products/tsxsi/edit" }
    assert_equal expected_response, JSON.parse(@response.body)
  end
end

module DataOfCreateLinkPostRequest
  DIGITAL_PRODUCT = {
    name: "digital product",
    price_currency_type: "cad",
    price_range: "999",
  }
end
