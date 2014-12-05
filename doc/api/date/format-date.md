## .formatDate( value, pattern )

Format a date `value` according to the given `pattern`.

*Important:* Use [`.dateFormatter( pattern )`](./date-formatter.md) instead when
formatting more then one date, for improved performance.

### Parameters

**value**

Date instance to be formatted, eg. `new Date()`;

**pattern**

See [.dateFormatter( pattern )](./date-formatter.md).

### Example

You can use the static method `Globalize.formatDate()`, which uses the default
locale.

```javascript
Globalize.locale( "en" );
Globalize.formatDate( new Date( 2010, 10, 30, 17, 55 ), { datetime: "short" } );
// "11/30/10, 5:55 PM"
```

You can use the instance method `.formatDate()`, which uses the instance locale.

```javascript
var ar = new Globalize( "ar" );
ar.formatDate( new Date( 2010, 10, 30, 17, 55 ), { datetime: "short" } );
// "٣٠‏/١١‏/٢٠١٠ ٥،٥٥ م"
```

Comparison between different locales.

| locale | `Globalize.formatDate( new Date( 2010, 10, 1, 17, 55 ), { datetime: "short" } )` |
| --- | --- |
| *en* | `"11/1/10, 5:55 PM"` |
| *en_GB* | `"01/11/2010 17:55"` |
| *zh* | `"10/11/1 下午5:55"` |
| *zh-u-nu-native* | `"一〇/一一/一 下午五:五五"` |
| *es* | `"1/11/10 17:55"` |
| *de* | `"01.11.10 17:55"` |
| *pt* | `"01/11/10 17:55"` |
| *ar* | `"١‏/١١‏/٢٠١٠ ٥،٥٥ م"` |
