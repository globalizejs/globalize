class Post < ActiveRecord::Base
  translates :subject, :content
end
