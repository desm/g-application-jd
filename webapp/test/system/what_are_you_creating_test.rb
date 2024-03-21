require "application_system_test_case"

class WhatAreYouCreatingTest < ApplicationSystemTestCase
  def setup
    system_sign_in "one@gmail.com"
  end

  test "clicking on Next: Customize button brings you to the products_edit page" do
    visit products_new_path
    assert_current_path products_new_path
    fill_in "name", with: "product name"
    fill_in "price_range", with: "999"
    click_button "Next: Customize"
    assert_no_current_path products_new_path
  end
end
