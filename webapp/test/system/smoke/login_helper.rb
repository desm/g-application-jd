module Smoke
  module LoginHelper
    def login(email, pass)
      visit "/login"
      assert_current_path "/login"
      assert_selector "h1", text: "Log in"
      within "#login-form" do
        fill_in "user[login_identifier]", with: email
        fill_in "user[password]", with: pass
        click_on "Login"
      end
      assert_no_current_path "/login"
    end
  end
end
