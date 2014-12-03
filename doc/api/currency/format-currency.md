## .formatCurrency( value, currency [, options] )

Format a currency ( `value`, `currency` ) according to the given `options`.

*Important*: Use [`.currencyFormatter( currency [, options]
)`](./currency-formatter.md) instead when formatting more then one number, for
improved performance.

### Parameters

**value**

Number to be formatted, eg. `9.99`.

**currency**

3-letter currency code as defined by ISO 4217, eg. `USD`.

**options** Optional

See [`.currencyFormatter( currency [, options] )`](./currency-formatter.md).

### Example

You can use the static method `Globalize.formatCurrency()`, which uses the default
locale.

```javascript
Globalize.locale( "en" );
Globalize.formatCurrency( 1, "USD" );           // "$9.99"
Globalize.formatCurrency( 1, "EUR" );           // "€9.99"
```

You can use the instance method `.formatCurrency()`, which uses the instance
locale.

```javascript
var de = new Globalize( "de" );

de.formatCurrency( 9.99, "USD" ); // "9,99 $"
de.formatCurrency( 9.99, "EUR" ); // "9,99 €"
```

For comparison, follow the formatting output of different symbols in different
locales.

| 3-letter currency code | en (English) | de (German) | zh (Chinese) |
| --- | --- | --- | --- |
| `.formatCurrency( 1, "USD" )` | `$1.00` | `1,00 $` | `US$ 1.00` |
| `.formatCurrency( 1, "EUR" )` | `€1.00` | `1,00 €` | `€ 1.00` |
| `.formatCurrency( 1, "CNY" )` | `CN¥1.00` | `1,00 CN¥` | `￥ 1.00` |
| `.formatCurrency( 1, "JPY" )` | `¥1` | `1 ¥` | `JP¥ 1` |
| `.formatCurrency( 1, "GBP" )` | `£1.00` | `1,00 £` | `£ 1.00` |
| `.formatCurrency( 1, "BRL" )` | `R$1.00` | `1,00 R$`  | `R$ 1.00` |

For the accounting variation of the symbol format, use `style: "accounting"`.

```javascript
Globalize.formatNumber( -1, "USD", { style: "accounting" } );
// "($1.00)"
```

For plural messages, use `style: "name"`.

```javascript
Globalize.formatNumber( 0, "USD", { style: "name" } );
// "0.00 US dollars"

Globalize.formatNumber( 1, "USD", { style: "name" } );
// "1.00 US dollar"
```

For comparison, follow the formatting output of different symbols in different
locales using the plural messages `Globalize( locale ).formatCurrency( 1,
currency, { style: "name" } )`.

| 3-letter currency code | en (English) | de (German) | zh (Chinese) |
| --- | --- | --- | --- |
| `USD` | `1.00 US dollar` | `1,00 US-Dollar` | `1.00美元` |
| `EUR` | `1.00 euro` | `1,00 Euro` | `1.00欧元` |
| `CNY` | `1.00 Chinese yuan` | `1,00 Chinesischer Yuan` | `1.00人民币` |
| `JPY` | `1 Japanese yen` | `1 Japanischer Yen` | `1日元` |
| `GBP` | `1.00 British pound sterling` | `1,00 Britisches Pfund Sterling` | `1.00英镑` |
| `BRL` | `1.00 Brazilian real` | `1,00 Brasilianischer Real` | `1.00巴西雷亚尔` |

For the international currency code, use `style: "code"`.

```javascript
Globalize.formatNumber( 9.99, "USD", { style: "code" } );
// "9.99 USD"
```

Globalize uses Supplemental Currency Data 

Override the number of digits, grouping separators, rounding function or any
other [`.numberFormatter()` options](../number/number-formatter.md).

```javascript
Globalize.formatCurrency( 1, "USD", {
  minimumFractionDigits: 0,
  style: "name"
});
// "1 US dollar"

Globalize.formatCurrency( 1.491, "USD", {
  round: "ceil"
});
// "$1.50"

```
