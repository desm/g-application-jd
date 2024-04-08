class ApplicationController < ActionController::Base
  include Authentication

  before_action :set_default_props

  private

  def set_default_props
    if Current.user
      @props = {
        Nav: {
          avatar_url: view_context.asset_path("gumroad-default-avatar-5.png"),
          url_path: request.path,
          help_url: "https://help.gumroad.jacquesdesmarais.dev",
          unbecome_path: nil,
          name: Current.user.name,
        },
      }
    else
      @props = {
        Nav: {},
      }
    end
  end
end
