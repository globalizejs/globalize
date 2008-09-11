class Post < ActiveRecord::Base
  translates :subject, :content, :fallbacks => Globalize::Locale::Fallbacks.new( 'de' => %w[ en he ] )
end

class Blog < ActiveRecord::Base
  has_many :posts, :order => 'id ASC'
end

Factory.define :post do |f|
end
