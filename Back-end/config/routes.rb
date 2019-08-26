Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users do
        collection do
          post :sign_up
          post :sign_in
        end
      end

      resources :querys, only: [] do
        collection do
          get :search
        end
      end

      resources :trips, only: [] do
        collection do
          post :get_trip
          get :current_trip
        end
      end
    end
  end
end
