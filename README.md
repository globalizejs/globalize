# Globalize

[![Build Status](https://secure.travis-ci.org/jquery/globalize.png)](http://travis-ci.org/jquery/globalize)
[![devDependency Status](https://david-dm.org/jquery/globalize/dev-status.png)](https://david-dm.org/jquery/globalize#info=devDependencies)

A JavaScript library for internationalization and localization that leverage the
official [Unicode CLDR](http://cldr.unicode.org/) JSON data. The library works both for the browser and as a
Node.js module.

----

## Heads up!

We're working on the migration to using the Unicode CLDR. This is an alpha version of Globalize: 1.0.0-pre.

Patches to the previous stable codebase probably can't be used. If you have a
problem, please create an issue first before trying to patch it.

----

- [Getting started](#getting_started)
  - [Why globalization?](#why)
  - [About Globalize](#about)
    - [Where to use it?](#where)
    - [Where does the data come from?](#cldr)
    - [Only load and use what you need](#modules)
    - [Browser support](#where)
- [Usage](#usage)
  - [How to get and load CLDR JSON data](#cldr_usage)
- [API](#api)
  - [Core](#core)
    - [Globalize.load](#load)
    - [Globalize.locale](#locale)
  - [Date module](#date)
    - [Globalize.formatDate](#format_date)
    - [Globalize.parseDate](#parse_date)
  - [Translate module](#translate_module)
    - [Globalize.loadTranslation](#load_translations)
    - [Globalize.translate](#translate)
  - more to come...
- [Development](#development)
  - [File structure](#file_structure)
  - [Source files](#source_files)
  - [Build](#build)
  - [Tests](#tests)


<a name="getting_started"></a>
## Getting Started

<a name="why"></a>
### Why globalization?

Each language, and the countries that speak that language, have different
expectations when it comes to how numbers (including currency and percentages)
and dates should appear. Obviously, each language has different names for the
days of the week and the months of the year. But they also have different
expectations for the structure of dates, such as what order the day, month and
year are in. In number formatting, not only does the character used to
delineate number groupings and the decimal portion differ, but the placement of
those characters differ as well.

A user using an application should be able to read and write dates and numbers
in the format they are accustomed to. This library makes this possible,
providing an API to convert user-entered number and date strings - in their
own format - into actual numbers and dates, and conversely, to format numbers
and dates into that string format.


<a name="about"></a>
### About Globalize

<a name="where"></a>
#### Where to use it?

It's designed to work both in the [browser](#browser_support), or in
[Node.js](#usage). It supports both [AMD](#usage) and [CommonJS](#usage).

<a name="cldr"></a>
#### Where does the data come from?

Globalize uses the [Unicode CLDR](http://cldr.unicode.org/), the largest and
most extensive standard repository of locale data.

We do NOT embed any i18n data within our library. However, we make it really
easy to use. Read the section [How to get and load CLDR JSON data](#cldr_usage) for
more information on its usage.

<a name="modules"></a>
#### Load and use only what you need

Globalize is split in modules: core, number (coming soon), date, and translate.
We're evaluating other modules, eg. plural, ordinals, etc.

The core implements [`Globalize.load( cldrData )`](#load), and
[`Globalize.locale( locale )`](#locale).

The date module extends core Globalize, and adds [`Globalize.formatDate( value,
pattern, locale )`](#format_date), and [`Globalize.parseDate( value, patterns, locale
)`](#parse_date).

The translate module extends core Globalize, and adds
[`Globalize.loadTranslations( locale, json )`](#load_translations), and
[`Globalize.translate( path , locale )`](#translate).

More to come...

<a name="browser_support"></a>
#### Browser Support

We officially support:
 - Firefox (latest - 1)+
 - Chrome (latest - 1)+
 - Safari 5.1+
 - IE 8+
 - Opera (latest - 1)+

Dry tests show Globalize also works on the following browsers:

- Firefox 4+
- Safari 5+
- Chrome 14+
- IE 6+
- Opera 11.1+

If you find any bugs, please just [let us
know](https://github.com/jquery/globalize/issues). We'll be glad to fix them for
the officially supported browsers, or at least to update the documentation for
the unsupported ones.

<a name="usage"></a>
## Usage

All distributables are UMD wrapped. So, it supports AMD, CommonJS, or global
variables (in case neither AMD nor CommonJS have been detected).

Example of usage with script tags:

```html
<script src="./external/cldr.js/dist/cldr.js"></script>
<script src="./dist/globalize.js"></script>
<script src="./dist/globalize/date.js"></script>
```

Example of usage on AMD:

```bash
bower install cldr.js globalize
```
```javascript
require.config({
  paths: {
    cldr: "bower_components/cldr.js/dist/cldr.runtime",
    globalize: "bower_components/globalize/dist/globalize"
  }
});
require( [ "globalize", "globalize/date" ], function( Globalize ) {
  ...
});
```

Example of usage with Node.js:

```bash
npm install cldr.js globalize
```
```javascript
var Globalize = require( "globalize" );
...
```

<a name="cldr_usage"></a>
### How to get and load CLDR JSON data

The Unicode CLDR is available for download as JSON
([`json.zip`](http://www.unicode.org/Public/cldr/latest/json.zip)). This file
contains the complete data of what the Unicode CLDR Project considers the top
20 languages (at the time of this writing).

You can generate the JSON representation of the languages not available in the
ZIP file by using the official conversion tool
([`tools.zip`](http://www.unicode.org/Public/cldr/latest/)). This ZIP contains a
README with instructions on how to build the data.

You can choose to generate unresolved data to save space or bandwidth (`-r false`
option of the conversion tool), and instead have it resolve at runtime.

For the examples below, first fetch CLDR JSON data:

```bash
wget http://www.unicode.org/Public/cldr/latest/json.zip
unzip json.zip -d cldr
```

Example of embedding CLDR JSON data:

```html
<script>
Globalize.load({
  main: {
    en: {
      ...
    }
  },
  supplemental: {
    likelySubtags: {
      ...
    },
    timeDate: {
      ...
    },
    weekData: {
      ...
    }
  }
});
</script>
```

Example of loading it dynamically:

```html
<script src="jquery.js"></script>
<script>
$.get( "cldr/en/ca-gregorian.json", Globalize.load );
$.get( "cldr/supplemental/likelySubtags.json", Globalize.load );
$.get( "cldr/supplemental/timeData.json", Globalize.load );
$.get( "cldr/supplemental/weekData.json", Globalize.load );
</script>
```

Example using AMD (also see our [functional tests](test/functional.js)):
```javascript
define([
  "globalize",
  "json!fixtures/cldr/main/en/ca-gregorian.json",
  "json!fixtures/cldr/supplemental/likelySubtags.json",
  "json!fixtures/cldr/supplemental/timeData.json",
  "json!fixtures/cldr/supplemental/weekData.json",
  "globalize/date"
], function( Globalize, enCaGregorian, likelySubtags, timeData, weekData ) {

  Globalize.load( enCaGregorian );
  Globalize.load( likelySubtags );
  Globalize.load( timeData );
  Globalize.load( weekData );

});
```

Example using Node.js:

```javascript
var Globalize = require( "globalize" );
Globalize.load( require( "./cldr/supplemental/likelySubtags.json" ) );
Globalize.load( require( "./cldr/supplemental/timeData.json" ) );
Globalize.load( require( "./cldr/supplemental/weekData.json" ) );
Globalize.load( require( "./cldr/en/ca-gregorian.json" ) );
```

<a name="api"></a>
## API


<a name="core"></a>
### Core module

<a name="load"></a>
#### `Globalize.load( cldrJSONData )`

This method allows you to load CLDR JSON locale data. `Globalize.load()` is a proxy to `Cldr.load()`. For more information, see https://github.com/rxaviers/cldr#readme.

Parameters:

- **cldrJSONData** A JSON object with CLDR data. See ["How to get and load CLDR
  JSON data" above](#cldr_usage) for more information and examples;

<a name="locale"></a>
#### `Globalize.locale( [locale] )`

Set default locale, or get it if locale argument is omitted.

Parameters:

- **locale** The locale string, eg. "en", "pt_BR", or "zh_Hant_TW".

An application that supports globalization and/or localization will need to
have a way to determine the user's preference. Attempting to automatically
determine the appropriate culture is useful, but it is good practice to always
offer the user a choice, by whatever means.

Whatever your mechanism, it is likely that you will have to correlate the
user's preferences with the list of locale data supported in the app. This
method allows you to select the best match given the locale data that you
have included and to set the Globalize locale to the one which the user
prefers.

```javascript
Globalize.locale( "pt" );
console.log( Globalize.locale().attributes );
// {
//    "languageId": "pt",
//    "maxLanguageId": "pt_Latn_BR",
//    "language": "pt",
//    "script": "Latn",
//    "territory": "BR",
//    "region": "BR"
// }
```

LanguageMatching TBD (CLDR's spec http://www.unicode.org/reports/tr35/#LanguageMatching).


### Date module

<a name="format_date"></a>
#### `Globalize.formatDate( value, format, [locale] )`

Format a date according to the given format string and locale (or the
current locale if not specified). See the section <a href="#dates">Date
formatting</a> below for details on the available formats. See other modules,
eg. number module, for different overloads of `Globalize.formatDate()`.

Parameters:

- **value** Date instance to be formatted, eg. `new Date()`;
- **format**
  - String, skeleton. Eg "GyMMMd";
  - Object, accepts either one:
    - Skeleton, eg. `{ skeleton: "GyMMMd" }`. List of all skeletons [TODO];
    - Date, eg. `{ date: "full" }`. Possible values are full, long, medium, short;
    - Time, eg. `{ time: "full" }`. Possible values are full, long, medium, short;
    - Datetime, eg. `{ datetime: "full" }`. Possible values are full, long, medium, short;
    - Raw pattern, eg. `{ pattern: "dd/mm" }`. [List of all date
      patterns](http://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table);
- **locale** Optional locale string that overrides default;

```javascript
Globalize.formatDate( new Date( 2010, 10, 30, 17, 55 ), { datetime: "short" } );
// "11/30/10, 5:55 PM"

Globalize.formatDate( new Date( 2010, 10, 30, 17, 55 ), { datetime: "short" }, "de" );
// "30.11.10 17:55"
```

Comparison between different locales.

| locale | `Globalize.formatDate( new Date( 2010, 10, 1, 17, 55 ), { datetime: "short" } )` |
| --- | --- |
| **en** | `"11/1/10, 5:55 PM"` |
| **en_GB** | `"01/11/2010 17:55"` |
| **de** | `"01.11.10 17:55"` |
| **zh** | `"10/11/1 下午5:55"` |
| **ar** | `"1‏/11‏/2010 5:55 م"` |
| **pt** | `"01/11/10 17:55"` |
| **es** | `"1/11/10 17:55"` |

<a name="parse_date"></a>
#### `Globalize.parseDate( value, [formats], [locale] )`

Parse a string representing a date into a JavaScript Date object, taking into
account the given possible formats (or the given locale's set of preset
formats if not provided). As before, the current locale is used if one is not
specified.

Parameters:

- **value** String with date to be parsed, eg. `"11/1/10, 5:55 PM"`;
- **formats** Optional array of formats;
- **locale** Optional locale string that overrides default

```javascript
Globalize.locale( "en" );
Globalize.parseDate( "1/2/13" );
// Wed Jan 02 2013 00:00:00

Globalize.locale( "es" );
Globalize.parseDate( "1/2/13" );
// Fri Feb 01 2013 00:00:00
```


<a name="translate_module"></a>
### Translate module

<a name="load_translations"></a>
#### `Globalize.loadTranslation( locale, translationData )`

Load translation data per locale.

Parameters:
- **locale** Locale string;
- **translationData** A JSON object with translation mappings;

```javascript
Globalize.loadTranslation( "pt_BR", {
  greetings: {
    hello: "Olá",
    bye: "Tchau"
  }
});
```

<a name="translate"></a>
#### `Globalize.translate( path, [locale] )`

Translate item given its path.

Parameters:
- **path** Translation item path;
- **locale** Optional locale string that overrides default

```javascript
Globalize.locale( "pt_BR" );
Globalize.translate( "greetings/bye" );
// ➡ "Tchau"
```


<a name="development"></a>
## Development

<a name="file_structure"></a>
### File structure
```
├── bower.json (metadata file)
├── CONTRIBUTING.md (doc file)
├── dist/ (output of built bundles)
├── external/ (external dependencies, eg. cldr.js, QUnit, RequireJS)
├── Gruntfile.js (Grunt tasks)
├── LICENSE (license file)
├── package.json (metadata file)
├── README.md (doc file)
├── src/ (source code)
│   ├── build/ (build helpers, eg. intro, and outro)
│   ├── common/ (common function helpers across modules)
│   ├── core.js (core module)
│   ├── date/ (date source code)
│   ├── date.js (date module)
│   ├── translate.js (translate module)
│   └── util/ (basic JavaScript helpers polyfills, eg array.map)
└── test/ (unit and functional test files)
    ├── fixtures/ (CLDR fixture data)
    ├── functional/ (functional tests)
    ├── functional.html
    ├── functional.js
    ├── unit/ (unit tests)
    ├── unit.html
    └── unit.js
```

<a name="source_files"></a>
### Source files

The source files are as granular as possible. When combined to generate the
build file, all the excessive/overhead wrappers are cut off. It's following
the same build model of jQuery and Modernizr.

Core, and all modules' public APIs are located in the `src/` directory. For
example: `core.js`, `date.js`, and `translate.js`.

<a name="build"></a>
### Build

Install Grunt and external dependencies. First, install the
[grunt-cli](http://gruntjs.com/getting-started#installing-the-cli) and
[bower](http://bower.io/) packages if you haven't before. These should be installed
globally (like this: `npm install -g grunt-cli bower`). Then:

```bash
npm install && bower install
```

Build distribution files.
```bash
grunt
```

<a name="tests"></a>
### Tests

Tests can be run either in the browser or using Node.js (via Grunt).

***Unit tests***

To run the unit tests, run `grunt test:unit`, or open
`file:///.../globalize/test/unit.html` in a browser. It tests the very specific functionality
of each function (sometimes internal/private).

The goal of the unit tests is to make it easy to spot bugs, easy to debug.

***Functional tests***

To run the functional tests, create the dist files by running `grunt`. Then, run
`grunt test:functional`, or open
`file:///.../globalize/test/functional.html` in a browser. Note that `grunt` will
automatically run unit and functional tests for you to ensure the built files
are safe.

The goal of the functional tests is to ensure that everything works as expected when it is combined.
