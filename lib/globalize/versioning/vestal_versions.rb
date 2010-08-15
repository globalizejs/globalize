require 'vestal_versions'

module Globalize
  module Versioning
    module VestalVersions
      def versioned_columns
        super + self.class.translated_attribute_names
      end
    end
  end
end

ActiveRecord::Base.class_eval do
  class << self
    def versioned_with_globalize(*args)
      versioned_without_globalize(*args)
      include Globalize::Versioning::VestalVersions
    end
    alias_method_chain :versioned, :globalize
  end
end

VestalVersions::Version.class_eval do
  before_save do |version|
    version.locale = Globalize.locale.to_s
  end

  class Condition
    def to_sql
      "locale = '#{Globalize.locale.to_s}'"
    end
  end

  default_scope(:conditions => Condition.new)
end
