## Globalize.locale( [locale|cldr] )

Set default locale, or get it if locale argument is omitted.

Return the default [Cldr instance](https://github.com/rxaviers/cldrjs).

An application that supports globalization and/or localization will need to have a way to determine the user's preference. Attempting to automatically determine the appropriate locale is useful, but it is good practice to always offer the user a choice, by whatever means.

Whatever your mechanism, it is likely that you will have to correlate the user's preferences with the list of locale data supported in the app. This method allows you to select the best match given the locale data that you have included and to set the Globalize locale to the one which the user prefers.

LanguageMatching TBD (CLDR's spec http://www.unicode.org/reports/tr35/#LanguageMatching).

### Parameters

#### locale|cldr

- The locale string, e.g., `"en"`, `"pt-BR"`, or `"zh-Hant-TW"`. Or,
- The [Cldr instance](https://github.com/rxaviers/cldrjs), e.g., new `Cldr( "en" )`.

### Example

Prior to using this function, you must load `cldr/supplemental/likelySubtags.json`. Read [CLDR content][] if you need more information.

[CLDR content]: ../../../README.md#2-cldr-content

```javascript
// Set "pt" as our default locale.
Globalize.locale( "pt" );

// Get default locale.
Globalize.locale();
// > {
//   attributes: {
//      "languageId": "pt",
//      "maxLanguageId": "pt_Latn_BR",
//      "language": "pt",
//      "script": "Latn",
//      "territory": "BR",
//      "region": "BR"
//   },
//   some more stuff...
// }
```
