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
end
