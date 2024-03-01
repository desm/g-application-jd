require "application_system_test_case"

class ArticlesTest < ApplicationSystemTestCase
  test "viewing Dashboard" do
    visit "/dashboard"
    page.save_screenshot("tmp/screenshots/dashboard.png")
    assert_selector "a", text: "Checkout"
    assert_selector "h2", text: "Getting started"
  end
end
