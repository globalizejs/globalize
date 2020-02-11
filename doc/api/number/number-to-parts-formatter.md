## .numberToPartsFormatter( [options] ) ➜ function( value )

Return a function that formats a number into parts tokens according to the given options.

The returned function is invoked with one argument: the Number `value` to be formatted.

### Parameters

#### options

Please, see [.numberFormatter() options](./number-formatter.md#parameters).

### Returns

An Array of objects containing the formatted number in parts. The returned structure looks like this:

- `decimal`

  The decimal separator string, e.g., `"."`.

- `fraction`

  The fraction number.

- `group`

  The group separator string, e.g., `","`.

- `infinity`

  The Infinity string, e.g., `"∞"`.

- `integer`

  The integer number.

- `literal`

  Any literal strings or whitespace in the formatted number.

- `minusSign`

  The minus sign string, e.g., `"-"`.

- `nan`

  The NaN string, e.g., `"NaN"`.

- `plusSign`

  The plus sign string, e.g., `"+"`.

- `percentSign`

  The percent sign string, e.g., `"%"`. 

- `compact`

  The compact string, e.g., `"thousand"`. 

### Examples

Prior to using any number methods, you must load `cldr/main/{locale}/numbers.json` and `cldr/supplemental/numberingSystems.json`. Read [CLDR content][] if you need more information.

[CLDR content]: ../../../README.md#2-cldr-content

#### Static Formatter

You can use the static method `Globalize.numberToPartsFormatter()`, which uses the default locale.

```javascript
var formatter;

Globalize.locale( "en" );
formatter = Globalize.numberToPartsFormatter();

formatter( 3.141592 );
// > [
//   { "type": "integer", "value": "3" },
//   { "type": "decimal", "value": "." },
//   { "type": "fraction", "value": "142" }
// ]
```

#### Instance Formatter

You can use the instance method `.numberFormatter()`, which uses the instance
locale.

```javascript
var arFormatter = Globalize( "ar" ).numberToPartsFormatter(),
  esFormatter = Globalize( "es" ).numberToPartsFormatter(),
  zhFormatter = Globalize( "zh-u-nu-native" ).numberToPartsFormatter();

arFormatter( 3.141592 );
// > [
//   { "type": "integer", "value": "٣" },
//   { "type": "decimal", "value": "٫" },
//   { "type": "fraction", "value": "١٤٢" }
// ]

esFormatter( 3.141592 );
// > [
//   { "type": "integer", "value": "3" },
//   { "type": "decimal", "value": "," },
//   { "type": "fraction", "value": "142" }
// ]

zhFormatter( 3.141592 );
// > [
//   { "type": "integer", "value": "三" },
//   { "type": "decimal", "value": "." },
//   { "type": "fraction", "value": "一四二" }
// ]
```

The information is available separately and it can be formatted and concatenated again in a customized way. For example by using [`Array.prototype.map()`][], [arrow functions][], a [switch statement][], [template literals][], and [`Array.prototype.reduce()`][].

[`Array.prototype.map()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[arrow functions]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[switch statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
[template literals]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[`Array.prototype.reduce()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

#### More Examples

Please, see [.numberFormatter() example](./number-formatter.md#example) for additional examples such as configuring decimal places, significant digits, percentages, and compact numbers.

#### Performance Suggestions

For improved performance on iterations, the formatter should be created before the loop.  Then, it can be reused in each iteration.

```javascript
var numbers = [ 1, 1, 2, 3, ... ];
var formatter = Globalize( "en" ).numberFormatter();

formattedNumbers = numbers.map(function( number ) {
  return formatter( number );
});
```
