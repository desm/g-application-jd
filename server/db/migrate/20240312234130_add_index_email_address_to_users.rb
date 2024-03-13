class AddIndexEmailAddressToUsers < ActiveRecord::Migration[7.1]
  def change
    add_index :users, :email_address, unique: true
  end
end
