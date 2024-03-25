require "base64"
require "securerandom"

class FoobarsController < ApplicationController
  allow_unauthenticated_access

  def index
  end
end
