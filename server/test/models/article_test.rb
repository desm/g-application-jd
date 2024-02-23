require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  test "should not save article without title" do
    article = Article.new
    assert_not article.save
  end

  test "should report error" do
    # some_undefined_variable is not defined elsewhere in the test case
    assert_raises(NameError) do
      some_undefined_variable
    end
  end

  test "when a user is referenced, then it is loaded from the fixtures" do
    @user = users(:one)
    assert_equal "MyString", @user.email
  end

  test "article_path returns the url to the artiles" do
    assert_equal "", users_url
  end
end
