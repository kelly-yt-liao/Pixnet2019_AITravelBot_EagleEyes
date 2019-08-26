class Trip < ApplicationRecord
  attr_accessor :articles

  has_many :attractions
  belongs_to :user

  after_create :after_create

  private

  def after_create
    articles.sample(articles.count).each_with_index do |article_id, index|
      begin
        attractions.create!(article_id: article_id, sort: index + 1)
      rescue
        raise
      end
    end
  end
end
