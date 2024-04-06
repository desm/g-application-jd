module Products
  module ProductListingData
    def self.product_listing(products)
      {
        "memberships": [],
        "memberships_pagination": {
          "page": 1,
          "pages": 1,
        },
        "products": products.map do |product|
          {
            is_unpublished: product.published == false,
            name: product.name,
            permalink: product.permalink,
            price_formatted: "CAD$27",
            url: "https://jdesma.gumroad.com/l/#{product.permalink}",
            url_without_protocol: "jdesma.gumroad.com/l/#{product.permalink}",
            can_edit: true,
            can_destroy: false,
            can_duplicate: false,
            can_archive: false,
            can_unarchive: false,
          }
        end,
        "products_pagination": {
          "page": 1,
          "pages": 1,
        },
        "archived_products_count": 0,
        "collabs_enabled": true,
        "can_create_product": true,
      }
    end

    def self.product_entries(products)
      {
        "pagination": {
          "page": 1,
          "pages": 1,
        },
        "entries": products.map do |product|
          {
            is_unpublished: product.published == false,
            name: product.name,
            permalink: product.permalink,
            price_formatted: "CAD$27",
            url: "https://jdesma.gumroad.com/l/#{product.permalink}",
            url_without_protocol: "jdesma.gumroad.com/l/#{product.permalink}",
            can_edit: true,
            can_destroy: false,
            can_duplicate: false,
            can_archive: false,
            can_unarchive: false,
          }
        end,
      }
    end
  end
end
