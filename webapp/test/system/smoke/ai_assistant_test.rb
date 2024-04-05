require "application_system_test_case"
require_relative "login_helper"

unless ENV["SMOKE_TEST"] == "true"
  return
end

class AiAssistantTest < ApplicationSystemTestCase
  include Smoke::LoginHelper

  def teardown
    visit "/logout"
  end

  test "turn on AI Assistant" do
    login("jdesma@gmail.com", "asdf")

    # Create product
    visit "/products/new"
    assert_selector "h1", text: "What are you creating?"
    current_time = Time.now
    formatted_time = current_time.strftime("%Y-%m-%d %H:%M:%S")
    fill_in "name", with: "SMOKE_TEST #{formatted_time}"
    fill_in "price_range", with: "123"
    click_on "Next: Customize"
    assert_no_current_path "/products/new"

    assert_current_path %r{/products/(\w{5})/edit} # e.g. /products/lgyli/edit
    click_on "Turn On AI Assistant"
    within "dialog" do
      click_on "Turn On"
    end

    find('button[aria-disabled=true]', text: 'Make Shorter')
    find('button[aria-disabled=true]', text: 'Make Longer')
  end
end
