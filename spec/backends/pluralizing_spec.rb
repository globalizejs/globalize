require File.dirname(__FILE__) + '/../spec_helper.rb'
require 'i18n/backend/pluralizing'

describe I18n::Backend::Pluralizing do
  before :each do 
    @backend = I18n::Backend::Pluralizing.new
    @cz_pluralizer = lambda{|c| c == 1 ? :one : (2..4).include?(c) ? :few : :other }
  end
  
  it "#pluralizer returns the pluralizer for a given locale if defined" do
    @backend.pluralizer(:en).should be_instance_of(Proc)
  end
  
  it "#pluralizer returns the default pluralizer if no pluralizer is defined for the given locale" do
    @backend.pluralizer(:de).should == @backend.pluralizer(:en)
  end
  
  it "#add_pluralizer allows to store a pluralizer per locale" do
    lambda{ @backend.add_pluralizer(:cz, @cz_pluralizer) }.should_not raise_error
    @backend.pluralizer(:cz).should == @cz_pluralizer
  end
  
  describe "#pluralize" do
    before :each do
      @backend.store_translations :en, :foo => {:one => 'one en foo', :other => 'many en foos'}
      @backend.store_translations :cz, :foo => {:one => 'one cz foo', :few => 'few cz foos', :other => 'many cz foos'}
    end
    
    describe "pluralizes according to :en pluralization rules when given the locale :en" do
      it "looks up the :one translation when count is 1" do
        @backend.translate(:en, :foo, :count => 1).should == 'one en foo'
      end
      it "looks up the :other translation when count is 2" do
        @backend.translate(:en, :foo, :count => 2).should == 'many en foos'
      end
    end
    
    describe "pluralizes according to :cz pluralization rules when given the locale :cz" do
      before :each do
        @backend.add_pluralizer(:cz, @cz_pluralizer)
      end
      
      it "looks up the :one translation when count is 1" do
        @backend.translate(:cz, :foo, :count => 1).should == 'one cz foo'
      end
      it "looks up the :few translation when count is 2" do
        @backend.translate(:cz, :foo, :count => 2).should == 'few cz foos'
      end
      it "looks up the :other translation when count is 5" do
        @backend.translate(:cz, :foo, :count => 5).should == 'many cz foos'
      end
    end
  end
end