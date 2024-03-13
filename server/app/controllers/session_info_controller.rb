class SessionInfoController < ApplicationController
  allow_unauthenticated_access

  def index
    restore_authentication
    response.set_header("Access-Control-Allow-Origin", Rails.application.config.access_control_allow_origin_for_www)
    response.set_header("Access-Control-Allow-Credentials", true)
    data = { "success": true, "is_signed_in": signed_in? }
    render json: data, status: :ok
  end
end
