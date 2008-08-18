class Post < ActiveRecord::Base
  translates :subject, :content
end

Factory.define :raw_post, :class => Post do |f|
end

# PostTranslation class is created automatically by Globalize
Factory.define :post, :class => PostTranslation do |f|
  f.subject 'foo'
  f.content 'bar'
  f.post {|p| p.association :raw_post }
end
