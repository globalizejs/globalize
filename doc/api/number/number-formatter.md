## .numberFormatter( [options] ) ➜ function( value )

Return a function that formats a number according to the given options.

The returned function is invoked with one argument: the Number `value` to be formatted.

### Parameters

#### options.style

Optional. String `decimal` (default), or `percent`.

#### options.minimumIntegerDigits 

Optional. Non-negative integer Number value indicating the minimum integer digits to be used. Numbers will be padded with leading zeroes if necessary.

#### options.minimumFractionDigits, options.maximumFractionDigits

Optional. Non-negative integer Number values indicating the minimum and maximum fraction digits to be used. Numbers will be rounded or padded with trailing zeroes if necessary. Either one or both of these properties must be present. If they are, they will override minimum and maximum fraction digits derived from the CLDR patterns.

#### options.minimumSignificantDigits, options.maximumSignificantDigits

Optional. Positive integer Number values indicating the minimum and maximum fraction digits to be shown. Either none or both of these properties are present. If they are, they override minimum and maximum integer and fraction digits. The formatter uses however many integer and fraction digits are required to display the specified number of significant digits.

#### options.round

Optional. String with rounding method `ceil`, `floor`, `round` (default), or `truncate`.

#### options.useGrouping

Optional. Boolean (default is true) value indicating whether a grouping separator should be used.

#### options.compact

Optional. String `short` or `long` indicating which compact number format should be used to represent the number.

### Examples

#### Static Formatter

Prior to using any number methods, you must load `cldr/main/{locale}/numbers.json` and `cldr/supplemental/numberingSystems.json`. Read [CLDR content][] if you need more information.

[CLDR content]: ../../../README.md#2-cldr-content

You can use the static method `Globalize.numberFormatter()`, which uses the default locale.

```javascript
var formatter;

Globalize.locale( "en" );
formatter = Globalize.numberFormatter();

formatter( 3.141592 );
// > "3.142"
```

#### Instance Formatter

You can use the instance method `.numberFormatter()`, which uses the instance
locale.

```javascript
var arFormatter = Globalize( "ar" ).numberFormatter(),
  esFormatter = Globalize( "es" ).numberFormatter(),
  zhFormatter = Globalize( "zh-u-nu-native" ).numberFormatter();

arFormatter( 3.141592 );
// > "٣٫١٤٢"

esFormatter( 3.141592 );
// > "3,142"

zhFormatter( 3.141592 );
// > "三.一四二"
```

#### Configuring decimal places

The number of decimal places can be decreased or increased using `minimumFractionDigits` and `maximumFractionDigits`.

```javascript
Globalize.numberFormatter({ maximumFractionDigits: 2 })( 3.141592 );
// > "3.14"

Globalize.numberFormatter({ minimumFractionDigits: 2 })( 1.5 );
// > "1.50"
```

#### Configuring significant digits

The number of significant (non-zero) digits can be decreased or increased using `minimumSignificantDigits` and `maximumSignificantDigits`.

```javascript
var formatter = Globalize.numberFormatter({
  minimumSignificantDigits: 1,
  maximumSignificantDigits: 3
});

formatter( 3.141592 );
// > "3.14"

formatter = Globalize.numberFormatter({
  minimumSignificantDigits: 1,
  maximumSignificantDigits: 3
});

formatter( 12345 );
// > "12,300"

formatter = Globalize.numberFormatter({
  minimumSignificantDigits: 1,
  maximumSignificantDigits: 3
});

formatter( 0.00012345 );
// > "0.000123"
```

#### Formatting Percentages

Numbers can be formatted as percentages.

```javascript
var enFormatter = Globalize( "en" ).numberFormatter({
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});

var frFormatter = Globalize( "fr" ).numberFormatter({
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

enFormatter( 0.0016 );
// > "0.2%"

enFormatter( 0.0014 );
// > "0.1%"

frFormatter( 0.0005 );
// > "0,05 %"
```

#### Formatting Compact Numbers

Long numbers can be represented in a compact format, with `short` using abbreviated units and `long` using the full unit name.

```javascript
var shortFormatter = Globalize( "en" ).numberFormatter({
  compact: "short"
});

var longFormatter = Globalize( "en" ).numberFormatter({
  compact: "long"
});

shortFormatter( 27588910 );
// > "28M"

longFormatter( 27588910 );
// > "28 million"
```

The minimumSignificantDigits and maximumSignificantDigits options are specially useful to control the number of digits to display.

```js
Globalize( "en" ).formatNumber( 27588910, {
  compact: "short",
  minimumSignificantDigits: 3,
  maximumSignificantDigits: 3
});
// > "27.6M"
```

#### Configuring Rounding

Numbers with a decreased amount of decimal places can be rounded up, rounded down, rounded arithmetically, or truncated by setting the `round` option to `ceil`, `floor`, `round` (default), or `truncate`.

```javascript
var formatter = Globalize.numberFormatter({
  maximumFractionDigits: 2,
  round: "ceil"
});

formatter( 3.141592 );
// > "3.15"
```

#### Performance Suggestions

For improved performance on iterations, the formatter should be created before the loop.  Then, it can be reused in each iteration.

```javascript
var numbers = [ 1, 1, 2, 3, ... ];
var formatter = Globalize( "en" ).numberFormatter();

formattedNumbers = numbers.map(function( number ) {
  return formatter( number );
});
```
