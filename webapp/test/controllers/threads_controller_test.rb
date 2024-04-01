require "test_helper"

class ThreadsControllerTest < ActionDispatch::IntegrationTest
  def setup
    VCR.configure do |config|
      config.cassette_library_dir = "test/fixtures-vcr/vcr_cassettes"
      config.hook_into :webmock
      config.filter_sensitive_data("***OPENAI_ACCESS_TOKEN***") { Rails.application.credentials.openai_access_token }
    end
    sign_in :one
  end

  test "create product thread for product description when no thread exists" do
    VCR.use_cassette("create_thread") do
      # product "p2" has no thread for section "description" (see openai_assistant_threads.yml)
      post product_threads_url(products(:p2).permalink), params: { section: "description" }, as: :json
    end
    assert_equal({ "success" => true }, JSON.parse(@response.body))
  end

  test "create product thread for product description when a thread for that product section already exists" do
    VCR.use_cassette("create_thread") do
      # product "p1" already has a thread for section "description" (see openai_assistant_threads.yml)
      post product_threads_url(products(:p1).permalink), params: { section: "description" }, as: :json
    end
    assert_equal({ "success" => false }, JSON.parse(@response.body))
  end

  test "update product thread with request to make text SHORTER" do
    VCR.use_cassette("ask_make_shorter") do
      selected_text = "I created these brushes to speed up my own process for laying down foliage, as well as to help anyone else who's looking to do the same! I also hoped to provide a brush settings framework for anyone who wants to create a style-specific original set and copy the settings over."
      patch product_thread_url(products(:p1).permalink, "description"),
            params: {
              product_name: "Foliage & Grass Brushset (Photoshop/Procreate)",
              full_description: "So happy to release this set at long last! Tips and contributions welcome if you're able to and wish to!-Works with Photoshop CC and Procreate-125+ Brushes-3 hours of video content with full voiceover -Royalty free, use with any personal, school, or professional work. Remix, edit, and recreate brushes to your liking. -Due to popular request, transparent PNG files of the brush tips have been added.I created these brushes to speed up my own process for laying down foliage, as well as to help anyone else who's looking to do the same! I also hoped to provide a brush settings framework for anyone who wants to create a style-specific original set and copy the settings over. The video content is designed to explain the purpose of each brush and give a framework for how it might be used in a painting, as well as how to replicate the major brush archetypes used here.Special thanks to Matt Hubel who went through and perfected the brush settings for Procreate to match the PS set.",
              selected_text: selected_text,
              ask: "ask to make selection a little bit shorter",
            }, as: :json
      assert_response :ok
      reworked_text = JSON.parse(@response.body)["reworked_text"]
      assert reworked_text.split.size < selected_text.split.size
    end
  end

  test "update product thread with request to make text LONGER" do
    VCR.use_cassette("ask_make_longer") do
      selected_text = "I created these brushes to speed up my own process for laying down foliage, as well as to help anyone else who's looking to do the same! I also hoped to provide a brush settings framework for anyone who wants to create a style-specific original set and copy the settings over."
      patch product_thread_url(products(:p1).permalink, "description"),
            params: {
              product_name: "Foliage & Grass Brushset (Photoshop/Procreate)",
              full_description: "So happy to release this set at long last! Tips and contributions welcome if you're able to and wish to!-Works with Photoshop CC and Procreate-125+ Brushes-3 hours of video content with full voiceover -Royalty free, use with any personal, school, or professional work. Remix, edit, and recreate brushes to your liking. -Due to popular request, transparent PNG files of the brush tips have been added.I created these brushes to speed up my own process for laying down foliage, as well as to help anyone else who's looking to do the same! I also hoped to provide a brush settings framework for anyone who wants to create a style-specific original set and copy the settings over. The video content is designed to explain the purpose of each brush and give a framework for how it might be used in a painting, as well as how to replicate the major brush archetypes used here.Special thanks to Matt Hubel who went through and perfected the brush settings for Procreate to match the PS set.",
              selected_text: selected_text,
              ask: "ask to make selection a little bit longer",
            }, as: :json
      assert_response :ok
      reworked_text = JSON.parse(@response.body)["reworked_text"]
      assert reworked_text.split.size > selected_text.split.size
    end
  end
end
