require "application_system_test_case"

class CurrencyDropdownTest < ApplicationSystemTestCase
  test "the currency dropdown changes the pill text correctly" do
    system_sign_in "one@gmail.com"
    visit products_new_path
    assert_current_path products_new_path
    within "label.pill.select" do
      assert_selector "span", text: "$"
    end
    page.select "CAD$ (Canadian Dollars)"
    within "label.pill.select" do
      assert_selector "span", text: "CAD$"
    end
  end
end
