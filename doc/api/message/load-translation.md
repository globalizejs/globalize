## .loadTranslations( json )

Load translation data.

The first dregree keys must be locales. For example:

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

### Parameters

**json**

JSON object of translation data.

### Example

```javascript
Globalize.loadTranslations({
  pt: {
    greetings: {
      hello: "Olá",
      bye: "Tchau"
    }
  }
});

Globalize( "pt" ).translate( "greetings/hello" ); // Olá
```

It's possible to inherit translations, for example:

```javascript
Globalize.loadTranslations({
  root: {
    amen: "Amen"
  },
  pt: {
    amen: "Amém"
  }
});

Globalize( "pt-PT" ).translate( "amen" ); // "Amém"
Globalize( "de" ).translate( "amen" ); // "Amen"
Globalize( "en" ).translate( "amen" ); // "Amen"
Globalize( "en-GB" ).translate( "amen" ); // "Amen"
Globalize( "fr" ).translate( "amen" ); // "Amen"
```

Note that `pt-PT`, `de`, `en`, `en-GB`, and `fr` have never been defined.
`.translate()` inherits `pt-PT` translation from `pt` (`pt-PT` ➡ `pt`), and it
inherits the other translations from root, eg. `en-GB` ➡ `en` ➡ `root`. Yes,
`root` is the last bundle of the parent lookup.

Attention: On browsers, translation inheritance only works if the optional
dependency `cldr/unresolved` is loaded.

```html
<script src="cldr/unresolved.js"></script>
```
