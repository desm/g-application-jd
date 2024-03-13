require "application_system_test_case"

class AuthenticationPathTest < ApplicationSystemTestCase
  test "when not signed in, visiting / redirects to the login page" do
    visit root_path
    assert_current_path login_path
  end

  test "when signed in, visiting / redirects to the dashboard page" do
    sign_in "one@gmail.com"
    visit root_path
    assert_current_path dashboard_path
  end

  test "when signed in, visiting the login page redirects to the dashboard page" do
    sign_in "one@gmail.com"
    visit login_path
    assert_current_path dashboard_path
  end

  test "when signed in, visiting the signup page redirects to the dashboard page" do
    sign_in "one@gmail.com"
    visit signup_path
    assert_current_path dashboard_path
  end
end
