class LinksController < ApplicationController
  def create
    respond_to do |format|
      format.json { render json: { success: true, redirect_to: "/products/tsxsi/edit" } }
    end
  end
end
