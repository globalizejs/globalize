class Post < ActiveRecord::Base
  translates :title, :content, :published, :published_at
  validates_presence_of :title
  scope :with_some_title, proc { { :conditions => { :title => 'some_title' } } }
  accepts_nested_attributes_for :translations
  has_many :attachments
  has_many :translated_comments
end
