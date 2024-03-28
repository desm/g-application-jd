require "application_system_test_case"

class ProductEditTest < ApplicationSystemTestCase
  test "product edit page's data-all-attributes contains correct permalink" do
    system_sign_in "one@gmail.com"
    p1 = products(:p1)
    visit products_edit_path(p1.permalink)
    assert_current_path products_edit_path(p1.permalink)
    assert page.has_selector?("div#edit-attributes", visible: :all)

    div_element = find("div#edit-attributes", visible: :all)
    data = div_element["data-all-attributes"]
    assert_equal p1.permalink, JSON.parse(data)['unique_permalink']
  end
end
