require 'digest/sha1'

module Globalize
  module ActiveRecord
    module Migration
      attr_reader :globalize_migrator

      def globalize_migrator
        @globalize_migrator ||= Migrator.new(self)
      end

      delegate :create_translation_table!, :drop_translation_table!,
        :translation_index_name, :to => :globalize_migrator

      class Migrator
        include Globalize::ActiveRecord::Exceptions

        attr_reader :model, :fields
        delegate :translated_attribute_names, :connection, :table_name,
          :table_name_prefix, :translations_table_name, :columns, :to => :model

        def initialize(model)
          @model = model
        end

        def create_translation_table!(fields = {}, options = {})
          @fields = fields
          complete_translated_fields
          validate_translated_fields

          create_translation_table
          move_data_to_translation_table if options[:migrate_data]
          create_translations_index
        end

        def drop_translation_table!(options = {})
          move_data_to_model_table if options[:migrate_data]
          drop_translations_index
          drop_translation_table
        end

        def complete_translated_fields
          translated_attribute_names.each do |name|
            fields[name] = column_type(name) unless fields[name]
          end
        end

        def create_translation_table
          connection.create_table(translations_table_name) do |t|
            t.references table_name.sub(/^#{table_name_prefix}/, '').singularize
            t.string :locale
            fields.each { |name, type| t.column name, type }
            t.timestamps
          end
        end

        def create_translations_index
          connection.add_index(
            translations_table_name,
            "#{table_name.sub(/^#{table_name_prefix}/, "").singularize}_id",
            :name => translation_index_name
          )
        end

        def drop_translation_table
          connection.drop_table(translations_table_name)
        end

        def drop_translations_index
          connection.remove_index(translations_table_name, :name => translation_index_name) rescue nil
        end

        def move_data_to_translation_table
          # TODO
        end

        def move_data_to_model_table
          # TODO
        end

        def validate_translated_fields
          fields.each do |name, type|
            raise BadFieldName.new(name) unless valid_field_name?(name)
            raise BadFieldType.new(name, type) unless valid_field_type?(name, type)
          end
        end

        def column_type(name)
          columns.detect { |c| c.name == name.to_s }.try(:type)
        end

        def valid_field_name?(name)
          translated_attribute_names.include?(name)
        end

        def valid_field_type?(name, type)
          !translated_attribute_names.include?(name) || [:string, :text].include?(type)
        end

        def translation_index_name
          # FIXME what's the max size of an index name?
          index_name = "index_#{translations_table_name}_on_#{table_name.singularize}_id"
          index_name.size < 50 ? index_name : "index_#{Digest::SHA1.hexdigest(index_name)}"
        end
      end
    end
  end
end