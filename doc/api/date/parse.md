## Globalize.parseDate( value [, formats] [, locale] )

Parse a string representing a date into a JavaScript Date object, taking into
account the given possible formats (or the given locale's set of preset
formats if not provided). As before, the current locale is used if one is not
specified.

### Parameters

**value**

String with date to be parsed, eg. `"11/1/10, 5:55 PM"`.

**formats** Optional

Array of formats.

**locale** Optional

Locale string that overrides default.

### Example

```javascript
Globalize.locale( "en" );
Globalize.parseDate( "1/2/13" );
// Wed Jan 02 2013 00:00:00

Globalize.locale( "es" );
Globalize.parseDate( "1/2/13" );
// Fri Feb 01 2013 00:00:00
```

