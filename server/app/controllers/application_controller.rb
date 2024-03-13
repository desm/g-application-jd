class ApplicationController < ActionController::Base
  include Authentication

  before_action :set_default_body_class
  before_action :set_default_props

  private

  def set_default_body_class
    @body_class = "sidebar-nav"
  end

  def set_default_props
    @props = {
      Nav: {
        avatar_img: view_context.asset_path("gumroad-default-avatar-5.png"),
        url_path: request.path,
        # title: "What are you creating?",
        title: "", # depends on the current page
        help_url: "https://help.gumroad.jacquesdesmarais.dev",
        unbecome_path: nil,
      },
    }
  end
end
