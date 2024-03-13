module SystemTestHelper
  def sign_in(email_address, password = "secret123456")
    visit login_url

    fill_in "user[login_identifier]", with: email_address
    fill_in "user[password]", with: password

    click_on "Login"
    assert_no_current_path login_path
  end
end
