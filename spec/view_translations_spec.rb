require File.dirname(__FILE__) + '/spec/helper.rb'
require 'globalize/view_translation'

include Globalize

describe ViewTranslation do
  include Spec::Matchers::HaveAttribute
  
  it "has the attributes :locale, :key, :options, :requested_locale, :plural_key, :original" do
    translation = ViewTranslation.new 'foo'
    translation.should have_attr_accessors(:locale, :key, :options, :requested_locale, :plural_key, :original)
  end
end