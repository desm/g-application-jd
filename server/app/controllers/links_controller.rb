require "base64"
require "securerandom"

def generate_product_id
  # Generate a random 16-byte binary string
  random_bytes = SecureRandom.random_bytes(16)
  # Encode the binary string in Base64 format
  Base64.strict_encode64(random_bytes)
end

def generate_permalink
  # Generate a random 5-letter ID using alphanumeric characters
  (0...5).map { ("a".."z").to_a[rand(26)] }.join
end

class LinksController < ApplicationController
  deny_unauthenticated_access

  def create
    _params = link_params()["link"]
    permalink = generate_permalink
    @product = Product.new(
      id: generate_product_id,
      creator_id: Current.user.id,
      permalink: permalink,
      name: _params["name"],
      buy_price: _params["price_range"],
      currency_code: _params["price_currency_type"],
    )
    if @product.save
      response = { success: true, redirect_to: "/products/#{permalink}/edit" }
      respond_to do |format|
        format.json { render json: response }
      end
    else
      respond_to do |format|
        format.json { render json: { success: false } }
      end
    end
  end

  private

  def link_params
    params.permit(link: [:name, :price_currency_type, :price_range])
  end
end
