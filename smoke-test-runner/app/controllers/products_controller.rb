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
  end

  private

  def set_default_body_class
    @body_class = "fixed-aside sidebar-nav"
  end
end
