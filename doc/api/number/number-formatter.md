## .numberFormatter( attributes )

Return a function that formats a number according to the given attributes.

### Parameters

**attributes**

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

You can use the static method `Globalize.numberFormatter()`, which uses the
default locale.

```javascript
var formatter;

Globalize.locale( "en" );
formatter = Globalize.numberFormatter();

formatter( 3.141592 );           // "3.142"
```

You can use the instance method `.numberFormatter()`, which uses the instance
locale.

```javascript
var arFormatter = Globalize( "ar" ).numberFormatter(),
  esFormatter = Globalize( "es" ).numberFormatter();

arFormatter( 3.141592 ); // "3٫142"
esFormatter( 3.141592 ); // "3,142"
```

Controlling digits by specifying integer and fraction digits counts:

```javascript
Globalize.numberFormatter({ maximumFractionDigits: 2 })( 3.141592 );
// "3.14"

Globalize.numberFormatter({ minimumFractionDigits: 2 })( 1.5 );
// "1.50"
```

Controlling digits by specifying significant digits counts:

```javascript
var formatter = Globalize.numberFormatter({
  minimumSignificantDigits: 1,
  maximumSignificantDigits: 3
});

formatter( 3.141592 );
// "3.14"

formatter = Globalize.numberFormatter({
  minimumSignificantDigits: 1,
  maximumSignificantDigits: 3
});

formatter( 12345 );
// "12,300"

formatter = Globalize.numberFormatter({
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 3
});

formatter( 0.00012345 );
// "0.000123"
```

Using different rounding functions example:

```javascript
var formatter = Globalize.numberFormatter({
  maximumFractionDigits: 2,
  round: "ceil"
});

formatter( 3.141592 );
// "3.15"
```
