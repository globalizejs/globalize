class Post < ActiveRecord::Base
  translates :subject, :content
end

class Blog < ActiveRecord::Base
  has_many :posts, :order => 'id ASC'
end

Factory.define :post do |f|
end
