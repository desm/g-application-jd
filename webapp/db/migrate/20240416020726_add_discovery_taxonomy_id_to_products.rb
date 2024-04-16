class AddDiscoveryTaxonomyIdToProducts < ActiveRecord::Migration[7.1]
  def change
    add_column :products, :discover_taxonomy_id, :string, default: "266"
  end
end
