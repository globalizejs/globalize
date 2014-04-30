## .loadMessages( messageData )

Load message data for the default (or instance) locale.

### Parameters

**locale**

Locale string.

**messageData**

JSON object with message data;

### Example

You can use the static method `Globalize.loadMessages()`, which uses the default
locale.

```javascript
Globalize.locale( "pt_BR" );
Globalize.loadMessages({
  greetings: {
    hello: "Olá",
    bye: "Tchau"
  }
});
```

You can use the instance method `.loadMessages()`, which uses the instance locale.

```javascript
var ptBr = new Globalize( "pt-BR" );
ptBr.loadMessages({
  greetings: {
    hello: "Olá",
    bye: "Tchau"
  }
});
```
