class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users, force: :cascade do |t|
      t.string :name, null: false
      t.string :email_address
      t.string :password_digest
      t.boolean :active, default: true

      t.timestamps
      t.index ["email_address"], name: "index_users_on_email_address", unique: true
    end
  end
end
