## Globalize.loadMessages( locale, messageData )

Load message data per locale.

### Parameters

**locale**

Locale string.

**messageData**

JSON object with message data;

### Example

```javascript
Globalize.loadMessages( "pt_BR", {
  greetings: {
    hello: "Olá",
    bye: "Tchau"
  }
});
```
