class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to dashboard_path
    else
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
