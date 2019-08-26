class CreatePixnetArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :pixnet_articles do |t|
      t.integer :article_id
      t.integer :public_at
      t.string :site_category
      t.string :link
      t.string :title
      t.string :image
      t.integer :hit
      t.string :keyword

      t.timestamps
    end
  end
end
