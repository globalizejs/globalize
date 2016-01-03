class SerializedAttr < ActiveRecord::Base
  serialize :meta
  translates :meta
end
