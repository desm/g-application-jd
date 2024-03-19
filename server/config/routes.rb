Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # used by www to show either "Login | Start Selling" buttons VS "Dashboard" buttons
  get "session_info" => "session_info#index"

  root to: redirect("/dashboard")

  get "login", to: "sessions#new"
  post "login.json", to: "sessions#create", as: :session
  get "logout", to: "sessions#destroy"

  get "signup", to: "signup#new"
  post "signup", to: "signup#create"

  # Dashboard
  get "dashboard", to: "dashboard#index"

  # Products
  post "links" => "links#create"
  get "products" => "products#index"
  get "products/new"
  get "products/:id/edit" => "products#edit" # edit_product_path
end
