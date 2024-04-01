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
      patch product_thread_url(products(:p1).permalink, "description"),
            params: {
              product_name: "Foliage & Grass Brushset (Photoshop/Procreate)",
              full_description: "So happy to release this set at long last! Tips and contributions welcome if you're able to and wish to!-Works with Photoshop CC and Procreate-125+ Brushes-3 hours of video content with full voiceover -Royalty free, use with any personal, school, or professional work. Remix, edit, and recreate brushes to your liking. -Due to popular request, transparent PNG files of the brush tips have been added.I created these brushes to speed up my own process for laying down foliage, as well as to help anyone else who's looking to do the same! I also hoped to provide a brush settings framework for anyone who wants to create a style-specific original set and copy the settings over. The video content is designed to explain the purpose of each brush and give a framework for how it might be used in a painting, as well as how to replicate the major brush archetypes used here.Special thanks to Matt Hubel who went through and perfected the brush settings for Procreate to match the PS set.",
              selected_text: "I created these brushes to speed up my own process for laying down foliage, as well as to help anyone else who's looking to do the same! I also hoped to provide a brush settings framework for anyone who wants to create a style-specific original set and copy the settings over.",
              ask: "ask to make selection a little bit shorter",
            }, as: :json
      assert_response :ok
      assert_equal(
        "These brushes were developed to accelerate my own foliage rendering process and assist others aiming to do the same. Also, I included a brush settings framework for artists to create original sets reflecting their unique styles.",
        JSON.parse(@response.body)["reworked_text"]
      )
    end
  end

  test "update product thread with request to make text LONGER" do
    VCR.use_cassette("ask_make_longer") do
      patch product_thread_url(products(:p1).permalink, "description"),
            params: {
              product_name: "Foliage & Grass Brushset (Photoshop/Procreate)",
              full_description: "So happy to release this set at long last! Tips and contributions welcome if you're able to and wish to!-Works with Photoshop CC and Procreate-125+ Brushes-3 hours of video content with full voiceover -Royalty free, use with any personal, school, or professional work. Remix, edit, and recreate brushes to your liking. -Due to popular request, transparent PNG files of the brush tips have been added.I created these brushes to speed up my own process for laying down foliage, as well as to help anyone else who's looking to do the same! I also hoped to provide a brush settings framework for anyone who wants to create a style-specific original set and copy the settings over. The video content is designed to explain the purpose of each brush and give a framework for how it might be used in a painting, as well as how to replicate the major brush archetypes used here.Special thanks to Matt Hubel who went through and perfected the brush settings for Procreate to match the PS set.",
              selected_text: "I created these brushes to speed up my own process for laying down foliage, as well as to help anyone else who's looking to do the same! I also hoped to provide a brush settings framework for anyone who wants to create a style-specific original set and copy the settings over.",
              ask: "ask to make selection a little bit longer",
            }, as: :json
      assert_response :ok
      assert_equal(
        "Born out of my desire to streamline the intricate process of illustrating foliage in my digital art, these brushes serve as a valuable tool not only to me, but also to fellow artists wishing to enhance their workflow. My intent was to accelerate both my personal work rate and provide a solution to those facing similar challenges in their artistic creation process. My aspiration goes beyond facilitating speed; I hoped to create a malleable brush settings framework that allows for the development of original, style-specific sets. It supports artists in tailoring the settings, empowering them to modify and reproduce the tools with ease, therefore linking their unique artistic finger prints to their creations. This amalgamation of efficiency and customization is a testament to the versatility I envisioned when creating this brushset.",
        JSON.parse(@response.body)["reworked_text"]
      )
    end
  end
end
