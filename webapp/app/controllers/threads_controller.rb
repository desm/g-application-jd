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
      action: "patch thread",
      user_email: Current.user.email_address,
    )

    success = false; status = 400

    Rails.error.handle do
      _params = patch_thread_params
      permalink = _params["product_id"]
      section = _params["id"] # the thread's section
      product = Product.includes(:openai_assistant_threads).find_by!(creator_id: Current.user.id, permalink: permalink)
      thread = product.openai_assistant_threads.where!(section: section).first

      # puts _params["product_name"]
      # puts _params["full_description"]
      # puts _params["part_to_rewrite"]

      # shorterOrLonger = _params["target_length_percent"] < 100 ? "shorter" : "longer"
      # factor = _params["target_length_percent"] + " percent"

      # instruction = "Rewrite it so that its length is "
      # if _params["shorter_by_percent"] > 0
      #   instruction += "shorter by #{_params["shorter_by_percent"]} percent"
      # elsif _params["longer_by_percent"] > 0
      #   instruction += "longer by #{_params["longer_by_percent"]} percent"
      # else
      #   raise "One of \"shorter_by_percent\" and \"longer_by_percent\" must be greater than 0"
      # end

      status = 500

      # word_count = _params["part_to_rewrite"].split.size
      # target_word_count = word_count * 1.3
      # target_word_count = word_count * 0.66
      # target_word_count = (word_count * _params["target_length_factor"]).round

      if "" == "ask to make selection a little bit shorter"
      end

      instruction = ""
      case _params["ask"]
      when "ask to make selection a little bit shorter"
        instruction = "Make the following part a little bit shorter: #{_params["selected_text"]}"
      when "ask to make selection a little bit longer"
        instruction = "Make the following part a little bit longer: #{_params["selected_text"]}"
      else
        raise "unrecognized \"ask\" parameter"
      end

      message = <<~TEXT
        This is the name and description of a digital product that is being sold on gumroad.com. Gumroad.com is an online platform that allows individual creators and businesses to sell their products directly to consumers. It supports a wide range of digital products, including but not limited to ebooks, software, music, and art assets like brush sets for digital painting programs.

        Product name: #{_params["product_name"]}

        Full product description: #{_params["full_description"]}

        #{instruction}

        Your response should only contain the result of the rewrite.
      TEXT

      # Could you make this part #{shorterOrLonger} by a factor of #{factor}: #{_params["part_to_rewrite"]}
      # Rewrite this part so that its length is approximately #{factor}; #{_params["part_to_rewrite"]}
      # Rewrite it so that its length is approximately #{factor} that of original.
      # Rewrite it so that its length is approximately #{_params["target_length"]} that of original.
      # The part to rewrite: #{_params["part_to_rewrite"]}
      # {instruction}
      # Rewrite this part so that it is 150% longer: #{_params["part_to_rewrite"]}
      # Rewrite this part using approximately #{target_word_count} words: #{_params["part_to_rewrite"]}

      puts message

      # message += "\n"
      # message += "The product name is: " + _params["product_name"] + "\n"

      # product.threads
      # init_openai_client
      # openaiResponse = @client.threads.create
      # thread = OpenaiAssistantThread.new(
      #   product_id: product.id,
      #   section: _params["section"],
      #   thread_id: openaiResponse["id"],
      # )
      # thread.save!
      success = true; status = 200
    end

    respond_to do |format|
      # format.json { render json: { success: success }, status: success ? :ok : 500 }
      format.json { render json: { success: success }, status: status }
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
    # params.require([:product_id, :id, :product_name, :full_description, :part_to_rewrite, :target_length])
    # params.permit([:product_id, :id, :product_name, :full_description, :part_to_rewrite, :target_length, :shorter_by_percent, :longer_by_percent])
    # params.require([:product_id, :id, :product_name, :full_description, :part_to_rewrite, :target_length_factor])
    # params.permit([:product_id, :id, :product_name, :full_description, :part_to_rewrite, :target_length_factor])
    params.require([:product_id, :id, :product_name, :full_description, :selected_text, :ask])
    params.permit([:product_id, :id, :product_name, :full_description, :selected_text, :ask])
  end
end
