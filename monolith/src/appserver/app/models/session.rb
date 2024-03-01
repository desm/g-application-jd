class Session < ApplicationRecord
  has_secure_token
  belongs_to :user
  before_create { self.last_active_at ||= Time.now }
end