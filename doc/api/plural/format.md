## .formatPlural( value, messageData )

It supports the creation of internationalized messages with plural inflection by
returning the appropriate message based on value's plural group: `zero`, `one`,
`two`, `few`, `many`, or `other`.

### Parameters

**value**

A Number for which the plural message should be formatted for.

**messageData**

JSON object with message data.

### Example

```javascript
var messageData = {
  one: "You have 1 unread message",
  other: "You have {0} unread messages"
};
Globalize.locale( "en" );
Globalize.plural( 0, messageData ); // "You have {0} unread messages"
Globalize.plural( 1, messageData ); // "You have 1 unread message"
Globalize.plural( 2, messageData ); // "You have {0} unread messages"

// FIXME

messageData = {
  zero:
  one:
  two:
  few:
  many:
  other:
};
Globalize( "ar" ).plural( 0, messageData ); // "zero"
Globalize( "ar" ).plural( 1, messageData ); // "one"
Globalize( "ar" ).plural( 2, messageData ); // "two"
Globalize( "ar" ).plural( 3, messageData ); // "few"

messageData = {
  few:
  many:
  one:
  other:
};
Globalize( "ru" ).plural( 0, messageData ); // "many"
Globalize( "ru" ).plural( 1, messageData ); // "one"
Globalize( "ru" ).plural( 2, messageData ); // "few"
```
