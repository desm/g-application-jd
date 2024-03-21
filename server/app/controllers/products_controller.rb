require_relative "product_data"

class ProductsController < ApplicationController
include ApplicationHelper

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
    # @current_seller = { "id" => "label" }
    # @current_seller2 = { "id" => "label" }
    # puts "++++++++++++++++++++++++++"
    # # puts @current_seller
    # puts JSON.generate(@design_settings)
    # puts "++++++++++++++++++++++++++"
    # puts encode_special_chars(JSON.generate(@design_settings))
    # puts "++++++++++++++++++++++++++"
  end

  private

  def set_default_body_class
    @body_class = "fixed-aside sidebar-nav"
  end
end
