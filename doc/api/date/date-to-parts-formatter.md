## .dateToPartsFormatter( [options] ) ➜ function( value )

Return a function that formats a date into parts tokens according to the given `options`. The default formatting is numeric year, month, and day (i.e., `{ skeleton: "yMd" }`.

The returned function is invoked with one argument: the Date instance `value` to be formatted.

### Parameters

#### options

Please, see [.dateFormatter() options](./date-formatter.md#parameters).

#### value

Date instance to be formatted, eg. `new Date()`;

### Returns

An Array of objects containing the formatted date in parts. The returned structure looks like this:

```js
[
  { type: "day", value: "17" },
  { type: "weekday", value: "Monday" }
]
```

Possible types are the following:

- `day`

  The string used for the day, e.g., `"17"`, `"١٦"`.

- `dayPeriod`

  The string used for the day period, e.g., `"AM"`, `"PM"`.

- `era`

  The string used for the era, e.g., `"AD"`, `"d. C."`.

- `hour`

  The string used for the hour, e.g., `"3"`, `"03"`.

- `literal`

  The string used for separating date and time values, e.g., `"/"`, `", "`,
  `"o'clock"`, `" de "`.

- `minute`

  The string used for the minute, e.g., `"00"`.

- `month`

  The string used for the month, e.g., `"12"`.

- `second`

  The string used for the second, e.g., `"07"` or `"42"`.

- `timeZoneName`

  The string used for the name of the time zone, e.g., `"EST".`

- `weekday`

  The string used for the weekday, e.g., `"M"`, `"Monday"`, `"Montag".`

- `year`

  The string used for the year, e.g., `"2012"`, `"96".`


### Example

Prior to using any date methods, you must load `cldr/main/{locale}/ca-gregorian.json`, `cldr/main/{locale}/timeZoneNames.json`, `cldr/supplemental/timeData.json`, `cldr/supplemental/weekData.json`, and the CLDR content required by the number module. Read [CLDR content][] if you need more information.

[CLDR content]: ../../../README.md#2-cldr-content

You can use the static method `Globalize.dateToPartsFormatter()`, which uses the default locale.

```javascript
var formatter;

Globalize.locale( "en" );
formatter = Globalize.dateToPartsFormatter();

formatter( new Date( 2010, 10, 30 ) );
// > [
//   { "type": "month", "value": "11" },
//   { "type": "literal", "value": "/" },
//   { "type": "day", "value": "30" },
//   { "type": "literal", "value": "/" },
//   { "type": "year", "value": "2010" }
// ]
```

You can use the instance method `.dateToPartsFormatter()`, which uses the instance locale.

```javascript
var enFormatter = Globalize( "en" ).dateToPartsFormatter(),
  deFormatter = Globalize( "de" ).dateToPartsFormatter();

enFormatter( new Date( 2010, 10, 30 ) );
// > [
//   { "type": "month", "value": "11" },
//   { "type": "literal", "value": "/" },
//   { "type": "day", "value": "30" },
//   { "type": "literal", "value": "/" },
//   { "type": "year", "value": "2010" }
// ]

deFormatter( new Date( 2010, 10, 30 ) );
// > [
//   { type: 'day', value: '30' },
//   { type: 'literal', value: '.' },
//   { type: 'month', value: '11' },
//   { type: 'literal', value: '.' },
//   { type: 'year', value: '2010' }
// ]
```

The information is available separately and it can be formatted and concatenated again in a customized way. For example by using [`Array.prototype.map()`][], [arrow functions][], a [switch statement][], [template literals][], and [`Array.prototype.reduce()`][].

[`Array.prototype.map()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[arrow functions]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[switch statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
[template literals]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[`Array.prototype.reduce()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

```javascript
var formatter;

Globalize.locale( "en" );
formatter = Globalize.dateToPartsFormatter({datetime: "short"});

formatter( new Date( 2010, 10, 30, 17, 55 ) ).map(({type, value}) => {
  switch ( type ) {
    case "year": return `<strong>${value}</strong>`;
    default: return value;
  }
}).join( "" );
// > "11/30/<strong>10</strong>, 5:55 PM"
```

Please, see [.dateFormatter() example](./date-formatter.md#example) for additional examples such as using `date`, `time`, `datetime`, and `skeleton` options.

For improved performance on iterations, first create the formatter. Then, reuse it on each loop.

```javascript
// In an application, this array could have a few hundred entries
var dates = [ new Date( 2010, 10, 30, 17, 55 ), new Date( 2015, 3, 18, 4, 25 ) ];
var formatter = Globalize( "en" ).dateToPartsFormatter({ time: "short" });

var formattedDates = dates.map(function( date ) {
  return formatter( date );
});
// > [
//   [
//     { "type": "hour", "value": "5" },
//     { "type": "literal", "value": ":" },
//     { "type": "minute", "value": "55" },
//     { "type": "literal", "value": " " },
//     { "type": "dayperiod", "value": "PM" }
//   ],
//   [
//     { "type": "hour", "value": "4" },
//     { "type": "literal", "value": ":" },
//     { "type": "minute", "value": "25" },
//     { "type": "literal", "value": " " },
//     { "type": "dayperiod", "value": "AM" }
//   ]
// ]
```
