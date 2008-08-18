require File.dirname(__FILE__) + '/../spec_helper.rb'
require 'active_record'
require 'model_translation'
require 'spec/models/post'
  
describe ModelTranslation do
  include Spec::Matchers::HaveAttribute
  include Spec::Helpers::ActiveRecord  

  before do
  end
  
  it "has the attributes :locale, :requested_locale" do
  end
end
