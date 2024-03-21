require "test_helper"

class ProductsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    sign_in :one
    get products_new_url
    assert_response :success
  end
end
