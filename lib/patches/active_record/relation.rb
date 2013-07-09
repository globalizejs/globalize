module ActiveRecord
  class Relation
    if ::ActiveRecord::VERSION::STRING >= "3.2.1"
      def where_values_hash
        _translations_table_name = klass.respond_to?(:translations_table_name) ? klass.translations_table_name : nil

        equalities = with_default_scope.where_values.grep(Arel::Nodes::Equality).find_all { |node|
          [table_name, _translations_table_name].compact.include? node.left.relation.name
        }

        binds = Hash[bind_values.find_all(&:first).map { |column, v| [column.name, v] }]

        Hash[equalities.map { |where|
          name = where.left.name
          [name, binds.fetch(name.to_s) { where.right } ]
        }].with_indifferent_access
      end
    end
  end
end
