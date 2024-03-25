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

    @design_settings = Products::ProductsData::design_settings
    @user_agent_info = Products::ProductsData::user_agent_info
    @edit_attributes = Products::ProductsData::edit_attributes(view_context)
    @discover_taxonomy_options = Products::ProductsData::discover_taxonomy_options
    @current_seller = Products::ProductsData::current_seller(view_context)
  end
end
