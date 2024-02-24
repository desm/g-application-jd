require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  # called before every single test
  setup do
    @article = articles(:one)
  end

  # called after every single test
  teardown do
    # when controller is using cache it may be a good idea to reset it afterwards
    Rails.cache.clear
  end

  test "should get index" do
    get articles_url
    assert_response :success
    assert_equal "index", @controller.action_name
    # assert_equal "application/x-www-form-urlencoded", @request.media_type
    assert_match "Articles", @response.body
  end

  test "should create article" do
    username = "dhh"
    password = "secret"

    assert_difference("Article.count") do
      post articles_url, params: { article: { title: "Some title", body: "the body is required" } },
                         headers: { "HTTP_AUTHORIZATION" => ActionController::HttpAuthentication::Basic.encode_credentials(username, password) }
    end

    assert_redirected_to article_path(Article.last)
    assert_equal "Article was successfully created.", flash[:notice]
  end

  test "should show article" do
    article = articles(:one)
    get article_url(article)
    assert_response :success
  end

  test "should destroy article" do
    username = "dhh"
    password = "secret"

    article = articles(:one)
    assert_difference("Article.count", -1) do
      # delete article_url(article)
      delete article_url(article), headers: { "HTTP_AUTHORIZATION" => ActionController::HttpAuthentication::Basic.encode_credentials(username, password) }
    end

    assert_redirected_to articles_path
  end

  test "should update article" do
    username = "dhh"
    password = "secret"

    article = articles(:one)

    patch article_url(article), params: { article: { title: "updated" } },
                                headers: { "HTTP_AUTHORIZATION" => ActionController::HttpAuthentication::Basic.encode_credentials(username, password) }

    assert_redirected_to article_path(article)
    # Reload association to fetch updated data and assert that title is updated.
    article.reload
    assert_equal "updated", article.title
  end

  test "ajax request" do
    article = articles(:one)
    get article_url(article), xhr: true

    assert_equal "hello world", @response.body
    assert_equal "text/javascript", @response.media_type
  end
end
