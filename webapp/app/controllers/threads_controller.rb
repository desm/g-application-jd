class ThreadsController < ApplicationController
  deny_unauthenticated_access

  def create
    respond_to do |format|
      format.json { render json: { success: true } }
    end
  end
end
