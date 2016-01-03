class Artwork < ActiveRecord::Base
  translates :title
  accepts_nested_attributes_for :translations
end