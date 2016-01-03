class User < ActiveRecord::Base
  translates :name
  validates_presence_of :name, :email
end
