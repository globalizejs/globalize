require 'active_record/validations/uniqueness.rb'

ActiveRecord::Validations::UniquenessValidator.class_eval do
  def validate_each_with_translations(record, attribute, value)
    klass = record.class
    if klass.translates? && klass.translated?(attribute)
      finder_class = klass.translation_class
      table = finder_class.arel_table

      relation = build_relation(finder_class, table, attribute, value).and(table[:locale].eq(Globalize.locale))
      relation = relation.and(table[klass.reflect_on_association(:translations).foreign_key].not_eq(record.send(:id))) if record.persisted?

      translated_scopes = Array(options[:scope]) & klass.translated_attribute_names
      untranslated_scopes = Array(options[:scope]) - translated_scopes

      untranslated_scopes.each do |scope_item|
        scope_value = record.send(scope_item)
        reflection = klass.reflect_on_association(scope_item)
        if reflection
          scope_value = record.send(reflection.foreign_key)
          scope_item = reflection.foreign_key
        end
        relation = relation.and(find_finder_class_for(record).arel_table[scope_item].eq(scope_value))
      end

      translated_scopes.each do |scope_item|
        scope_value = record.send(scope_item)
        relation = relation.and(table[scope_item].eq(scope_value))
      end

      if klass.unscoped.with_translations.where(relation).exists?
        record.errors.add(attribute, :taken, options.except(:case_sensitive, :scope).merge(:value => value))
      end
    else
      validate_each_without_translations(record, attribute, value)
    end
  end
  alias_method_chain :validate_each, :translations
end
