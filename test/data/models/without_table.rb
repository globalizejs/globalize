# Don't remove this model.
# Globalize model should be able to load when table is not present.
# This is needed for example in migrations.

class WithoutTable < ActiveRecord::Base
  serialize :meta
  translates :meta
end
