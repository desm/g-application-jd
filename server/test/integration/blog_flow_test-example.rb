require "test_helper"

class BlogFlowTest < ActionDispatch::IntegrationTest
  test "can see the welcome page" do
    get "/"
    assert_select "h1", "Articles"
  end

  test "can create an article" do
    username = "dhh"
    password = "secret"

    get "/articles/new", headers: { "HTTP_AUTHORIZATION" => ActionController::HttpAuthentication::Basic.encode_credentials(username, password) }
    assert_response :success

    post "/articles",
      params: { article: { title: "can create", body: "article successfully." } },
      headers: { "HTTP_AUTHORIZATION" => ActionController::HttpAuthentication::Basic.encode_credentials(username, password) }
    assert_response :redirect
    follow_redirect!
    assert_response :success
    assert_select "h1", "can create"
    assert_select "p", "article successfully."
  end
end