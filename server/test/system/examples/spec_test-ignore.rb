require "application_system_test_case"
require "minitest/autorun"

class AuthenticationTest < ApplicationSystemTestCase
end

describe AuthenticationTest do
  # before do
  #   @session = nil
  # end

  it "visiting the root path redirects to the login page when not authenticated" do
    visit root_path
    assert_equal login_path, current_path
    # page.save_screenshot("tmp/screenshots/visiting_root_when_not_logged_in.png")
  end

  it "creating a new user account successfully goes to dashboard" do
    visit signup_path
    fill_in "user[email_address]", with: "three@gmail.com" # since one@gmail.com and two@gmail.com are already taken (see fixtures)
    fill_in "user[password]", with: "asdf"
    click_on "Create account"
    assert_equal dashboard_path, current_path
    # page.save_screenshot("tmp/screenshots/signup_success.png")
  end

  it "again" do
    visit signup_path
    fill_in "user[email_address]", with: "three@gmail.com" # since one@gmail.com and two@gmail.com are already taken (see fixtures)
    fill_in "user[password]", with: "asdf"
    click_on "Create account"
    page.save_screenshot("tmp/screenshots/signup_again.png")
  end
end
