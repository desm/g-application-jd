class UsersController < ApplicationController
  def new
    @user = User.new
  end

  # inputs need to be filled with something
  # An account already exists with this email.
  # Email is invalid
  # Password has previously appeared in a data breach as per haveibeenpwned.com and should never be used. Please choose something harder to guess.
  #   ref: https://haveibeenpwned.com/API/v3
  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to dashboard_path
    else
      flash[:error] = "missing something"
      render "new"
    end
  end

  def session_info
    response.set_header("Access-Control-Allow-Origin", Rails.application.config.access_control_allow_origin_for_www)
    data = { "success": true, "is_signed_in": false }
    render json: data, status: :ok
  end

  private

  def user_params
    params.require(:user).permit(
      :email,
      :password,
    )
  end

  def set_default_body_class
    @body_class = "onboarding-page"
  end
end
