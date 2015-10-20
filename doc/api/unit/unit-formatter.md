## .unitFormatter( unit, options ) ➜ function( value )

Returns a function that formats a unit according to the given unit, options, and the
default/instance locale.

The returned function is invoked with one argument: the number `value` to
be formatted.

### Parameters

**unit**

String value indicating the unit to be formatted. eg. "day", "week", "month", etc.
Could also be a compound unit, eg. "mile-per-hour" or "mile/hour"

**options**

- form: [String] eg. "long", "short" or "narrow".

- numberFormatter: [Function] a number formatter function. Defaults to Globalize
  `.numberFormatter()` for the current locale using the default options.

**value**

The number to be formatted.

### Example

Prior to using any unit methods, you must load `cldr/main/{locale}/units.json` and the
CLDR content required by the plural module. Read [CLDR content][] if you need
more information.

[CLDR content]: ../../../README.md#2-cldr-content

You can use the static method `Globalize.unitFormatter()`, which uses the default
locale.

```javascript
var customNumberFormatter, formatter;

Globalize.locale( "en" );
formatter = Globalize.unitFormatter( "month", { form: "long" } );

formatter( 1 );
// > "1 month"

formatter( 3 );
// > "3 months"

formatter( 3000 );
// > "3,000 months"
```

You can pass a custom number formatter to format the number of units.

```javascript
var customNumberFormatter, formatter;

Globalize.locale( "en" );
customNumberFormatter = Globalize.numberFormatter({ useGrouping = false })
formatter = Globalize.unitFormatter( "mile-per-hour", {
	form: "narrow", numberFormatter: customNumberFormatter
} );

formatter(5000)
// > "5000mph"
```

You can use the instance method `.unitFormatter()`, which uses the instance locale.

```javascript
var globalize = new Globalize( "en" ),
	formatter = globalize.unitFormatter( "mile-per-hour", { form: "narrow" } );

formatter( 10 );
// > "10mph"
```
