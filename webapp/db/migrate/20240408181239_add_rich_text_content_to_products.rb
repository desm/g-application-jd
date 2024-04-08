class AddRichTextContentToProducts < ActiveRecord::Migration[7.1]
  def change
    add_column :products, :rich_text_content, :text
  end
end
