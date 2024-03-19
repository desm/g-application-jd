products have:

an ID that looks like: O5_GQNXtgJAuuzPT2mrtPg==

    found as "id" in https://jdesma.gumroad.com/l/gxtwf
    found as "external_id" in https://app.gumroad.com/products/gxtwf/edit

    Ruby code to generate:
```ruby
    require "base64"
    require 'securerandom'
    # Generate a random 16-byte binary string
    random_bytes = SecureRandom.random_bytes(16)
    # Encode the binary string in Base64 format
    base64_id = Base64.strict_encode64(random_bytes)
    puts base64_id
```

a "permalink" that looks like: gxtwf
    it is used https://jdesma.gumroad.com/l/gxtwf

    Ruby code to generate:
```ruby
    def generate_unique_id
        id = (0...5).map { ('a'..'z').to_a[rand(26)] }.join
        return id  # Return the ID if it's unique
    end
```

