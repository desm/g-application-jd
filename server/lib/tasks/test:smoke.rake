require "rails/commands/test/test_command.rb"

class SmokeTest < Rails::Command::TestCommand
  def smoke
    perform("test/smoke")
  end
end

namespace :test do
  task :smoke do
    SmokeTest.new.smoke
  end
end
