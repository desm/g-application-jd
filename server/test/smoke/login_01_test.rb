require "application_smoke_test_case"

class Login01Test < ApplicationSmokeTestCase
  # setup do
  #   Capybara.current_driver = Capybara.javascript_driver # :selenium by default
  # end

  # test "going from www to login screen to dashboard back to www" do
  test "one" do
    #
    # to go "www" and check that the buttons are "Login" and "Start Selling"
    #
    # Capybara.app_host = "https://www.staging.gumroad.jacquesdesmarais.dev"
    visit "https://www.staging.gumroad.jacquesdesmarais.dev/"
    # assert_selector "div", text: "Login"
    # assert_selector "div", text: "Start Selling"
    # click_on "Login"
    # assert_current_path "/"
    within ".nav-menu-secondary" do
      assert_text "Login"
      assert_text "Start Selling"
      click_on "Login"
    end
    assert_current_path login_path
    assert_selector "h1", text: "Log in"

    #
    # Log in
    #
    within "#login-form" do
      fill_in "user[login_identifier]", with: "jdesma@gmail.com"
      fill_in "user[password]", with: "asdf"
      click_on "Login"
    end
    assert_no_current_path login_path
    assert_selector "h1", text: "Welcome to Gumroad"

    #
    # go back to "www" and check that the "Dashboard" button is now showing
    #
    # visit "/"
    visit "https://www.staging.gumroad.jacquesdesmarais.dev"
    within ".nav-menu-secondary" do
      assert_text "Dashboard"
    end
  end

  # test "login and go to Products page" do
  #   # using_session "B" do
  #   Capybara.app_host = "https://app.staging.gumroad.jacquesdesmarais.dev"
  #   system_sign_in "jdesma@gmail.com", "asdf"
  #   assert_selector "h1", text: "Welcome to Gumroad"
  #   click_on "Products"
  #   assert_selector "h1", text: "Products"
  #   assert_current_path products_path
  #   # end
  # end
end
