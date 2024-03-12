class SessionInfoController < ApplicationController
  def index
    response.set_header("Access-Control-Allow-Origin", Rails.application.config.access_control_allow_origin_for_www)
    data = { "success": true, "is_signed_in": false }
    render json: data, status: :ok
  end
end
