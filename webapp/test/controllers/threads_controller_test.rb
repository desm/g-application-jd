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
    VCR.use_cassette("create_thread") do
      post product_threads_url(products(:p1).permalink), as: :json
    end
    expectedResponse = {
      "success" => true,
      "thread" => {
        "id" => "thread_92T6xfK8AWfd55aGiwLnS9MQ",
        "object" => "thread",
        "created_at" => 1711803386,
        "metadata" => {},
      },
    }
    assert_equal(expectedResponse, JSON.parse(@response.body))
  end
end
