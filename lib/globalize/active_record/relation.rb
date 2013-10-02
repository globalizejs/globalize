module Globalize
  module ActiveRecord
    class Relation < ::ActiveRecord::Relation

      class WhereChain < ::ActiveRecord::QueryMethods::WhereChain
        def not(*args)
          if @scope.parse_translated_conditions!(*args)
            @scope.with_translations_in_this_locale.where.not(*args)
          else
            super
          end
        end
      end

      def where(opts = :chain, *rest)
        if opts == :chain
          WhereChain.new(spawn)
        elsif parse_translated_conditions!(opts, *rest)
          with_translations_in_this_locale.where(opts, *rest)
        else
          super
        end
      end

      def exists?(conditions = :none)
        if parse_translated_conditions!(conditions)
          with_translations_in_this_locale.exists?(conditions)
        else
          super
        end
      end

      %w[ first last take ].each do |method_name|
        eval <<-END_RUBY
          def #{method_name}
            super.tap { |f| f && f.translations.reload if includes_translations? }
          end
        END_RUBY
      end

      def with_translations_in_this_locale
        with_translations(Globalize.locale)
      end

      def parse_translated_conditions!(opts, *rest)
        if opts.is_a?(Hash) && (keys = opts.symbolize_keys.keys & translated_attribute_names).present?
          keys.each { |key| opts[translated_column_name(key)] = opts.delete(key) }
        end
      end

      def includes_translations?
        self.includes_values.include?(:translations)
      end
    end
  end
end
