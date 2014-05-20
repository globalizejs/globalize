## [new] Globalize( locale|cldr )

Create a Globalize instance.

**locale|cldr**

Locale string or [Cldr instance](https://github.com/rxaviers/cldrjs) of the
instance.

### Example

```javascript
var en = new Globalize( "en" );

// You can optionally omit the `new` operator.
var pt = Globalize( "pt" );

en.formatNumber( 3.1415 ); // 3.142
pt.formatNumber( 3.1415 ); // 3,142
```
