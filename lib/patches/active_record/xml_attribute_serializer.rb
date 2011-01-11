require 'active_record/serializers/xml_serializer'

ActiveRecord::XmlSerializer::Attribute.class_eval do
  def compute_type_with_translations
    klass = @serializable.class
    if klass.translates? && klass.translated_attribute_names.include?(name.to_sym)
      :string
    else
      compute_type_without_translations
    end
  end
  alias_method_chain :compute_type, :translations
end
