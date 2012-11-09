require 'active_record/validations/uniqueness.rb'

ActiveRecord::Validations::UniquenessValidator.class_eval do
  def validate_each_with_translations(record, attribute, value)
    klass = record.class
    if klass.translates? && klass.translated?(attribute)
      if methods.include?(:build_relation) || respond_to?(:build_relation)
        finder_class = klass.translation_class
        table = finder_class.arel_table

        relation = build_relation(finder_class, table, attribute, value).and(table[:locale].eq(Globalize.locale))
        relation = relation.and(table[klass.reflect_on_association(:translations).foreign_key].not_eq(record.send(:id))) if record.persisted?

  #      TODO: add scope with translated attributes
        if options[:scope]
          ActiveRecord::Base.logger.warn("WARNING: Globalize3 does not currently support `scope` option on uniqueness validation for translated attributes.")
        end

        if finder_class.unscoped.where(relation).exists?
          record.errors.add(attribute, :taken, options.except(:case_sensitive, :scope).merge(:value => value))
        end
      else
        finder_class = klass.translation_class
        table = finder_class.unscoped

        table_name   = finder_class.quoted_table_name

        if value && klass.serialized_attributes.key?(attribute.to_s)
          value = YAML.dump value
        end

        sql, params  = mount_sql_and_params(finder_class, table_name, attribute, value)

        relation = table.where(sql, *params).where(:locale => Globalize.locale)

        Array.wrap(options[:scope]).each do |scope_item|
          scope_value = record.send(scope_item)
          relation = relation.where(scope_item => scope_value)
        end

        if record.persisted?
          fk = klass.reflect_on_association(:translations).options[:foreign_key]
          relation = relation.where(finder_class.arel_table[fk].not_eq(record.send(:id)))
        end

        if relation.exists?
          record.errors.add(attribute, :taken, options.except(:case_sensitive, :scope).merge(:value => value))
        end
      end
    else
      validate_each_without_translations(record, attribute, value)
    end
  end
  alias_method_chain :validate_each, :translations
end
