require "test_helper"

class OpenaiTest < ActionDispatch::IntegrationTest
  def setup
    OpenAI.configure do |config|
      config.access_token = ENV.fetch("OPENAI_ACCESS_TOKEN")
    end
    @client = OpenAI::Client.new
    @client = @client.beta(assistants: "v1")
  end

  test "create thread" do
    skip "always"
    skip if ENV["CI"] == "true"
    response = @client.threads.create
    puts JSON.generate(response)
    _response = {
      "id": "thread_tGa4BAOAF3prl3kbcNLS8rzU",
      "object": "thread",
      "created_at": 1711740621,
      "metadata": {},
    }
  end

  test "add message to thread" do
    skip "always"
    skip if ENV["CI"] == "true"
    response = @client.messages.create(
      thread_id: "thread_tGa4BAOAF3prl3kbcNLS8rzU",
      parameters: {
        role: "user", # Required for manually created messages
        content: "Tell me the lyrics to the song Imagine by John Lennon",
      },
    )
    puts JSON.generate(response)
    _response = {
      "id": "msg_Tm5xxGVKkr52vztQGQbnNNfU",
      "object": "thread.message",
      "created_at": 1711741228,
      "assistant_id": nil,
      "thread_id": "thread_tGa4BAOAF3prl3kbcNLS8rzU",
      "run_id": nil,
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": { "value": "Tell me the lyrics to the song Imagine by John Lennon", "annotations": [] },
        },
      ],
      "file_ids": [],
      "metadata": {},
    }
  end

  test "create run" do
    skip "always"
    skip if ENV["CI"] == "true"
    response = @client.runs.create(thread_id: "thread_tGa4BAOAF3prl3kbcNLS8rzU",
                                   parameters: {
                                     assistant_id: "asst_Crm0yTwJZk8BrNUtSwn6fPKF",
                                   })
    puts JSON.generate(response)
    _response = {
      "id": "run_IXquIGvrmndHfiOe9yGQQmfJ",
      "object": "thread.run",
      "created_at": 1711741657,
      "assistant_id": "asst_Crm0yTwJZk8BrNUtSwn6fPKF",
      "thread_id": "thread_tGa4BAOAF3prl3kbcNLS8rzU",
      "status": "queued",
      "started_at": nil,
      "expires_at": 1711742257,
      "cancelled_at": nil,
      "failed_at": nil,
      "completed_at": nil,
      "required_action": nil,
      "last_error": nil,
      "model": "gpt-4-turbo-preview",
      "instructions": "You are a personal math tutor. Write and run code to answer math questions.",
      "tools": [{ "type": "code_interpreter" }],
      "file_ids": [],
      "metadata": {},
      "temperature": 1.0,
      "usage": nil,
    }
  end

  test "wait for run to complete" do
    skip "always"
    skip if ENV["CI"] == "true"
    while true
      response = @client.runs.retrieve(id: "run_IXquIGvrmndHfiOe9yGQQmfJ", thread_id: "thread_tGa4BAOAF3prl3kbcNLS8rzU")
      status = response["status"]
      case status
      when "queued", "in_progress", "cancelling"
        puts "Sleeping"
        sleep 1 # Wait one second and poll again
      when "completed"
        break # Exit loop and report result to user
      when "requires_action"
        # Handle tool calls (see below)
      when "cancelled", "failed", "expired"
        puts response["last_error"].inspect
        break # or `exit`
      else
        puts "Unknown status response: #{status}"
      end
    end
    puts JSON.generate(response)
    _response = {
      "id": "run_IXquIGvrmndHfiOe9yGQQmfJ",
      "object": "thread.run",
      "created_at": 1711741657,
      "assistant_id": "asst_Crm0yTwJZk8BrNUtSwn6fPKF",
      "thread_id": "thread_tGa4BAOAF3prl3kbcNLS8rzU",
      "status": "completed",
      "started_at": 1711741657,
      "expires_at": nil,
      "cancelled_at": nil,
      "failed_at": nil,
      "completed_at": 1711741661,
      "required_action": nil,
      "last_error": nil,
      "model": "gpt-4-turbo-preview",
      "instructions": "You are a personal math tutor. Write and run code to answer math questions.",
      "tools": [{ "type": "code_interpreter" }],
      "file_ids": [],
      "metadata": {},
      "temperature": 1.0,
      "usage": { "prompt_tokens": 180, "completion_tokens": 61, "total_tokens": 241 },
    }
  end

  test "retrieve last message of thread" do
    skip "always"
    skip if ENV["CI"] == "true"
    thread_id = "thread_tGa4BAOAF3prl3kbcNLS8rzU"
    response = @client.get(path: "/threads/#{thread_id}/messages?limit=1")
    puts JSON.generate(response)
    _response = {
      "object": "list",
      "data": [
        {
          "id": "msg_HZ35YjQQlHiYHcLubiQ8xByO",
          "object": "thread.message",
          "created_at": 1711741659,
          "assistant_id": "asst_Crm0yTwJZk8BrNUtSwn6fPKF",
          "thread_id": "thread_tGa4BAOAF3prl3kbcNLS8rzU",
          "run_id": "run_IXquIGvrmndHfiOe9yGQQmfJ",
          "role": "assistant",
          "content": [
            {
              "type": "text",
              "text": {
                "value": "I can't provide the full lyrics of the song \"Imagine\" by John Lennon due to copyright restrictions. However, I can provide a brief summary or discuss the themes of the song, its historical context, or its impact on music and culture. How may I assist you further with this topic?",
                "annotations": [],
              },
            },
          ],
          "file_ids": [],
          "metadata": {},
        },
      ],
      "first_id": "msg_HZ35YjQQlHiYHcLubiQ8xByO",
      "last_id": "msg_HZ35YjQQlHiYHcLubiQ8xByO",
      "has_more": true,
    }
  end
end
