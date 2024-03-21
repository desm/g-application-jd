require "test_helper"
require_relative "data"

class ProductsControllerTest < ActionDispatch::IntegrationTest
  include ApplicationHelper

  test "should get new" do
    sign_in :one
    get products_new_url
    assert_response :success
  end

  test "A" do
    json = '{"font":{"name":"Mabry Pro","url":"https://assets.gumroad.com/assets/mabry-regular-pro-2987dea5e28da4cf6ec452e081243d69aa29503e7f870eddabcb2225dac42343.woff2"}}'
    assert_equal "", encode_special_chars(json)
  end
end
