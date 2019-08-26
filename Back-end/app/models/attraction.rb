class Attraction < ApplicationRecord
  belongs_to :trip
  belongs_to :article, class_name: "PixnetArticle", foreign_key: "article_id"

  delegate :article_id, :site_category, :title, :public_at, :link, :image, :hit, to: :article, allow_nil: true
end
