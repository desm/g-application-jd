require "application_system_test_case"

class LoginTest < ApplicationSystemTestCase
  test "entering correct credentials successfully goes to dashboard" do
    visit login_path
    fill_in "user[login_identifier]", with: "one@gmail.com"
    fill_in "user[password]", with: "secret123456"
    click_on "Login"
    assert_current_path dashboard_path
  end

  test "entering wrong password fails to log in" do
    visit login_path
    fill_in "user[login_identifier]", with: "one@gmail.com"
    fill_in "user[password]", with: "asdf"
    click_on "Login"
    assert_current_path login_path
    assert_selector "div.error-indicator", text: "Incorrect username or password", visible: true
  end

  test "leaving the email field blank causes that field to be highlighted and get input focus" do
    visit login_path
    click_on "Login"
    assert_current_path login_path
    assert page.has_css?("#user_email.error")
    assert page.evaluate_script("document.activeElement === document.getElementById('user_email')")
  end

  test "leaving the password field blank causes that field to be highlighted and get input focus" do
    visit login_path
    fill_in "user[login_identifier]", with: "one@gmail.com"
    click_on "Login"
    assert_current_path login_path
    assert page.has_css?("#user_password.error")
    assert page.evaluate_script("document.activeElement === document.getElementById('user_password')")
  end
end
