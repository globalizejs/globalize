# Globalize3 [![Build Status](https://travis-ci.org/svenfuchs/globalize3.png?branch=master)](https://travis-ci.org/svenfuchs/globalize3)

Globalize3 is the successor of Globalize for Rails and is targeted at
ActiveRecord version 3.x. It is compatible with and builds on the new
[I18n API in Ruby on Rails](http://guides.rubyonrails.org/i18n.html) and adds
model translations to ActiveRecord.

Globalize3 is much more lightweight and compatible than its predecessor.
Model translations in Globalize3 use default ActiveRecord features and no longer
limit any ActiveRecord functionality.

## Requirements

* ActiveRecord > 3.0.0
* I18n

## Installation

To install Globalize3 with its default setup just use:

gem install globalize3

When using bundler put it in your Gemfile:

```ruby
source 'https://rubygems.org'

gem 'globalize3'
```

## Model translations

Model translations allow you to translate your models' attribute values. E.g.

```ruby
class Post < ActiveRecord::Base
  translates :title, :text
end
```

Allows you to translate the attributes :title and :text per locale:

```ruby
I18n.locale = :en
post.title # => Globalize3 rocks!

I18n.locale = :he
post.title # => גלובאלייז2 שולט!
```

In order to make this work, you'll need to add the appropriate translation tables.
Globalize3 comes with a handy helper method to help you do this.
It's called `create_translation_table!`. Here's an example:

_Note that your migrations can use `create_translation_table!` and `drop_translation_table!`
only inside the `up` and `down` instance methods, respectively. You cannot use `create_translation_table!`
and `drop_translation_table!` inside the `change` instance method in Rails >= 3.1.0._

### Rails 3.0

```ruby
class CreatePosts < ActiveRecord::Migration
  def self.up
    create_table :posts do |t|
      t.timestamps
    end
    Post.create_translation_table! :title => :string, :text => :text
  end
  def self.down
    drop_table :posts
    Post.drop_translation_table!
  end
end
```

### Rails >= 3.1.0

***Do not use the `change` method, use `up` and `down`!***

```ruby
class CreatePosts < ActiveRecord::Migration
  def up
    create_table :posts do |t|
      t.timestamps
    end
    Post.create_translation_table! :title => :string, :text => :text
  end
  def down
    drop_table :posts
    Post.drop_translation_table!
  end
end
```

Also, you can pass options for specific columns. Here’s an example:

```ruby
class CreatePosts < ActiveRecord::Migration
  def up
    create_table :posts do |t|
      t.timestamps
    end
    Post.create_translation_table! :title => :string,
      :text => {:type => :text, :null => false, :default => 'abc'}
  end
  def down
    drop_table :posts
    Post.drop_translation_table!
  end
end
```

Note that the ActiveRecord model `Post` must already exist and have a `translates`
directive listing the translated fields.

## Migrating existing data to and from the translated version

As well as creating a translation table, you can also use `create_translation_table!`
to migrate across any existing data to the default locale. This can also operate
in reverse to restore any translations from the default locale back to the model
when you don't want to use a translation table anymore using `drop_translation_table!`

This feature makes use of `untranslated_attributes` which allows access to the
model's attributes as they were before the translation was applied. Here's an
example (which assumes you already have a model called `Post` and its table
exists):

```ruby
class TranslatePosts < ActiveRecord::Migration
  def self.up
    Post.create_translation_table!({
      :title => :string,
      :text => :text
    }, {
      :migrate_data => true
    })
  end

  def self.down
    Post.drop_translation_table! :migrate_data => true
  end
end
```

## Versioning with Globalize3

Globalize3 nicely integrates with
[paper_trail](https://github.com/airblade/paper_trail). To add versioning
support to your model, you'll want to add the `:versioning => true`
option to your call to <code>translates</code>.  An example from our test suite:

```ruby
translates :title, :content, :published, :published_at, :versioning => true
```

You will also need to have already generated the versions table that paper_trail
expects.  See the paper_trail README for more details.

If you are adding globalize3 to any previously versioned models, please note
that you will need to add a new `locale` column to your versioning table.

Also, please see the tests in `test/globalize3/versioning_test.rb` for some
current gotchas.

## I18n fallbacks for empty translations

It is possible to enable fallbacks for empty translations. It will depend on the
configuration setting you have set for I18n translations in your Rails config.

You can enable them by adding the next line to `config/application.rb` (or only
`config/environments/production.rb` if you only want them in production)

```ruby
config.i18n.fallbacks = true
```

By default, globalize3 will only use fallbacks when your translation model does
not exist or the translation value for the item you've requested is `nil`.
However it is possible to also use fallbacks for `blank` translations by adding
`:fallbacks_for_empty_translations => true` to the `translates` method.

```ruby
class Post < ActiveRecord::Base
  translates :title, :name
end

puts post.translations.inspect
# => [#<Post::Translation id: 1, post_id: 1, locale: "en", title: "Globalize3 rocks!", name: "Globalize3">,
      #<Post::Translation id: 2, post_id: 1, locale: "nl", title: '', name: nil>]

I18n.locale = :en
post.title # => 'Globalize3 rocks!'
post.name  # => 'Globalize3'

I18n.locale = :nl
post.title # => ''
post.name  # => 'Globalize3'
```

```ruby
class Post < ActiveRecord::Base
  translates :title, :name, :fallbacks_for_empty_translations => true
end

puts post.translations.inspect
# => [#<Post::Translation id: 1, post_id: 1, locale: "en", title: "Globalize3 rocks!", name: "Globalize3">,
      #<Post::Translation id: 2, post_id: 1, locale: "nl", title: '', name: nil>]

I18n.locale = :en
post.title # => 'Globalize3 rocks!'
post.name  # => 'Globalize3'

I18n.locale = :nl
post.title # => 'Globalize3 rocks!'
post.name  # => 'Globalize3'
```

## Fallback locales to each other

It is possible to setup locales to fallback to each other.

```ruby
class Post < ActiveRecord::Base
  translates :title, :name
end

Globalize.fallbacks = {:en => [:en, :pl], :pl => [:pl, :en]}

I18n.locale = :en
en_post = Post.create(:title => 'en_title')

I18n.locale = :pl
pl_post = Post.create(:title => 'pl_title')
en_post.title # => 'en_title'

I18n.locale = :en
en_post.title # => 'en_title'
pl_post.title # => 'pl_title'
```


## Scoping objects by those with translations

To only return objects that have a translation for the given locale we can use
the `with_translations` scope. This will only return records that have a
translations for the passed in locale.

```ruby
Post.with_translations('en')
# => [
  #<Post::Translation id: 1, post_id: 1, locale: "en", title: "Globalize3 rocks!", name: "Globalize3">,
  #<Post::Translation id: 2, post_id: 1, locale: "nl", title: '', name: nil>
]

Post.with_translations(I18n.locale)
# => [
  #<Post::Translation id: 1, post_id: 1, locale: "en", title: "Globalize3 rocks!", name: "Globalize3">,
  #<Post::Translation id: 2, post_id: 1, locale: "nl", title: '', name: nil>
]

Post.with_translations('de')
# => []
```

## Changes since Globalize2

* `translation_table_name` was renamed to `translations_table_name`
* `available_locales` has been removed. please use `translated_locales`

## Migration from Globalize for Rails (version 1)

See this script by Tomasz Stachewicz: http://gist.github.com/120867

## Alternative Solutions

* [Veger's fork](http://github.com/veger/globalize2) - uses default AR schema for the default locale, delegates to the translations table for other locales only
* [TranslatableColumns](http://github.com/iain/translatable_columns) - have multiple languages of the same attribute in a model (Iain Hecker)
* [Traco](https://github.com/barsoom/traco) - A newer take on using multiple columns in the same model (Barsoom)
* [localized_record](http://github.com/glennpow/localized_record) - allows records to have localized attributes without any modifications to the database (Glenn Powell)
* [model_translations](http://github.com/janne/model_translations) - Minimal implementation of Globalize2 style model translations (Jan Andersson)

## Related solutions

* [globalize2_versioning](http://github.com/joshmh/globalize2_versioning) - acts_as_versioned style versioning for globalize2 (Joshua Harvey)
* [i18n_multi_locales_validations](http://github.com/ZenCocoon/i18n_multi_locales_validations) - multi-locales attributes validations to validates attributes from globalize2 translations models (Sébastien Grosjean)
* [globalize2 Demo App](http://github.com/svenfuchs/globalize2-demo) - demo application for globalize2 (Sven Fuchs)
* [migrate_from_globalize1](http://gist.github.com/120867) - migrate model translations from Globalize1 to globalize2 (Tomasz Stachewicz)
* [easy_globalize2_accessors](http://github.com/astropanic/easy_globalize2_accessors) - easily access (read and write) globalize2-translated fields (astropanic, Tomasz Stachewicz)
* [globalize2-easy-translate](http://github.com/bsamman/globalize2-easy-translate) - adds methods to easily access or set translated attributes to your model (bsamman)
* [batch_translations](http://github.com/rilla/batch_translations) - allow saving multiple globalize2 translations in the same request (Jose Alvarez Rilla)
