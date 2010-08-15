require 'active_record/attribute_methods/query'

module ActiveRecord
  module AttributeMethods
    module Query
      def query_attribute(attr_name)
        unless value = read_attribute(attr_name)
          false
        else
          column = self.class.columns_hash[attr_name]
          if column.nil?
            
            # TODO submit a rails patch

            # not sure what active_record tests say but i guess this should mean:
            # call to_i and check zero? if the value is a Numeric or starts with
            # a digit, so it can meaningfully be typecasted by to_i

            # if Numeric === value || value !~ /[^0-9]/
            if Numeric === value || value.to_s =~ /^[0-9]/
              !value.to_i.zero?
            else
              return false if ActiveRecord::ConnectionAdapters::Column::FALSE_VALUES.include?(value)
              !value.blank?
            end
          elsif column.number?
            !value.zero?
          else
            !value.blank?
          end
        end
      end
    end
  end
end