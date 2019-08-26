class AttractionSerializer < ActiveModel::Serializer
  attributes %w(article_id site_category title public_at link image hit)
end
