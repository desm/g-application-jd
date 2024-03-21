class User < ApplicationRecord
  EMAIL_REGEX = /\A[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}\Z/i

  validates :email_address, presence: true,
                            length: { maximum: 100 },
                            uniqueness: true,
                            format: { with: EMAIL_REGEX }

  validates_presence_of :password_digest

  has_secure_password validations: false

  has_many :sessions, dependent: :destroy
  has_many :products, dependent: :destroy
end
