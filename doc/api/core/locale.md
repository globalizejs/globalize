## Globalize.locale( [locale] )

Set default locale, or get it if locale argument is omitted.

An application that supports globalization and/or localization will need to
have a way to determine the user's preference. Attempting to automatically
determine the appropriate culture is useful, but it is good practice to always
offer the user a choice, by whatever means.

Whatever your mechanism, it is likely that you will have to correlate the
user's preferences with the list of locale data supported in the app. This
method allows you to select the best match given the locale data that you
have included and to set the Globalize locale to the one which the user
prefers.

LanguageMatching TBD (CLDR's spec http://www.unicode.org/reports/tr35/#LanguageMatching).

### CLDR content

The following CLDR JSON files are required. Load them in advance prior to using
this function.

- cldr/supplemental/likelySubtags.json

### Parameters

**locale**

The locale string, eg. `en`, `pt-BR`, or `zh-Hant-TW`.

### Example

```javascript
// Set "pt" as our default locale.
Globalize.locale( "pt" );

// Get default locale.
Globalize.locale();
// {
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
