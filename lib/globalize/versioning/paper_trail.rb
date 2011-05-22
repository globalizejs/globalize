require 'paper_trail'

module Globalize
  module Versioning
    module PaperTrail
      # At present this isn't used but we may use something similar in paper trail
      # shortly, so leaving it around to reference easily.
      #def versioned_columns
        #super + self.class.translated_attribute_names
      #end
    end
  end
end

ActiveRecord::Base.class_eval do
  class << self
    def has_paper_trail_with_globalize(*args)
      has_paper_trail_without_globalize(*args)
      include Globalize::Versioning::PaperTrail
    end
    alias_method_chain :has_paper_trail, :globalize
  end
end

Version.class_eval do

  before_save do |version|
    version.locale = Globalize.locale.to_s
  end

  def self.locale_conditions_to_sql
    "locale = '#{Globalize.locale.to_s}'"
  end

  scope :for_this_locale, lambda{ { :conditions => locale_conditions_to_sql } }

  def sibling_versions_with_locales
    sibling_versions_without_locales.for_this_locale
  end
  alias_method_chain :sibling_versions, :locales
end
