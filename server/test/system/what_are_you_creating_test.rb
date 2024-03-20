require "application_system_test_case"

class WhatAreYouCreatingTest < ApplicationSystemTestCase
  def setup
    system_sign_in "one@gmail.com"
  end

  test "clicking on \"Next: Customize\" brings you to the products_edit page" do
    visit products_new_path
    assert_current_path products_new_path
    within "label.pill.select" do
      assert_selector "span", text: "$"
    end
    fill_in "name", with: "product name"
    fill_in "price_range", with: "999"
    watch_js_console_activity
    b = click_button "Next: Customize", wait: 10

    # puts "waiting for button to appear"

    # page.driver.browser.devtools.console.enable

    # page.driver.browser.devtools.console.on("messageAdded") do |message|
    #   puts "______----------________"
    #   puts message
    #   puts "______----------________"
    # end

    # page.driver.browser.devtools.runtime.enable

    # page.driver.browser.devtools.runtime.on("consoleAPICalled") do |data|
    #   puts "______----------________"
    #   puts data
    #   puts "______----------________"
    # end
    
    # page.driver.browser.devtools.runtime.on("exceptionThrown") do |data|
    #   puts "______----------________"
    #   puts data
    #   puts "______----------________"
    # end

    # puts "button clicked!"
    # NoMethodError: undefined method `logs' for an instance of Selenium::WebDriver::Manager
    # pp page.driver.browser.manage.window

    # puts page.class
    # puts page.driver.class
    # puts page.driver.browser.class # Selenium::WebDriver::Chrome::Driver
    # puts page.driver.browser.devtools
    # puts page.driver.browser.devtools.class
    # pp page.driver.browser
    # pp page.driver.browser.options

    # puts page.driver.browser.manage.class # Selenium::WebDriver::Manager
    # puts page.driver.browser.manage.window.methods

    # puts page.driver.browser.methods
    # puts page.driver.browser.logs
    # puts Selenium::WebDriver::Chrome::Driver::logs
    # puts page.driver.browser["logs"]
    # puts page.driver.browser.manage.methods
    # page.driver.browser.manage.logs.get(:browser)
    # page.driver.browser.manage.get(:browser)
    # b = click_button "Next: Customize", wait: 10
    # puts "button clicked a 2nd time"
    # assert_equal nil, b
    # assert_no_current_path products_new_path

    assert_no_current_path products_new_path, wait: 2
  end
end
