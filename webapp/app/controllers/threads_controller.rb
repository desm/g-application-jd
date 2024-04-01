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
      permalink = _params["product_id"]
      section = _params["id"] # the thread's section
      product = Product.includes(:openai_assistant_threads).find_by!(creator_id: Current.user.id, permalink: permalink)
      thread = product.openai_assistant_threads.where!(section: section).first

      instruction = ""
      case _params["ask"]
      when "ask to make selection a little bit shorter"
        instruction = "Make the following part a little bit shorter: #{_params["selected_text"]}"
      when "ask to make selection a little bit longer"
        instruction = "Make the following part a little bit longer: #{_params["selected_text"]}"
      else
        raise "unrecognized \"ask\" parameter"
      end

      # server-side error unless all goes well (reproducing same 3 lines of code as above so it is easier to recognize)
      success = false
      status = 500
      reworked_text = nil

      openai_message_content = <<~TEXT
        This is the name and description of a digital product that is being sold on gumroad.com. Gumroad.com is an online platform that allows individual creators and businesses to sell their products directly to consumers. It supports a wide range of digital products, including but not limited to ebooks, software, music, and art assets like brush sets for digital painting programs.

        Product name: #{_params["product_name"]}

        Full product description: #{_params["full_description"]}

        #{instruction}

        Your response should only contain the result of the rewrite.
      TEXT

      init_openai_client
      response_of_message_create = @client.messages.create(
        thread_id: thread.thread_id,
        parameters: {
          role: "user", # Required for manually created messages
          content: openai_message_content,
        },
      )

      message_id = response_of_message_create["id"]
      thread.touch

      response_of_runs_create = @client.runs.create(
        thread_id: thread.thread_id,
        parameters: {
          assistant_id: "asst_WIrbrZvIEWPWyI4Y3XczBniu",
        },
      )
      run_id = response_of_runs_create["id"]

      while true
        response = @client.runs.retrieve(id: run_id, thread_id: thread.thread_id)
        status = response["status"]

        case status
        when "queued", "in_progress", "cancelling"
          sleep 1 # Wait one second and poll again
        when "completed"
          break # Exit loop and report result to user
        when "requires_action"
          raise "Unexpected status of \"requires_action\" while poling for run completion"
        when "cancelled", "failed", "expired"
          raise response["last_error"].inspect
        else
          raise "Unknown status response: #{status}"
        end
      end

      response_of_get_last_message = @client.get(path: "/threads/#{thread.thread_id}/messages?limit=1")

      begin
        reworked_text = response_of_get_last_message["data"][0]["content"][0]["text"]["value"]
      rescue
        raise "Unable to find reworked text in response: #{JSON.generate(response_of_get_last_message)}"
      end

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
