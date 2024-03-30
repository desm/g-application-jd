class ThreadsController < ApplicationController
  deny_unauthenticated_access

  def create
    _params = create_thread_params
    permalink = _params["product_id"]
    product = Product.find_by!(creator_id: Current.user.id, permalink: permalink)
    init_openai_client
    openaiResponse = @client.threads.create
    thread = OpenaiAssistantThread.new(
      product_id: product.id,
      section: _params["section"],
      thread_id: openaiResponse["id"],
    )
    thread.save!
    respond_to do |format|
      format.json { render json: { success: true } }
    end
  end

  private

  def init_openai_client
    OpenAI.configure do |config|
      config.access_token = ENV.fetch("OPENAI_ACCESS_TOKEN", "")
    end
    @client = OpenAI::Client.new
    @client = @client.beta(assistants: "v1")
  end

  def create_thread_params
    params.require([:product_id, :section])
    params.permit([:product_id, :section])
  end
end
