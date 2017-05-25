module ActiveRecord
  module Persistence
    # Updates the associated record with values matching those of the instance attributes.
    # Returns the number of affected rows.
    def _update_record(attribute_names = self.attribute_names)
      attribute_names_without_translated = attribute_names.select{ |k| not respond_to?('translated?') or not translated?(k) }
      attributes_values = arel_attributes_with_values_for_update(attribute_names_without_translated)
      if attributes_values.empty?
        0
      else
        self.class.unscoped._update_record attributes_values, id, id_was
      end
    end

    def _create_record(attribute_names = self.attribute_names)
      attribute_names_without_translated = attribute_names.select{ |k| not respond_to?('translated?') or not translated?(k) }
      attributes_values = arel_attributes_with_values_for_create(attribute_names_without_translated)

      new_id = self.class.unscoped.insert attributes_values
      self.id ||= new_id if self.class.primary_key

      @new_record = false
      id
    end
  end
end