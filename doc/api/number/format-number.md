## .formatNumber( value [, options] )

Format a number `value` according to the given `options`.

*Important*: Use [`.numberFormatter( [options] )`](./number-formatter.md)
instead when formatting more then one number, for improved performance.

### Parameters

**value**

Number to be formatted, eg. `3.14`.

**options** Optional

See [`.numberFormatter( [options] )`](./number-formatter.md).

### Example

You can use the static method `Globalize.formatNumber()`, which uses the default
locale.

```javascript
Globalize.locale( "en" );
Globalize.formatNumber( 3.141592 );           // "3.142"
```

You can use the instance method `.formatNumber()`, which uses the instance
locale.

```javascript
var ar = new Globalize( "ar" ),
  es = new Globalize( "es" ),
  zh = new Globalize( "zh-u-nu-native" );

ar.formatNumber( 3.141592 ); // "٣٫١٤٢"
es.formatNumber( 3.141592 ); // "3,142"
zh.formatNumber( 3.141592 ); // "三.一四二"
```

Controlling digits by specifying integer and fraction digits counts:

```javascript
Globalize.formatNumber( 3.141592, { maximumFractionDigits: 2 } );
// "3.14"

Globalize.formatNumber( 1.5, { minimumFractionDigits: 2 } );
// "1.50"
```

Controlling digits by specifying significant digits counts:

```javascript
Globalize.formatNumber( 3.141592, {
  minimumSignificantDigits: 1,
  maximumSignificantDigits: 3
});
// "3.14"

Globalize.formatNumber( 12345, {
  minimumSignificantDigits: 1,
  maximumSignificantDigits: 3
});
// "12,300"

Globalize.formatNumber( 0.00012345, {
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 3
});
// "0.000123"
```

Using different rounding functions example:

```javascript
Globalize.formatNumber( 3.141592, { maximumFractionDigits: 2, round: "ceil" } );
// "3.15"
```
