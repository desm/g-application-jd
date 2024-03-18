class RenameLinksToProducts < ActiveRecord::Migration[7.1]
  def change
    rename_table :links, :products
  end
end
