require "application_system_test_case"
require_relative "login_helper"

unless ENV["SMOKE_TEST"] == "true"
  return
end

class DeleteProductsTest < ApplicationSystemTestCase
  include Smoke::LoginHelper

  def teardown
    visit "/logout"
  end

  test "delete all smoke test created products" do
    login("jdesma@gmail.com", "asdf")
    visit "/products"
    while true
      elements = page.all("tr", text: /^SMOKE-TEST::.*/)
      if elements.count == 0
        break
      end
      tr = elements.first
      product_name = ""
      within(tr) do
        product_name = all("td")[1].text
      end
      before_count = elements.count
      within(tr) do
        first(class: "icon-three-dots").click
        first("div", exact_text: "Delete permanently").click
        find_button(text: "Confirm").click
      end
      assert has_no_text?(product_name) # wait for row to disappear
      after_count = page.all("tr", text: /^SMOKE-TEST::.*/).count
      assert after_count == before_count - 1
    end
  end
end
