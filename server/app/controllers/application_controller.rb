class ApplicationController < ActionController::Base
  before_action :set_default_body_class

  private

  def set_default_body_class
    @body_class = "sidebar-nav"
  end
end
