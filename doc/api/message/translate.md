## .translate( path )

Translate item given its path.

For translation inheritance, see the [Example section of
.loadTranslations()](./load-translation.md#example).

### Parameters
**path**

String or Array containing the translation item path, eg. `"greetings/bye"`, or
`[ "greetings", "bye" ]`.

### Example

You can use the static method `Globalize.translate()`, which uses the default
locale.

```javascript
Globalize.loadTranslations({
  greetings: {
    bye: "Tchau"
  }
});

Globalize.locale( "pt-BR" );
Globalize.translate( "greetings/bye" );
// ➡ "Tchau"
```

You can use the instance method `.translate()`, which uses the instance locale.

```javascript
var ptBr = new Globalize( "pt-BR" );
ptBr.translate( "greetings/bye" );
// ➡ "Tchau"
```
