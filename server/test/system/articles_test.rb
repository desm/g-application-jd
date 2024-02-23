require "application_system_test_case"

class ArticlesTest < ApplicationSystemTestCase
  test "visiting articles" do
    visit articles_url
    assert_selector "h1", text: "Articles"
    assert_selector "body", text: "Our blog has 2 articles and counting!"
  end
end
