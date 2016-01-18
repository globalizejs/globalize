# Migrating from Globalize 0.x

Globalize 0.x came with a bundled locale for US English, and optional files for various other locales. Globalize 1.x uses CLDR for the locale data, and it doesn't bundle any locale data. Check out the documentation for loading CLDR data in 1.x to learn more about that. If you were only using the bundle locale, you only need to load CLDR data for US English. If you were loading other locales, make sure you load those from CLDR as well.

On the API side, things have also changed, to simplify usage, remove ambiguity and add features. The rest of this document provides a brief function-by-function list.

If you still need help with migration, let us know. We may extend this guide later as necessary.

## Globalize.addCultureInfo()

This method is replaced by `Globalize.loadMessages( json )`. If you were using it for anything except message translations, you may also need to use `Globalize.load`.

## Globalize.cultures

This property is gone. You can use Cldrjs to traverse CLDR directly.

## Globalize.culture( [locale] )

This method is replaced by the `Globalize.locale( [locale|cldr] )` method. Call it without arguments to retrieve the default locale, call it with a string argument to set the default locale.

## Globalize.findClosestCulture

This method is gone, there is no replacement. If you still need this method, create an issue with your usecase.

## Globalize.format

Replaced by three separate methods:

* `.formatNumber( value [, options] )`
* `.formatCurrency( value, currency [, options] )`
* `.formatDate( value, pattern )`

See their respective documentation for usage details. Note that the number and date formats are now based on CLDR, using the options and patterns standardized by Unicode. We don't currently have documentation for migrating these formats.

## Globalize.localize

Replaced by `.formatMessage( path [, variables ] )`. The new API is quite different and provides much more than just value-lookup. See their respective documentation for usage details.

## Globalize.parseInt/parseFloat

Replaced by `.parseNumber( value [, options] )`.  So where you might have previously executed:

```js
Globalize( "en" ).parseFloat( "123,456.789" )
// > 123456.789
```

You could now execute:

```js
Globalize( "en" ).parseNumber( "123,456.789" )
// > 123456.789
```

`parseNumber` is an alias for [`.numberParser( [options] )( value )`](api/number/number-parser.md).  So you could also do this:

```js
Globalize( "en" ).numberParser()( "123,456.789" )
// > 123456.789
```

## Globalize.parseDate

This method still exists, and the signature is almost the same: `.parseDate( value, pattern )`. Note that `pattern` indicates just a single "format", where Globalize 0.x supported multiple of those "formats".
