## .numberParser( [options] ) ➜ function( value )

Return a function that parses a String representing a number according to the given options. If value is invalid, `NaN` is returned.

The returned function is invoked with one argument: the String representing a number `value` to be parsed.

### Parameters

#### options

See [.numberFormatter() options](./number-formatter.md#parameters).

#### value

String with number to be parsed, eg. `"3.14"`.

### Example

Prior to using any number methods, you must load `cldr/main/{locale}/numbers.json` and `cldr/supplemental/numberingSystems.json`. Read [CLDR content][] if you need more information.

[CLDR content]: ../../../README.md#2-cldr-content

You can use the static method `Globalize.numberParser()`, which uses the default locale.

```javascript
var parser;

Globalize.locale( "en" );
parser = Globalize.numberParser();

parser( "3.14" );
// > 3.14
```

You can use the instance method `.numberParser()`, which uses the instance locale.

```javascript
var enParser = Globalize( "en" ).numberParser(),
  esParser = Globalize( "es" ).numberParser();

enParser( "3.14" );
// > 3.14

esParser( "3,14" );
// > 3.14
```

Some more examples.

```javascript
var enParser = Globalize( "en" ).numberParser();

enParser( "12,735" );
// > 12735

enParser( "12,735.00" );
// > 12735

Globalize( "en" ).numberParser({ style: "percent" })( "100%" );
// > 1

enParser( "∞" );
// > Infinity

enParser( "-3" );
// > -3

enParser( "-∞" );
// > -Infinity

enParser( "invalid-stuff" );
// > NaN

enParser( "invalid-stuff-that-includes-number-123" );
// > NaN

enParser( "invalid-stuff-123-that-includes-number" );
// > NaN

enParser( "123-invalid-stuff-that-includes-number" );
// > NaN

// Invalid decimal separator. (note `.` is used as decimal separator for English)
enParser( "3,14" );
// > NaN

// Invalid grouping separator position.
enParser( "127,35.00" );
// > NaN
```

Loose matching examples.

```js
var svParser = Globalize( "sv" ).numberParser();

// Swedish uses NO-BREAK-SPACE U+00A0 as grouping separator.
svParser( "1\xA0000,50" );
// > 1000.5

// The parser is lenient and accepts various space characters like regular space
// SPACE U+0020. Technically, it accepts any character of the Unicode general
// category [:Zs:].
svParser( "1 000,50" );
// > 1000.5

var fiParser = Globalize( "fi" ).numberParser();

// Finish uses MINUS SIGN U+2212 for the minus sign.
fiParser( "\u22123" );
// > -3

// The parser is lenient and accepts various hyphen characters like regular
// HYPHEN-MINUS U+002D. Technically, it accepts any character of the Unicode
// general category [:Dash:].
fiParser( "-3" );
// > -3
```

For improved performance on iterations, first create the parser. Then, reuse it
on each loop.

```javascript
var formattedNumbers = [ "1", "1", "2", "3", ... ];
var parser = Globalize( "en" ).numberParser();

numbers = formattedNumbers.map(function( formattedNumber ) {
  return parser( formattedNumber );
});
```
