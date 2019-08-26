class AddStartAndEndToTrips < ActiveRecord::Migration[5.2]
  def change
    add_column :trips, :start, :date
    add_column :trips, :end, :date
  end
end
