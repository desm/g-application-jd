require "test_helper"

class UsersHelperTest < ActionView::TestCase
  test "should return the user's full name" do
    user = users(:one)

    assert_dom_equal %{<a href="/users/#{user.id}">#{user.email}</a>}, link_to_user(user)
  end
end
