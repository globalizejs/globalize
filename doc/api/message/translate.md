## Globalize.translate( path [, locale] )

Translate item given its path.

### Parameters
**path**

Translation item path.

**locale** Optional

Locale string that overrides default.

### Example

```javascript
Globalize.locale( "pt_BR" );
Globalize.translate( "greetings/bye" );
// ➡ "Tchau"
```
