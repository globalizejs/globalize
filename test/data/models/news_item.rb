class NewsItem < ActiveRecord::Base
  self.table_name = :news
  translates :title, :foreign_key => :news_id
end
