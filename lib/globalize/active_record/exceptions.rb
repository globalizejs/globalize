module Globalize
  module ActiveRecord
    module Exceptions
      class MigrationError < StandardError; end
  
      class BadFieldName < MigrationError
        def initialize(field)
          super("Missing translated field #{field.inspect}")
        end
      end
  
      class BadFieldType < MigrationError
        def initialize(name, type)
          super("Bad field type for field #{name.inspect} (#{type.inspect}), should be :string or :text")
        end
      end
    end
  end
end