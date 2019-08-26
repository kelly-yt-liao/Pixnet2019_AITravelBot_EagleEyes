require 'net/http'
require 'json'

class PixnetApi
  attr_accessor :uri, :params
  attr_reader :keyword

  def initialize(keyword, limit = 20)
    @keyword = keyword
  end

  def search
    @uri = URI('https://emma.pixnet.cc/blog/articles/search')
    @params = { format: "json", key: keyword, type: "tag", orderby: "public_at_asc", content_filter: "on", per_page: "100" }
    articles = get_api

    if articles.present?
      begin
        articles.each do |article| 
          PixnetArticle.find_or_create_by!(article_id: article["id"], keyword: keyword) do |a|
            a.site_category = article["site_category"]
            a.title = article["title"]
            a.public_at = article["public_at"]
            a.link = article["link"]
            a.image = article["thumb"]
            a.hit =  article["info"]["hit"]
          end
        end
      end
    else
      nil
    end
  end

  private

  def get_api
    uri.query = URI.encode_www_form(params)
    response = Net::HTTP.get(uri)
    articles = response.present? ? JSON.parse(response)["articles"] : nil
  end
end
