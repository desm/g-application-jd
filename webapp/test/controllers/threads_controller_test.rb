require "test_helper"

class ThreadsControllerTest < ActionDispatch::IntegrationTest
  test "create product thread" do
    sign_in :one
    post product_threads_url(products(:p1).permalink), as: :json
    assert_response :ok
    assert_equal({ "success" => true }, JSON.parse(@response.body))
  end
end
