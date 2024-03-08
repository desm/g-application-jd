class ProductsController < ApplicationController
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
