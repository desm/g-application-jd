require "application_system_test_case"
require_relative 'login_helper'

unless ENV["SMOKE_TEST"] == "true"
  return
end

class LoginTest < ApplicationSystemTestCase
  include Smoke::LoginHelper
  
  def teardown
    visit "/logout"
  end

  test "www buttons Login/Start-Selling VS Dashboard" do
    # to go "www" and check that the buttons are "Login" and "Start Selling"
    visit "https://www.staging.gumroad.jacquesdesmarais.dev/"
    within ".nav-menu-secondary" do
      assert_text "Login"
      assert_text "Start Selling"
      click_on "Login"
    end
    assert_current_path "/login"
    assert_selector "h1", text: "Log in"

    login("jdesma@gmail.com", "asdf")

    # go back to "www" and check that the "Dashboard" button is now showing
    visit "https://www.staging.gumroad.jacquesdesmarais.dev"
    within ".nav-menu-secondary" do
      assert_text "Dashboard"
    end
  end
end
