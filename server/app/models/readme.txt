rails generate model link \
    is_physical:boolean \
    is_recurring_billing \
    name:string \
    native_type:string \
    price_currency_type:string \
    price_range:'decimal{5,2}' \
    release_date:datetime \
    subscription_duration:string

rails generate model session \
    user:references \
    token:string \
    ip_address:string \
    user_agent:string \
    last_active_at:datetime
