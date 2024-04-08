module Products
  module ProductsData
    def self.design_settings
      {
        "font": {
          "name": "Mabry Pro",
          "url": "/assets/mabry-regular-pro-2987dea5e28da4cf6ec452e081243d69aa29503e7f870eddabcb2225dac42343.woff2",
        },
      }
    end

    def self.user_agent_info
      {
        "is_mobile": false,
      }
    end

    def self.edit_attributes(view_context, product, user)
      {
        "has_openai_assistant_thread_for_description": product.openai_assistant_threads.where(section: :description).any?,
        "seller": {
          "id": "9078562000866",
          "email_address": user.email_address,
          "name": user.name,
          "subdomain": "#{user.name}.gumroad.jacquesdesmarais.dev",
          "avatar_url": view_context.asset_path("gumroad-default-avatar-5.png"),
          "profile_url": "https://#{user.name}.gumroad.jacquesdesmarais.dev/",
        },
        "sales_count": 0,
        "sales_count_for_inventory": 0,
        "options_sales_counts": [],
        "rating_counts": [0, 0, 0, 0, 0],
        "is_published": true,
        "is_flat_fee_applicable": true,
        "is_membership_price_changes_enabled": true,
        "currency_code": "cad",
        "exchange_rate": 1.349595,
        "name": product.name,
        "description": product.rich_text_description,
        "preorder_date": nil,
        "want_this": {
          "type": "supported",
          "option": "i_want_this_prompt",
        },
        "is_licensed": false,
        "is_multiseat_license": false,
        "limit_sales": false,
        "max_purchase_count": nil,
        "quantity_enabled": false,
        "should_show_sales_count": false,
        "recurring_settings": nil,
        "default_sku": nil,
        "files_data": [],
        "folders": [],
        "existing_product_files": [],
        "specific_attributes": {
          "permalink": product.permalink,
          "audio": false,
          "pdf": false,
          "is_streamable": false,
          "is_listenable": false,
          "can_enable_rentals": false,
          "purchase_type": "buy_only",
          "is_rentable": false,
        },
        "is_tier": false,
        "is_physical": false,
        "is_recurring": false,
        "can_enable_rentals": false,
        "variants": {
          "categories": [],
          "skus": [],
          "skus_enabled": false,
        },
        "purchase_type": "buy_only",
        "buy_price": product.buy_price,
        "is_shipping_info_required": false,
        "rent_price": "0",
        "is_customizable": false,
        "suggested_price": nil,
        "is_us_sales_tax_eligible": false,
        "us_sales_states": [],
        "sales_tax_exclusive": false,
        "sales_excluded": [],
        "static_recurrence_list": ["monthly", "quarterly", "biannually", "yearly"],
        "recurrence_values_for_recurring_product": nil,
        "selected_recurrence": nil,
        "asset_previews": [],
        "thumbnail": nil,
        "custom_view_content_button_text": "",
        "custom_permalink": nil,
        "custom_receipt": "",
        "custom_summary": nil,
        "custom_attributes_file_info": {},
        "custom_attributes": [],
        "shipping_destinations": nil,
        "available_countries": [
          {
            "code": "US",
            "name": "United States",
          },
          {
            "code": "ASIA",
            "name": "Asia",
          },
          {
            "code": "EUROPE",
            "name": "Europe",
          },
          {
            "code": "NORTH AMERICA",
            "name": "North America",
          },
          {
            "code": "ELSEWHERE",
            "name": "Elsewhere",
          },
          {
            "code": "AL",
            "name": "Albania",
          },
          {
            "code": "DZ",
            "name": "Algeria",
          },
          {
            "code": "AS",
            "name": "American Samoa",
          },
          {
            "code": "AD",
            "name": "Andorra",
          },
          {
            "code": "AO",
            "name": "Angola",
          },
          {
            "code": "AI",
            "name": "Anguilla",
          },
          {
            "code": "AQ",
            "name": "Antarctica",
          },
          {
            "code": "AG",
            "name": "Antigua and Barbuda",
          },
          {
            "code": "AR",
            "name": "Argentina",
          },
          {
            "code": "AM",
            "name": "Armenia",
          },
          {
            "code": "AW",
            "name": "Aruba",
          },
          {
            "code": "AU",
            "name": "Australia",
          },
          {
            "code": "AT",
            "name": "Austria",
          },
          {
            "code": "AZ",
            "name": "Azerbaijan",
          },
          {
            "code": "BS",
            "name": "Bahamas",
          },
          {
            "code": "BH",
            "name": "Bahrain",
          },
          {
            "code": "BD",
            "name": "Bangladesh",
          },
          {
            "code": "BB",
            "name": "Barbados",
          },
          {
            "code": "BY",
            "name": "Belarus",
          },
          {
            "code": "BE",
            "name": "Belgium",
          },
          {
            "code": "BZ",
            "name": "Belize",
          },
          {
            "code": "BJ",
            "name": "Benin",
          },
          {
            "code": "BM",
            "name": "Bermuda",
          },
          {
            "code": "BT",
            "name": "Bhutan",
          },
          {
            "code": "BO",
            "name": "Bolivia",
          },
          {
            "code": "BQ",
            "name": "Bonaire, Sint Eustatius and Saba",
          },
          {
            "code": "BA",
            "name": "Bosnia and Herzegovina",
          },
          {
            "code": "BW",
            "name": "Botswana",
          },
          {
            "code": "BV",
            "name": "Bouvet Island",
          },
          {
            "code": "BR",
            "name": "Brazil",
          },
          {
            "code": "IO",
            "name": "British Indian Ocean Territory",
          },
          {
            "code": "BN",
            "name": "Brunei Darussalam",
          },
          {
            "code": "BG",
            "name": "Bulgaria",
          },
          {
            "code": "BF",
            "name": "Burkina Faso",
          },
          {
            "code": "BI",
            "name": "Burundi",
          },
          {
            "code": "CV",
            "name": "Cabo Verde",
          },
          {
            "code": "KH",
            "name": "Cambodia",
          },
          {
            "code": "CM",
            "name": "Cameroon",
          },
          {
            "code": "CA",
            "name": "Canada",
          },
          {
            "code": "KY",
            "name": "Cayman Islands",
          },
          {
            "code": "CF",
            "name": "Central African Republic",
          },
          {
            "code": "TD",
            "name": "Chad",
          },
          {
            "code": "CL",
            "name": "Chile",
          },
          {
            "code": "CN",
            "name": "China",
          },
          {
            "code": "CX",
            "name": "Christmas Island",
          },
          {
            "code": "CC",
            "name": "Cocos (Keeling) Islands",
          },
          {
            "code": "CO",
            "name": "Colombia",
          },
          {
            "code": "KM",
            "name": "Comoros",
          },
          {
            "code": "CG",
            "name": "Congo",
          },
          {
            "code": "CK",
            "name": "Cook Islands",
          },
          {
            "code": "CR",
            "name": "Costa Rica",
          },
          {
            "code": "HR",
            "name": "Croatia",
          },
          {
            "code": "CW",
            "name": "Curaçao",
          },
          {
            "code": "CY",
            "name": "Cyprus",
          },
          {
            "code": "CZ",
            "name": "Czechia",
          },
          {
            "code": "DK",
            "name": "Denmark",
          },
          {
            "code": "DJ",
            "name": "Djibouti",
          },
          {
            "code": "DM",
            "name": "Dominica",
          },
          {
            "code": "DO",
            "name": "Dominican Republic",
          },
          {
            "code": "EC",
            "name": "Ecuador",
          },
          {
            "code": "EG",
            "name": "Egypt",
          },
          {
            "code": "SV",
            "name": "El Salvador",
          },
          {
            "code": "GQ",
            "name": "Equatorial Guinea",
          },
          {
            "code": "ER",
            "name": "Eritrea",
          },
          {
            "code": "EE",
            "name": "Estonia",
          },
          {
            "code": "SZ",
            "name": "Eswatini",
          },
          {
            "code": "ET",
            "name": "Ethiopia",
          },
          {
            "code": "FK",
            "name": "Falkland Islands (Malvinas)",
          },
          {
            "code": "FO",
            "name": "Faroe Islands",
          },
          {
            "code": "FJ",
            "name": "Fiji",
          },
          {
            "code": "FI",
            "name": "Finland",
          },
          {
            "code": "FR",
            "name": "France",
          },
          {
            "code": "GF",
            "name": "French Guiana",
          },
          {
            "code": "PF",
            "name": "French Polynesia",
          },
          {
            "code": "TF",
            "name": "French Southern Territories",
          },
          {
            "code": "GA",
            "name": "Gabon",
          },
          {
            "code": "GM",
            "name": "Gambia",
          },
          {
            "code": "GE",
            "name": "Georgia",
          },
          {
            "code": "DE",
            "name": "Germany",
          },
          {
            "code": "GH",
            "name": "Ghana",
          },
          {
            "code": "GI",
            "name": "Gibraltar",
          },
          {
            "code": "GR",
            "name": "Greece",
          },
          {
            "code": "GL",
            "name": "Greenland",
          },
          {
            "code": "GD",
            "name": "Grenada",
          },
          {
            "code": "GP",
            "name": "Guadeloupe",
          },
          {
            "code": "GU",
            "name": "Guam",
          },
          {
            "code": "GT",
            "name": "Guatemala",
          },
          {
            "code": "GG",
            "name": "Guernsey",
          },
          {
            "code": "GN",
            "name": "Guinea",
          },
          {
            "code": "GW",
            "name": "Guinea-Bissau",
          },
          {
            "code": "GY",
            "name": "Guyana",
          },
          {
            "code": "HT",
            "name": "Haiti",
          },
          {
            "code": "HM",
            "name": "Heard Island and McDonald Islands",
          },
          {
            "code": "VA",
            "name": "Holy See (Vatican City State)",
          },
          {
            "code": "HN",
            "name": "Honduras",
          },
          {
            "code": "HK",
            "name": "Hong Kong",
          },
          {
            "code": "HU",
            "name": "Hungary",
          },
          {
            "code": "IS",
            "name": "Iceland",
          },
          {
            "code": "IN",
            "name": "India",
          },
          {
            "code": "ID",
            "name": "Indonesia",
          },
          {
            "code": "IE",
            "name": "Ireland",
          },
          {
            "code": "IM",
            "name": "Isle of Man",
          },
          {
            "code": "IL",
            "name": "Israel",
          },
          {
            "code": "IT",
            "name": "Italy",
          },
          {
            "code": "JM",
            "name": "Jamaica",
          },
          {
            "code": "JP",
            "name": "Japan",
          },
          {
            "code": "JE",
            "name": "Jersey",
          },
          {
            "code": "JO",
            "name": "Jordan",
          },
          {
            "code": "KZ",
            "name": "Kazakhstan",
          },
          {
            "code": "KE",
            "name": "Kenya",
          },
          {
            "code": "KI",
            "name": "Kiribati",
          },
          {
            "code": "XK",
            "name": "Kosovo",
          },
          {
            "code": "KW",
            "name": "Kuwait",
          },
          {
            "code": "KG",
            "name": "Kyrgyzstan",
          },
          {
            "code": "LA",
            "name": "Lao People's Democratic Republic",
          },
          {
            "code": "LV",
            "name": "Latvia",
          },
          {
            "code": "LS",
            "name": "Lesotho",
          },
          {
            "code": "LI",
            "name": "Liechtenstein",
          },
          {
            "code": "LT",
            "name": "Lithuania",
          },
          {
            "code": "LU",
            "name": "Luxembourg",
          },
          {
            "code": "MO",
            "name": "Macao",
          },
          {
            "code": "MG",
            "name": "Madagascar",
          },
          {
            "code": "MW",
            "name": "Malawi",
          },
          {
            "code": "MY",
            "name": "Malaysia",
          },
          {
            "code": "MV",
            "name": "Maldives",
          },
          {
            "code": "ML",
            "name": "Mali",
          },
          {
            "code": "MT",
            "name": "Malta",
          },
          {
            "code": "MH",
            "name": "Marshall Islands",
          },
          {
            "code": "MQ",
            "name": "Martinique",
          },
          {
            "code": "MR",
            "name": "Mauritania",
          },
          {
            "code": "MU",
            "name": "Mauritius",
          },
          {
            "code": "YT",
            "name": "Mayotte",
          },
          {
            "code": "MX",
            "name": "Mexico",
          },
          {
            "code": "FM",
            "name": "Micronesia, Federated States of",
          },
          {
            "code": "MD",
            "name": "Moldova",
          },
          {
            "code": "MC",
            "name": "Monaco",
          },
          {
            "code": "MN",
            "name": "Mongolia",
          },
          {
            "code": "ME",
            "name": "Montenegro",
          },
          {
            "code": "MS",
            "name": "Montserrat",
          },
          {
            "code": "MA",
            "name": "Morocco",
          },
          {
            "code": "MZ",
            "name": "Mozambique",
          },
          {
            "code": "NA",
            "name": "Namibia",
          },
          {
            "code": "NR",
            "name": "Nauru",
          },
          {
            "code": "NP",
            "name": "Nepal",
          },
          {
            "code": "NL",
            "name": "Netherlands",
          },
          {
            "code": "NC",
            "name": "New Caledonia",
          },
          {
            "code": "NZ",
            "name": "New Zealand",
          },
          {
            "code": "NI",
            "name": "Nicaragua",
          },
          {
            "code": "NE",
            "name": "Niger",
          },
          {
            "code": "NG",
            "name": "Nigeria",
          },
          {
            "code": "NU",
            "name": "Niue",
          },
          {
            "code": "NF",
            "name": "Norfolk Island",
          },
          {
            "code": "MK",
            "name": "North Macedonia",
          },
          {
            "code": "MP",
            "name": "Northern Mariana Islands",
          },
          {
            "code": "NO",
            "name": "Norway",
          },
          {
            "code": "OM",
            "name": "Oman",
          },
          {
            "code": "PK",
            "name": "Pakistan",
          },
          {
            "code": "PW",
            "name": "Palau",
          },
          {
            "code": "PS",
            "name": "Palestine, State of",
          },
          {
            "code": "PA",
            "name": "Panama",
          },
          {
            "code": "PG",
            "name": "Papua New Guinea",
          },
          {
            "code": "PY",
            "name": "Paraguay",
          },
          {
            "code": "PE",
            "name": "Peru",
          },
          {
            "code": "PH",
            "name": "Philippines",
          },
          {
            "code": "PN",
            "name": "Pitcairn",
          },
          {
            "code": "PL",
            "name": "Poland",
          },
          {
            "code": "PT",
            "name": "Portugal",
          },
          {
            "code": "PR",
            "name": "Puerto Rico",
          },
          {
            "code": "QA",
            "name": "Qatar",
          },
          {
            "code": "RO",
            "name": "Romania",
          },
          {
            "code": "RU",
            "name": "Russian Federation",
          },
          {
            "code": "RW",
            "name": "Rwanda",
          },
          {
            "code": "RE",
            "name": "Réunion",
          },
          {
            "code": "BL",
            "name": "Saint Barthélemy",
          },
          {
            "code": "SH",
            "name": "Saint Helena, Ascension and Tristan da Cunha",
          },
          {
            "code": "KN",
            "name": "Saint Kitts and Nevis",
          },
          {
            "code": "LC",
            "name": "Saint Lucia",
          },
          {
            "code": "MF",
            "name": "Saint Martin (French part)",
          },
          {
            "code": "PM",
            "name": "Saint Pierre and Miquelon",
          },
          {
            "code": "VC",
            "name": "Saint Vincent and the Grenadines",
          },
          {
            "code": "WS",
            "name": "Samoa",
          },
          {
            "code": "SM",
            "name": "San Marino",
          },
          {
            "code": "ST",
            "name": "Sao Tome and Principe",
          },
          {
            "code": "SA",
            "name": "Saudi Arabia",
          },
          {
            "code": "SN",
            "name": "Senegal",
          },
          {
            "code": "RS",
            "name": "Serbia",
          },
          {
            "code": "SC",
            "name": "Seychelles",
          },
          {
            "code": "SL",
            "name": "Sierra Leone",
          },
          {
            "code": "SG",
            "name": "Singapore",
          },
          {
            "code": "SX",
            "name": "Sint Maarten (Dutch part)",
          },
          {
            "code": "SK",
            "name": "Slovakia",
          },
          {
            "code": "SI",
            "name": "Slovenia",
          },
          {
            "code": "SB",
            "name": "Solomon Islands",
          },
          {
            "code": "ZA",
            "name": "South Africa",
          },
          {
            "code": "GS",
            "name": "South Georgia and the South Sandwich Islands",
          },
          {
            "code": "KR",
            "name": "South Korea",
          },
          {
            "code": "SS",
            "name": "South Sudan",
          },
          {
            "code": "ES",
            "name": "Spain",
          },
          {
            "code": "LK",
            "name": "Sri Lanka",
          },
          {
            "code": "SR",
            "name": "Suriname",
          },
          {
            "code": "SJ",
            "name": "Svalbard and Jan Mayen",
          },
          {
            "code": "SE",
            "name": "Sweden",
          },
          {
            "code": "CH",
            "name": "Switzerland",
          },
          {
            "code": "TW",
            "name": "Taiwan",
          },
          {
            "code": "TJ",
            "name": "Tajikistan",
          },
          {
            "code": "TZ",
            "name": "Tanzania",
          },
          {
            "code": "TH",
            "name": "Thailand",
          },
          {
            "code": "TL",
            "name": "Timor-Leste",
          },
          {
            "code": "TG",
            "name": "Togo",
          },
          {
            "code": "TK",
            "name": "Tokelau",
          },
          {
            "code": "TO",
            "name": "Tonga",
          },
          {
            "code": "TT",
            "name": "Trinidad and Tobago",
          },
          {
            "code": "TN",
            "name": "Tunisia",
          },
          {
            "code": "TM",
            "name": "Turkmenistan",
          },
          {
            "code": "TC",
            "name": "Turks and Caicos Islands",
          },
          {
            "code": "TV",
            "name": "Tuvalu",
          },
          {
            "code": "TR",
            "name": "Türkiye",
          },
          {
            "code": "UG",
            "name": "Uganda",
          },
          {
            "code": "UA",
            "name": "Ukraine",
          },
          {
            "code": "AE",
            "name": "United Arab Emirates",
          },
          {
            "code": "GB",
            "name": "United Kingdom",
          },
          {
            "code": "UM",
            "name": "United States Minor Outlying Islands",
          },
          {
            "code": "UY",
            "name": "Uruguay",
          },
          {
            "code": "UZ",
            "name": "Uzbekistan",
          },
          {
            "code": "VU",
            "name": "Vanuatu",
          },
          {
            "code": "VE",
            "name": "Venezuela",
          },
          {
            "code": "VN",
            "name": "Vietnam",
          },
          {
            "code": "VG",
            "name": "Virgin Islands, British",
          },
          {
            "code": "VI",
            "name": "Virgin Islands, U.S.",
          },
          {
            "code": "WF",
            "name": "Wallis and Futuna",
          },
          {
            "code": "EH",
            "name": "Western Sahara",
          },
          {
            "code": "ZM",
            "name": "Zambia",
          },
          {
            "code": "AX",
            "name": "Åland Islands",
          },
        ],
        "is_epublication": false,
        "unique_permalink": product.permalink,
        "subdomain": "#{user.name}.gumroad.jacquesdesmarais.dev",
        "protocol": "https",
        "is_adult_content": false,
        "display_product_reviews": true,
        "discover_fee_percent": 10,
        "integrations": {
          "circle": nil,
          "discord": nil,
          "zoom": nil,
          "google_calendar": nil,
        },
        "tags": [],
        "discover_taxonomy_id": "266",
        "native_type": "digital",
        "rich_content_version": "sectionless",
        "rich_content_pages": [
          {
            "page_id": "RXjaeTUNWdQ4V-Eyw4wV9g==",
            "title": nil,
            "variant_id": nil,
            "description": '{"doc":{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Content Level One"}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Content Level Two"}]}]},"selection":{"type":"text","anchor":1,"head":1}}',
            "updated_at": "2024-03-18T20:21:39Z",
          },
        ],
        "editing_page_id": nil,
        "migrating_back_to_old_files_editor_allowed": false,
        "supports_license_key_in_product_content": true,
        "supports_posts_in_product_content": true,
        "has_same_rich_content_for_all_variants": false,
        "zoom_enabled": false,
        "google_calendar_enabled": false,
        "external_id": "O5_GQNXtgJAuuzPT2mrtPg==",
        "seller_has_other_refund_policies": false,
        "refund_policy_enabled": false,
        "refund_policy": {
          "title": nil,
          "fine_print": nil,
        },
        "custom_domain": nil,
        "custom_domain_verification_status": nil,
        "profile_sections": [
          {
            "id": "GFGDAdT_lXMwL8cBMYPTmA==",
            "header": "",
            "product_names": [
              "Graphic Novel",
              "Another",
              "Hey",
              "Hey",
              "Hey",
              "Hey",
              "Hey2",
              "Hey",
              "Hey2",
              "Hey2",
              "Hey",
              "Hey2",
              "Hey2",
              "Hey",
              "Hey",
              "Hey",
              "Hey2",
              "Hey",
              "Hey",
              "Hey",
              "product name",
              "foo",
              "foo",
              "foo",
              "foo",
              "foo",
              "foo",
              "foo",
              "foo",
              "digital product",
              "course",
              "ebook",
              "membership",
              "membership_3m",
              "membership_6m",
              "membership_yearly",
              "physical_good",
              "bundle",
              "test001",
            ],
            "selected": true,
            "default": true,
          },
          {
            "id": "F52pKvO9FVOSBgwemiIBjg==",
            "header": "",
            "product_names": [
              "Hey",
              "Hey",
              "Hey",
              "Hey",
              "Hey2",
              "Hey",
              "Hey2",
              "Hey2",
              "Hey",
              "Hey2",
              "Hey2",
              "Hey",
              "Hey",
              "Hey",
              "Hey2",
              "Hey",
              "Hey",
              "Hey",
              "product name",
              "foo",
              "foo",
              "foo",
              "foo",
              "foo",
              "foo",
              "foo",
              "foo",
              "digital product",
              "course",
              "ebook",
              "membership",
              "membership_3m",
              "membership_6m",
              "membership_yearly",
              "physical_good",
              "bundle",
              "test001",
            ],
            "selected": true,
            "default": true,
          },
        ],
      }
    end

    def self.discover_taxonomy_options
      [
        {
          "id": "1",
          "label": "3D",
        },
        {
          "id": "8",
          "label": "3D > 3D Assets",
        },
        {
          "id": "16",
          "label": "3D > 3D Assets > 3DSMax",
        },
        {
          "id": "282",
          "label": "3D > 3D Assets > Accessories",
        },
        {
          "id": "283",
          "label": "3D > 3D Assets > Accessories > Bags",
        },
        {
          "id": "284",
          "label": "3D > 3D Assets > Accessories > Belts",
        },
        {
          "id": "285",
          "label": "3D > 3D Assets > Accessories > Chokers",
        },
        {
          "id": "286",
          "label": "3D > 3D Assets > Accessories > Gloves",
        },
        {
          "id": "287",
          "label": "3D > 3D Assets > Accessories > Harnesses",
        },
        {
          "id": "288",
          "label": "3D > 3D Assets > Accessories > Jewelry",
        },
        {
          "id": "289",
          "label": "3D > 3D Assets > Accessories > Masks",
        },
        {
          "id": "290",
          "label": "3D > 3D Assets > Accessories > Wings",
        },
        {
          "id": "274",
          "label": "3D > 3D Assets > Avatar Components",
        },
        {
          "id": "275",
          "label": "3D > 3D Assets > Avatar Components > Bases",
        },
        {
          "id": "276",
          "label": "3D > 3D Assets > Avatar Components > Ears",
        },
        {
          "id": "277",
          "label": "3D > 3D Assets > Avatar Components > Feet",
        },
        {
          "id": "278",
          "label": "3D > 3D Assets > Avatar Components > Hair",
        },
        {
          "id": "279",
          "label": "3D > 3D Assets > Avatar Components > Heads",
        },
        {
          "id": "280",
          "label": "3D > 3D Assets > Avatar Components > Horns",
        },
        {
          "id": "281",
          "label": "3D > 3D Assets > Avatar Components > Tails",
        },
        {
          "id": "9",
          "label": "3D > 3D Assets > Blender",
        },
        {
          "id": "12",
          "label": "3D > 3D Assets > Cinema 4D",
        },
        {
          "id": "291",
          "label": "3D > 3D Assets > Clothing",
        },
        {
          "id": "292",
          "label": "3D > 3D Assets > Clothing > Bodysuits",
        },
        {
          "id": "293",
          "label": "3D > 3D Assets > Clothing > Bottoms",
        },
        {
          "id": "294",
          "label": "3D > 3D Assets > Clothing > Bras",
        },
        {
          "id": "295",
          "label": "3D > 3D Assets > Clothing > Dresses",
        },
        {
          "id": "296",
          "label": "3D > 3D Assets > Clothing > Jackets",
        },
        {
          "id": "297",
          "label": "3D > 3D Assets > Clothing > Lingerie",
        },
        {
          "id": "298",
          "label": "3D > 3D Assets > Clothing > Outfits",
        },
        {
          "id": "299",
          "label": "3D > 3D Assets > Clothing > Pants",
        },
        {
          "id": "300",
          "label": "3D > 3D Assets > Clothing > Shirts",
        },
        {
          "id": "301",
          "label": "3D > 3D Assets > Clothing > Shorts",
        },
        {
          "id": "302",
          "label": "3D > 3D Assets > Clothing > Skirts",
        },
        {
          "id": "303",
          "label": "3D > 3D Assets > Clothing > Sweaters",
        },
        {
          "id": "304",
          "label": "3D > 3D Assets > Clothing > Swimsuits",
        },
        {
          "id": "305",
          "label": "3D > 3D Assets > Clothing > Tops",
        },
        {
          "id": "306",
          "label": "3D > 3D Assets > Clothing > Underwear",
        },
        {
          "id": "307",
          "label": "3D > 3D Assets > Footwear",
        },
        {
          "id": "308",
          "label": "3D > 3D Assets > Footwear > Boots",
        },
        {
          "id": "309",
          "label": "3D > 3D Assets > Footwear > Leggings",
        },
        {
          "id": "310",
          "label": "3D > 3D Assets > Footwear > Shoes",
        },
        {
          "id": "311",
          "label": "3D > 3D Assets > Footwear > Socks",
        },
        {
          "id": "312",
          "label": "3D > 3D Assets > Footwear > Stockings",
        },
        {
          "id": "313",
          "label": "3D > 3D Assets > Headwear",
        },
        {
          "id": "314",
          "label": "3D > 3D Assets > Headwear > Hats",
        },
        {
          "id": "10",
          "label": "3D > 3D Assets > Maya",
        },
        {
          "id": "11",
          "label": "3D > 3D Assets > Modo",
        },
        {
          "id": "315",
          "label": "3D > 3D Assets > Props",
        },
        {
          "id": "316",
          "label": "3D > 3D Assets > Props > Companions",
        },
        {
          "id": "317",
          "label": "3D > 3D Assets > Props > Handheld",
        },
        {
          "id": "318",
          "label": "3D > 3D Assets > Props > Plushies",
        },
        {
          "id": "319",
          "label": "3D > 3D Assets > Props > Prefabs",
        },
        {
          "id": "320",
          "label": "3D > 3D Assets > Props > Weapons",
        },
        {
          "id": "14",
          "label": "3D > 3D Assets > SketchUp",
        },
        {
          "id": "13",
          "label": "3D > 3D Assets > Unity",
        },
        {
          "id": "321",
          "label": "3D > 3D Assets > Unity > Animations",
        },
        {
          "id": "322",
          "label": "3D > 3D Assets > Unity > Particle Systems",
        },
        {
          "id": "323",
          "label": "3D > 3D Assets > Unity > Shaders",
        },
        {
          "id": "15",
          "label": "3D > 3D Assets > Unreal Engine",
        },
        {
          "id": "17",
          "label": "3D > 3D Assets > ZBrush",
        },
        {
          "id": "2",
          "label": "3D > 3D Modeling",
        },
        {
          "id": "6",
          "label": "3D > AR/VR",
        },
        {
          "id": "7",
          "label": "3D > AR/VR > Spark AR Studio",
        },
        {
          "id": "5",
          "label": "3D > Animating",
        },
        {
          "id": "267",
          "label": "3D > Avatars",
        },
        {
          "id": "268",
          "label": "3D > Avatars > Female",
        },
        {
          "id": "269",
          "label": "3D > Avatars > Male",
        },
        {
          "id": "270",
          "label": "3D > Avatars > Non-Binary",
        },
        {
          "id": "271",
          "label": "3D > Avatars > Optimized",
        },
        {
          "id": "272",
          "label": "3D > Avatars > Quest",
        },
        {
          "id": "273",
          "label": "3D > Avatars > Species",
        },
        {
          "id": "3",
          "label": "3D > Character Design",
        },
        {
          "id": "4",
          "label": "3D > Rigging",
        },
        {
          "id": "340",
          "label": "3D > Textures",
        },
        {
          "id": "341",
          "label": "3D > Textures > Base",
        },
        {
          "id": "342",
          "label": "3D > Textures > Eyes",
        },
        {
          "id": "343",
          "label": "3D > Textures > Face",
        },
        {
          "id": "344",
          "label": "3D > Textures > Icons",
        },
        {
          "id": "345",
          "label": "3D > Textures > MatCap",
        },
        {
          "id": "346",
          "label": "3D > Textures > PBR",
        },
        {
          "id": "347",
          "label": "3D > Textures > Tattoos",
        },
        {
          "id": "265",
          "label": "3D > VRChat",
        },
        {
          "id": "324",
          "label": "3D > VRChat > Avatar Systems",
        },
        {
          "id": "325",
          "label": "3D > VRChat > Followers",
        },
        {
          "id": "326",
          "label": "3D > VRChat > OSC",
        },
        {
          "id": "327",
          "label": "3D > VRChat > Setup Scripts",
        },
        {
          "id": "328",
          "label": "3D > VRChat > Spring Joints",
        },
        {
          "id": "329",
          "label": "3D > VRChat > Tools",
        },
        {
          "id": "339",
          "label": "3D > VRChat > Tutorials & Guides",
        },
        {
          "id": "330",
          "label": "3D > VRChat > World Constraints",
        },
        {
          "id": "331",
          "label": "3D > VRChat > Worlds",
        },
        {
          "id": "332",
          "label": "3D > VRChat > Worlds > Assets",
        },
        {
          "id": "333",
          "label": "3D > VRChat > Worlds > MIDI",
        },
        {
          "id": "334",
          "label": "3D > VRChat > Worlds > Quest",
        },
        {
          "id": "335",
          "label": "3D > VRChat > Worlds > Tools",
        },
        {
          "id": "336",
          "label": "3D > VRChat > Worlds > Udon",
        },
        {
          "id": "338",
          "label": "3D > VRChat > Worlds > Udon 2",
        },
        {
          "id": "337",
          "label": "3D > VRChat > Worlds > Udon System",
        },
        {
          "id": "198",
          "label": "Audio",
        },
        {
          "id": "203",
          "label": "Audio > ASMR",
        },
        {
          "id": "201",
          "label": "Audio > Healing",
        },
        {
          "id": "199",
          "label": "Audio > Hypnosis",
        },
        {
          "id": "202",
          "label": "Audio > Sleep & Meditation",
        },
        {
          "id": "200",
          "label": "Audio > Subliminal Messages",
        },
        {
          "id": "204",
          "label": "Audio > Voiceover",
        },
        {
          "id": "161",
          "label": "Business & Money",
        },
        {
          "id": "162",
          "label": "Business & Money > Accounting",
        },
        {
          "id": "173",
          "label": "Business & Money > Entrepreneurship",
        },
        {
          "id": "175",
          "label": "Business & Money > Entrepreneurship > Courses",
        },
        {
          "id": "176",
          "label": "Business & Money > Entrepreneurship > Podcasts",
        },
        {
          "id": "174",
          "label": "Business & Money > Entrepreneurship > Resources",
        },
        {
          "id": "172",
          "label": "Business & Money > Gigs & Side Projects",
        },
        {
          "id": "163",
          "label": "Business & Money > Investing",
        },
        {
          "id": "170",
          "label": "Business & Money > Management & Leadership",
        },
        {
          "id": "165",
          "label": "Business & Money > Marketing & Sales",
        },
        {
          "id": "168",
          "label": "Business & Money > Marketing & Sales > Analytics",
        },
        {
          "id": "166",
          "label": "Business & Money > Marketing & Sales > Email",
        },
        {
          "id": "167",
          "label": "Business & Money > Marketing & Sales > Social Media",
        },
        {
          "id": "169",
          "label": "Business & Money > Networking, Careers & Jobs",
        },
        {
          "id": "164",
          "label": "Business & Money > Personal Finance",
        },
        {
          "id": "171",
          "label": "Business & Money > Real Estate",
        },
        {
          "id": "190",
          "label": "Comics & Graphic Novels",
        },
        {
          "id": "18",
          "label": "Design",
        },
        {
          "id": "21",
          "label": "Design > Architecture",
        },
        {
          "id": "45",
          "label": "Design > Branding",
        },
        {
          "id": "47",
          "label": "Design > Branding > Business Cards",
        },
        {
          "id": "46",
          "label": "Design > Branding > Logos",
        },
        {
          "id": "48",
          "label": "Design > Branding > Social Media",
        },
        {
          "id": "20",
          "label": "Design > Entertainment Design",
        },
        {
          "id": "22",
          "label": "Design > Fashion Design",
        },
        {
          "id": "44",
          "label": "Design > Fonts",
        },
        {
          "id": "34",
          "label": "Design > Graphics",
        },
        {
          "id": "38",
          "label": "Design > Graphics > Assets & Templates",
        },
        {
          "id": "37",
          "label": "Design > Graphics > Marketing & Social",
        },
        {
          "id": "39",
          "label": "Design > Graphics > Mockups",
        },
        {
          "id": "42",
          "label": "Design > Graphics > Mockups > Canva",
        },
        {
          "id": "41",
          "label": "Design > Graphics > Mockups > Illustrator",
        },
        {
          "id": "43",
          "label": "Design > Graphics > Mockups > InDesign",
        },
        {
          "id": "40",
          "label": "Design > Graphics > Mockups > Photoshop",
        },
        {
          "id": "35",
          "label": "Design > Graphics > Textures & Patterns (2D)",
        },
        {
          "id": "36",
          "label": "Design > Graphics > Vector Graphics",
        },
        {
          "id": "50",
          "label": "Design > Icons",
        },
        {
          "id": "51",
          "label": "Design > Icons > 3D Icons",
        },
        {
          "id": "52",
          "label": "Design > Icons > Vector Icons",
        },
        {
          "id": "53",
          "label": "Design > Icons > iOS Customization",
        },
        {
          "id": "19",
          "label": "Design > Industrial Design",
        },
        {
          "id": "23",
          "label": "Design > Interior Design",
        },
        {
          "id": "29",
          "label": "Design > Print & Packaging",
        },
        {
          "id": "30",
          "label": "Design > Print & Packaging > Canva",
        },
        {
          "id": "31",
          "label": "Design > Print & Packaging > Illustrator",
        },
        {
          "id": "33",
          "label": "Design > Print & Packaging > InDesign",
        },
        {
          "id": "32",
          "label": "Design > Print & Packaging > Powerpoint",
        },
        {
          "id": "24",
          "label": "Design > UI & Web",
        },
        {
          "id": "27",
          "label": "Design > UI & Web > Adobe",
        },
        {
          "id": "25",
          "label": "Design > UI & Web > Figma",
        },
        {
          "id": "28",
          "label": "Design > UI & Web > HTML",
        },
        {
          "id": "26",
          "label": "Design > UI & Web > XD",
        },
        {
          "id": "49",
          "label": "Design > Wallpapers",
        },
        {
          "id": "54",
          "label": "Drawing & Painting",
        },
        {
          "id": "64",
          "label": "Drawing & Painting > Artwork & Commissions",
        },
        {
          "id": "55",
          "label": "Drawing & Painting > Digital Illustration",
        },
        {
          "id": "56",
          "label": "Drawing & Painting > Digital Illustration > Courses",
        },
        {
          "id": "59",
          "label": "Drawing & Painting > Digital Illustration > Illustration Brushes",
        },
        {
          "id": "62",
          "label": "Drawing & Painting > Digital Illustration > Illustration Brushes > Blender",
        },
        {
          "id": "60",
          "label": "Drawing & Painting > Digital Illustration > Illustration Brushes > Photoshop",
        },
        {
          "id": "61",
          "label": "Drawing & Painting > Digital Illustration > Illustration Brushes > Procreate",
        },
        {
          "id": "58",
          "label": "Drawing & Painting > Digital Illustration > Illustration Kits",
        },
        {
          "id": "57",
          "label": "Drawing & Painting > Digital Illustration > Illustration Textures & Patterns",
        },
        {
          "id": "63",
          "label": "Drawing & Painting > Traditional Art",
        },
        {
          "id": "177",
          "label": "Education",
        },
        {
          "id": "178",
          "label": "Education > Classroom",
        },
        {
          "id": "184",
          "label": "Education > English",
        },
        {
          "id": "185",
          "label": "Education > History",
        },
        {
          "id": "186",
          "label": "Education > Math",
        },
        {
          "id": "187",
          "label": "Education > Science",
        },
        {
          "id": "188",
          "label": "Education > Science > Medicine",
        },
        {
          "id": "180",
          "label": "Education > Social Studies",
        },
        {
          "id": "181",
          "label": "Education > Social Studies > History",
        },
        {
          "id": "183",
          "label": "Education > Social Studies > Law",
        },
        {
          "id": "182",
          "label": "Education > Social Studies > Politics",
        },
        {
          "id": "189",
          "label": "Education > Specialties",
        },
        {
          "id": "179",
          "label": "Education > Test Prep",
        },
        {
          "id": "191",
          "label": "Fiction Books",
        },
        {
          "id": "192",
          "label": "Fiction Books > Children's Books",
        },
        {
          "id": "194",
          "label": "Fiction Books > Fantasy",
        },
        {
          "id": "197",
          "label": "Fiction Books > Mystery",
        },
        {
          "id": "196",
          "label": "Fiction Books > Romance",
        },
        {
          "id": "195",
          "label": "Fiction Books > Science Fiction",
        },
        {
          "id": "193",
          "label": "Fiction Books > Teen & Young Adult",
        },
        {
          "id": "232",
          "label": "Films",
        },
        {
          "id": "258",
          "label": "Films > Comedy",
        },
        {
          "id": "260",
          "label": "Films > Comedy > Sketch",
        },
        {
          "id": "259",
          "label": "Films > Comedy > Standup",
        },
        {
          "id": "255",
          "label": "Films > Dance",
        },
        {
          "id": "234",
          "label": "Films > Documentary",
        },
        {
          "id": "235",
          "label": "Films > Movie",
        },
        {
          "id": "236",
          "label": "Films > Movie > Action & Adventure",
        },
        {
          "id": "237",
          "label": "Films > Movie > Animation",
        },
        {
          "id": "238",
          "label": "Films > Movie > Anime",
        },
        {
          "id": "239",
          "label": "Films > Movie > Black Voices",
        },
        {
          "id": "240",
          "label": "Films > Movie > Classics",
        },
        {
          "id": "242",
          "label": "Films > Movie > Drama",
        },
        {
          "id": "243",
          "label": "Films > Movie > Faith & Spirituality",
        },
        {
          "id": "244",
          "label": "Films > Movie > Foreign Language & International",
        },
        {
          "id": "245",
          "label": "Films > Movie > Horror",
        },
        {
          "id": "246",
          "label": "Films > Movie > Indian Cinema & Bollywood",
        },
        {
          "id": "247",
          "label": "Films > Movie > Indie & Art House",
        },
        {
          "id": "248",
          "label": "Films > Movie > Kids & Family",
        },
        {
          "id": "249",
          "label": "Films > Movie > LGBTQ",
        },
        {
          "id": "250",
          "label": "Films > Movie > Music Videos & Concerts",
        },
        {
          "id": "251",
          "label": "Films > Movie > Romance",
        },
        {
          "id": "252",
          "label": "Films > Movie > Science Fiction",
        },
        {
          "id": "253",
          "label": "Films > Movie > Western",
        },
        {
          "id": "256",
          "label": "Films > Performance",
        },
        {
          "id": "233",
          "label": "Films > Short Film",
        },
        {
          "id": "261",
          "label": "Films > Sports Events",
        },
        {
          "id": "257",
          "label": "Films > Theater",
        },
        {
          "id": "150",
          "label": "Films > Video Production & Editing",
        },
        {
          "id": "157",
          "label": "Films > Video Production & Editing > Courses",
        },
        {
          "id": "151",
          "label": "Films > Video Production & Editing > LUTs",
        },
        {
          "id": "156",
          "label": "Films > Video Production & Editing > Stock",
        },
        {
          "id": "152",
          "label": "Films > Video Production & Editing > Video Assets & Loops",
        },
        {
          "id": "154",
          "label": "Films > Video Production & Editing > Video Assets & Loops > After Effects",
        },
        {
          "id": "155",
          "label": "Films > Video Production & Editing > Video Assets & Loops > Cinema 4D",
        },
        {
          "id": "153",
          "label": "Films > Video Production & Editing > Video Assets & Loops > Premiere Pro",
        },
        {
          "id": "149",
          "label": "Films > Videography",
        },
        {
          "id": "120",
          "label": "Fitness & Health",
        },
        {
          "id": "122",
          "label": "Fitness & Health > Exercise & Workout",
        },
        {
          "id": "123",
          "label": "Fitness & Health > Running",
        },
        {
          "id": "121",
          "label": "Fitness & Health > Sports",
        },
        {
          "id": "124",
          "label": "Fitness & Health > Weight Loss & Dieting",
        },
        {
          "id": "125",
          "label": "Fitness & Health > Yoga",
        },
        {
          "id": "262",
          "label": "Gaming",
        },
        {
          "id": "264",
          "label": "Gaming > Gambling",
        },
        {
          "id": "263",
          "label": "Gaming > Streaming",
        },
        {
          "id": "126",
          "label": "Music & Sound Design",
        },
        {
          "id": "131",
          "label": "Music & Sound Design > Dance & Theater",
        },
        {
          "id": "132",
          "label": "Music & Sound Design > Dance & Theater > Dance",
        },
        {
          "id": "133",
          "label": "Music & Sound Design > Dance & Theater > Theater",
        },
        {
          "id": "127",
          "label": "Music & Sound Design > Instruments",
        },
        {
          "id": "128",
          "label": "Music & Sound Design > Instruments > Guitar",
        },
        {
          "id": "129",
          "label": "Music & Sound Design > Instruments > Piano",
        },
        {
          "id": "134",
          "label": "Music & Sound Design > Sound Design",
        },
        {
          "id": "135",
          "label": "Music & Sound Design > Sound Design > Courses",
        },
        {
          "id": "138",
          "label": "Music & Sound Design > Sound Design > Plugins",
        },
        {
          "id": "139",
          "label": "Music & Sound Design > Sound Design > Plugins > Ableton Live",
        },
        {
          "id": "140",
          "label": "Music & Sound Design > Sound Design > Plugins > FL Studio",
        },
        {
          "id": "141",
          "label": "Music & Sound Design > Sound Design > Plugins > Logic Pro",
        },
        {
          "id": "136",
          "label": "Music & Sound Design > Sound Design > Samples",
        },
        {
          "id": "137",
          "label": "Music & Sound Design > Sound Design > Sheet Music",
        },
        {
          "id": "130",
          "label": "Music & Sound Design > Vocal",
        },
        {
          "id": "266",
          "label": "Other",
        },
        {
          "id": "142",
          "label": "Photography",
        },
        {
          "id": "147",
          "label": "Photography > Cosplay",
        },
        {
          "id": "146",
          "label": "Photography > Photo Courses",
        },
        {
          "id": "143",
          "label": "Photography > Photo Presets & Actions",
        },
        {
          "id": "144",
          "label": "Photography > Reference Photos",
        },
        {
          "id": "145",
          "label": "Photography > Stock Photos",
        },
        {
          "id": "205",
          "label": "Recorded Music",
        },
        {
          "id": "206",
          "label": "Recorded Music > Albums",
        },
        {
          "id": "207",
          "label": "Recorded Music > Singles",
        },
        {
          "id": "208",
          "label": "Recorded Music > Singles > Alternative & Indie",
        },
        {
          "id": "210",
          "label": "Recorded Music > Singles > Blues",
        },
        {
          "id": "211",
          "label": "Recorded Music > Singles > Broadway & Vocalists",
        },
        {
          "id": "212",
          "label": "Recorded Music > Singles > Children's Music",
        },
        {
          "id": "213",
          "label": "Recorded Music > Singles > Christian",
        },
        {
          "id": "215",
          "label": "Recorded Music > Singles > Classic Rock",
        },
        {
          "id": "214",
          "label": "Recorded Music > Singles > Classical",
        },
        {
          "id": "216",
          "label": "Recorded Music > Singles > Comedy & Miscellaneous",
        },
        {
          "id": "217",
          "label": "Recorded Music > Singles > Country",
        },
        {
          "id": "218",
          "label": "Recorded Music > Singles > Dance & Electronic",
        },
        {
          "id": "219",
          "label": "Recorded Music > Singles > Folk",
        },
        {
          "id": "220",
          "label": "Recorded Music > Singles > Gospel",
        },
        {
          "id": "221",
          "label": "Recorded Music > Singles > Hard Rock & Metal",
        },
        {
          "id": "222",
          "label": "Recorded Music > Singles > Holiday Music",
        },
        {
          "id": "223",
          "label": "Recorded Music > Singles > Jazz",
        },
        {
          "id": "224",
          "label": "Recorded Music > Singles > Latin Music",
        },
        {
          "id": "225",
          "label": "Recorded Music > Singles > New Age",
        },
        {
          "id": "226",
          "label": "Recorded Music > Singles > Opera & Vocal",
        },
        {
          "id": "227",
          "label": "Recorded Music > Singles > Pop",
        },
        {
          "id": "228",
          "label": "Recorded Music > Singles > R&B",
        },
        {
          "id": "229",
          "label": "Recorded Music > Singles > Rap & Hip-Hop",
        },
        {
          "id": "209",
          "label": "Recorded Music > Singles > Rock",
        },
        {
          "id": "230",
          "label": "Recorded Music > Singles > Soundtracks",
        },
        {
          "id": "231",
          "label": "Recorded Music > Singles > World Music",
        },
        {
          "id": "82",
          "label": "Self Improvement",
        },
        {
          "id": "95",
          "label": "Self Improvement > Cooking",
        },
        {
          "id": "96",
          "label": "Self Improvement > Cooking > Nutrition",
        },
        {
          "id": "98",
          "label": "Self Improvement > Cooking > Recipes",
        },
        {
          "id": "97",
          "label": "Self Improvement > Cooking > Vegan",
        },
        {
          "id": "99",
          "label": "Self Improvement > Crafts & DYI",
        },
        {
          "id": "104",
          "label": "Self Improvement > Crafts & DYI > 3D Printing",
        },
        {
          "id": "112",
          "label": "Self Improvement > Crafts & DYI > Automotive",
        },
        {
          "id": "105",
          "label": "Self Improvement > Crafts & DYI > Board Games",
        },
        {
          "id": "101",
          "label": "Self Improvement > Crafts & DYI > Crafts for Children",
        },
        {
          "id": "102",
          "label": "Self Improvement > Crafts & DYI > Jewelry",
        },
        {
          "id": "103",
          "label": "Self Improvement > Crafts & DYI > Lego",
        },
        {
          "id": "100",
          "label": "Self Improvement > Crafts & DYI > Papercrafts",
        },
        {
          "id": "106",
          "label": "Self Improvement > Crafts & DYI > Sewing",
        },
        {
          "id": "107",
          "label": "Self Improvement > Crafts & DYI > Sewing > Courses",
        },
        {
          "id": "108",
          "label": "Self Improvement > Crafts & DYI > Sewing > Kits",
        },
        {
          "id": "109",
          "label": "Self Improvement > Crafts & DYI > Woodworking",
        },
        {
          "id": "110",
          "label": "Self Improvement > Crafts & DYI > Woodworking > Courses",
        },
        {
          "id": "111",
          "label": "Self Improvement > Crafts & DYI > Woodworking > Kits",
        },
        {
          "id": "86",
          "label": "Self Improvement > Dating & Relationships",
        },
        {
          "id": "116",
          "label": "Self Improvement > Outdoors",
        },
        {
          "id": "119",
          "label": "Self Improvement > Outdoors > Boating & Fishing",
        },
        {
          "id": "118",
          "label": "Self Improvement > Outdoors > Hunting",
        },
        {
          "id": "117",
          "label": "Self Improvement > Outdoors > Trekking",
        },
        {
          "id": "87",
          "label": "Self Improvement > Philosophy",
        },
        {
          "id": "85",
          "label": "Self Improvement > Productivity",
        },
        {
          "id": "84",
          "label": "Self Improvement > Psychology",
        },
        {
          "id": "88",
          "label": "Self Improvement > Spirituality",
        },
        {
          "id": "89",
          "label": "Self Improvement > Spirituality > Astrology",
        },
        {
          "id": "91",
          "label": "Self Improvement > Spirituality > Magic",
        },
        {
          "id": "90",
          "label": "Self Improvement > Spirituality > Meditation",
        },
        {
          "id": "92",
          "label": "Self Improvement > Spirituality > Mysticism",
        },
        {
          "id": "93",
          "label": "Self Improvement > Spirituality > Mysticism > Tarot",
        },
        {
          "id": "94",
          "label": "Self Improvement > Spirituality > Wicca, Witchcraft & Paganism",
        },
        {
          "id": "115",
          "label": "Self Improvement > Travel",
        },
        {
          "id": "114",
          "label": "Self Improvement > Weddings",
        },
        {
          "id": "113",
          "label": "Self Improvement > Wellness",
        },
        {
          "id": "65",
          "label": "Software Development",
        },
        {
          "id": "74",
          "label": "Software Development > App Development",
        },
        {
          "id": "76",
          "label": "Software Development > App Development > React Native",
        },
        {
          "id": "75",
          "label": "Software Development > App Development > Swift",
        },
        {
          "id": "80",
          "label": "Software Development > Hardware",
        },
        {
          "id": "81",
          "label": "Software Development > Hardware > Raspberry Pi",
        },
        {
          "id": "66",
          "label": "Software Development > Programming",
        },
        {
          "id": "67",
          "label": "Software Development > Programming > C#",
        },
        {
          "id": "68",
          "label": "Software Development > Programming > Python",
        },
        {
          "id": "77",
          "label": "Software Development > Software & Plugins",
        },
        {
          "id": "79",
          "label": "Software Development > Software & Plugins > VSCode",
        },
        {
          "id": "78",
          "label": "Software Development > Software & Plugins > Wordpress",
        },
        {
          "id": "69",
          "label": "Software Development > Web Development",
        },
        {
          "id": "70",
          "label": "Software Development > Web Development > AWS",
        },
        {
          "id": "72",
          "label": "Software Development > Web Development > Javascript",
        },
        {
          "id": "73",
          "label": "Software Development > Web Development > Javascript > React JS",
        },
        {
          "id": "71",
          "label": "Software Development > Web Development > Ruby",
        },
        {
          "id": "158",
          "label": "Writing & Publishing",
        },
        {
          "id": "159",
          "label": "Writing & Publishing > Courses",
        },
        {
          "id": "160",
          "label": "Writing & Publishing > Resources",
        },
      ]
    end

    def self.current_seller(view_context, user)
      {
        "id": "9078562000866",
        "email": user.email_address,
        "name": user.name,
        "subdomain": "#{user.name}.gumroad.jacquesdesmarais.dev",
        "avatar_url": view_context.asset_path("gumroad-default-avatar-5.png"),
        "is_buyer": false,
        "time_zone": {
          "name": "America/New_York",
          "offset": -14400,
        },
      }
    end
  end
end
