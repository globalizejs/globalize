# encoding: utf-8

require File.expand_path('../../test_helper', __FILE__)

class AttributesTest < MiniTest::Spec
  it "set_translations sets multiple translations at once" do
    post = Post.create(:title => 'title', :content => 'content', :locale => :en)
    post.update_attributes(:title => 'Titel', :content => 'Inhalt', :locale => :de)

    post.set_translations(
      :en => { :title => 'updated title', :content => 'updated content' },
      :de => { :title => 'geänderter Titel', :content => 'geänderter Inhalt' }
    )
    post.reload

    assert_translated post, :en, [:title, :content], ['updated title', 'updated content']
    assert_translated post, :de, [:title, :content], ['geänderter Titel', 'geänderter Inhalt']
  end

  it "set_translations does not touch existing translations for other locales" do
    post = Post.create(:title => 'title', :content => 'content', :locale => :en)
    post.update_attributes(:title => 'Titel', :content => 'Inhalt', :locale => :de)

    post.set_translations(:en => { :title => 'updated title', :content => 'updated content' })
    post.reload

    assert_translated post, :en, [:title, :content], ['updated title', 'updated content']
    assert_translated post, :de, [:title, :content], ['Titel', 'Inhalt']
  end
  it "set translations overrides current translations for unsaved entries" do
    post = Post.new(:title => 'title', :content => 'content', :locale => :en)
    post.set_translations(
      :en => {:title => "updated title"}
    )
    assert_translated post, :en, [:title], ['updated title']
  end
  it "set translations overrides current translations for saved entries" do
    post = Post.create(:title => 'title', :content => 'content', :locale => :en)
    post.set_translations(
      :en => {:title => "updated title"}
    )
    assert_translated post, :en, [:title], ['updated title']
  end
  it "set_translations does not touch existing translations for other attributes" do
    post = Post.create(:title => 'title', :content => 'content', :locale => :en)
    post.update_attributes(:title => 'Titel', :content => 'Inhalt', :locale => :de)

    post.set_translations(
      :en => { :title => "updated title" },
      :de => { :content => "geänderter Inhalt" }
    )
    post.reload

    assert_translated post, :en, [:title, :content], ['updated title', 'content']
    assert_translated post, :de, [:title, :content], ['Titel', 'geänderter Inhalt']
  end

  it "set_translations raises an ::NoMethodError on unknown attributes" do
    post = Post.create(:title => 'title', :content => 'content', :locale => :en)
    post.update_attributes(:title => 'Titel', :content => 'Inhalt', :locale => :de)

    assert_raises(NoMethodError, 'unknown attribute: does_not_exist') do
      post.set_translations(:de => { :does_not_exist => 'should raise' })
    end
  end
end
