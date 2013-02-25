class NewsItem < ActiveRecord::Base
  translates :title, :foreign_key => :news_id
  self.table_name = :news
end
