## Globalize.translate( path [, locale|cldr] )

Translate item given its path.

### Parameters
**path**

Translation item path.

**locale|cldr** Optional

Locale string or [Cldr instance](https://github.com/rxaviers/cldrjs) that
overrides default.

### Example

```javascript
Globalize.locale( "pt_BR" );
Globalize.translate( "greetings/bye" );
// ➡ "Tchau"
```
