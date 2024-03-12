class User < ApplicationRecord
  EMAIL_REGEX = /\A[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}\Z/i

  validates :email, presence: true,
                    length: { maximum: 100 },
                    uniqueness: true,
                    format: { with: EMAIL_REGEX }

  validates_presence_of :password
end
