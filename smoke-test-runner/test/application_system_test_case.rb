require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :chrome, options: { browser: :remote, url: "http://selenium-standalone:4444/wd/hub" }

  Capybara.run_server = false
  Capybara.app_host = "https://app.staging.gumroad.jacquesdesmarais.dev"
  Capybara.default_max_wait_time = 10

  include SystemTestHelper
end
