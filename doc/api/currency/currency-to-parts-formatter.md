## .currencyToPartsFormatter( currency [, options] ) ➜ function( value )

Return a function that formats a `currency` into parts tokens according to the given `options` or locale's defaults.

The returned function is invoked with one argument: the Number `value` to be formatted.

### Parameters

#### currency

3-letter currency code as defined by ISO 4217, eg. `"USD"`.

#### options

Please, see [.currencyFormatter() options](./currency-formatter.md#parameters).

#### value

Number to be formatted, eg. `9.99`.

### Returns

An Array of objects containing the formatted currency in parts. The returned structure looks like this:

```js
[
  { type: "day", value: "17" },
  { type: "weekday", value: "Monday" }
]
```

Possible types are the following:

- `currency`

  The currency string, such as the symbols `"$"` and `"€"` or the name `"Dollar"`, `"Euro"` depending on which style is used.

Please, see [.numberToPartsFormatter()](../number/number-to-parts-formatter.md#returns) for details about the inherited number parts such as `decimal`, `fraction`, `group`, `infinity`, `integer`, `literal`, `minusSign`, `nan`, `plusSign`, `percentSign`, and `compact`.

### Example

Prior to using any currency methods, you must load `cldr/main/{locale}/currencies.json`, `cldr/supplemental/currencyData.json`, and the CLDR content required by the number module. If using plural messages, you also must load the CLDR content required by the plural module. Read [CLDR content][] if you need more information.

[CLDR content]: ../../../README.md#2-cldr-content

#### Static Formatter

#### Using the default options

You can use the static method `Globalize.currencyToPartsFormatter()`, which uses the default locale.

```javascript
var formatter;

Globalize.locale( "en" );
formatter = Globalize.currencyToPartsFormatter( "USD" );

formatter( 9.99 );
// > [
//   { "type": "currency", "value": "$" },
//   { "type": "integer", "value": "9" },
//   { "type": "decimal", "value": "." },
//   { "type": "fraction", "value": "99" }
// ]
```

#### Instance Formatter

You can use the instance method `.currencyFormatter()`, which uses the instance locale.

```javascript
var deFormatter = Globalize( "de" ).currencyToPartsFormatter( "EUR" ),
  zhFormatter = Globalize( "zh" ).currencyToPartsFormatter( "EUR" );

deFormatter( 9.99 );
// > [
//   { "type": "integer", "value": "9" },
//   { "type": "decimal", "value": "," },
//   { "type": "fraction", "value": "99" },
//   { "type": "literal", "value": " " },
//   { "type": "currency", "value": "€" }
// ]

zhFormatter( 9.99 );
// > [
//   { "type": "currency", "value": "€" },
//   { "type": "integer", "value": "9" },
//   { "type": "decimal", "value": "." },
//   { "type": "fraction", "value": "99" }
// ]
```

The information is available separately and it can be formatted and concatenated again in a customized way. For example by using [`Array.prototype.map()`][], [arrow functions][], a [switch statement][], [template literals][], and [`Array.prototype.reduce()`][].

[`Array.prototype.map()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[arrow functions]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
[switch statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
[template literals]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[`Array.prototype.reduce()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

#### More Examples

Please, see [.currencyFormatter() example](./currency-formatter.md#example) for additional examples such as using alternative `symbolForm`, configuring `style` (symbol, accounting, and name styles), and the inherited number options (e.g., compact numbers).

#### Performance Suggestion

For improved performance on iterations, first create the formatter. Then, reuse it on each loop.

```javascript
var formatter = Globalize( "en" ).currencyToPartsFormatter( "USD" );

renderInvoice({
  prices: prices.map(function( price ) {
    return formatter( price );
  })
});
```
