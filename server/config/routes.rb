Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  root "signup#new" # todo: change to root "login#new"

  # todo: add login controller

  get "signup", to: "signup#new"
  post "signup", to: "signup#create"

  # used by www to show either "Login | Start Selling" buttons VS "Dashboard" buttons
  get "session_info" => "session_info#index"

  # Dashboard
  get "dashboard", to: "dashboard#index"

  # Products
  post "links" => "links#create"
  get "products" => "products#index"
  get "products/new"
  get "products/:id/edit" => "products#edit" # edit_product_path

  # get "/articles", to: "articles#index"
  # get "/articles/:id", to: "articles#show"
  resources :articles do
    resources :comments
  end
end
