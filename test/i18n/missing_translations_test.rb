require File.expand_path('../../test_helper', __FILE__)
require 'i18n/missing_translations_log_handler'

class TestLogger < String
  def warn(msg) self.concat msg; end
end

class LogMissingTranslationsTest < MiniTest::Spec
  def setup
    @locale, @key, @options = :en, :foo, {}
    @exception = I18n::MissingTranslationData.new(@locale, @key, @options)

    @logger = TestLogger.new
    I18n.missing_translations_logger = @logger
    super
  end

  it "defines I18n.missing_translations_logger accessor" do
    assert I18n.respond_to?(:missing_translations_logger)
  end

  it "defines I18n.missing_translations_logger= writer" do
    assert I18n.respond_to?(:missing_translations_logger=)
  end

  it "still returns the exception message for MissingTranslationData exceptions" do
    result = I18n.send(:missing_translations_log_handler, @exception, @locale, @key, @options)
    assert_match /translation missing: en(\W+)foo/, result
  end

  it "logs the missing translation to I18n.missing_translations_logger" do
    I18n.send(:missing_translations_log_handler, @exception, @locale, @key, @options)
    assert_match /translation missing: en(\W+)foo/, @logger
  end
end
