require_relative "products/products_data"

class ProductsController < ApplicationController
  def index
    @props[:Nav][:highlight] = "Products"
    @props[:ProductsDashboardPage] = {}
  end

  def new
    @props[:Nav][:highlight] = "Products"
    @props[:NewProductPage] = {}
  end

  def edit
    @props[:Nav][:highlight] = "Products"
    @props[:ProductContentPreview] = {}
    @props[:ProductPreviewVariantDropdown] = {}

    @design_settings = design_settings
    @user_agent_info = user_agent_info
    @edit_attributes = edit_attributes
    @discover_taxonomy_options = discover_taxonomy_options
    @current_seller = current_seller
  end
end
