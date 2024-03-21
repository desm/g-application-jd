require "test_helper"

class SessionInfoTest < ActionDispatch::IntegrationTest
  test "when not signed in, then is_signed_in is false" do
    get "/session_info"
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_equal true, json_response["success"]
    assert_equal false, json_response["is_signed_in"]
  end

  test "when signed in, then is_signed_in is true" do
    sign_in :one
    get "/session_info"
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_equal true, json_response["success"]
    assert_equal true, json_response["is_signed_in"]
  end
end
