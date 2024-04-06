require "test_helper"
require "capybara/rails"

class ProductsControllerTest < ActionDispatch::IntegrationTest
  include Capybara::DSL

  test "should get new" do
    sign_in :one
    get products_new_url
    assert_response :success
  end

  test "should get paged results" do
    sign_in :one
    get products_paged_url, as: :json
    assert_response :success
  end

  # the below tests use Capybara in order to be able to query the DOM

  def sign_in_using_capybara(email, pass)
    visit login_path
    fill_in "user[login_identifier]", with: email
    fill_in "user[password]", with: pass
    click_on "Login"
    assert_no_current_path login_path
  end

  test "edit product when product description is nil" do
    u = users(:one)
    sign_in_using_capybara(u.email_address, "secret123456")
    p1 = products(:p1)
    visit products_edit_url(p1.permalink)
    assert_current_path products_edit_path(p1.permalink)
    div_element = find("div#edit-attributes", visible: :all)
    data = JSON.parse(div_element["data-all-attributes"])
    assert_nil data["description"]
  end

  test "edit product when product description is NOT nil" do
    u = users(:one)
    sign_in_using_capybara(u.email_address, "secret123456")
    p3 = products(:p3)
    visit products_edit_url(p3.permalink)
    assert_current_path products_edit_path(p3.permalink)
    div_element = find("div#edit-attributes", visible: :all)
    data = JSON.parse(div_element["data-all-attributes"])
    richTextDescription = JSON.parse(data["description"])
    assert_equal "Description Level One", richTextDescription["doc"]["content"][0]["content"][0]["text"]
  end

  test "edit product when product has an OpenAI Thread for its 'description' section" do
    u = users(:one)
    sign_in_using_capybara(u.email_address, "secret123456")
    visit products_edit_url(products(:p1).permalink)
    assert_current_path products_edit_path(products(:p1).permalink)
    div_element = find("div#edit-attributes", visible: :all)
    data = JSON.parse(div_element["data-all-attributes"])
    assert data['has_openai_assistant_thread_for_description']
  end

  test "edit product when product does not have an OpenAI Thread for its 'description' section" do
    u = users(:one)
    sign_in_using_capybara(u.email_address, "secret123456")
    visit products_edit_url(products(:p2).permalink)
    assert_current_path products_edit_path(products(:p2).permalink)
    div_element = find("div#edit-attributes", visible: :all)
    data = JSON.parse(div_element["data-all-attributes"])
    assert !data['has_openai_assistant_thread_for_description']
  end
end
