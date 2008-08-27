require File.dirname(__FILE__) + '/../spec_helper.rb'
#$:.unshift File.expand_path(File.dirname(__FILE__) + "/../../vendor/rails/activerecord/lib")
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
    I18n.locale = 'en-US'
    reset_db
  end
  
  it "has post_translations" do
    post = Post.create
    lambda { post.globalize_translations }.should_not raise_error
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
  
  it "finds a German post" do
    post = Post.create :subject => 'foo', :content => 'bar'
    I18n.locale = 'de-DE'
    post = Post.first
    post.subject = 'baz'
    post.save
    Post.first.subject.should == 'baz'    
    I18n.locale = 'en-US'
    Post.first.subject.should == 'foo'    
  end
  
  it "saves an English post and loads it correctly" do
    Post.first.should == nil
    post = Post.create :subject => 'foo', :content => 'bar'
    post.save.should == true 
    post = Post.first
    post.subject.should == 'foo' 
    post.content.should == 'bar'    
  end
  
  it "updates an attribute" do
    post = Post.create :subject => 'foo', :content => 'bar'
    post.update_attribute :subject, 'baz'
    Post.first.subject.should == 'baz'    
  end
  
  it "validates presence of :subject" do
    class Post
      validates_presence_of :subject
    end
    
    post = Post.new
    post.save.should == false
    
    post = Post.new :subject => 'foo'
    post.save.should == true
  end
  
  it "returns the value for the correct locale, after locale switching" do
    post = Post.create :subject => 'foo'
    I18n.locale = 'de-DE'
    post.subject = 'bar'
    post.save
    I18n.locale = 'en-US'
    post = Post.first
    post.subject.should == 'foo'
    I18n.locale = 'de-DE'
    post.subject.should == 'bar'   
  end

  it "saves all locales, even after locale switching" do
    post = Post.new :subject => 'foo'
    I18n.locale = 'de-DE'
    post.subject = 'bar'
    I18n.locale = 'he-IL'
    post.subject = 'baz'
    post.save
    I18n.locale = 'en-US'
    post = Post.first
    post.subject.should == 'foo'
    I18n.locale = 'de-DE'
    post.subject.should == 'bar'   
    I18n.locale = 'he-IL'
    post.subject.should == 'baz'   
  end
  
  it "resolves a simple fallback" do
    I18n.locale = 'de-DE'
    post = Post.create :subject => 'foo'
    I18n.locale = 'de'
    post.subject = 'baz'
    post.content = 'bar'
    post.save
    I18n.locale = 'de-DE'
    post.subject.should == 'foo'
    post.content.should == 'bar'    
  end
end
