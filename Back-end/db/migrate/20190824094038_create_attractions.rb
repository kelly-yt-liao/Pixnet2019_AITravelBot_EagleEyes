class CreateAttractions < ActiveRecord::Migration[5.2]
  def change
    create_table :attractions do |t|
      t.integer :trip_id
      t.integer :article_id
      t.integer :sort

      t.index :trip_id
      t.index :article_id
      t.timestamps
    end
  end
end
