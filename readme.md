![Globalize](http://globalize.github.io/globalize/images/globalize.png)

[![Build Status](https://travis-ci.org/globalize/globalize.svg?branch=master)](https://travis-ci.org/globalize/globalize) [![Code Climate](https://codeclimate.com/github/globalize/globalize.svg)](https://codeclimate.com/github/globalize/globalize)

You can chat with us using Gitter:

[![Gitter chat](https://badges.gitter.im/globalize/globalize.svg)](https://gitter.im/globalize/globalize)

Globalize builds on the [I18n API in Ruby on Rails](http://guides.rubyonrails.org/i18n.html)
to add model translations to ActiveRecord models.

## Requirements

* ActiveRecord >= 4.2.0 (see below for installation with ActiveRecord 3.x)
* I18n

## Installation

To install the ActiveRecord 4.2.x compatible version of Globalize with its default setup, just use:

```ruby
gem install globalize
```

When using bundler put this in your Gemfile:

```ruby
gem 'globalize', '~> 5.0.0'
```

To use the version of globalize for ActiveRecord 4.0 or 4.1, specify:

```ruby
gem 'globalize', '~> 4.0.3'
```

To use the version of globalize for ActiveRecord 3.1 or 3.2, specify:

````ruby
gem 'globalize', '~> 3.1.0'
````

(If you are using ActiveRecord 3.0, use version 3.0: `gem 'globalize', '3.0.4'`.)

The [`3-1-stable` branch](https://github.com/globalize/globalize/tree/3-1-stable) of this repository corresponds to the latest ActiveRecord 3 version of globalize. Note that `globalize3` has been deprecated and you are encouraged to update your Gemfile accordingly.

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
post.title # => Globalize rocks!

I18n.locale = :he
post.title # => גלובאלייז2 שולט!
```

You can also set translations with mass-assignment by specifying the locale:

```ruby
post.attributes = { title: 'גלובאלייז2 שולט!', locale: :he }
```

In order to make this work, you'll need to add the appropriate translation tables.
Globalize comes with a handy helper method to help you do this.
It's called `create_translation_table!`. Here's an example:

Note that your migrations can use `create_translation_table!` and `drop_translation_table!`
only inside the `up` and `down` instance methods, respectively. You cannot use `create_translation_table!`
and `drop_translation_table!` inside the `change` instance method.

### Creating translation tables

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

NOTE: Make sure you drop the translated columns from the parent table after all your data is safely migrated.

## Adding additional fields to the translation table

In order to add a new field to an existing translation table, you can use `add_translation_fields!`:

```ruby
class AddAuthorToPost < ActiveRecord::Migration
  def up
    Post.add_translation_fields! author: :text
  end

  def down
    remove_column :post_translations, :author
  end
end
```

NOTE: Remember to add the new field to the model:

```ruby
translates :title, :author
```
## Gotchas

Because globalize uses the `:locale` key to specify the locale during
mass-assignment, you should avoid having a `locale` attribute on the parent
model.

## Versioning with Globalize

See the [globalize-versioning](https://github.com/globalize/globalize-versioning) gem.

## I18n fallbacks for empty translations

It is possible to enable fallbacks for empty translations. It will depend on the
configuration setting you have set for I18n translations in your Rails config.

You can enable them by adding the next line to `config/application.rb` (or only
`config/environments/production.rb` if you only want them in production)

```ruby
config.i18n.fallbacks = true
```

By default, globalize will only use fallbacks when your translation model does
not exist or the translation value for the item you've requested is `nil`.
However it is possible to also use fallbacks for `blank` translations by adding
`:fallbacks_for_empty_translations => true` to the `translates` method.

```ruby
class Post < ActiveRecord::Base
  translates :title, :name
end

puts post.translations.inspect
# => [#<Post::Translation id: 1, post_id: 1, locale: "en", title: "Globalize rocks!", name: "Globalize">,
      #<Post::Translation id: 2, post_id: 1, locale: "nl", title: '', name: nil>]

I18n.locale = :en
post.title # => 'Globalize rocks!'
post.name  # => 'Globalize'

I18n.locale = :nl
post.title # => ''
post.name  # => 'Globalize'
```

```ruby
class Post < ActiveRecord::Base
  translates :title, :name, :fallbacks_for_empty_translations => true
end

puts post.translations.inspect
# => [#<Post::Translation id: 1, post_id: 1, locale: "en", title: "Globalize rocks!", name: "Globalize">,
      #<Post::Translation id: 2, post_id: 1, locale: "nl", title: '', name: nil>]

I18n.locale = :en
post.title # => 'Globalize rocks!'
post.name  # => 'Globalize'

I18n.locale = :nl
post.title # => 'Globalize rocks!'
post.name  # => 'Globalize'
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
  #<Post::Translation id: 1, post_id: 1, locale: "en", title: "Globalize rocks!", name: "Globalize">,
  #<Post::Translation id: 2, post_id: 1, locale: "nl", title: '', name: nil>
]

Post.with_translations(I18n.locale)
# => [
  #<Post::Translation id: 1, post_id: 1, locale: "en", title: "Globalize rocks!", name: "Globalize">,
  #<Post::Translation id: 2, post_id: 1, locale: "nl", title: '', name: nil>
]

Post.with_translations('de')
# => []
```

## Show different languages

In views, if there is content from different locales that you wish to display,
you should use the `with_locale` option with a block, as below:

```erb
<% Globalize.with_locale(:en) do %>
  <%= render "my_translated_partial" %>
<% end %>
```

Your partial will now be rendered with the `:en` locale set as the current locale.

## Interpolation

Globalize supports interpolation in a similar manner to I18n.

```ruby
class Post < ActiveRecord::Base
  translates :title
end

I18n.locale = :en
post.title = "Globalize %{superlative}!"

post.title
# #=> "Globalize %{superlative}!"

post.title(:foo => "bar")
# SomeError: missing interpolation argument :superlative

post.title(:superlative => "rocks")
# #=> "Globalize rocks!"
```

## Fragment caching

Don't forget to add globalize locale into the `cache_key` to separate different localizations of the record.
One of the possible ways to implement it:

```ruby
# inside translated model
def cache_key
  super + '-' + Globalize.locale.to_s
end
```

## Official Globalize extensions

* [globalize-accessors](https://github.com/globalize/globalize-accessors) - Replacement for [easy_globalize_3_accessors](https://github.com/paneq/easy_globalize3_accessors) compatible with Globalize 3.x and 4.x.
* [globalize-versioning](https://github.com/globalize/globalize-versioning) - Versioning support for using Globalize with [`paper_trail`](https://github.com/airblade/paper_trail).

## Alternative Solutions

* [Veger's fork](http://github.com/veger/globalize2) - uses default AR schema for the default locale, delegates to the translations table for other locales only
* [TranslatableColumns](http://github.com/iain/translatable_columns) - have multiple languages of the same attribute in a model (Iain Hecker)
* [Traco](https://github.com/barsoom/traco) - A newer take on using multiple columns in the same model (Barsoom)
* [localized_record](http://github.com/glennpow/localized_record) - allows records to have localized attributes without any modifications to the database (Glenn Powell)
* [model_translations](http://github.com/janne/model_translations) - Minimal implementation of Globalize2 style model translations (Jan Andersson)
* [hstore_translate](http://github.com/robworley/hstore_translate) - Rails I18n library for ActiveRecord model/data translation using PostgreSQL's hstore datatype (Rob Worley)

## Related solutions

* [globalize2_versioning](http://github.com/joshmh/globalize2_versioning) - acts_as_versioned style versioning for globalize2 (Joshua Harvey)
* [i18n_multi_locales_validations](http://github.com/ZenCocoon/i18n_multi_locales_validations) - multi-locales attributes validations to validates attributes from globalize2 translations models (Sébastien Grosjean)
* [migrate_from_globalize1](http://gist.github.com/120867) - migrate model translations from Globalize1 to globalize2 (Tomasz Stachewicz)
* [batch_translations](http://github.com/rilla/batch_translations) - allow saving multiple globalize2 translations in the same request (Jose Alvarez Rilla)
