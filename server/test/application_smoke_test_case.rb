require "test_helper"
# require "capybara/cuprite"

# Documentation regarding the Chrome-specific --no-sandbox command line argument:
#
# Stop checking for the setuid sanbox binary on desktop Linux [40462640] - Chromium
#     https://issues.chromium.org/issues/40462640
#
# ChromeDriver - WebDriver for Chrome - Capabilities & ChromeOptions
#     https://chromedriver.chromium.org/capabilities
#
# List of Chromium Command Line Switches « Peter Beverloo
#     https://peter.sh/experiments/chromium-command-line-switches/

class ApplicationSmokeTestCase < ActionDispatch::SystemTestCase
  # include ActiveJob::TestHelper

  # parallelize(workers: 1)
  # parallelize(workers: 8)

  # driven_by :selenium, using: :headless_chrome, screen_size: [1680, 1050] do |driver_option|
  #   driver_option.add_argument("--no-sandbox")
  # end

  # driver_option.add_argument("--headless")

  # driven_by :selenium_chrome_headless, using: :headless_chrome do |driver_option|
  #   driver_option.add_argument("--no-sandbox")
  # end

  # driven_by :selenium, using: :headless_chrome, screen_size: [1400, 1400] do |driver_option|
  #   driver_option.add_argument("disable-dev-shm-usage")
  # end

  # driven_by :selenium, using: :headless_chrome, screen_size: [1400, 1400]

  # driven_by :cuprite, using: :headless_chrome, screen_size: [1680, 1050] do |driver_option|
  #   driver_option.add_argument("--no-sandbox")
  # end

  # url = ENV.fetch("SELENIUM_REMOTE_URL", nil)
  # options = if url
  #     { browser: :remote, url: url }
  #   else
  #     { browser: :chrome }
  #   end
  # driven_by :selenium, using: :headless_chrome, options: options

  # driven_by :selenium, using: :headless_chrome, options: { browser: :remote, url: "http://192.168.0.12:4444/wd/hub" }
  # driven_by :selenium, using: :headless_chrome, options: { browser: :remote, url: "http://selenium-standalone:4444/wd/hub" }
  driven_by :selenium, using: :chrome, options: { browser: :remote, url: "http://selenium-standalone:4444/wd/hub" }

  Capybara.run_server = false
  Capybara.app_host = "https://app.staging.gumroad.jacquesdesmarais.dev"
  Capybara.default_max_wait_time = 10

  # Reset sessions and driver between tests
  # teardown do
  #   Capybara.reset_sessions!
  #   Capybara.use_default_driver
  # end

  include SystemTestHelper
end
