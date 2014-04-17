## .formatPlural( value, messageData [, formatValue ] )

It supports the creation of internationalized messages with plural inflection by
returning the appropriate message based on value's plural group: `zero`, `one`,
`two`, `few`, `many`, or `other`.

See also its sibling method [`.plural( value )`](./plural.md).

### Parameters

**value**

A Number for which the plural message should be formatted for.

**messageData**

JSON object with message data.

**formatValue**

A Number or String to be used to replace `{0}` in the message. Defaults to
`value`. This optional parameter may be useful when providing a formatted Number
string.

### Example

Prior to using any plural method, you must load `supplemental/plurals.json`.
Read [CLDR content](../../../README.md#2-cldr-content) if you need more
information.

You can use the static method `Globalize.formatPlural()`, which uses the default
locale.

```javascript
var messageData = {
  one: "You have 1 unread message",
  other: "You have {0} unread messages"
};
Globalize.locale( "en" );

// "You have 0 unread messages"
Globalize.formatPlural( 0, messageData );

// "You have 1 unread message"
Globalize.formatPlural( 1, messageData );

// "You have 2 unread messages"
Globalize.formatPlural( 2, messageData );

// "You have 12,345 unread messages"
Globalize.formatPlural( 12345, messageData, Globalize.formatNumber( 12345 ) );
```

You can use the instance method `.formatPlural()`, which uses the instance
locale.

```javascript
var en = Globalize( "en" ),
  messageData = {
    one: "You have 1 unread message",
    other: "You have {0} unread messages"
  };

// "You have 0 unread messages"
en.formatPlural( 0, messageData );

// "You have 1 unread message"
en.formatPlural( 1, messageData );

// "You have 2 unread messages"
en.formatPlural( 2, messageData );

// "You have 12,345 unread messages"
en.formatPlural( 12345, messageData, en.formatNumber( 12345 ) );
```
