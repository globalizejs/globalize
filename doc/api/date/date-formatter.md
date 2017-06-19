## .dateFormatter( [options] ) ➜ function( value )

Return a function that formats a date according to the given `options`. The default formatting is numeric year, month, and day (i.e., `{ skeleton: "yMd" }`.

The returned function is invoked with one argument: the Date instance `value` to be formatted.

### Parameters

#### options.skeleton

String value indicating a skeleton (see description above), eg. `{ skeleton: "GyMMMd" }`.

Skeleton provides a more flexible formatting mechanism than the predefined list `full`, `long`, `medium`, or `short` represented by date, time, or datetime. Instead, they are an open-ended list of patterns containing only date field information, and in a canonical order. For a complete list of skeleton patterns [check the unicode CLDR documentation](http://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).

For example:

| locale | `"GyMMMd"` skeleton       |
| ------ | ------------------------- |
| *en*   | `"Apr 9, 2014 AD"`        |
| *zh*   | `"公元2014年4月9日"`           |
| *es*   | `"9 abr. de 2014 d. C."`  |
| *ar*   | `"٩ أبريل، ٢٠١٤ م"`       |
| *pt*   | `"9 de abr de 2014 d.C."` |

#### options.date

One of the following String values: `full`, `long`, `medium`, or `short`, eg., `{ date: "full" }`.

#### options.time

One of the following String values: `full`, `long`, `medium`, or `short`, eg., `{ time: "full" }`.

#### options.datetime

One of the following String values: `full`, `long`, `medium`, or `short`, eg., `{ datetime: "full" }`.

#### options.raw

String value indicating a machine [raw pattern (anything in the "Sym." column)](http://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table) eg. `{ raw: "dd/mm" }`. Note this is NOT recommended for i18n in general. Use `skeleton` instead.

#### options.timeZone

String based on the time zone names of the [IANA time zone database](https://www.iana.org/time-zones), such as `"Asia/Shanghai"`, `"Asia/Kolkata"`, `"America/New_York"`.

#### value

Date instance to be formatted, eg. `new Date()`;

### Example

Prior to using any date methods, you must load `cldr/main/{locale}/ca-gregorian.json`, `cldr/main/{locale}/timeZoneNames.json`, `cldr/supplemental/metaZones.json`, `cldr/supplemental/timeData.json`, `cldr/supplemental/weekData.json`, and the CLDR content required by the number module. Read [CLDR content][] if you need more information.

[CLDR content]: ../../../README.md#2-cldr-content

```javascript
var formatter;

Globalize.locale( "en" );
formatter = Globalize.dateFormatter();

formatter( new Date( 2010, 10, 30, 17, 55 ) );
// > "11/30/2010"
```

You can use the instance method `.dateFormatter()`, which uses the instance locale.

```javascript
var enFormatter = Globalize( "en" ).dateFormatter(),
  deFormatter = Globalize( "de" ).dateFormatter();

enFormatter( new Date( 2010, 10, 30, 17, 55 ) );
// > "11/30/2010"

deFormatter( new Date( 2010, 10, 30, 17, 55 ) );
// > "30.11.2010"
```

#### Using short, medium, long, and full presets

Use convenient presets for `date`, `time`, or `datetime`. Their possible values are: `short`, `medium`, `long`, and `full`.

| `presetValue`            | `Globalize( "en" ).dateFormatter( presetValue )( new Date( 2010, 10, 1, 17, 55 ) )` |
| ------------------------ | ---------------------------------------- |
| `{ date: "short" }`      | `"11/1/10"`                              |
| `{ date: "medium" }`     | `"Nov 1, 2010"`                          |
| `{ date: "long" }`       | `"November 1, 2010"`                     |
| `{ date: "full" }`       | `"Monday, November 1, 2010"`             |
| `{ time: "short" }`      | `"5:55 PM"`                              |
| `{ time: "medium" }`     | `"5:55:00 PM"`                           |
| `{ time: "long" }`       | `"5:55:00 PM PST"`                       |
| `{ time: "full" }`       | `"5:55:00 PM Pacific Standard Time"`     |
| `{ datetime: "short" }`  | `"11/1/10, 5:55 PM"`                     |
| `{ datetime: "medium" }` | `"Nov 1, 2010, 5:55:00 PM"`              |
| `{ datetime: "long" }`   | `"November 1, 2010 at 5:55:00 PM PST"`   |
| `{ datetime: "full" }`   | `"Monday, November 1, 2010 at 5:55:00 PM Pacific Standard Time"` |

For comparison, follow the same formatter `{ datetime: "short" }` on different locales.

| locale           | `Globalize( locale ).dateFormatter({ datetime: "short" })( new Date( 2010, 10, 1, 17, 55 ) )` |
| ---------------- | ---------------------------------------- |
| *en*             | `"11/1/10, 5:55 PM"`                     |
| *en_GB*          | `"01/11/2010 17:55"`                     |
| *zh*             | `"10/11/1 下午5:55"`                       |
| *zh-u-nu-native* | `"一〇/一一/一 下午五:五五"`                       |
| *es*             | `"1/11/10 17:55"`                        |
| *de*             | `"01.11.10 17:55"`                       |
| *pt*             | `"01/11/10 17:55"`                       |
| *ar*             | `"١‏/١١‏/٢٠١٠ ٥،٥٥ م"`                   |

#### Using open-ended skeletons

Use open-ended skeletons for more flexibility (see its description [above](#parameters)). See some examples below.

| `skeleton`                   | `Globalize( "en" ).dateFormatter( skeleton )( new Date( 2010, 10, 1, 17, 55 ) )` |
| ---------------------------- | ---------------------------------------- |
| `{ skeleton: "E" }`          | `"Tue"`                                  |
| `{ skeleton: "EHm" }`        | `"Tue 17:55"`                            |
| `{ skeleton: "EHms" }`       | `"Tue 17:55:00"`                         |
| `{ skeleton: "Ed" }`         | `"30 Tue"`                               |
| `{ skeleton: "Ehm" }`        | `"Tue 5:55 PM"`                          |
| `{ skeleton: "Ehms" }`       | `"Tue 5:55:00 PM"`                       |
| `{ skeleton: "Gy" }`         | `"2010 AD"`                              |
| `{ skeleton: "GyMMM" }`      | `"Nov 2010 AD"`                          |
| `{ skeleton: "GyMMMEd" }`    | `"Tue, Nov 30, 2010 AD"`                 |
| `{ skeleton: "GyMMMd" }`     | `"Nov 30, 2010 AD"`                      |
| `{ skeleton: "H" }`          | `"17"`                                   |
| `{ skeleton: "Hm" }`         | `"17:55"`                                |
| `{ skeleton: "Hms" }`        | `"17:55:00"`                             |
| `{ skeleton: "M" }`          | `"11"`                                   |
| `{ skeleton: "MEd" }`        | `"Tue, 11/30"`                           |
| `{ skeleton: "MMM" }`        | `"Nov"`                                  |
| `{ skeleton: "MMMEd" }`      | `"Tue, Nov 30"`                          |
| `{ skeleton: "MMMd" }`       | `"Nov 30"`                               |
| `{ skeleton: "Md" }`         | `"11/30"`                                |
| `{ skeleton: "d" }`          | `"30"`                                   |
| `{ skeleton: "h" }`          | `"5 PM"`                                 |
| `{ skeleton: "hm" }`         | `"5:55 PM"`                              |
| `{ skeleton: "hms" }`        | `"5:55:00 PM"`                           |
| `{ skeleton: "ms" }`         | `"55:00"`                                |
| `{ skeleton: "y" }`          | `"2010"`                                 |
| `{ skeleton: "yM" }`         | `"11/2010"`                              |
| `{ skeleton: "yMEd" }`       | `"Tue, 11/30/2010"`                      |
| `{ skeleton: "yMMM" }`       | `"Nov 2010"`                             |
| `{ skeleton: "yMMMEd" }`     | `"Tue, Nov 30, 2010"`                    |
| `{ skeleton: "yMMMd" }`      | `"Nov 30, 2010"`                         |
| `{ skeleton: "yMd" }`        | `"11/30/2010"`                           |
| `{ skeleton: "yQQQ" }`       | `"Q4 2010"`                              |
| `{ skeleton: "yQQQQ" }`      | `"4th quarter 2010"`                     |
| `{ skeleton: "GyMMMEdhms" }` | `"Tue, Nov 30, 2010 AD, 5:55:00 PM"`     |
| `{ skeleton: "Ehms" }`       | `"Tue 5:55:00 PM"`                       |
| `{ skeleton: "yQQQHm" }`     | `"Q4 2010, 17:55"`                       |
| `{ skeleton: "MMMEdhm" }`    | `"Tue, Nov 30, 5:55 PM"`                 |
| `{ skeleton: "yMMMdhm" }`    | `"Nov 30, 2010, 5:55 PM"`                |


```javascript
var globalize = Globalize( "en" ),
  date = new Date( 2010, 10, 30, 17, 55 ),
  monthDayFormatter = globalize.dateFormatter({ skeleton: "MMMd" }),
  hourMinuteSecondFormatter = globalize.dateFormatter({ skeleton: "Hms" });

monthDayFormatter( date );
// > "Nov 30"

hourMinuteSecondFormatter( date );
// > "17:55:00"
```

#### Using time zones

Using specific timeZones, i.e., using `options.timezone`. Note that prior to using it, you must load IANA time zone data.

```js
Globalize.loadTimeZone( require( "iana-tz-data" ) );
```

```js
Globalize.locale( "en" );

Globalize.dateFormatter({ datetime: "medium", timeZone: "America/Los_Angeles" })( new Date() );
// > "Nov 1, 2010, 12:55:00 PM"

Globalize.dateFormatter({ datetime: "medium", timeZone: "America/Sao_Paulo" })( new Date() )
// > "Nov 1, 2010, 5:55:00 PM"

Globalize.dateFormatter({ datetime: "full", timeZone: "Europe/Berlin" })( new Date() )
// > "Monday, November 1, 2010 at 8:55:00 PM Central European Standard Time"
```

#### Note on performance

For improved performance on iterations, first create the formatter. Then, reuse it on each loop.

```javascript
// In an application, this array could have a few hundred entries
var dates = [ new Date( 2010, 10, 30, 17, 55 ), new Date( 2015, 3, 18, 4, 25 ) ];
var formatter = Globalize( "en" ).dateFormatter({ time: "short" });

var formattedDates = dates.map(function( date ) {
  return formatter( date );
});
// > Array [ "5:55 PM", "4:25 AM" ]
```
