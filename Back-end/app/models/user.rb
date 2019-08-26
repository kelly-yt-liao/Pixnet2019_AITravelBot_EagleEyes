class User < ApplicationRecord
  validates :phone, uniqueness: true

  has_many :trips

  def token
    JWT.encode(phone, Rails.application.credentials.secret_key_base)
  end

  def create_trip(start, theend, articles)
    begin
      trips.create!(start: start, end: theend, articles: articles) if articles.present?
    rescue
      false
    end
  end

  def current_trip
    trips.last
  end

  def current_attractions
    current_trip.attractions.order(:sort)
  end
end
