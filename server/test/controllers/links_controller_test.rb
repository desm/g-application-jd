require "test_helper"

class LinksControllerTest < ActionDispatch::IntegrationTest
  # test "should get create" do
  #   get links_create_url
  #   assert_response :success
  # end

  test "should return a success object when a request to create a Link is received" do
    post links_url, params: {
                      "link": {
                        "is_physical": false,
                        "is_recurring_billing": false,
                        "name": "Hey",
                        "native_type": "digital",
                        "price_currency_type": "cad",
                        "price_range": "299",
                        "release_at_date": "March 24, 2024",
                        "release_at_time": "12PM",
                        "subscription_duration": nil,
                      },
                    }, headers: { "Accept" => "application/json" }
    assert_equal "application/json", @response.media_type
    expected_response = { "success" => true, "redirect_to" => "/products/tsxsi/edit" }
    assert_equal expected_response, JSON.parse(@response.body)
  end
end
