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

See [`.currencyFormatter( currency [, options] )`](./currency-formatter.md) for
more examples.
