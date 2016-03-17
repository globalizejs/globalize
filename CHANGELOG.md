# Globalize Changelog

## 5.1.0 (unreleased)

* Replaced `after_` callbacks with `before_` callbacks and set `autosave: true` by default. [#341](https://github.com/globalize/globalize/pull/341) by [Andrew Volozhanin](https://github.com/scarfacedeb)
* Add [RequestStore](https://github.com/steveklabnik/request_store) to make Globalize thread-safe again [#420](https://github.com/globalize/globalize/pull/420)
* Join the translations table when ordering by translated attributes (https://github.com/globalize/globalize/pull/447). (thanks [Thomas Maas](https://github.com/thomasmaas) & [Michal Cichra](https://github.com/mikz)).
* Add `unique` to `with_translation` to prevent duplicates if fallbacks are defined and the queried locale is not the fallback language. [#489](https://github.com/globalize/globalize/pull/489) by [krisdigital](https://github.com/krisdigital)

## 5.0.1 (2015-02-15)

* Don't touch table when model is loaded. [#412](https://github.com/globalize/globalize/pull/412)
* Remove handling for locale attribute on parent model [#411](https://github.com/globalize/globalize/pull/411) by awesome [Tekin Suleyman](https://github.com/tekin).

## 5.0.0 (2015-02-03)
* Added support for Rails 4.2, but removed support for every previous version of Rails.  This is a backward incompatible change, thus the version is now 5.0.0. (thanks [Nico Ritsche](https://github.com/ncri) and others). [#396](https://github.com/globalize/globalize/pull/396).

## 4.0.3 (2014-11-24)
* Fixes a problem where after dup the dup'd model and the original model shared a translation instance, which means that if you mutate a translated field on the dup and save it, the original becomes a clone of the dup. [#352](https://github.com/globalize/globalize/pull/352).
* Deprecated `with_required_attributes`, `required_attributes`, and `required_translated_attributes`. `with_translations` no longer invokes `with_required_attributes`. [#355](https://github.com/globalize/globalize/pull/355).
* Removed all usages of `Thread.local`. [#374](https://github.com/globalize/globalize/pull/374). (thanks [Hubert Lee](https://github.com/hube)).
* Added `available_locales` method. This duplicates `translated_locales` method, but it doesn't use a separate `DISTINCT` query. [#339](https://github.com/globalize/globalize/pull/339). (thanks [Andrew Volozhanin](https://github.com/scarfacedeb)).

## 4.0.2 (2014-06-29)
* Use `reflections` class method so `ensure_foreign_key_for` works in AR >= 4.1.2, fixes [#353](https://github.com/globalize/globalize/pull/353).
* Set `touch:true` on `belongs_to` for the globalized model, fixes [#330](https://github.com/globalize/globalize/pull/330) (thanks [shlensky](https://github.com/shlensky)).
* Accept optional arguments passed to `where_values_hash`, fixes [#354](https://github.com/globalize/globalize/pull/354) (thanks [felixbuenemann](https://github.com/felixbuenemann)).

## 4.0.1 (2014-03-29)
* Fix bug where `with_translations` only works if called after `where` in relation chain, fixes [#343](https://github.com/globalize/globalize/issues/343).
* Use `preload` and `joins` instead of `includes` in `with_translations`, fixes [#329](https://github.com/globalize/globalize/issues/329) (thanks [Andrew Volozhanin](https://github.com/scarfacedeb)).
* Update `database_cleaner` dependency to 1.2.0.
* Support use of `first`/`take`/`last` with limit on queries with translated attributes, fixes [#322](https://github.com/globalize/globalize/issues/322) (thanks [prusswan](https://github.com/prusswan)).
* Ensure that options are always extracted from `attr_names` in `Globalize::ActiveRecord::ActMacro#translates`, PR [#319](https://github.com/globalize/globalize/pull/319) (thanks [Marek](https://github.com/keram)).

## 4.0.0 (2014-01-04)
* Extract all versioning-related code to separate [globalize-versioning](https://github.com/globalize/globalize-versioning) gem.

## 4.0.0.alpha.5 (2014-01-04)
* Fix issue where globalize breaks has_many through when model called with `where` (thanks [Paul McMahon](https://github.com/pwim)).
* Modify dup so that translations are copied, and remove custom clone code to conform to Rails/AR semantics (thanks [Paul McMahon](https://github.com/pwim)).

## 4.0.0.alpha.4 (2013-12-30)
* Add this changelog.
* Add contributing guidelines.
* Group options into more structured methods in act_macro.rb.
* Remove dynamic finder code from globalize3, no longer used in AR4.
* Get hash of translated attributes by calling attribute on model, not translation.
* Define translation readers/writers in separate methods.
* Test against AR 4.1 and AR 4.0.
* Switch to minitest-reporters for colouring output from minitest.
* Remove find_or_instantiator_by_attributes which is no longer used in AR4.
* Set I18n.available_locales in tests to avoid deprecation message.
* Reorganize specs into describe blocks to clarify object of specs.

## 4.0.0.alpha.3 (2013-12-18)

* Move ActiveRecord::Relation#where_values_hash patch into globalize relation class to avoid monkeypatching.
* Add Code Climate Score (thanks [BrandonMathis](https://github.com/BrandonMathis)).
* Query using Globalize.fallbacks rather than locale only when fetching a record (thanks [@huoxito](https://github.com/huoxito)).
* Use a module (QueryMethods) rather than a class for overriding functionality of ActiveRecord::Relation.
* Use ActiveRecord::Relation#extending! to extend ActiveRecord::Base#relation with QueryMethods, works with associations as well.

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

## 4.0.0.alpha.1 (2013-10-09)

* Initial release of Rails 4-compatible gem.

## 3.1.0 (2014-01-25)

* Backport scope support on uniqueness validation from 4.0, drop support for ActiveRecord < 3.1, fixes [#324](https://github.com/globalize/globalize/issues/324).

## 3.0.5 (2015-04-24)

* Now working properly with the squeel library. (thanks [Toru Mori](https://github.com/torumori)). See [#437](https://github.com/globalize/globalize/pull/437)

## 3.0.4 (2014-01-08)

* Extract all versioning-related code to separate [globalize-versioning](https://github.com/globalize/globalize-versioning) gem.

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
