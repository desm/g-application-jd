class RecreateProducts < ActiveRecord::Migration[7.1]
  def change
    drop_table :products

    create_table :products do |t|
      t.references :creator, foreign_key: { to_table: :users }, null: false
      t.string :permalink, null: false
      t.string :name, null: false
      t.decimal "buy_price", precision: 5, scale: 2, null: false
      t.string "currency_code", null: false
      t.boolean "published", null: false

      t.timestamps

      t.index [:creator_id, :permalink], unique: true
    end
  end
end
