class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate!, except: [:sign_up, :sign_in]

  def sign_up
    user = User.find_by(phone: params[:phone])

    if user
      head :bad_request
    else
      user = User.create(phone: params[:phone])
      render json: { token: user.token }
    end
  end

  def sign_in
    user = User.find_by(phone: params[:phone])

    if user
      render json: { token: user.token }
    else
      head :bad_request
    end
  end
end
