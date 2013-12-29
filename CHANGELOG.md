# Globalize Changelog

## 4.0.0.alpha.3 (2013-12-18)

* Move ActiveRecord::Relation#where_values_hash patch into globalize relation class to avoid monkeypatching.
* Add Code Climate Score (thanks [BrandonMathis](https://github.com/BrandonMathis)).
* Query using Globalize.fallbacks rather than locale only when fetching a record (thanks [@huoxito](https://github.com/huoxito)).
* Use a module (QueryMethods) rather than a class for overriding functionality of ActiveRecord::Relation.
* Use ActiveRecord::Relation#extending! to extend ActiveRecord::Core#relation with QueryMethods, works with associations as well.

## 4.0.0.alpha.2 (2013-10-24)

* Add license to gemspec.
* Update references to ActiveRecord 3 -> ActiveRecord.
* Replace references to globalize3 with globalize and remove references to ActiveRecord 3.x.
* Document `3-0-stable` branch in readme.
* Convert test syntax to MiniTest::Spec.
* Extract easy accessors functionality, moved to new [globalize-accessors](https://github.com/globalize/globalize-accessors) gem.
* Check that `first` is not nil before reloading translations, fixes [#282](https://github.com/globalize/globalize/issues/282).
* Duplicate arguments in query finders before modifying them, fixes [#284](https://github.com/globalize/globalize/issues/284).
* Add test for `find_or_create_by` with translated attribute.

## 4.0.0.alpha.1 (2013-10-9)

* Initial release of Rails 4-compatible gem.

## 3.0.3 (2013-12-26)

* Ensure that foreign key is always set when saving translations (thanks [Andrew Feng](https://github.com/mingliangfeng)).
* Patch I18n to add back I18n.interpolate after it was removed (accidentally?) in v0.5.2 (see [svenfuchs/i18n#232](https://github.com/svenfuchs/i18n/issues/232). Hopefully this patch will be temporary.
* Explicitly test compatibility with FriendlyId to avoid issues like [#306](https://github.com/globalize/globalize/issues/306).
* Only override ActiveRecord::Base#relation to patch where_values_hash if using AR >= 3.2.1.

## 3.0.2 (2013-12-07)

* Alias `ActiveRecord::Base#relation` and include query method overrides as module, fixes [#306](https://github.com/globalize/globalize/issues/306) and [norman/friendly_id#485](https://github.com/norman/friendly_id/issues/485).

## 3.0.1 (2013-11-07)

* Move `ActiveRecord::Relation#where_values_hash` patch to Globalize-specific Relation class that inherits from `ActiveRecord::Relation` to fix compatibility issue with Squeel ([#288](https://github.com/globalize/globalize/issues/288)).
* Use FriendlyId pattern for overriding `ActiveRecord::Base#relation` to avoid conflict.
* Remove `:null => false` condition on reference to parent model in translation table migration, partial fix for [refinery/refinerycms#2450](https://github.com/refinery/refinerycms/issues/2450).

## 3.0.0 (2013-10-24)

* Initial release with new version numbering.
