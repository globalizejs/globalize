## .formatNumber( value [, attributes] )

Format a number `value` according to the given `attributes`.

### Parameters

**value**

Number to be formatted, eg. `3.14`.

**attributes** Optional

A JSON object including none or any of the following attributes.

> **style** Optional
>
> String `decimal` (default), or `percent`.
>
> **minimumIntegerDigits** Optional
>
> Non-negative integer Number value indicating the minimum integer digits to be
> used. Numbers will be padded with leading zeroes if necessary.
>
> **minimumFractionDigits** and **maximumFractionDigits** Optional
>
> Non-negative integer Number values indicating the minimum and maximum fraction
> digits to be used. Numbers will be rounded or padded with trailing zeroes if
> necessary. Either one or both of these properties must be present. If they
> are, they will override minimum and maximum fraction digits derived from the
> CLDR patterns.
>
> **minimumSignificantDigits** and **maximumSignificantDigits** Optional
>
> Positive integer Number values indicating the minimum and maximum fraction
> digits to be shown. Either none or both of these properties are present. If
> they are, they override minimum and maximum integer and fraction digits. The
> formatter uses however many integer and fraction digits are required to
> display the specified number of significant digits.
>
> **round** Optional
>
> String with rounding method `ceil`, `floor`, `round` (default), or `truncate`.
>
> **useGrouping** Optional
>
> Boolean (default is true) value indicating whether a grouping separator should
> be used.

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
  es = new Globalize( "es" );

ar.formatNumber( 3.141592 ); // "3٫142"
es.formatNumber( 3.141592 ); // "3,142"
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
