require "test_helper"

class ThreadsControllerTest < ActionDispatch::IntegrationTest
  def setup
    VCR.configure do |config|
      config.cassette_library_dir = "test/fixtures-vcr/vcr_cassettes"
      config.hook_into :webmock
    end
  end

  test "create product thread" do
    sign_in :one
    post product_threads_url(products(:p1).permalink), as: :json
    assert_response :ok
    assert_equal({ "success" => true }, JSON.parse(@response.body))
  end

  test "vcr" do
    VCR.use_cassette("synopsis") do
      response = Net::HTTP.get_response(URI("http://www.iana.org/domains/reserved"))
      assert_match /Example domains/, response.body
    end
  end

  test "create thread in openai" do
    VCR.use_cassette("create_thread") do
      OpenAI.configure do |config|
        config.access_token = ENV.fetch("OPENAI_ACCESS_TOKEN", "")
      end
      @client = OpenAI::Client.new
      @client = @client.beta(assistants: "v1")
      response = @client.threads.create
      puts JSON.generate(response)
    end
  end
end
