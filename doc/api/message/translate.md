## .translate( path )

Translate item given its path.

### Parameters
**path**

Translation item path.

### Example

You can use the static method `Globalize.translate()`, which uses the default
locale.

```javascript
Globalize.locale( "pt_BR" );
Globalize.translate( "greetings/bye" );
// ➡ "Tchau"
```

You can use the instance method `.translate()`, which uses the instance locale.

```javascript
var ptBr = new Globalize( "pt-BR" );
ptBr.translate( "greetings/bye" );
// ➡ "Tchau"
```
