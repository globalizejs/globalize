class Post < ActiveRecord::Base
  translates :subject, :content
end

Factory.define :post do |f|
end

# PostTranslation class is created automatically by Globalize
Factory.define :post_translation do |f|
  f.locale  'en-US'
  f.subject 'foo'
  f.content 'bar'
  f.post {|p| p.association :post }
end

Factory.define :de_post_translation, :class => PostTranslation do |f|
  f.locale  'de-DE'
  f.subject 'fü'
  f.content nil
  f.post {|p| p.association :post }
end
