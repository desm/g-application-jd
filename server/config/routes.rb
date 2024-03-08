Rails.application.routes.draw do
  get "products" => "products#index"
  get "products/new"
  post "links" => "links#create"
  root "articles#index"

  get "hello_world", to: "hello_world#index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  get "signup", to: "users#new"
  post "signup", to: "users#create"

  resources :users

  get "dashboard", to: "dashboard#index"

  # get "/articles", to: "articles#index"
  # get "/articles/:id", to: "articles#show"
  resources :articles do
    resources :comments
  end
end
