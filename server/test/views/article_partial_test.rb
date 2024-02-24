require "view_partial_test_case"

# class ArticlePartialTest < ActionView::TestCase
class ArticlePartialTest < ActionView::TestCase
  test "renders a prepoluated form" do
    article = Article.create! title: "Hello, world", body: "this is the body"

    render "articles/form", article: article

    assert_includes rendered, article.title

    assert_select "input[type=text][name=?][value=?]", "article[title]", article.title

    text_inputs = assert_select "input[type=text][name=?]", "article[title]"
    assert_equal article.title, text_inputs[0]["value"]

    text_input = (assert_select "input[type=text][name=?]", "article[title]").first
    assert_equal article.title, text_input["value"]

    text_inputs = assert_select "input[type=text]"
    assert_equal 1, text_inputs.count

    anchor = document_root_element.at("input[type=text]")
    assert_equal article.title, anchor["value"]

    # https://docs.ruby-lang.org/en/master/syntax/pattern_matching_rdoc.html
    assert_pattern do
      anchor => { content: "", attributes: [
                  { name: "type", value: "text" },
                  { name: "value", value: "Hello, world" },
                  { name: "name", value: "article[title]" },
                  { name: "id", value: "article_title" },
                ] }
    end

    # ref: https://rubydoc.info/github/teamcapybara/capybara/master/Capybara/Minitest/Assertions:assert_link
    # assert_link article.title, href: article_url(article)
  end
end
