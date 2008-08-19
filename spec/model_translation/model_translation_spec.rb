require File.dirname(__FILE__) + '/../spec_helper.rb'
require 'active_record'
require 'globalize/active_record/translated'

# Hook up model translation
ActiveRecord::Base.send(:include, Globalize::ActiveRecord::Translated)

require 'spec/helpers/active_record'
require 'factory_girl'
require 'spec/models/post'

  
describe Globalize::ActiveRecord::Translated, 'in the guise of a Post object' do
  include Spec::Matchers::HaveAttribute
  include Spec::Helpers::ActiveRecord  

  before do
    reset_db
  end
  
  it "has post_translations" do
    post = Post.create
    lambda { post.post_translations }.should_not raise_error
  end

  it "returns the value passed to :subject" do
    post = Post.new
    (post.subject = 'foo').should == 'foo'    
  end 

  it "translates subject and content into en-US" do
    post = Post.create :subject => 'foo', :content => 'bar'
    post.subject.should == 'foo' 
    post.content.should == 'bar'
    post.save.should == true 
    post.reload
    post.subject.should == 'foo' 
    post.content.should == 'bar'
  end
  
  it "finds a post" do
    Factory :post_translation   # This creates a Post, too
    Post.first.subject.should == 'foo'
  end

  it "finds a German post" do
    Factory :de_post_translation  # This creates a Post, too
    I18n.locale = 'de-DE'
    Post.first.subject.should == 'fü'    
  end
end
