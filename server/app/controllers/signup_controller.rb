class SignupController < ApplicationController
  require_unauthenticated_access

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      start_new_session_for @user
      redirect_to dashboard_url
    else
      flash[:error] = @user.errors.first.full_message
      redirect_to signup_path
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :email_address,
      :password,
    )
  end

  def set_default_body_class
    @body_class = "onboarding-page"
  end
end
