class AddRichTextDescriptionToProducts < ActiveRecord::Migration[7.1]
  def change
    add_column :products, :rich_text_description, :text
  end
end
