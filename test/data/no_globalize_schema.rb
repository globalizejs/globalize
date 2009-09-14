# This schema creates tables without columns for the translated fields
ActiveRecord::Schema.define do
  create_table :blogs, :force => true do |t|
    t.string :name
  end

  create_table :posts, :force => true do |t|
    t.references :blog
  end
end

