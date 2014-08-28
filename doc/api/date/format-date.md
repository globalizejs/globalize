## .formatDate( value, format )

Format a date `value` according to the given `format`.

### Parameters

**value**

Date instance to be formatted, eg. `new Date()`;

**format**

String value indicating a skeleton, eg. `"GyMMMd"`.

> Skeleton provides a more flexible formatting mechanism than the predefined
> list `full`, `long`, `medium`, or `short` represented by date, time, or
> datetime.  Instead, they are an open-ended list of patterns containing
> only [date
> field](http://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table)
> information, and in a canonical order. For example:
> 
> | locale | `"GyMMMd"` skeleton |
> | --- | --- |
> | *en* | `"Apr 9, 2014 AD"` |
> | *zh* | `"公元2014年4月9日"` |
> | *es* | `"9 abr. de 2014 d. C."` |
> | *ar* | `"9 أبريل، 2014 م"` |
> | *pt* | `"9 de abr de 2014 d.C."` |

Or, a JSON object including one of the following.

> **skeleton**
>
> String value indicating a skeleton (see description above), eg.
> `{ skeleton: "GyMMMd" }`.
>
> **date**
> One of the following String values: `full`, `long`, `medium`, or `short`, eg.
> `{ date: "full" }`. 
>
> **time**
> 
> One of the following String values: `full`, `long`, `medium`, or `short`, eg.
> `{ time: "full" }`.
>
> **datetime**
> 
> One of the following String values: `full`, `long`, `medium`, or `short`, eg.
> `{ datetime: "full" }`
>
> **pattern**
>
> String value indicating a
> [raw pattern](http://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table)
> eg. `{ pattern: "dd/mm" }`.
>
> Raw patterns are NOT recommended for i18n in general. Few specific cases may
> suite the need of using it, eg. locale-independent format for machine parsing.
>
> Use skeletons for i18n purposes.

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
var de = new Globalize( "de" );
de.formatDate( new Date( 2010, 10, 30, 17, 55 ), { datetime: "short" } );
// "30.11.10 17:55"
```

Comparison between different locales.

| locale | `Globalize.formatDate( new Date( 2010, 10, 1, 17, 55 ), { datetime: "short" } )` |
| --- | --- |
| *en* | `"11/1/10, 5:55 PM"` |
| *en_GB* | `"01/11/2010 17:55"` |
| *de* | `"01.11.10 17:55"` |
| *zh* | `"10/11/1 下午5:55"` |
| *ar* | `"1‏/11‏/2010 5:55 م"` |
| *pt* | `"01/11/10 17:55"` |
| *es* | `"1/11/10 17:55"` |


