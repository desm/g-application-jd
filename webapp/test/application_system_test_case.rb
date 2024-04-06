require "test_helper"

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

if ENV["SMOKE_TEST"] == "true"
  class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
    driven_by :selenium, using: :chrome, options: { browser: :remote, url: "http://selenium-standalone:4444/wd/hub" }

    Capybara.run_server = false
    Capybara.app_host = "https://app.staging.gumroad.jacquesdesmarais.dev"
    Capybara.default_max_wait_time = 10
  end
else
  class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
    driven_by :selenium, using: :headless_chrome, screen_size: [1680, 1050] do |driver_option|
      driver_option.add_argument("no-sandbox")
    end

    def watch_js_console_activity
      # https://www.selenium.dev/documentation/webdriver/bidirectional/chrome_devtools/cdp_api/#console-logs
      # https://www.rubydoc.info/gems/selenium-devtools/Selenium/DevTools/V122/Runtime
      page.driver.browser.devtools.runtime.enable

      page.driver.browser.devtools.runtime.on("consoleAPICalled") do |message|
        puts message
      end
    end

    include SystemTestHelper
  end
end
