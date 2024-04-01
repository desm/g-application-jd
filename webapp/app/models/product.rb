class Product < ApplicationRecord
  belongs_to :user, nil, foreign_key: :creator_id
  has_many :openai_assistant_threads, dependent: :destroy
end
