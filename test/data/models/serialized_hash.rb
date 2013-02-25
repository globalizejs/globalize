class SerializedHash < ActiveRecord::Base
  serialize :meta, Hash
  translates :meta
end
