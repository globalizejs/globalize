## Globalize.parseDate( value [, formats] [, locale|cldr] )

Parse a string representing a date into a JavaScript Date object, taking into
account the given possible formats (or the given locale's set of preset formats
if not provided). As in format, `locale|cldr` is locale string or [Cldr
instance](https://github.com/rxaviers/cldrjs), or the default locale if not
specified.

### Parameters

**value**

String with date to be parsed, eg. `"11/1/10, 5:55 PM"`.

**formats** Optional

Array of formats.

**locale|cldr** Optional

Locale string or [Cldr instance](https://github.com/rxaviers/cldrjs) that
overrides default.

### Example

```javascript
Globalize.locale( "en" );
Globalize.parseDate( "1/2/13" );
// Wed Jan 02 2013 00:00:00

Globalize.locale( "es" );
Globalize.parseDate( "1/2/13" );
// Fri Feb 01 2013 00:00:00
```

