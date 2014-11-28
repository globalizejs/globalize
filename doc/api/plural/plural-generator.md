## .pluralGenerator()

It supports the creation of internationalized messages with plural inflection by
returning a function that returns the value's plural group: `zero`, `one`,
`two`, `few`, `many`, or `other`.

The returned function has the same API of [`./plural( value )`](./plural.md).

### Example

Prior to using any plural method, you must load `supplemental/plurals.json`.
Read [CLDR content](../../../README.md#2-cldr-content) if you need more
information.

You can use the static method `Globalize.pluralGenerator()`, which uses the
default locale.

```javascript
var plural;

Globalize.locale( "en" );
plural = Globalize.pluralGenerator();

plural( 0 ); // "other"
plural( 1 ); // "one"
plural( 2 ); // "other"
```

You can use the instance method `.pluralGenerator()`, which uses the instance
locale.

```javascript
var plural = Globalize( "zh" ).pluralGenerator();

plural( 1 ); // "other"
```
