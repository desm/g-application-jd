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
    respond_to do |format|
      format.json { render json: { success: true, redirect_to: "/products/tsxsi/edit" } }
    end
  end
end
