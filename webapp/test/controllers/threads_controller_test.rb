require "test_helper"

class ThreadsControllerTest < ActionDispatch::IntegrationTest
  test "create product thread" do
    sign_in :one
    post product_threads_url(products(:p1).permalink), as: :json
    assert_response :ok
    assert_equal({ "success" => true }, JSON.parse(@response.body))
  end

  test "vcr" do
    VCR.configure do |config|
      config.cassette_library_dir = "test/fixtures-vcr/vcr_cassettes"
      config.hook_into :webmock
    end

    VCR.use_cassette("synopsis") do
      response = Net::HTTP.get_response(URI("http://www.iana.org/domains/reserved"))
      assert_match /Example domains/, response.body
    end
  end
end
