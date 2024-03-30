class CreateOpenaiAssistantThreads < ActiveRecord::Migration[7.1]
  def change
    create_table :openai_assistant_threads do |t|
      t.string :product_id, null: false
      t.integer :section, null: false
      t.string :thread_id, null: false, index: { unique: true }
      t.timestamps
      t.index [:product_id, :section], unique: true
    end
    add_foreign_key "openai_assistant_threads", "products"
  end
end
