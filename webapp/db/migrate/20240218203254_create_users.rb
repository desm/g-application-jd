class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.string :email_address
      t.string :password_digest

      t.timestamps
    end

    add_index :users, :email_address, unique: true
  end
end
