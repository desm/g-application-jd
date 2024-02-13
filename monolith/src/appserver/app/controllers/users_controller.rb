class UsersController < ApplicationController
  def session_info
    # headers["Access-Control-Allow-Origin"] = "*"
    headers["Access-Control-Allow-Origin"] = "https://explore-california-df93a5.webflow.io"
    render(json: { success: true, is_signed_in: false })
  end
end
