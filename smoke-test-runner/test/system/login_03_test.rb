require "application_system_test_case"

class Login02Test < ApplicationSystemTestCase
  test "three.1" do
    #
    # to go "www" and check that the buttons are "Login" and "Start Selling"
    #
    Capybara.app_host = "https://www.staging.gumroad.jacquesdesmarais.dev"
    visit "/"
    within ".nav-menu-secondary" do
      assert_text "Login"
      assert_text "Start Selling"
      click_on "Login"
    end
    assert_current_path "/login"
    assert_selector "h1", text: "Log in"

    #
    # Log in
    #
    within "#login-form" do
      fill_in "user[login_identifier]", with: "jdesma@gmail.com"
      fill_in "user[password]", with: "asdf"
      click_on "Login"
    end
    assert_no_current_path "/login"
    assert_selector "h1", text: "Welcome to Gumroad"

    #
    # go back to "www" and check that the "Dashboard" button is now showing
    #
    visit "https://www.staging.gumroad.jacquesdesmarais.dev"
    within ".nav-menu-secondary" do
      assert_text "Dashboard"
    end
  end

  test "three.2" do
    #
    # to go "www" and check that the buttons are "Login" and "Start Selling"
    #
    Capybara.app_host = "https://www.staging.gumroad.jacquesdesmarais.dev"
    visit "/"
    within ".nav-menu-secondary" do
      assert_text "Login"
      assert_text "Start Selling"
      click_on "Login"
    end
    assert_current_path "/login"
    assert_selector "h1", text: "Log in"

    #
    # Log in
    #
    within "#login-form" do
      fill_in "user[login_identifier]", with: "jdesma@gmail.com"
      fill_in "user[password]", with: "asdf"
      click_on "Login"
    end
    assert_no_current_path "/login"
    assert_selector "h1", text: "Welcome to Gumroad"

    #
    # go back to "www" and check that the "Dashboard" button is now showing
    #
    visit "https://www.staging.gumroad.jacquesdesmarais.dev"
    within ".nav-menu-secondary" do
      assert_text "Dashboard"
    end
  end

  test "three.3" do
    #
    # to go "www" and check that the buttons are "Login" and "Start Selling"
    #
    Capybara.app_host = "https://www.staging.gumroad.jacquesdesmarais.dev"
    visit "/"
    within ".nav-menu-secondary" do
      assert_text "Login"
      assert_text "Start Selling"
      click_on "Login"
    end
    assert_current_path "/login"
    assert_selector "h1", text: "Log in"

    #
    # Log in
    #
    within "#login-form" do
      fill_in "user[login_identifier]", with: "jdesma@gmail.com"
      fill_in "user[password]", with: "asdf"
      click_on "Login"
    end
    assert_no_current_path "/login"
    assert_selector "h1", text: "Welcome to Gumroad"

    #
    # go back to "www" and check that the "Dashboard" button is now showing
    #
    visit "https://www.staging.gumroad.jacquesdesmarais.dev"
    within ".nav-menu-secondary" do
      assert_text "Dashboard"
    end
  end
end
