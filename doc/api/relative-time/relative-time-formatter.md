## .relativeTimeFormatter( unit[, options ]) ➜ function( value )

Returns a function that formats a relative time according to the given unit, options, and the
default/instance locale.

The returned function is invoked with one argument: the number `value` to
be formatted.

### Parameters

**unit**

String value indicating the unit to be formatted. eg. "day", "week", "month", etc.

**options**

- form: [String] eg. "short" or "narrow". Or falsy for default long form
- maximumWordOffset [Optional Number] The maximum offset when special offset words like
  yesterday and tomorrow will be looked for. Some languages provide several of these.
  default null -> use all available
  Set to 0 to not use any except today, now etc.

**value**

The number to be formatted.


### Example

Prior to using any relative time methods, you must load
`cldr/main/{locale}/dateFields.json` and the
CLDR content required by the number and plural modules. Read [CLDR content][] if you need
more information.

[CLDR content]: ../../../README.md#2-cldr-content

You can use the static method `Globalize.relativeTimeFormatter()`, which uses the default
locale.

```javascript
var formatter;

Globalize.locale( "en" );
formatter = Globalize.relativeTimeFormatter( 'month' );

formatter( 1 ); // "next month"
formatter( 3 ); // "in 3 months"
formatter( -1 ); // "last month"
formatter( -3 ); // "3 months ago"
```

