require "application_system_test_case"

class SignupTest < ApplicationSystemTestCase
  test "creating a new user account successfully goes to dashboard" do
    visit signup_path
    fill_in "user[email_address]", with: "three@gmail.com" # since one@gmail.com and two@gmail.com are already taken (see fixtures)
    fill_in "user[password]", with: "asdf"
    click_on "Create account"
    assert_current_path dashboard_path
  end

  test "leaving the email field blank causes that field to be highlighted and get input focus" do
    visit signup_path
    click_on "Create account"
    assert_current_path signup_path
    assert page.has_css?("#user_email.error")
    assert page.evaluate_script("document.activeElement === document.getElementById('user_email')")
  end

  test "leaving the password field blank causes that field to be highlighted and get input focus" do
    visit signup_path
    fill_in "user[email_address]", with: "three@gmail.com"
    click_on "Create account"
    assert_current_path signup_path
    assert page.has_css?("#user_password.error")
    assert page.evaluate_script("document.activeElement === document.getElementById('user_password')")
  end

  test "using an existing email shows error message" do
    visit signup_path
    fill_in "user[email_address]", with: "one@gmail.com"
    fill_in "user[password]", with: "asdf"
    click_on "Create account"
    assert_current_path signup_path
    assert_selector "div.error-indicator", text: "Email address has already been taken", visible: true
  end
end
