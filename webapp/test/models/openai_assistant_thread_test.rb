require "test_helper"

class OpenaiAssistantThreadTest < ActiveSupport::TestCase
  test "create a thread" do
    thread = OpenaiAssistantThread.new(
      product: products(:p1),
      section: :description,
      thread_id: "thread_003",
    )
    thread.save!
  end
end
