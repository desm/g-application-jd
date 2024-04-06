module Products
  module ProductListingData
    def self.product_listing(view_context, products)
      {
        "empty_products_image_url": view_context.asset_path("c46c7f94efc36e2981ec.svg"),
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
            price_formatted: format_price(product.currency_code, product.buy_price),
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
            price_formatted: format_price(product.currency_code, product.buy_price),
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

    private

    # AI helped code this method
    def self.format_price(currency_code, buy_price)
      currency_table = {
        "usd" => "$",
        "gbp" => "£",
        "eur" => "€",
        "jpy" => "¥",
        "inr" => "₹",
        "aud" => "A$",
        "cad" => "CAD$",
        "hkd" => "HK$",
        "sgd" => "SGD$",
        "twd" => "NT$",
        "nzd" => "NZ$",
        "brl" => "R$",
        "zar" => "ZAR",
        "chf" => "CHF",
        "ils" => "₪",
        "php" => "₱",
        "krw" => "₩",
        "pln" => "zł",
        "czk" => "Kč",
      }
      currency_symbol = currency_table[currency_code.downcase]
      formatted_price = buy_price.to_i == buy_price ? buy_price.to_i : format("%.2f", buy_price)
      return "#{currency_symbol}#{formatted_price}"
    end
  end
end
