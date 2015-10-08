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
var formatter;

Globalize.locale( "en" );
formatter = Globalize.unitFormatter( "month", { form: "long" } );

formatter( 1 );
// > "1 month"

formatter( 3 );
// > "3 months"
```

You can use the instance method `.relativeTimeFormatter()`, which uses the instance locale.

```javascript
var globalize = new Globalize( "en" ),
	formatter = globalize.relativeTimeFormatter( "mile-per-hour", { form: "narrow" } );

formatter( 10 );
// > "10mph"
```
