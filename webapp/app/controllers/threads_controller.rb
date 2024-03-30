class ThreadsController < ApplicationController
  deny_unauthenticated_access

  def create
    OpenAI.configure do |config|
      config.access_token = ENV.fetch("OPENAI_ACCESS_TOKEN", "")
    end
    @client = OpenAI::Client.new
    @client = @client.beta(assistants: "v1")
    openaiResponse = @client.threads.create

    respond_to do |format|
      format.json { render json: { success: true, thread: openaiResponse } }
    end
  end
end
