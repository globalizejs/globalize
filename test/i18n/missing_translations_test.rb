require File.expand_path('../../test_helper', __FILE__)
require 'i18n/missing_translations_log_handler'

class TestLogger < String
  def warn(msg) self.concat msg; end
end

class LogMissingTranslationsTest < Test::Unit::TestCase
  def setup
    @locale, @key, @options = :en, :foo, {}
    @exception = I18n::MissingTranslationData.new(@locale, @key, @options)
    
    @logger = TestLogger.new
    I18n.missing_translations_logger = @logger
    super
  end

  test "defines I18n.missing_translations_logger accessor" do
    assert I18n.respond_to?(:missing_translations_logger)
  end

  test "defines I18n.missing_translations_logger= writer" do
    assert I18n.respond_to?(:missing_translations_logger=)
  end

  test "still returns the exception message for MissingTranslationData exceptions" do
    result = I18n.send(:missing_translations_log_handler, @exception, @locale, @key, @options)
    assert_equal 'translation missing: en, foo', result
  end
  
  test "logs the missing translation to I18n.missing_translations_logger" do
    I18n.send(:missing_translations_log_handler, @exception, @locale, @key, @options)
    assert_equal 'translation missing: en, foo', @logger
  end
end
