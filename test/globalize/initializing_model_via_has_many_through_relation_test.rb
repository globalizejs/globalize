# encoding: utf-8
require File.expand_path('../../test_helper', __FILE__)

class InitializingModelViaHasManyThroughRelationTest < MiniTest::Spec
  describe 'initializing model via has_many through' do
    it "does not raise error undefined local variable or method `translations_table_name'" do
      Author.new.comments_without_translations.new
    end
  end
end
