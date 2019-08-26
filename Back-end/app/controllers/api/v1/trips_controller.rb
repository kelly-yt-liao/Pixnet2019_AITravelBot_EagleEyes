class Api::V1::TripsController < ApplicationController
  skip_before_action :verify_authenticity_token
  # before_action :authenticate!
  before_action :days, only: [:get_trip]

  def get_trip
    if params[:articles].present? && current_user.create_trip(params[:start], params[:end], params[:articles])
      attractions = current_user.current_attractions
      count = (attractions.count / @days).ceil

      render json: attractions.in_groups_of(count, nil).map { |day| ActiveModelSerializers::SerializableResource.new(day).as_json }
    else
      head :bad_request
    end
  end

  def current_trip
    current_trip = current_user.current_trip
    attractions = current_user.current_attractions
    days = (current_trip.end - current_trip.start + 1).to_f
    count = (attractions.count / days).ceil

    render json: attractions.in_groups_of(count, false).map { |day| ActiveModelSerializers::SerializableResource.new(day).as_json }
  end

  private

  def days
    head :bad_request unless params[:start] || params[:end]

    begin
      @start = params[:start].to_date
      @end = params[:end].to_date
      @days = ((@end - @start) + 1).to_f
      head :bad_request if @days < 1
    rescue
      head :bad_request
    end
  end
end
