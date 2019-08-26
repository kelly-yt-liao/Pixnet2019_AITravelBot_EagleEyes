class PixnetArticle < ApplicationRecord
  def self.search(keyword, page, per = 20)
    where(keyword: keyword).order(hit: :desc).page(page).per(per)
  end
end
