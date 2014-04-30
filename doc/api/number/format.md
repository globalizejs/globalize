## Globalize.formatNumber( value [, attributes] [, locale|cldr] )

Format a number `value` according to the given `attributes` and `[locale|cldr]` 
(locale string or [Cldr instance](https://github.com/rxaviers/cldrjs), or the
default locale if not specified).

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
> necessary.
>
> **minimumSignificantDigits** and **maximumSignificantDigits** Optional
>
> Positive integer Number values indicating the minimum and maximum fraction
> digits to be shown. Either none or both of these properties are present; if
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

**locale|cldr** Optional

Locale string or [Cldr instance](https://github.com/rxaviers/cldrjs) that
overrides default.

### Example

```javascript
Globalize.locale( "en" );
Globalize.formatNumber( 3.141592 );           // "3.142"
Globalize.formatNumber( 3.141592, {}, "es" ); // "3,142"
Globalize.formatNumber( 3.141592, {}, "ar" ); // "3٫142"
```

Controlling digits by specifying integer and fraction digits counts:

```
Globalize.formatNumber( 3.141592, { maximumFractionDigits: 2 } );
// "3.14"

Globalize.formatNumber( 1.5, { minimumFractionDigits: 2 } );
// "1.50"
```

Controlling digits by specifying significant digits counts:

```
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

equal( Globalize.formatNumber( 0.00012345, {
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 3
});
// "0.000123"
```

Using different rounding functions example:

```
Globalize.formatNumber( 3.141592, { maximumFractionDigits: 2, round: "ceil" } );
// "3.15"
```
