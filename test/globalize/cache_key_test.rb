# encoding: utf-8

require File.expand_path('../../test_helper', __FILE__)

class CacheKeyTest < MiniTest::Spec

  describe '#cache_key' do
    it "changes when the translation is updated" do
      product = with_locale(:en) { Product.create(:name => 'first') }
      original_cache_key = product.cache_key

      product_translation = product.translation_for(:en)
      product_translation.name = "second"
      product_translation.save!

      refute_equal original_cache_key, product.cache_key
    end
  end
end
