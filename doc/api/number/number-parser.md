## .numberParser( [options] ) ➜ function( value )

Return a function that parses a String representing a number according to the
given options. If value is invalid, `NaN` is returned.

The returned function is invoked with one argument: the String representing a
number `value` to be parsed.

### Parameters

**options** Optional

A JSON object including none or any of the following options.

> **style** Optional
>
> String `decimal` (default), or `percent`.

**value**

String with number to be parsed, eg. `"3.14"`.

### Example

Prior to using any number methods, you must load
`cldr/main/{locale}/numbers.json` and `cldr/supplemental/numberingSystems.json`.
Read [CLDR content][] if you need more information.

[CLDR content]: ../../../README.md#2-cldr-content

You can use the static method `Globalize.numberParser()`, which uses the
default locale.

```javascript
var parser;

Globalize.locale( "en" );
parser = Globalize.numberParser();

parser( "3.14" );
// > 3.14
```

You can use the instance method `.numberParser()`, which uses the instance
locale.

```javascript
var enParser = Globalize( "ar" ).numberParser(),
  esParser = Globalize( "es" ).numberParser();

enParser( "3.14" );
// > 3.14

esParser( "3,14" );
// > 3.14
```

Some more examples.

```javascript
var parser = Globalize( "en" ).numberParser();

parser( "12,735.00" );
// > 12735

parser( "6.626E-34" );
// > 6.626e-34

parser( "∞" );
// > Infinity

parser( "invalid-stuff" );
// > NaN
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
