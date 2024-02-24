require "application_system_test_case"

class ArticlesTest < ApplicationSystemTestCase
  test "visiting articles" do
    visit articles_url
    assert_selector "h1", text: "Articles"
    assert_selector "body", text: "Our blog has 2 articles and counting!"
  end

  test "should create Article" do
    visit articles_path

    # This triggers HTTP Basic Authentication
    click_on "New Article"

    # Parse the current URL
    uri = URI.parse(current_url)

    # Include HTTP Basic Authentication credentials in the URL
    username = "dhh"
    password = "secret"
    base_url_with_credentials = "#{uri.scheme}://#{username}:#{password}@#{uri.host}:#{uri.port}"

    # Visit the URL with credentials
    visit "#{base_url_with_credentials}#{uri.path}"

    fill_in "Title", with: "Creating an Article"
    fill_in "Body", with: "Created this article successfully!"

    click_on "Create Article"

    assert_text "Creating an Article"
  end
end
