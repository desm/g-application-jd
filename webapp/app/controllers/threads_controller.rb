class ThreadsController < ApplicationController
  deny_unauthenticated_access

  def create
    Rails.error.set_context(
      section: "products",
      action: "create thread",
      user_email: Current.user.email_address,
    )

    success = false
    Rails.error.handle do
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
      success = true
    end

    respond_to do |format|
      format.json { render json: { success: success } }
    end
  end

  def update
    Rails.error.set_context(
      section: "products",
      action: "use AI Assistant to rework text",
      user_email: Current.user.email_address,
      params: params,
    )

    # request is bad until proven otherwise
    success = false
    status = 400
    reworked_text = nil

    Rails.error.handle do
      _params = patch_thread_params

      mode = nil
      case _params["ask"]
      when "ask to make selection a little bit shorter"
        mode = :little_bit_shorter
      when "ask to make selection a little bit longer"
        mode = :little_bit_longer
      else
        raise "invalid \"ask\" parameter: #{_params["ask"]}"
      end

      permalink = _params["product_id"]
      section = _params["id"] # the thread's section
      product = Product.includes(:openai_assistant_threads).find_by!(creator_id: Current.user.id, permalink: permalink)
      thread = product.openai_assistant_threads.where!(section: section).first

      # server-side error unless all goes well (reproducing same 3 lines of code as above so it is easier to recognize)
      success = false
      status = 500
      reworked_text = nil

      init_openai_client
      aiAssistantService = AiAssistantService.new(client: @client)
      reworked_text = aiAssistantService.rework_product_description_selected_text(
        thread_id: thread.thread_id,
        mode: mode,
        product_name: _params["product_name"],
        full_description: _params["full_description"],
        selected_text: _params["selected_text"],
      )

      thread.touch

      # all is well
      success = true
      status = 200
    end

    if success
      respond_to do |format|
        format.json { render json: { success: success, reworked_text: reworked_text }, status: status }
      end
    else
      respond_to do |format|
        format.json { render json: { success: success }, status: status }
      end
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

  def patch_thread_params
    params.require([:product_id, :id, :product_name, :full_description, :selected_text, :ask])
    params.permit([:product_id, :id, :product_name, :full_description, :selected_text, :ask])
  end
end
