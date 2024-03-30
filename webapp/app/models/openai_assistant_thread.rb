class OpenaiAssistantThread < ApplicationRecord
  enum :section, [ :description, :content ]

  belongs_to :product
end
