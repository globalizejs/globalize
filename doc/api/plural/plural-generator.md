## .pluralGenerator( [options] ) ➜ function( value )

It supports the creation of internationalized messages with plural inflection by
returning a function that returns the value's plural group: `zero`, `one`,
`two`, `few`, `many`, or `other`.

The returned function is invoked with one argument: the Number `value` for which
to return the plural group.

### Parameters

**options** Optional

A JSON object including none or any of the following options.

> **type** Optional
>
> String `cardinal` (default), or `ordinal`.

**value**

A Number for which to return the plural group.

### Example

Prior to using any plural method, you must load either
`supplemental/plurals.json` for cardinals or `supplemental/ordinals.json` for
ordinals.

Read [CLDR content][] if you need more information.

[CLDR content]: ../../../README.md#2-cldr-content

You can use the static method `Globalize.pluralGenerator()`, which uses the
default locale.

```javascript
var plural;

Globalize.locale( "en" );

// Cardinals
plural = Globalize.pluralGenerator();

plural( 0 );
// > "other"

plural( 1 );
// > "one"

plural( 2 );
// > "other"

// Ordinals
plural = Globalize.pluralGenerator({ type: "ordinal" });

plural( 0 );
// > "other"

plural( 1 );
// > "one"

plural( 2 );
// > "two"
```

You can use the instance method `.pluralGenerator()`, which uses the instance
locale.

```javascript
var plural = Globalize( "zh" ).pluralGenerator();

plural( 1 );
// > "other"
```

For comparison (cardinals):

| | en (English) | ru (Russian) | ar (Arabic) |
| --- | --- | --- | --- |
| `plural( 0 )` | `other` | `many` | `zero` |
| `plural( 1 )` | `one` | `one` | `one` |
| `plural( 2 )` | `other` | `few` | `two` |
| `plural( 3 )` | `other` | `few` | `few` |
| `plural( 5 )` | `other` | `many` | `few` |

For comparison (ordinals):

| | en (English) | ru (Russian) | ar (Arabic) |
| --- | --- | --- | --- |
| `plural( 0, { type: "ordinal" } )` | `other` | `other` | `other` |
| `plural( 1, { type: "ordinal" } )` | `one` | `other` | `other` |
| `plural( 2, { type: "ordinal" } )` | `two` | `other` | `other` |
| `plural( 3, { type: "ordinal" } )` | `few` | `other` | `other` |
| `plural( 5, { type: "ordinal" } )` | `other` | `other` | `other` |
