## .dateParser( [patterns] )

Return a function that parses a string representing a date into a JavaScript
Date object according to the given `patterns` (defaults to the locale's
available preset patterns).

### Parameters

**patterns** Optional

Array of patterns. See [`.dateFormatter( pattern )`](./date-formatter.md) for
details.

### Example

You can use the static method `Globalize.dateParser()`, which uses the default
locale.

```javascript
var parser;

Globalize.locale( "en" );
parser = Globalize.dateParser({ date: short });

parser( "1/2/13" );
// Wed Jan 02 2013 00:00:00

Globalize.locale( "es" );
parser = Globalize.dateParser({ date: short });

parser( "1/2/13" );
// Fri Feb 01 2013 00:00:00
```

You can use the instance method `.dateParser()`, which uses the instance locale.

```javascript
var esParser = Globalize( "es" ).dateParser({ date: short });

esParser( "1/2/13" );
// Fri Feb 01 2013 00:00:00
```
