class ProductsController < ApplicationController
  def index
    @props = {
      Nav: {
        title: "What are you creating?",
        help_url: "https://help.gumroad.jacquesdesmarais.dev",
        unbecome_path: nil,
      },
      ProductsDashboardPage: {},
    }
  end

  def new
    @props = {
      Nav: {
        title: "What are you creating?",
        help_url: "https://help.gumroad.jacquesdesmarais.dev",
        unbecome_path: nil,
      },
      NewProductPage: {},
    }
  end

  def edit
    @props = {
      Nav: {
        title: "What are you creating?",
        help_url: "https://help.gumroad.jacquesdesmarais.dev",
        unbecome_path: nil,
      },
      ProductContentPreview: {},
      ProductPreviewVariantDropdown: {
        "variants": [],
      },
    }
  end

  private

  def set_default_body_class
    @body_class = "fixed-aside sidebar-nav"
  end
end
