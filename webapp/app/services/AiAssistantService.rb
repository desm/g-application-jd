class AiAssistantService
  def initialize(access_token:)
    OpenAI.configure do |config|
      config.access_token = access_token
    end
    @client = OpenAI::Client.new
    @client = @client.beta(assistants: "v1")
  end

  def create_thread
    response = @client.threads.create
    response["id"]
  end

  def rework_product_description_selected_text(thread_id:, mode:, product_name:, full_description:, selected_text:)
    reworked_text = nil

    instruction = ""
    case mode
    when :little_bit_shorter
      instruction = "Make the following part a little bit shorter: #{selected_text}"
    when :little_bit_longer
      instruction = "Make the following part a little bit longer: #{selected_text}"
    else
      raise "unrecognized mode: #{mode}"
    end

    openai_message_content = <<~TEXT
      This is the name and description of a digital product that is being sold on gumroad.com. Gumroad.com is an online platform that allows individual creators and businesses to sell their products directly to consumers. It supports a wide range of digital products, including but not limited to ebooks, software, music, and art assets like brush sets for digital painting programs.

      Product name: #{product_name}

      Full product description: #{full_description}

      #{instruction}

      Your response should only contain the result of the rewrite.
    TEXT

    response_of_message_create = @client.messages.create(
      thread_id: thread_id,
      parameters: {
        role: "user", # Required for manually created messages
        content: openai_message_content,
      },
    )

    message_id = response_of_message_create["id"]

    response_of_runs_create = @client.runs.create(
      thread_id: thread_id,
      parameters: {
        assistant_id: Rails.application.config.openai_assistant_id,
      },
    )
    run_id = response_of_runs_create["id"]

    while true
      response = @client.runs.retrieve(id: run_id, thread_id: thread_id)
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

    response_of_get_last_message = @client.get(path: "/threads/#{thread_id}/messages?limit=1")

    begin
      reworked_text = response_of_get_last_message["data"][0]["content"][0]["text"]["value"]
    rescue
      raise "Unable to find reworked text in response: #{JSON.generate(response_of_get_last_message)}"
    end

    reworked_text
  end
end
