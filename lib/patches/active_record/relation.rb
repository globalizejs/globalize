module ActiveRecord
  class Relation
    if ::ActiveRecord::VERSION::STRING >= "3.2.1"
      def where_values_hash
        _translations_table_name = klass.respond_to?(:translations_table_name) ? klass.translations_table_name : nil

        equalities = with_default_scope.where_values.grep(Arel::Nodes::Equality).find_all { |node|
          [table_name, _translations_table_name].compact.include? node.left.relation.name
        }

        Hash[equalities.map { |where| [where.left.name, where.right] }].with_indifferent_access
      end
    end
  end
end
