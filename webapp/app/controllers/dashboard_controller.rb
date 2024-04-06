class DashboardController < ApplicationController
  def index
    @props[:Nav][:highlight] = "Home"
    @has_products = Product.where(creator_id: Current.user.id).count > 0
  end
end
