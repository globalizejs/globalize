## .dateFormatter( format )

Return a function that formats a date according to the given `format`.

### Parameters

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

You can use the static method `Globalize.dateFormatter()`, which uses the default
locale.

```javascript
var formatter;

Globalize.locale( "en" );
formatter = Globalize.dateFormatter({ datetime: "short" });

formatter( new Date( 2010, 10, 30, 17, 55 ) );
// "11/30/10, 5:55 PM"
```

You can use the instance method `.dateFormatter()`, which uses the instance locale.

```javascript
var deFormatter = Globalize( "de" ).dateFormatter({ datetime: "short" });

deFormatter( new Date( 2010, 10, 30, 17, 55 ) );
// "30.11.10 17:55"
```
