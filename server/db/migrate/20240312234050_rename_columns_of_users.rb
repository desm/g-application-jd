class RenameColumnsOfUsers < ActiveRecord::Migration[7.1]
  def change
    rename_column :users, :email, :email_address
    rename_column :users, :password, :password_digest
  end
end
