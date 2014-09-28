## Globalize.parseNumber( value [, options] )

Parse a string representing a number taking into account the localized symbols.
If value is invalid, `NaN` is returned.

*Important*: Use [`.numberParser( [options] )`](./number-parser.md) instead when
parsing more then one number, for improved performance.

### Parameters

**value**

String with number to be parsed, eg. `"3.14"`.

**options** Optional

See [`.numberParser( [options] )`](./number-parser.md).

### Example

You can use the static method `Globalize.parseNumber()`, which uses the default
locale.

```javascript
Globalize.locale( "en" );
Globalize.parseNumber( "3.14" ); // 3.14

Globalize.locale( "es" );
Globalize.parseDate( "3,14" ); // 3.14
```

You can use the instance method `.parseNumber()`, which uses the instance locale.

```javascript
var es = new Globalize( "es" );
es.parseDate( "3,14" ); // 3.14
```

Some more examples.

```javascript
Globalize.parseNumber( "12,735.00" ); // 12735
Globalize.parseNumber( "6.626E-34" ); // 6.626e-34
Globalize.parseNumber( "∞" ); // Infinity
Globalize.parseNumber( "invalid-stuff" ); // NaN
```
