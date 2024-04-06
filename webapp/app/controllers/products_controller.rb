class ProductsController < ApplicationController
  def index
    @props[:Nav][:highlight] = "Products"
    products = Product.where(creator_id: Current.user.id).order(name: :asc)
    @props[:ProductsDashboardPage] = Products::ProductListingData::product_listing(view_context, products)
  end

  def new
    @props[:Nav][:highlight] = "Products"
    @props[:NewProductPage] = {}
  end

  def edit
    permalink = params[:id]
    product = Product.includes(:openai_assistant_threads).find_by!(creator_id: Current.user.id, permalink: permalink)

    @props[:Nav][:highlight] = "Products"
    @props[:ProductContentPreview] = {}
    @props[:ProductPreviewVariantDropdown] = {}

    @design_settings = Products::ProductsData::design_settings
    @user_agent_info = Products::ProductsData::user_agent_info
    @edit_attributes = Products::ProductsData::edit_attributes(view_context, product)
    @discover_taxonomy_options = Products::ProductsData::discover_taxonomy_options
    @current_seller = Products::ProductsData::current_seller(view_context)
  end

  def paged
    products = Product.where(creator_id: Current.user.id).order(name: :asc)
    respond_to do |format|
      format.json {
        render json: Products::ProductListingData::product_entries(products)
      }
    end
  end
end
