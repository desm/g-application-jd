require "test_helper"

class ThreadsControllerTest < ActionDispatch::IntegrationTest
  def setup
    VCR.configure do |config|
      config.cassette_library_dir = "test/fixtures-vcr/vcr_cassettes"
      config.hook_into :webmock
    end
    sign_in :one
  end

  test "create product thread for product description when no thread exists" do
    VCR.use_cassette("create_thread") do
      # product "p2" has no thread for section "description" (see openai_assistant_threads.yml)
      post product_threads_url(products(:p2).permalink) + "?section=description", as: :json
    end
    assert_equal({ "success" => true }, JSON.parse(@response.body))
  end

  test "create product thread for product description when a thread for that product section already exists" do
    VCR.use_cassette("create_thread") do
      # product "p1" already has a thread for section "description" (see openai_assistant_threads.yml)
      post product_threads_url(products(:p1).permalink) + "?section=description", as: :json
    end
    assert_equal({ "success" => false }, JSON.parse(@response.body))
  end
end
