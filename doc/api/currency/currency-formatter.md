## .currencyFormatter( currency [, options] ) ➜ function( value )

Return a function that formats a `currency` according to the given `options` or locale's defaults.

The returned function is invoked with one argument: the Number `value` to be formatted.

### Parameters

#### currency

3-letter currency code as defined by ISO 4217, eg. `"USD"`.

#### options.style

Optional. String `"symbol"` (default), `"accounting"`, `"code"` or `"name"`. See [`.numberFormatter( [options] )`](../number/number-formatter.md)  for more options.

#### value

Number to be formatted, eg. `9.99`.

### Example

#### Static Formatter

Prior to using any currency methods, you must load `cldr/main/{locale}/currencies.json`, `cldr/supplemental/currencyData.json`, and the CLDR content required by the number module. If using plural messages, you also must load the CLDR content required by the plural module. Read [CLDR content][] if you need more information.

[CLDR content]: ../../../README.md#2-cldr-content

#### Using the default options

You can use the static method `Globalize.currencyFormatter()`, which uses the default locale.

```javascript
var formatter;

Globalize.locale( "en" );
formatter = Globalize.currencyFormatter( "USD" );

formatter( 9.99 );
// > "$9.99"
```

#### Instance Formatter

You can use the instance method `.currencyFormatter()`, which uses the instance locale.

```javascript
var deFormatter = Globalize( "de" ).currencyFormatter( "EUR" ),
  zhFormatter = Globalize( "zh" ).currencyFormatter( "EUR" );

deFormatter( 9.99 );
// > "9,99 €"

zhFormatter( 9.99 );
// > "€ 9.99"

```

For comparison, follow the formatting output of different symbols in different locales.

| 3-letter currency code             | en (English) | de (German) | zh (Chinese) |
| ---------------------------------- | ------------ | ----------- | ------------ |
| `.currencyFormatter( "USD" )( 1 )` | `$1.00`      | `1,00 $`    | `US$ 1.00`   |
| `.currencyFormatter( "EUR" )( 1 )` | `€1.00`      | `1,00 €`    | `€ 1.00`     |
| `.currencyFormatter( "CNY" )( 1 )` | `CN¥1.00`    | `1,00 CN¥`  | `￥ 1.00`     |
| `.currencyFormatter( "JPY" )( 1 )` | `¥1`         | `1 ¥`       | `JP¥ 1`      |
| `.currencyFormatter( "GBP" )( 1 )` | `£1.00`      | `1,00 £`    | `£ 1.00`     |
| `.currencyFormatter( "BRL" )( 1 )` | `R$1.00`     | `1,00 R$`   | `R$ 1.00`    |

#### Using alternative `options.symbolForm`

Using the narrow symbol form, the same symbols may be used for multiple currencies. Thus the symbol may be ambiguous, and should only be used where the context is clear.

```js
Globalize( "en" ).currencyFormatter( "HKD" )( 1 );
// > "HK$1.00"

Globalize( "en" ).currencyFormatter( "HKD", { symbolForm: "narrow" } )( 1 );
// > "$1.00"
```

#### Configuring style

For the accounting variation of the symbol format, use `style: "accounting"`.

```javascript
var formatter = Globalize( "en" ).currencyFormatter( "USD", {
  style: "accounting"
});

formatter( -1 );
// > "($1.00)"
```

For plural messages, use `style: "name"`.

```javascript
var formatter = Globalize( "en" ).currencyFormatter( "USD", {
  style: "name"
});

formatter( 0 );
// > "0.00 US dollars"

formatter( 1 );
// > "1.00 US dollar"
```

For comparison, follow the formatting output of different symbols in different locales using the plural messages `Globalize( locale ).currencyFormatter( currency, { style: "name" } )( 1 )`.

| 3-letter currency code | en (English)                  | de (German)                      | zh (Chinese) |
| ---------------------- | ----------------------------- | -------------------------------- | ------------ |
| `USD`                  | `1.00 US dollar`              | `1,00 US-Dollar`                 | `1.00美元`     |
| `EUR`                  | `1.00 euro`                   | `1,00 Euro`                      | `1.00欧元`     |
| `CNY`                  | `1.00 Chinese yuan`           | `1,00 Chinesischer Yuan`         | `1.00人民币`    |
| `JPY`                  | `1 Japanese yen`              | `1 Japanischer Yen`              | `1日元`        |
| `GBP`                  | `1.00 British pound sterling` | `1,00 Britisches Pfund Sterling` | `1.00英镑`     |
| `BRL`                  | `1.00 Brazilian real`         | `1,00 Brasilianischer Real`      | `1.00巴西雷亚尔`  |

For the international currency code, use `style: "code"`.

```javascript
var formatter = Globalize( "en" ).currencyFormatter( "USD", {
  style: "code"
});

formatter( 9.99 );
// > "9.99 USD"
```

#### Configuring inherited number options

Override the number of digits, grouping separators, rounding function or any other [`.numberFormatter()` options](../number/number-formatter.md).

```javascript
var formatter;

Globalize.locale( "en" );
formatter = Globalize.currencyFormatter( "USD", {
  minimumFractionDigits: 0,
  style: "name"
});

formatter( 1 );
// > "1 US dollar"

formatter = Globalize.currencyFormatter( "USD", {
  round: "ceil"
});

formatter( 1.491 );
// > "$1.50"
```

#### Formatting Compact Currencies

```js
var shortFormatter = Globalize( "en" ).currencyFormatter( "USD", {
  compact: "short"
});

var longFormatter = Globalize( "en" ).currencyFormatter( "USD", {
  compact: "long"
});

shortFormatter( 12830000000 );
// > "$13B"

longFormatter( 12830000000 );
// > "$13 billion"
```

The minimumSignificantDigits and maximumSignificantDigits options are specially useful to control the number of digits to display.

```js
Globalize( "en" ).formatCurrency( 12830000000, "USD", {
  compact: "short",
  minimumSignificantDigits: 3,
  maximumSignificantDigits: 3
});
// > "$12.8B"
```

#### Performance Suggestion

For improved performance on iterations, first create the formatter. Then, reuse it on each loop.

```javascript
var formatter = Globalize( "en" ).currencyFormatter( "USD" );

renderInvoice({
  prices: prices.map(function( price ) {
    return formatter( price );
  })
});
```
