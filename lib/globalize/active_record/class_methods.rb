module Globalize
  module ActiveRecord
    module ClassMethods
      delegate :translated_locales, :set_translations_table_name, :to => :translation_class

      def with_locales(*locales)
        all.merge translation_class.with_locales(*locales)
      end

      def with_translations(*locales)
        locales = translated_locales if locales.empty?
        includes(:translations).with_locales(locales).with_required_attributes.references(:translations)
      end

      def with_required_attributes
        required_translated_attributes.inject(all) do |scope, name|
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

          klass.belongs_to :globalized_model, :class_name => self.name, :foreign_key => translation_options[:foreign_key]
          klass
        end
      end

      def translations_table_name
        translation_class.table_name
      end

      def translated_column_name(name)
        "#{translation_class.table_name}.#{name}"
      end

      def respond_to_missing?(method_id, include_private = false)
        supported_on_missing?(method_id) || super
      end

      def supported_on_missing?(method_id)
        return super unless respond_to?(:translated_attribute_names)
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

        scope = all

        translated_attributes.each do |attr|
          scope = scope.with_translated_attribute(attr, arguments[attribute_names.index(attr)])
        end

        untranslated_attributes.each do |unt|
          index = attribute_names.index(unt)
          raise StandarError unless index
          scope = scope.send(:"scoped_by_#{unt}", arguments[index])
        end

        if defined?(::ActiveRecord::DynamicFinderMatch) && match.is_a?(::ActiveRecord::DynamicFinderMatch)
          if match.instantiator? && scope.blank?
            return scope.find_or_instantiator_by_attributes match, attribute_names, *arguments, &block
          end
          match_finder_method = match.finder.to_s
          match_finder_method << "!" if match.bang?
          return scope.send(match_finder_method).tap do |found|
            Array(found).map { |f| f.translations.reload } unless found.nil?
          end
        end
        return scope
      end

      def find_or_instantiator_by_attributes(match, attributes, *args)
        options = args.many? && args.last(2).all?{ |a| a.is_a?(Hash) } ? args.extract_options! : {}
        protected_attributes_for_create, unprotected_attributes_for_create = {}, {}
        args.each_with_index do |arg, i|
          if arg.is_a?(Hash)
            protected_attributes_for_create = args[i].with_indifferent_access
          else
            unprotected_attributes_for_create[attributes[i]] = args[i]
          end
        end

        record = new(protected_attributes_for_create, options) do |r|
          r.assign_attributes(unprotected_attributes_for_create)
        end
        yield(record) if block_given?
        record.send(match.bang? ? :save! : :save) if match.instantiator.eql?(:create)

        record
      end

      private

      # Override the default relation method in order to return a subclass
      # of ActiveRecord::Relation with custom finder methods for translated
      # attributes.
      def relation
        super.extending!(QueryMethods)
      end

      protected

      def translated_attr_accessor(name)
        define_method(:"#{name}=") do |value|
          write_attribute(name, value)
        end
        define_method(name) do |*args|
          Globalize::Interpolation.interpolate(name, self, args)
        end
        alias_method :"#{name}_before_type_cast", name
      end

      def translations_accessor(name)
        define_method(:"#{name}_translations") do
          result = translations.each_with_object(HashWithIndifferentAccess.new) do |translation, result|
            result[translation.locale] = translation.send(name)
          end
          globalize.stash.keys.each_with_object(result) do |locale, result|
            result[locale] = globalize.fetch_stash(locale, name) if globalize.stash_contains?(locale, name)
          end
        end
        define_method(:"#{name}_translations=") do |value|
          value.each do |(locale, value)|
            write_attribute name, value, :locale => locale
          end
        end
      end

    end

  end

end
