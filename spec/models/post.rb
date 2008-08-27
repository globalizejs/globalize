class Post < ActiveRecord::Base
  translates :subject, :content, :fallbacks => Globalize::Fallbacks.new( 'de' => %w[ en he ] )
end

Factory.define :post do |f|
end
