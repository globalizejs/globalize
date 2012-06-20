module Globalize
  module ActiveRecord
    module ClassMethods
      delegate :translated_locales, :set_translations_table_name, :to => :translation_class

      def with_locales(*locales)
        scoped.merge(translation_class.with_locales(*locales))
      end

      def with_translations(*locales)
        locales = translated_locales if locales.empty?
        includes(:translations).with_locales(locales).with_required_attributes
      end

      def with_required_attributes
        required_translated_attributes.inject(scoped) do |scope, name|
          scope.where("#{translated_column_name(name)} IS NOT NULL")
        end
      end

      def with_translated_attribute(name, value, locales = nil)
        locales ||= Globalize.fallbacks
        with_translations.where(
          translated_column_name(name)    => value,
          translated_column_name(:locale) => Array(locales).map(&:to_s)
        )
      end

      def translated?(name)
        translated_attribute_names.include?(name.to_sym)
      end

      def required_attributes
        validators.map { |v| v.attributes if v.is_a?(ActiveModel::Validations::PresenceValidator) }.flatten
      end

      def required_translated_attributes
        translated_attribute_names & required_attributes
      end

      def translation_class
        @translation_class ||= begin
          klass = self.const_get(:Translation) rescue nil
          if klass.nil? || klass.class_name != (self.class_name + "Translation")
            klass = self.const_set(:Translation, Class.new(Globalize::ActiveRecord::Translation))
          end

          klass.belongs_to name.underscore.gsub('/', '_')
          klass
        end
      end

      def translations_table_name
        translation_class.table_name
      end

      def translated_column_name(name)
        "#{translation_class.table_name}.#{name}"
      end

      if RUBY_VERSION < '1.9'
        def respond_to?(method_id, *args, &block)
          supported_on_missing?(method_id) || super
        end
      else
        def respond_to_missing?(method_id, include_private = false)
          supported_on_missing?(method_id) || super
        end
      end

      def supported_on_missing?(method_id)
        return super unless RUBY_VERSION < '1.9' || respond_to?(:translated_attribute_names)
        match = defined?(::ActiveRecord::DynamicFinderMatch) && (::ActiveRecord::DynamicFinderMatch.match(method_id) || ::ActiveRecord::DynamicScopeMatch.match(method_id))
        return false if match.nil?

        attribute_names = match.attribute_names.map(&:to_sym)
        translated_attributes = attribute_names & translated_attribute_names
        return false if translated_attributes.empty?

        untranslated_attributes = attribute_names - translated_attributes
        return false if untranslated_attributes.any?{|unt| ! respond_to?(:"scoped_by_#{unt}")}
        return [match, attribute_names, translated_attributes, untranslated_attributes]
      end

      def method_missing(method_id, *arguments, &block)
        match, attribute_names, translated_attributes, untranslated_attributes = supported_on_missing?(method_id)
        return super unless match

        scope = scoped

        translated_attributes.each do |attr|
          scope = scope.with_translated_attribute(attr, arguments[attribute_names.index(attr)])
        end

        untranslated_attributes.each do |unt|
          index = attribute_names.index(unt)
          raise StandarError unless index
          scope = scope.send(:"scoped_by_#{unt}", arguments[index])
        end

        if defined?(::ActiveRecord::DynamicFinderMatch) && match.is_a?(::ActiveRecord::DynamicFinderMatch)
          if match.instantiator? and scope.blank?
            return scope.find_or_instantiator_by_attributes match, attribute_names, *arguments, &block
          end

          return scope.send(match.finder).tap do |found|
            found.is_a?(Array) ? found.map { |f| f.translations.reload } : found.translations.reload unless found.nil?
          end
        end
        return scope
      end

      def find_or_instantiator_by_attributes(match, attributes, *args)
        options = args.size > 1 && args.last(2).all?{ |a| a.is_a?(Hash) } ? args.extract_options! : {}
        protected_attributes_for_create, unprotected_attributes_for_create = {}, {}
        args.each_with_index do |arg, i|
          if arg.is_a?(Hash)
            protected_attributes_for_create = args[i].with_indifferent_access
          else
            unprotected_attributes_for_create[attributes[i]] = args[i]
          end
        end

        record = if ::ActiveRecord::VERSION::STRING < "3.1.0"
          new do |r|
            r.send(:attributes=, protected_attributes_for_create, true) unless protected_attributes_for_create.empty?
            r.send(:attributes=, unprotected_attributes_for_create, false) unless unprotected_attributes_for_create.empty?
          end
        else
          new(protected_attributes_for_create, options) do |r|
            r.assign_attributes(unprotected_attributes_for_create, :without_protection => true)
          end
        end
        yield(record) if block_given?
        record.send(match.bang? ? :save! : :save) if match.instantiator.eql?(:create)

        record
      end

    protected

      def translated_attr_accessor(name)
        define_method(:"#{name}=") do |value|
          write_attribute(name, value)
        end
        define_method(name) do |*args|
          read_attribute(name, {:locale => args.first})
        end
        alias_method :"#{name}_before_type_cast", name
      end

    end

  end

end
