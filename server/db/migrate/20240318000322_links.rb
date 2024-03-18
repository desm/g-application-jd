class Links < ActiveRecord::Migration[7.1]
  def change
    change_column_null :links, :name, false
    change_column_null :links, :is_physical, false
    change_column_null :links, :name, false
    change_column_null :links, :native_type, false
    change_column_null :links, :price_currency_type, false
    change_column_null :links, :price_range, false
    change_column_null :links, :release_date, false

    change_table :links do |t|
      t.remove :is_recurring_billing
      t.boolean :is_recurring_billing, null: false
      t.rename :release_date, :release_datetime
    end
  end
end
