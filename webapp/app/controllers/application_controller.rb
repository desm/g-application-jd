class ApplicationController < ActionController::Base
  include Authentication

  before_action :set_default_props

  private

  def set_default_props
    @props = {
      Nav: {
        avatar_url: view_context.asset_path("gumroad-default-avatar-5.png"),
        url_path: request.path,
        help_url: "https://help.gumroad.jacquesdesmarais.dev",
        unbecome_path: nil,
        name: Current.user.email_address, # todo: set to Profile "Name" field
      },
    }
  end
end
