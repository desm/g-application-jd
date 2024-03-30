require "test_helper"

class ThreadsControllerTest < ActionDispatch::IntegrationTest
  def setup
    VCR.configure do |config|
      config.cassette_library_dir = "test/fixtures-vcr/vcr_cassettes"
      config.hook_into :webmock
    end
  end

  test "create product thread for product description" do
    sign_in :one
    VCR.use_cassette("create_thread") do
      post product_threads_url(products(:p1).permalink) + "?section=description", as: :json
    end
    assert_equal({ "success" => true }, JSON.parse(@response.body))
  end
end
