# Globalize

[![Build Status](https://secure.travis-ci.org/jquery/globalize.svg?branch=master)](http://travis-ci.org/jquery/globalize)
[![devDependency Status](https://david-dm.org/jquery/globalize/status.svg)](https://david-dm.org/jquery/globalize#info=dependencies)
[![devDependency Status](https://david-dm.org/jquery/globalize/dev-status.svg)](https://david-dm.org/jquery/globalize#info=devDependencies)

A JavaScript library for internationalization and localization that leverage the
official [Unicode CLDR](http://cldr.unicode.org/) JSON data. The library works both for the browser and as a
Node.js module.

- [Heads up!](#heads_up)
  - [This is an alpha 1.x version](#alpha)
  - [Not accepting 0.x fixes anymore](#0.x-fixes)
- [About Globalize](#about)
  - [Why globalization?](#why_globalization)
  - [Why Globalize?](#why_globalize)
  - [Where to use it?](#where_to_use)
  - [Where does the data come from?](#where_does_data_come_from)
  - [Only load and use what you need](#modules)
  - [Browser support](#browser_support)
- [Getting started](#getting_started)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
- [API](#api)
  - [Core](#core)
  - [Date module](#date_module)
  - [Message module](#message_module)
  - [Number module](#number_module)
    - [Currency module](#currency_module)
  - [Plural module](#plural_module)
  - more to come...
- [Error reference](#error)
- [Development](#development)
  - [File structure](#file_structure)
  - [Source files](#source_files)
  - [Build](#build)
  - [Tests](#tests)


<a name="heads_up"></a>
## Heads up!

<a name="alpha"></a>
### This is an alpha 1.x version
We're working on the migration to using the Unicode CLDR. This is an alpha
version of Globalize. In other words, this is not a software for production
environment (yet).

<a name="0.x-fixes"></a>
### Not accepting 0.x fixes anymore

Patches to the previous 0.x codebase probably can't be used. If you have a
problem, please create an issue first before trying to patch it.

Are you looking for 0.x docs? Find them [here](https://github.com/jquery/globalize/tree/79ae658b842f75f58199d6e9074e01f7ce207468).


<a name="about"></a>
## About Globalize

<a name="why_globalization"></a>
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

Even if the application deals only with the English locale, it may still need
globalization to format programming language bytes into human-understandable
language and vice-versa in an effective and reasonable way. For example, to
display something better than "Edited 1 minutes ago".

<a name="why_globalize"></a>
### Why Globalize?

Globalize provides number formatting and parsing, date and time formatting and
parsing, currency formatting, message formatting (ICU message format pattern),
and plural support.

Design Goals.

- Leverages the Unicode CLDR data and follows its UTS#35 specification.
- Keeps code separate from i18n content. Doesn't host or embed any locale data
  in the library. Empowers developers to control the loading mechanism of their
  choice.
- Allows developers to load as much or as little data as they need. Avoids
  duplicating data if using multiple i18n libraries that leverage CLDR.
- Keeps code modular. Allows developers to load the i18n functionalities they
  need.
- Runs in browsers and Node.js, consitently across all of them.
- Makes globalization as easy to use as jQuery.

Globalize is based on the Unicode Consortium's Common Locale Data Repository
(CLDR), the largest and most extensive standard repository of locale data
available. CLDR is constantly updated and is used by many large applications and
operating systems, so you'll always have access to the most accurate and
up-to-date locale data.

Globalize needs CLDR content to function properly, although it doesn't embed,
hard-code, or host such content. Instead, Globalize empowers developers to load
CLDR data the way they want. Vanilla CLDR in its official JSON format (no
pre-processing) is expected to be provided. As a consequence, (a) Globalize
avoids bugs caused by outdated i18n content. Developers can use up-to-date CLDR
data directly from Unicode as soon as it's released, without having to wait for
any pipeline on our side. (b) Developers have full control over which locale
coverage they want to provide on their applications. (c) Developers are able to
share the same i18n dataset between Globalize and other libraries that leverage
CLDR. There's no need for duplicating data.

Globalize is systematically tested against desktop and mobile browsers and
Node.js. So, using it you'll get consistent results across different browsers
and across browsers and the server.

Globalize doesn't use native Ecma-402 yet, which could potentially improve date
and number formatting performance. Although Ecma-402 support is improving among
modern browsers and even Node.js, the functionality and locale coverage level
varies between different environments (see Comparing JavaScript Libraries'
[slide 25][]). Globalize needs to do more research and testings to use it
reliably.

For alternative libraries and more, check out this [JavaScript globalization
overview][].

[slide 25]: http://jsi18n.com/jsi18n.pdf
[JavaScript globalization overview]: http://rxaviers.github.io/javascript-globalization/

<a name="where_to_use"></a>
### Where to use it?

Globalize is designed to work both in the [browser](#browser_support), or in
[Node.js](#usage). It supports both [AMD](#usage) and [CommonJS](#usage).

<a name="where_does_data_come_from"></a>
### Where does the data come from?

Globalize uses the [Unicode CLDR](http://cldr.unicode.org/), the largest and
most extensive standard repository of locale data.

We do NOT embed any i18n data within our library. However, we make it really
easy to use. Read [How to get and load CLDR JSON data](#cldr) for more
information on its usage.

<a name="modules"></a>
### Pick the modules you need

| File | Minified + gzipped size | Summary |
|---|--:|---|
| globalize.js | 1.3KB | [Core library](#core) |
| globalize/currency.js | +2.6KB | [Currency module](#currency_module) provides currency formatting and parsing |
| globalize/date.js | +4.9KB | [Date module](#date_module) provides date formatting and parsing |
| globalize/message.js | +5.6KB | [Message module](#message_module) provides ICU message format support |
| globalize/number.js | +2.9KB | [Number module](#number_module) provides number formatting and parsing |
| globalize/plural.js | +1.7KB | [Plural module](#plural_module) provides pluralization support |

<a name="browser_support"></a>
### Browser Support

Globalize 1.x supports the following browsers:

- Chrome: (Current - 1) or Current
- Firefox: (Current - 1) or Current
- Safari: 5.1+
- Opera: 12.1x, (Current - 1) or Current
- IE 8 (needs ES5 polyfill), IE9+

*(Current - 1)* or *Current* denotes that we support the current stable version
of the browser and the version that preceded it. For example, if the current
version of a browser is 24.x, we support the 24.x and 23.x versions.

*IE 8* is supported, but it depends on the polyfill of the ES5
methods below, for which we suggest using
[es5-shim](https://github.com/es-shims/es5-shim). Alternatives or more
information can be found at
[Modernizr's polyfills list](https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills#ecmascript-5).

- Array.isArray()
- Array.prototype.every()
- Array.prototype.forEach()
- Array.prototype.indexOf()
- Array.prototype.isArray()
- Array.prototype.map()
- Array.prototype.some()
- Object.keys()


<a name="getting_started"></a>
## Getting Started

<a name="requirements"></a>
### Requirements

<a name="dependencies"></a>
#### 1. Dependencies

You need to satisfy Globalize dependencies prior to using it. The good news
is, there is only one. It's the [cldr.js](https://github.com/rxaviers/cldrjs),
which is a CLDR low level manipulation tool.

If you use a package manager like bower or npm, you don't need to worry about
it. If this isn't the case, then you need to manually download cldr.js
yourself. Check the [Hello World examples](#usage) for more information.

<a name="cldr"></a>
#### 2. CLDR content

Globalize is the i18n software (the engine). Unicode CLDR is the i18n content
(the fuel). You need to feed Globalize on the appropriate portions of CLDR prior
to using it.

*(a) How do I figure out which CLDR portions are appropriate for my needs?*

Each Globalize function requires a special set of CLDR portions. Once you know
which Globalize functionalities you need, you can deduce its respective CLDR
requirements. See table below.

| Module | Required CLDR JSON files |
|---|---|
| Core module | cldr/supplemental/likelySubtags.json |
| Currency module | cldr/main/`locale`/currencies.json<br>cldr/supplemental/currencyData.json<br>+CLDR JSON files from number module |
| Date module | cldr/main/`locale`/ca-gregorian.json<br>cldr/main/`locale`/timeZoneNames.json<br>cldr/supplemental/timeData.json<br>cldr/supplemental/weekData.json<br>+CLDR JSON files from number module |
| Number module | cldr/main/`locale`/numbers.json<br>cldr/supplemental/numberingSystems.json |
| Plural module | cldr/supplemental/plurals.json |

*(b) How am I supposed to get and load CLDR content?*

Learn [how to get and load CLDR content...](doc/cldr.md).

<a name="installation"></a>
### Installation

*By downloading a ZIP or a TAR.GZ...*

Click the github [releases tab](https://github.com/jquery/globalize/releases)
and download the latest available Globalize package.

*By using a package manager...*

Use bower `bower install globalize`, or npm `npm install globalize`.

*By using source files...*

1. `git clone https://github.com/jquery/globalize.git`.
1. [Build the distribution files](https://github.com/jquery/globalize/#build).

<a name="usage"></a>
### Usage

Globalize's consumable-files are located in the `./dist` directory. If you
don't find it, it's because you are using a development branch. You should
either use a tagged version or [build the distribution files yourself](#build).
Read [installation](#installation) above if you need more information on how to
download.

Globalize can be used for a variety of different i18n tasks, eg. formatting or
parsing dates, formatting or parsing numbers, formatting messages, etc. You may
NOT need Globalize in its entirety. For that reason, we made it modular. So, you
can cherry-pick the pieces you need, eg. load `dist/globalize.js` to get
Globalize core, load `dist/globalize/date.js` to extend Globalize with Date
functionalities, etc.

An example is worth a thousand words. Check out our Hello World demo (available
to you in different flavors):
- [Hello World (AMD + bower)](examples/amd-bower/).
- [Hello World (Node.js + npm)](examples/node-npm/).
- [Hello World (plain JavaScript)](examples/plain-javascript/).


<a name="api"></a>
## API

<a name="core"></a>
### Core module

- **`Globalize.load( cldrJSONData, ... )`**

  This method allows you to load CLDR JSON locale data. `Globalize.load()` is a
  proxy to `Cldr.load()`.

  [Read more...](doc/api/core/load.md)

- **`Globalize.locale( [locale|cldr] )`**

  Set default locale, or get it if locale argument is omitted.

  [Read more...](doc/api/core/locale.md)

- **`[new] Globalize( locale|cldr )`**

  Create a Globalize instance.

  [Read more...](doc/api/core/constructor.md)

<a name="date_module"></a>
### Date module

- **`.dateFormatter( pattern )`**

  Return a function that formats a date according to the given `pattern`.

  ```javascript
  .dateFormatter( "GyMMMd" )( new Date() )              ➡  "Nov 30, 2010 AD"
  .dateFormatter({ date: "medium" })( new Date() )      ➡  "Nov 1, 2010"
  .dateFormatter({ time: "medium" })( new Date() )      ➡  "5:55:00 PM"
  .dateFormatter({ datetime: "medium" })( new Date() )  ➡  "Nov 1, 2010, 5:55:00 PM"
  ```

  [Read more...](doc/api/date/date-formatter.md)

- **`.dateParser( pattern )`**

  Return a function that parses a string date according to the given `pattern`.

  ```javascript
  .dateParser( "GyMMMd" )( "Nov 30, 2010 AD" )                      ➡  new Date()
  .dateParser({ date: "medium" })( "Nov 1, 2010" )                  ➡  new Date()
  .dateParser({ time: "medium" })( "5:55:00 PM" )                   ➡  new Date()
  .dateParser({ datetime: "medium" })( "Nov 1, 2010, 5:55:00 PM" )  ➡  new Date()
  ```

  [Read more...](doc/api/date/date-parser.md)

- **`.formatDate( value, pattern )`**

  Alias for `.dateFormatter( pattern )( value )`.

- **`.parseDate( value, pattern )`**

  Alias for `.dateParser( pattern )( value )`.

<a name="message_module"></a>
### Message module

- **`Globalize.loadMessages( json )`**

  Load messages data.

  [Read more...](doc/api/message/load-messages.md)

- **`.messageFormatter( path ) ➡ function([ variables ])`**

  Return a function that formats a message (using ICU message format pattern)
  given its path and a set of variables into a user-readable string. It supports
  pluralization and gender inflections.

  | | |
  | --- | --- |
  | `.messageFormatter( "task" )( 1000 )` | `"You have 1,000 tasks remaining"` |
  | `.messageFormatter( "like" )( 3 )` | `"You and 2 others liked this"` |

  [Read more...](doc/api/message/message-formatter.md)

- **`.formatMessage( path [, variables ] )`**

  Alias for `.messageFormatter( path )([ variables ])`.

<a name="number_module"></a>
### Number module

- **`.numberFormatter( [options] )`**

  Return a function that formats a number according to the given options or locale's defaults.

  ```javascript
  .numberFormatter()( pi )                                 ➡  "3.142"
  .numberFormatter({ maximumFractionDigits: 5 })( pi )     ➡  "3.14159"
  .numberFormatter({ round: "floor" })( pi )               ➡  "3.141"
  .numberFormatter({ minimumFractionDigits: 2 })( 10000 )  ➡  "10,000.00"
  .numberFormatter({ style: "percent" })( 0.5 )            ➡  "50%"
  ```

  [Read more...](doc/api/number/number-formatter.md)

- **`.numberParser( [options] )`**

  Return a function that parses a string representing a number according to the given options or
  locale's defaults.

  ```javascript
  .numberParser()( "3.14159" )                  ➡  3.14159
  .numberParser()( "10,000.00" )                ➡  10000
  .numberParser({ style: "percent" })( "50%" )  ➡  0.5
  ```

  [Read more...](doc/api/number/number-parser.md)

- **`.formatNumber( value [, options] )`**

  Alias for `.numberFormatter( [options] )( value )`.

- **`.parseNumber( value [, options] )`**

  Alias for `.numberParser( [options] )( value )`.

<a name="currency_module"></a>
#### Currency module

- **`.currencyFormatter( currency [, options] )`**

  Return a function that formats a currency according to the given options or
  locale's defaults.

  ```javascript
  .currencyFormatter( "USD" )( 1 )                           ➡  "$1.00"
  .currencyFormatter( "USD", { style: "accounting" })( -1 )  ➡  "($1.00)"
  .currencyFormatter( "USD", { style: "name" })( 69900 )     ➡  "69,900.00 US dollars"
  .currencyFormatter( "USD", { style: "code" })( 69900 )     ➡  "69,900.00 USD"
  .currencyFormatter( "USD", { round: "ceil" })( 1.491 )     ➡  "$1.50"
  ```

  [Read more...](doc/api/currency/currency-formatter.md)

- **`.formatCurrency( value, currency [, options] )`**

  Alias for `.currencyFormatter( currency [, options] )( value )`.

<a name="plural_module"></a>
### Plural module

- **`.pluralGenerator()`**

  Return a function that returns the value's corresponding plural group: `zero`,
  `one`, `two`, `few`, `many`, or `other`.

  ```javascript
  .pluralGenerator()( 0 )  ➡  "other"
  .pluralGenerator()( 1 )  ➡  "one"
  ```

  [Read more...](doc/api/plural/plural-generator.md)

- **`.plural( value )`**

  Alias for `.pluralGenerator()( value )`.


<a name="error"></a>
## Error reference

### CLDR Errors

- **`E_INVALID_CLDR`**

  Thrown when a CLDR item has an invalid or unexpected value.

 [Read more...](doc/error/e-invalid-cldr.md)

- **`E_MISSING_CLDR`**

  Thrown when any required CLDR item is NOT found.

  [Read more...](doc/error/e-missing-cldr.md)

### Parameter Errors

- **`E_INVALID_PAR_TYPE`**

  Thrown when a parameter has an invalid type on any static or instance methods.

  [Read more...](doc/error/e-invalid-par-type.md)

- **`E_INVALID_PAR_VALUE`**

  Thrown for certain parameters when the type is correct, but the value is
  invalid.

  [Read more...](doc/error/e-invalid-par-value.md)

- **`E_MISSING_PARAMETER`**

  Thrown when a required parameter is missing on any static or instance methods.

  [Read more...](doc/error/e-missing-parameter.md)

- **`E_PAR_OUT_OF_RANGE`**

  Thrown when a parameter is not within a valid range of values.

  [Read more...](doc/error/e-par-out-of-range.md)

### Other Errors

- **`E_DEFAULT_LOCALE_NOT_DEFINED`**

  Thrown when any static method, eg. `Globalize.formatNumber()` is used prior to
  setting the Global locale with `Globalize.locale( <locale> )`.

  [Read more...](doc/error/e-default-locale-not-defined.md)

- **`E_MISSING_PLURAL_MODULE`**

  Thrown when plural module is needed, but not loaded, eg. to format currencies
  using the named form.
  
  [Read more...](doc/error/e-missing-plural-module.md)

- **`E_UNSUPPORTED`**

  Thrown for unsupported features, eg. to format unsupported date patterns.

  [Read more...](doc/error/e-unsupported.md)


<a name="development"></a>
## Development

<a name="file_structure"></a>
### File structure
```
├── bower.json (metadata file)
├── CONTRIBUTING.md (doc file)
├── dist/ (consumable files, the built files)
├── external/ (external dependencies, eg. cldr.js, QUnit, RequireJS)
├── Gruntfile.js (Grunt tasks)
├── LICENSE.txt (license file)
├── package.json (metadata file)
├── README.md (doc file)
├── src/ (source code)
│   ├── build/ (build helpers, eg. intro, and outro)
│   ├── common/ (common function helpers across modules)
│   ├── core.js (core module)
│   ├── date/ (date source code)
│   ├── date.js (date module)
│   ├── message.js (message module)
│   ├── number.js (number module)
│   ├── number/ (number source code)
│   ├── plural.js (plural module)
│   ├── plural/ (plural source code)
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

Core, and all modules' public APIs are located in the `src/` directory, ie.
`core.js`, `date.js`, `message.js`, `number.js`, and `plural.js`.

<a name="dev_dependencies"></a>
### Install development external dependencies

Install Grunt and external dependencies. First, install the
[grunt-cli](http://gruntjs.com/getting-started#installing-the-cli) and
[bower](http://bower.io/) packages if you haven't before. These should be
installed globally (like this: `npm install -g grunt-cli bower`). Then:

```bash
npm install && bower install
```

<a name="tests"></a>
### Tests

Tests can be run either in the browser or using Node.js (via Grunt) after having
installed the external development dependencies (for more details, see above).

***Unit tests***

To run the unit tests, run `grunt test:unit`, or run `grunt connect:keepalive`
and open `http://localhost:9001/test/unit.html` in a browser (or
`http://localhost:9001/test/unit-es5-shim.html` for IE8). It tests the very
specific functionality of each function (sometimes internal/private).

The goal of the unit tests is to make it easy to spot bugs, easy to debug.

***Functional tests***

To run the functional tests, create the dist files by running `grunt`. Then, run
`grunt test:functional`, or open `http://localhost:9001/test/functional.html` in
a browser (or `http://localhost:9001/test/functional-es5-shim.html` for IE8).
Note that `grunt` will automatically run unit and functional tests for you to
ensure the built files are safe.

The goal of the functional tests is to ensure that everything works as expected
when it is combined.

<a name="build"></a>
### Build

Build the distribution files after having installed the external development
dependencies (for more details, see above).

```bash
grunt
```

