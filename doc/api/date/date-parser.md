## .dateParser( [options] ) ➜ function( value )

Return a function that parses a string representing a date into a JavaScript Date object according to the given `options`. The default parsing assumes numeric year, month, and day (i.e., `{ skeleton: "yMd" }`).

The returned function is invoked with one argument: the String `value` to be parsed.

### Parameters

#### options

See [.dateFormatter() options](./date-formatter.md#parameters).

#### value

String with date to be parsed, eg. `"11/1/10, 5:55 PM"`.

### Example

Prior to using any date methods, you must load `cldr/main/{locale}/ca-gregorian.json`, `cldr/main/{locale}/timeZoneNames.json`, `cldr/supplemental/timeData.json`, `cldr/supplemental/weekData.json`, and the CLDR content required by the number module. Read [CLDR content][] if you need more information.

[CLDR content]: ../../../README.md#2-cldr-content

You can use the static method `Globalize.dateParser()`, which uses the default locale.

```javascript
var parser;

Globalize.locale( "en" );
parser = Globalize.dateParser();

parser( "1/2/2013" );
// > Wed Jan 02 2013 00:00:00

Globalize.locale( "es" );
parser = Globalize.dateParser();

parser( "1/2/2013" );
// > Fri Feb 01 2013 00:00:00
```

You can use the instance method `.dateParser()`, which uses the instance locale.

```javascript
var esParser = Globalize( "es" ).dateParser({ date: short });

esParser( "1/2/13" );
// > Fri Feb 01 2013 00:00:00
```

For improved performance on iterations, first create the parser. Then, reuse it
on each loop.

```javascript
var formattedDates = [ new Date( a ), new Date( b ), ... ];
var parser = Globalize( "en" ).dateParser({ time: "short" });

dates = formattedDates.map(function( formattedDate ) {
  return parser( formattedDate );
});
```
