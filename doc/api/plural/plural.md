## .plural( value )

It supports the creation of internationalized messages with plural inflection by
returning the value's plural group: `zero`, `one`, `two`, `few`, `many`, or
`other`. For comparison:

| | en (English) | ru (Russian) | ar (Arabic) |
| --- | --- | --- | --- |
| `.plural( 0 )` | `other` | `many` | `zero` |
| `.plural( 1 )` | `one` | `one` | `one` |
| `.plural( 2 )` | `other` | `few` | `two` |
| `.plural( 3 )` | `other` | `few` | `few` |
| `.plural( 5 )` | `other` | `many` | `few` |

See also its sibling method [`.formatPlural( value, messageData [, formatValue ])`
](./format-plural.md).

### Parameters

**value**

A Number for which to return the plural group.

### Example

Prior to using any plural method, you must load `supplemental/plurals.json`.
Read [CLDR content](../../../README.md#2-cldr-content) if you need more
information.

You can use the static method `Globalize.plural()`, which uses the default
locale.

```javascript
Globalize.locale( "en" );

Globalize.plural( 0 ); // "other"

Globalize.plural( 1 ); // "one"

Globalize.plural( 2 ); // "other"
```

You can use the instance method `.plural()`, which uses the instance locale.

```javascript
var zh = Globalize( "zh" );

zh.formatPlural( 1 ); // "other"
```
