## .loadMessages( json )

Load messages data.

The first level of keys must be locales. For example:

```
{
  en: {
    hello: "Hello"
  },
  pt: {
    hello: "Olá"
  }
}
```

ICU MessageFormat pattern is supported: variable replacement, gender and plural
inflections. For more information see [`.messageFormatter( path ) ➡ function([
variables ])`](./message-formatter.md).

The provided messages are stored along side other cldr data, under the
"globalize-messages" key. This allows Globalize to reuse the traversal methods
provided by cldrjs. You can inspect this data using
`cldrjs.get("globalize-messages")`.

### Parameters

**json**

JSON object of messages data. Keys can use any character, except `/`, `{` and
`}`. Values (i.e., the message content itself) can contain any character.

### Example

```javascript
Globalize.loadMessages({
  pt: {
    greetings: {
      hello: "Olá",
      bye: "Tchau"
    }
  }
});

Globalize( "pt" ).formatMessage( "greetings/hello" );
// > Olá
```

#### Multiline strings

Use Arrays as a convenience for multiline strings. The lines will be joined by a
space.

```javascript
Globalize.loadMessages({
  en: {
    longText: [
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non",
      "quis exercitationem culpa nesciunt nihil aut nostrum explicabo",
      "reprehenderit optio amet ab temporibus asperiores quasi cupiditate.",
      "Voluptatum ducimus voluptates voluptas?"
    ]
  }
});

Globalize( "en" ).formatMessage( "longText" );
// > "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?"
```

#### Messages inheritance

It's possible to inherit messages, for example:

```javascript
Globalize.loadMessages({
  root: {
    amen: "Amen"
  },
  de: {},
  en: {},
  "en-GB": {},
  fr: {},
  pt: {
    amen: "Amém"
  },
  "pt-PT": {}
});

Globalize( "de" ).formatMessage( "amen" );
// > "Amen"

Globalize( "en" ).formatMessage( "amen" );
// > "Amen"

Globalize( "en-GB" ).formatMessage( "amen" );
// > "Amen"

Globalize( "fr" ).formatMessage( "amen" );
// > "Amen"

Globalize( "pt-PT" ).formatMessage( "amen" );
// > "Amém"
```

Note that `de`, `en`, `en-GB`, `fr`, and `pt-PT` are empty. `.formatMessage()`
inherits `pt-PT` messages from `pt` (`pt-PT` ➡ `pt`), and it inherits the other
messages from root, eg. `en-GB` ➡ `en-001` ➡ `en` ➡ `root`. Yes, `root` is the
last bundle of the parent lookup.

Attention: On browsers, message inheritance only works if the optional
dependency `cldr/unresolved` is loaded.

```html
<script src="cldr/unresolved.js"></script>
```
