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

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :headless_chrome, screen_size: [1680, 1050] do |driver_option|
    driver_option.add_argument("no-sandbox")
  end
end
