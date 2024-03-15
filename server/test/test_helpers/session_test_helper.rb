module SessionTestHelper
  def sign_in(user)
    user = users(user) unless user.is_a? User
    post session_url, params: { user: { login_identifier: user.email_address, password: "secret123456" } }
    assert cookies[:session_token].present?
  end
end