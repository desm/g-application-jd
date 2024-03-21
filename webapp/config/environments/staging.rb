# config/environments/staging.rb
require_relative "production"

Rails.application.configure do
  # Staging overrides

  config.access_control_allow_origin_for_www = "https://www.staging.gumroad.jacquesdesmarais.dev"
end
