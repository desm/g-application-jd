class DashboardController < ApplicationController
  def index
    @props[:Nav][:highlight] = "Home"
  end
end
