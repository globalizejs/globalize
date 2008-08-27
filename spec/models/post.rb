class Post < ActiveRecord::Base
  translates :subject, :content
end

Factory.define :post do |f|
end
