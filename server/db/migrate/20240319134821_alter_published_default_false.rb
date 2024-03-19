class AlterPublishedDefaultFalse < ActiveRecord::Migration[7.1]
  def change
    change_column_default :products, :published, false
  end
end
