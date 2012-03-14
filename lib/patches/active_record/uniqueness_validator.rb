require 'active_record/validations/uniqueness.rb'

ActiveRecord::Validations::UniquenessValidator.class_eval do
  def validate_each_with_translations(record, attribute, value)
    klass = record.class
    if klass.translates? && klass.translated_attribute_names.include?(attribute.to_sym)
      finder_class = klass.translation_class
      table = finder_class.arel_table

      relation = build_relation(finder_class, table, attribute, value).and(table[:locale].eq(Globalize.locale.to_s))
      relation = relation.and(table[:"#{klass.name.downcase}_id"].not_eq(record.send(:id))) if record.persisted?

#      TODO: add scope with translated attributes

      if finder_class.unscoped.where(relation).exists?
        record.errors.add(attribute, :taken, options.except(:case_sensitive, :scope).merge(:value => value))
      end

    else
      validate_each_without_translations(record, attribute, value)
    end
  end
  alias_method_chain :validate_each, :translations
end
