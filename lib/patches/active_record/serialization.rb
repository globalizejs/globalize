module ActiveRecord
  module AttributeMethods
    module Serialization
      extend ActiveSupport::Concern

      module ClassMethods
        def serialize_with_globalize(attr_name, class_name_or_coder = Object)
          serialize_without_globalize(attr_name, class_name_or_coder)

          coder = if class_name_or_coder == ::JSON
                    Coders::JSON
                  elsif [:load, :dump].all? { |x| class_name_or_coder.respond_to?(x) }
                    class_name_or_coder
                  else
                    Coders::YAMLColumn.new(class_name_or_coder)
                  end

          self.globalize_serialized_attributes[attr_name] = coder
        end
        alias_method_chain :serialize, :globalize
      end
    end
  end
end
