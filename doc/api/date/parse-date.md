## Globalize.parseDate( value [, patterns] )

Parse a string representing a date into a JavaScript Date object, according to
the given patterns (defaults to the locale's available preset patterns).

### Parameters

**value**

String with date to be parsed, eg. `"11/1/10, 5:55 PM"`.

**patterns** Optional

Array of patterns.

### Example

You can use the static method `Globalize.parseDate()`, which uses the default
locale.

```javascript
Globalize.locale( "en" );
Globalize.parseDate( "1/2/13" );
// Wed Jan 02 2013 00:00:00

Globalize.locale( "es" );
Globalize.parseDate( "1/2/13" );
// Fri Feb 01 2013 00:00:00
```

You can use the instance method `.parseDate()`, which uses the instance locale.

```javascript
var es = new Globalize( "es" );
es.parseDate( "1/2/13" );
// Fri Feb 01 2013 00:00:00
```
