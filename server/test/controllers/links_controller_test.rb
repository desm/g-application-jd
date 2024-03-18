require "test_helper"

class LinksControllerTest < ActionDispatch::IntegrationTest
  test "creating a link requires user to be signed in" do
    post links_url, params: { "link": DataOfCreateLinkPostRequest::DIGITAL_PRODUCT }
    assert_response :forbidden
  end

  test "should create a new link everytime" do
    sign_in :one
    post links_url, params: { "link": DataOfCreateLinkPostRequest::DIGITAL_PRODUCT },
                    headers: { "Accept" => "application/json" }
    assert_response :ok
    expected_response = { "success" => true, "redirect_to" => "/products/tsxsi/edit" }
    assert_equal expected_response, JSON.parse(@response.body)

    # needs to have created a Link
    # needs to have created a Product
    # a product has a Link

    # GET /products/{permalink}/edit
    # GET /l/{permalink}
  end
end

module DataOfCreateLinkPostRequest
  HEADERS = {
    accept: "application/json, text/html",
    'accept-language': "en-GB,en-US;q=0.9,en;q=0.8",
    'content-type': "application/json",
    'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Brave";v="122"',
    'sec-ch-ua-mobile': "?0",
    'sec-ch-ua-platform': '"Linux"',
    'sec-fetch-dest': "empty",
    'sec-fetch-mode': "cors",
    'sec-fetch-site': "same-origin",
    'sec-gpc': "1",
    'x-csrf-token': "KmEkNtoZcAVFDmFv2Sh6RZpzpyWdTjdHGJkZgpAgdMqo7gCEp1aHngWQJ3Fryyi3di6vmgvVolDoQJpbhohG9w",
  }

  @fetch_options = {
    headers: {
      accept: "application/json, text/html",
      'accept-language': "en-GB,en-US;q=0.9,en;q=0.8",
      'content-type': "application/json",
      'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Brave";v="122"',
      'sec-ch-ua-mobile': "?0",
      'sec-ch-ua-platform': '"Linux"',
      'sec-fetch-dest': "empty",
      'sec-fetch-mode': "cors",
      'sec-fetch-site': "same-origin",
      'sec-gpc': "1",
      'x-csrf-token': "KmEkNtoZcAVFDmFv2Sh6RZpzpyWdTjdHGJkZgpAgdMqo7gCEp1aHngWQJ3Fryyi3di6vmgvVolDoQJpbhohG9w",
    },
    referrer: "https://app.gumroad.com/products/new",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: {
      link: nil, # one of @body_fixtures goes here
    },
    method: "POST",
    mode: "cors",
    credentials: "include",
  }

  @fetch_options_old = {
    headers: {
      accept: "application/json, text/html",
      'accept-language': "en-GB,en-US;q=0.9,en;q=0.8",
      'content-type': "application/json",
      'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Brave";v="122"',
      'sec-ch-ua-mobile': "?0",
      'sec-ch-ua-platform': '"Linux"',
      'sec-fetch-dest': "empty",
      'sec-fetch-mode': "cors",
      'sec-fetch-site': "same-origin",
      'sec-gpc': "1",
      'x-csrf-token': "KmEkNtoZcAVFDmFv2Sh6RZpzpyWdTjdHGJkZgpAgdMqo7gCEp1aHngWQJ3Fryyi3di6vmgvVolDoQJpbhohG9w",
    },
    referrer: "https://app.gumroad.com/products/new",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: {
      link: nil, # one of @body_fixtures goes here
    },
    method: "POST",
    mode: "cors",
    credentials: "include",
  }

  DIGITAL_PRODUCT = {
    is_physical: false,
    is_recurring_billing: false, # is_recurring
    name: "digital product",
    native_type: "digital",
    price_currency_type: "cad", # currency_code
    price_range: "999", # buy_price
    release_at_date: "April 17, 2024",
    release_at_time: "12PM",
    subscription_duration: nil, # recurring_settings, recurrence_values_for_recurring_product
  # "static_recurrence_list": ["monthly", "quarterly", "biannually", "yearly"],
  }

  body_fixtures = {
    digital_product: {
      is_physical: false,
      is_recurring_billing: false,
      name: "digital product",
      native_type: "digital",
      price_currency_type: "cad",
      price_range: "999",
      release_at_date: "April 17, 2024",
      release_at_time: "12PM",
      subscription_duration: nil,
    },
    course_or_tutorial: {
      is_physical: false,
      is_recurring_billing: false,
      name: "course",
      native_type: "course",
      price_currency_type: "cad",
      price_range: "999",
      release_at_date: "April 17, 2024",
      release_at_time: "12PM",
      subscription_duration: nil,
    },
    ebook: {
      is_physical: false,
      is_recurring_billing: false,
      name: "ebook",
      native_type: "ebook",
      price_currency_type: "cad",
      price_range: "999",
      release_at_date: "April 17, 2024",
      release_at_time: "12PM",
      subscription_duration: nil,
    },
    membership_monthly: {
      is_physical: false,
      is_recurring_billing: true,
      name: "membership",
      native_type: "membership",
      price_currency_type: "cad",
      price_range: "1",
      release_at_date: "April 17, 2024",
      release_at_time: "12PM",
      subscription_duration: "monthly",
    },
    membership_quarterly: {
      is_physical: false,
      is_recurring_billing: true,
      name: "membership_3m",
      native_type: "membership",
      price_currency_type: "cad",
      price_range: "2",
      release_at_date: "April 17, 2024",
      release_at_time: "12PM",
      subscription_duration: "quarterly",
    },
    membership_biannually: {
      is_physical: false,
      is_recurring_billing: true,
      name: "membership_6m",
      native_type: "membership",
      price_currency_type: "cad",
      price_range: "3",
      release_at_date: "April 17, 2024",
      release_at_time: "12PM",
      subscription_duration: "biannually",
    },
    membership_yearly: {
      is_physical: false,
      is_recurring_billing: true,
      name: "membership_yearly",
      native_type: "membership",
      price_currency_type: "cad",
      price_range: "4",
      release_at_date: "April 17, 2024",
      release_at_time: "12PM",
      subscription_duration: "yearly",
    },
    physical_good: {
      is_physical: true,
      is_recurring_billing: false,
      name: "physical_good",
      native_type: "physical",
      price_currency_type: "cad",
      price_range: "999",
      release_at_date: "April 17, 2024",
      release_at_time: "12PM",
      subscription_duration: nil,
    },
    bundle: {
      is_physical: false,
      is_recurring_billing: false,
      name: "bundle",
      native_type: "bundle",
      price_currency_type: "cad",
      price_range: "999",
      release_at_date: "April 17, 2024",
      release_at_time: "12PM",
      subscription_duration: nil,
    },
  }
end
