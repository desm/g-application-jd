class CreateLinks < ActiveRecord::Migration[7.1]
  def change
    create_table :links do |t|
      t.boolean :is_physical
      t.string :is_recurring_billing
      t.string :name
      t.string :native_type
      t.string :price_currency_type
      t.decimal :price_range, precision: 5, scale: 2
      t.datetime :release_date
      t.string :subscription_duration

      t.timestamps
    end
  end
end
