require "base64"
require "securerandom"

class LinksController < ApplicationController
  deny_unauthenticated_access

  def create
    @result = false
    Rails.error.set_context(
      section: "products",
      action: "create link",
      user_email: Current.user.email_address,
    )

    Rails.error.handle do
      _params = link_params
      permalink = generate_permalink
      @product = Product.new(
        id: generate_product_id,
        creator_id: Current.user.id,
        permalink: permalink,
        name: _params["name"],
        buy_price: _params["price_range"],
        currency_code: _params["price_currency_type"],
      )
      @result = @product.save
    end

    if @result == true
      respond_to do |format|
        format.json { render json: { success: true, redirect_to: "/products/#{@product.permalink}/edit" } }
      end
    else
      respond_to do |format|
        format.json { render json: { success: false }, status: :internal_server_error }
      end
    end
  end

  def update
  end

  private

  def link_params
    params.require(:link).require([:name, :price_currency_type, :price_range])
    params.require(:link).permit([:name, :price_currency_type, :price_range])
  end
end

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
