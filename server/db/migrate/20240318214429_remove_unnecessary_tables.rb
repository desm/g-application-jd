class RemoveUnnecessaryTables < ActiveRecord::Migration[7.1]
  def change
    drop_table :comments
    drop_table :articles
  end
end
