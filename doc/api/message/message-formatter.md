## .messageFormatter( path ) ➡ function([ variables ])

Return a function that formats a message (using ICU message format pattern) given its path and a set of variables into a user-readable string. It supports pluralization and gender inflections.

Use [`Globalize.loadMessages( json )`](./load-messages.md) to load
messages data.

### Parameters

#### path

String or Array containing the path of the message content, eg., `"greetings/bye"`, or `[ "greetings", "bye" ]`.

#### variables

Optional. Variables can be Objects, where each property can be referenced by name inside a message; or Arrays, where each entry of the Array can be used inside a message, using numeric indices. When passing one or more arguments of other types, they're converted to an Array and used as such.

### Example

You can use the static method `Globalize.messageFormatter()`, which uses the default locale.

```javascript
var formatter;

Globalize.loadMessages({
  pt: {
    greetings: {
      bye: "Tchau"
    }
  }
});

Globalize.locale( "pt" );
formatter = Globalize.messageFormatter( "greetings/bye" );

formatter();
// > "Tchau"
```

You can use the instance method `.messageFormatter()`, which uses the instance locale.

```javascript
var pt = new Globalize( "pt" ),
  formatter = pt.messageFormatter( "greetings/bye" );

formatter();
// > "Tchau"
```

#### Simple Variable Replacement

```javascript
var formatter;

Globalize.loadMessages({
  en: {
    hello: "Hello, {0} {1} {2}",
    hey: "Hey, {first} {middle} {last}"
  }
});

formatter = Globalize( "en" ).messageFormatter( "hello" );

// Numbered variables using Array.
formatter([ "Wolfgang", "Amadeus", "Mozart" ]);
// > "Hello, Wolfgang Amadeus Mozart"

// Numbered variables using function arguments.
formatter( "Wolfgang", "Amadeus", "Mozart" );
// > "Hello, Wolfgang Amadeus Mozart"

// Named variables using Object key-value pairs.
formatter = Globalize( "en" ).messageFormatter( "hey" );
formatter({
  first: "Wolfgang",
  middle: "Amadeus",
  last: "Mozart"
});
// > "Hey, Wolfgang Amadeus Mozart"
```

#### Gender inflections

`select` can be used to format any message variations that works like a switch.

```javascript
var formatter;

// Note you can define multiple lines message using an Array of Strings.
Globalize.loadMessages({
  en: {
    party: [
      "{hostGender, select,",
      "  female {{host} invites {guest} to her party}",
      "    male {{host} invites {guest} to his party}",
      "   other {{host} invites {guest} to their party}",
      "}"
    ]
  }
});

formatter = Globalize( "en" ).messageFormatter( "party" );

formatter({
  guest: "Mozart",
  host: "Beethoven",
  hostGender: "male"
});
// > "Beethoven invites Mozart to his party"
```

#### Plural inflections

It uses the plural forms `zero`, `one`, `two`, `few`, `many`, or `other` (required). Note English only uses `one` and `other`. So, including `zero` will never get called, even when the number is 0. For more information see [`.pluralGenerator()`](../plural/plural-generator.md).

```javascript
var numberFormatter, taskFormatter,
  en = new Globalize( "en" );

// Note you can define multiple lines message using an Array of Strings.
Globalize.loadMessages({
  en: {
    task: [
      "You have {count, plural,",
      "    one {one task}",
      "  other {{formattedCount} tasks}",
      "} remaining"
    ]
  }
});

numberFormatter = en.numberFormatter();
taskFormatter = en.messageFormatter( "task" );

taskFormatter({
  count: 1000,
  formattedCount: numberFormatter( 1000 )
});
// > "You have 1,000 tasks remaining"
```

Literal numeric keys can be used in `plural` to match single, specific numbers.

```javascript
var taskFormatter,
  en = new Globalize( "en" );

// Note you can define multiple lines message using an Array of Strings.
Globalize.loadMessages({
  en: {
    task: [
      "You have {count, plural,",
      "     =0 {no tasks}",
      "    one {one task}",
      "  other {{formattedCount} tasks}",
      "} remaining"
    ]
  }
});

taskFormatter = Globalize( "en" ).messageFormatter( "task" );

taskFormatter({
  count: 0,
  formattedCount: en.numberFormatter( 0 )
});
// > "You have no tasks remaining"
```

You may find useful having the plural forms calculated with an offset applied.
Use `#` to output the resulting number. Note literal numeric keys do NOT use the
offset value.

```javascript
var likeFormatter,
  en = new Globalize( "en" );

Globalize.loadMessages({
  en: {
    likeIncludingMe: [
      "{0, plural, offset:1",
      "     =0 {Be the first to like this}",
      "     =1 {You liked this}",
      "    one {You and someone else liked this}",
      "  other {You and # others liked this}",
      "}"
    ]
  }
});

likeFormatter = Globalize( "en" ).messageFormatter( "likeIncludingMe" );

likeFormatter( 0 );
// > "Be the first to like this"

likeFormatter( 1 );
// > "You liked this"

likeFormatter( 2 );
// > "You and someone else liked this"

likeFormatter( 3 );
// > "You and 2 others liked this"
```

Read on [SlexAxton/messageFormatter.js][] for more information on regard of ICU MessageFormat.

[SlexAxton/messageFormatter.js]: https://github.com/SlexAxton/messageformat.js/#no-frills
