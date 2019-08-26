class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  attr_accessor :current_user

  protected

  def authenticate!
    render_failed and return unless token?
    @current_user = User.find_by(phone: auth_token)
  rescue JWT::VerificationError, JWT::DecodeError
    render_failed
  end

  private

  def render_failed(messages = ['验证失败'])
    render json: { errors: messages}, status: :unauthorized
  end

  def http_token
    @http_token ||= if request.headers['Authorization'].present?
                      request.headers['Authorization'].split(' ').last
                    end
  end

  def auth_token
    @auth_token ||= JWT.decode(http_token, Rails.application.credentials.secret_key_base)[0]
  end

  def token?
    http_token && auth_token
  end
end
