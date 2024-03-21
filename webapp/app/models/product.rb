class Product < ApplicationRecord
  belongs_to :user, nil, foreign_key: :creator_id
end
