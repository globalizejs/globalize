module Spec
  module Matchers
    module HaveAttribute
      def have_attr_accessor(name)
        return simple_matcher("model to have an attribute #{name}") do |model|
          model.respond_to?(name) and model.respond_to?("#{name}=")
        end
      end
      
      def have_attr_accessors(*names)
        return simple_matcher("model to have an attributes #{names.inspect}") do |model|
          names.inject(true) do |result, name| 
            result && model.respond_to?(name) && model.respond_to?("#{name}=")
          end
        end
      end
    end
  end
end
