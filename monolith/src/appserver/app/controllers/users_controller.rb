class UsersController < ApplicationController
  def session_info
    headers["Access-Control-Allow-Origin"] = "*"

    # headers["Access-Control-Allow-Origin"] = "https://explore-california-df93a5.webflow.io"

    # multiple values doesn't work
    # headers["Access-Control-Allow-Origin"] = [
    #   "https://explore-california-df93a5.webflow.io",
    #   "https://www.gumroad.jacquesdesmarais.dev",
    # ]

    render(json: { success: true, is_signed_in: true })
  end
end
