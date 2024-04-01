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

  # test "update product thread with request to make text shorter" do
  test "A" do
    VCR.use_cassette("update_thread") do
      patch product_thread_url(products(:p1).permalink, "description"),
            params: {
              product_name: "Foliage & Grass Brushset (Photoshop/Procreate)",
              full_description: "So happy to release this set at long last! Tips and contributions welcome if you're able to and wish to!-Works with Photoshop CC and Procreate-125+ Brushes-3 hours of video content with full voiceover -Royalty free, use with any personal, school, or professional work. Remix, edit, and recreate brushes to your liking. -Due to popular request, transparent PNG files of the brush tips have been added.I created these brushes to speed up my own process for laying down foliage, as well as to help anyone else who's looking to do the same! I also hoped to provide a brush settings framework for anyone who wants to create a style-specific original set and copy the settings over. The video content is designed to explain the purpose of each brush and give a framework for how it might be used in a painting, as well as how to replicate the major brush archetypes used here.Special thanks to Matt Hubel who went through and perfected the brush settings for Procreate to match the PS set.",
              selected_text: "I created these brushes to speed up my own process for laying down foliage, as well as to help anyone else who's looking to do the same! I also hoped to provide a brush settings framework for anyone who wants to create a style-specific original set and copy the settings over.",
              ask: "ask to make selection a little bit shorter",
            # ask: "ask to make selection a little bit longer",
            # target_length_factor: 0.66,
            # target_length_factor: 2,
            # make: "longer",
            # part_to_rewrite: "Born from a personal need to streamline my digital painting workflow, particularly in the depiction of foliage, this brush set was meticulously developed. My goal extended beyond just aiding my artistic journey; I aimed to offer a valuable resource to fellow creators facing similar challenges. This collection is more than just a set of tools; it's a comprehensive guide designed to foster creativity. It includes a versatile framework for brush settings, enabling artists to tailor their tools to match their unique style or to innovatively craft their very own bespoke set, enriching their artistic expression.",
            # part_to_rewrite: "Conceived from a desire to refine my digital art process, especially in illustrating foliage, this brush collection emerged. It transcends mere personal utility, aspiring to serve as an indispensable asset for artists navigating similar creative obstacles. Far from a simple tool compilation, it embodies an elaborate blueprint for artistic innovation. The set encompasses a mutable brush settings structure, empowering artists to customize according to their distinct flair or even to invent novel, tailored sets, thus amplifying their creative repertoire.",
            # target_length: "66%",
            # shorter_by_percent: 33,
            # longer_by_percent: 0,
            # shorter_by_percent: 0,
            # longer_by_percent: 50,
            }, as: :json
      assert_response :ok
    end
  end
end
