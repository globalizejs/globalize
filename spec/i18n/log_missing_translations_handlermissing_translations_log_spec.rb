require File.dirname(__FILE__) + '/../spec/helper.rb'
require 'globalize/i18n/missing_translations_log_handler'

describe I18n, 'the missing_translations_log_handler module' do
  it "defines I18n.missing_translations_logger accessor" do
    I18n.should respond_to(:missing_translations_logger)
  end

  it "defines I18n.missing_translations_logger= writer" do
    I18n.should respond_to(:missing_translations_logger=)
  end
end

class TestLogger < String
  def warn(msg) self.concat msg; end
end

describe I18n, 'missing_translations_log_handler' do
  before :all do
    @locale, @key, @options = :en, :foo, {}
    @exception = I18n::MissingTranslationData.new(@locale, @key, @options)
    
    @logger = TestLogger.new
    I18n.missing_translations_logger = @logger
  end
  
  def act!
    I18n.send(:missing_translations_log_handler, @exception, @locale, @key, @options)
  end
  
  it "still returns the exception message for MissingTranslationData exceptions" do
    result = act!
    result.should == 'translation missing: en, foo'
  end
  
  it "logs the missing translation to I18n.missing_translations_logger" do
    @logger.should == 'translation missing: en, foo'
  end
end