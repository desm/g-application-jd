class SessionsController < ApplicationController
  require_unauthenticated_access only: %i[ new create ]

  def new
  end

  def create
    if user = User.authenticate_by(email_address: params[:user][:login_identifier], password: params[:user][:password])
      start_new_session_for user
      head :ok
    else
      render_rejection :unauthorized
    end
  end

  def destroy
    reset_authentication
    redirect_to dashboard_url
  end

  private

  def render_rejection(status)
    data = { "success": false, "error": "unauthorized" }
    render json: data, status: status
  end
end
