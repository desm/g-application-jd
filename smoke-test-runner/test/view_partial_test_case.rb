require "test_helper"
require "capybara/minitest"

# If you'd like to access the same Capybara-powered Assertions that your Functional and System Testing tests utilize
# ref: https://guides.rubyonrails.org/testing.html#testing-view-partials
class ViewPartialTestCase < ActionView::TestCase
  include Capybara::Minitest::Assertions

  def page
    # https://rubydoc.info/github/teamcapybara/capybara/master/Capybara.string
    Capybara.string(rendered)
  end
end
