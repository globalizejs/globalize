# Globalize

[![Build Status](https://secure.travis-ci.org/jquery/globalize.svg?branch=master)](http://travis-ci.org/jquery/globalize)
[![devDependency Status](https://david-dm.org/jquery/globalize/status.svg)](https://david-dm.org/jquery/globalize#info=dependencies)
[![devDependency Status](https://david-dm.org/jquery/globalize/dev-status.svg)](https://david-dm.org/jquery/globalize#info=devDependencies)

A JavaScript library for internationalization and localization that leverage the
official [Unicode CLDR](http://cldr.unicode.org/) JSON data. The library works both for the browser and as a
Node.js module.

- [About Globalize](#about-globalize)
  - [Why globalization?](#why-globalization)
  - [Why Globalize?](#why-globalize)
  - [Migrating from Globalize 0.x](#migrating-from-globalize-0x)
  - [Where to use it?](#where-to-use-it)
  - [Where does the data come from?](#where-does-the-data-come-from)
  - [Only load and use what you need](#pick-the-modules-you-need)
  - [Browser support](#browser-support)
- [Getting started](#getting-started)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Performance](#performance)
  - [Compilation and the Runtime modules](#compilation-and-the-runtime-modules)
  - [Examples](#examples)
- [API](#api)
  - [Core](#core-module)
  - [Date module](#date-module)
  - [Message module](#message-module)
  - [Number module](#number-module)
    - [Currency module](#currency-module)
  - [Plural module](#plural-module)
  - [Relative time module](#relative-time-module)
  - [Unit module](#unit-module)
  - more to come...
- [Error reference](#error-reference)
- [Contributing](#contributing)
  - [Roadmap](#roadmap)
- [Development](#development)
  - [File structure](#file-structure)
  - [Source files](#source-files)
  - [Tests](#tests)
  - [Build](#build)


## About Globalize

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
- Runs in browsers and Node.js, consistently across all of them.
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
varies between different environments (see Comparing JavaScript Libraries [slide
25][]). Globalize needs to do more research and testings to use it reliably.

For alternative libraries and more, check out this [JavaScript globalization
overview][].

[slide 25]: http://jsi18n.com/jsi18n.pdf
[JavaScript globalization overview]: http://rxaviers.github.io/javascript-globalization/

### Migrating from Globalize 0.x

Are you coming from Globalize 0.x? Read our [migration guide][] to learn what
have changed and how to migrate older 0.x code to up-to-date 1.x.

[migration guide]: doc/migrating-from-0.x.md

### Where to use it?

Globalize is designed to work both in the [browser](#browser-support), or in
[Node.js](#usage). It supports both [AMD](#usage) and [CommonJS](#usage).

### Where does the data come from?

Globalize uses the [Unicode CLDR](http://cldr.unicode.org/), the largest and
most extensive standard repository of locale data.

We do NOT embed any i18n data within our library. However, we make it really
easy to use. Read [How to get and load CLDR JSON data](#2-cldr-content) for more
information on its usage.

### Pick the modules you need

| File | Minified + gzipped size | Runtime minified + gzipped size | Summary |
|---|--:|--:|---|
| globalize.js | 1.5KB | 1.0KB | [Core library](#core-module) |
| globalize/currency.js | 2.6KB | 0.6KB | [Currency module](#currency-module) provides currency formatting and parsing |
| globalize/date.js | 5.1KB | 3.8KB | [Date module](#date-module) provides date formatting and parsing |
| globalize/message.js | 5.4KB | 0.7KB | [Message module](#message-module) provides ICU message format support |
| globalize/number.js | 3.1KB | 1.8KB | [Number module](#number-module) provides number formatting and parsing |
| globalize/plural.js | 2.3KB | 0.4KB | [Plural module](#plural-module) provides pluralization support |
| globalize/relative-time.js | 0.8KB | 0.6KB | [Relative time module](#relative-time-module) provides relative time formatting support |
| globalize/unit.js | 0.9KB | 0.5KB | [Unit module](#unit-module) provides unit formatting support |

### Browser Support

Globalize 1.x supports the following browsers:

- Chrome: (Current - 1) or Current
- Firefox: (Current - 1) or Current
- Safari: 5.1+
- Opera: 12.1x, (Current - 1) or Current
- IE9+

*(Current - 1)* or *Current* denotes that we support the current stable version
of the browser and the version that preceded it. For example, if the current
version of a browser is 24.x, we support the 24.x and 23.x versions.

## Getting Started

    npm install globalize cldr-data

```js
var Globalize = require( "globalize" );
Globalize.load( require( "cldr-data" ).entireSupplemental() );
Globalize.load( require( "cldr-data" ).entireMainFor( "en", "es" ) );

Globalize("en").formatDate(new Date());
// > "11/27/2015"

Globalize("es").formatDate(new Date());
// > "27/11/2015"
```

Read the [Locales section](#locales) for more information about supported locales. For AMD, bower and other usage examples, see [Examples section](#examples).

### Installation

*By downloading a ZIP or a TAR.GZ...*

Click the github [releases tab](https://github.com/jquery/globalize/releases)
and download the latest available Globalize package.

*By using a package manager...*

Use bower `bower install globalize`, or npm `npm install globalize cldr-data`.

*By using source files...*

1. `git clone https://github.com/jquery/globalize.git`.
1. [Build the distribution files](#build).

### Requirements

#### 1. Dependencies

If you use module loading like ES6 import, CommonJS, or AMD and fetch your code
using package managers like *npm* or *bower*, you don't need to worry about this
and can skip reading this section. Otherwise, you need to satisfy Globalize
dependencies prior to using it. There is only one external dependency:
[cldr.js][], which is a CLDR low level manipulation tool. Additionally, you need
to satisfy the cross-dependencies between modules.

| Module | Dependencies (load in order) |
|---|---|
| Core module | [cldr.js][] |
| Currency module | globalize.js (core), globalize/number.js, and globalize/plural.js (only required for "code" or "name" styles) |
| Date module | globalize.js (core) and globalize/number.js |
| Message module | globalize.js (core) and globalize/plural.js (if using messages that need pluralization support) |
| Number module | globalize.js (core) |
| Plural | globalize.js (core) |
| Relative time module | globalize.js (core), globalize/number.js, and globalize/plural.js |
| Unit module | globalize.js (core), globalize/number.js, and globalize/plural.js |

As an alternative to deducing this yourself, use this [online tool](http://johnnyreilly.github.io/globalize-so-what-cha-want/). The tool allows you to select the modules you're interested in using and tells you the Globalize files *and* CLDR JSON that you need.

[cldr.js]: https://github.com/rxaviers/cldrjs

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
| Currency module | cldr/main/`locale`/currencies.json<br>cldr/supplemental/currencyData.json<br>+CLDR JSON files from number module<br>+CLDR JSON files from plural module for name style support |
| Date module | cldr/main/`locale`/ca-gregorian.json<br>cldr/main/`locale`/timeZoneNames.json<br>cldr/supplemental/timeData.json<br>cldr/supplemental/weekData.json<br>+CLDR JSON files from number module |
| Number module | cldr/main/`locale`/numbers.json<br>cldr/supplemental/numberingSystems.json |
| Plural module | cldr/supplemental/plurals.json (for cardinals)<br>cldr/supplemental/ordinals.json (for ordinals) |
| Relative time module | cldr/main/`locale`/dateFields.json<br>+CLDR JSON files from number and plural modules |
| Unit module | cldr/main/`locale`/units.json<br>+CLDR JSON files from number and plural module |

As an alternative to deducing this yourself, use this [online tool](http://johnnyreilly.github.io/globalize-so-what-cha-want/). The tool allows you to select the modules you're interested in using and tells you the Globalize files *and* CLDR JSON that you need.

*(b) How am I supposed to get and load CLDR content?*

Learn [how to get and load CLDR content...](doc/cldr.md).

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

An example is worth a thousand words. Check out our [Examples](#examples)
section below.

### Performance

When formatting or parsing, there's actually a two-step process: (a) the
formatter (or parser) *creation* and (b) its *execution*, where creation takes
an order of magnitude more time (more expensive) than execution. In the creation
phase, Globalize traverses the CLDR tree, processes data (e.g., expands date
patterns, parses plural rules, etc), and returns a function that actually
executes the formatting or parsing.

```js
// Formatter creation.
var formatter = Globalize.numberFormatter();

// Formatter execution (roughly 10x faster than above).
formatter( Math.PI );
// > 3.141
```

As a rule of thumb for optimal performance, cache your formatters and parsers.
For example: (a) on iterations, generate them outside the loop and reuse while
looping; (b) on server applications, generate them in advance and execute when
requests arrive.

### Compilation and the Runtime modules

Take advantage of compiling your formatters and/or parsers during build time
when deploying to production. It's much faster than generating them in real-time
and it's also much smaller (i.e., better loading performance).

Your compiled formatters and parsers allow you to skip a big part of the library
and also allow you to skip loading CLDR data, because they have already been
created (see [Performance](#performance) above for more information).

To illustrate, see our [Basic Globalize Compiler example][].


#### Globalize Compiler

For information about the Globalize Compiler CLI or its JavaScript API, see the
[Globalize Compiler documentation][].

[Globalize Compiler documentation]: https://github.com/jquery-support/globalize-compiler#README

### Examples

The fastest and easiest way to use Globalize is by integrating it into your
existing tools.

- [Application example using webpack and npm](examples/app-npm-webpack/): easy to
  get started, automated CLDR loading and precompilation for production, but
  requires npm and webpack knowledge.

If you're using a different tool than the one above, but you're comfortable
using JavaScript modules (such as ES6 modules, CommonJS, or AMD) and package
managers like npm or bower, you may want to check out the following examples.
Note you'll need to compile your code for production yourself.

- [Basic example using AMD and bower](examples/amd-bower/): feeding Globalize on
  CLDR is not completely transparent.
- [Basic example using Node.js and npm](examples/node-npm/): feeding Globalize
  on CLDR is not completely transparent.
- [Basic Globalize Compiler example][]: shows how to use Globalize Compiler CLI.

[Basic Globalize Compiler example]: examples/globalize-compiler/

If you're using none of the tools above, but instead you're using the plain and
old script tags only, the following example may interest you. Note Globalize
allows you to go low level like this. But, acknowledge that you'll need to
handle dependencies and CLDR loading manually yourself.

- [Basic example using plain JavaScript](examples/plain-javascript/): requires
  loading CLDR and handling dependencies manually.

## API

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

#### Locales

A locale is an identifier (id) that refers to a set of user preferences that
tend to be shared across significant swaths of the world. In technical terms,
it's a String composed of three parts: language, script, and region. For
example:

| locale | description |
| --- | --- |
| *en-Latn-US* | English as spoken in the Unites States in the Latin script. |
| *en-US* | English as spoken in the Unites States (Latin script is deduced given it's the most likely script used in this place). |
| *en* | English (United States region and Latin script are deduced given they are respectively the most likely region and script used in this place). |
| *en-GB* | English as spoken in the United Kingdom (Latin script is deduced given it's the most likely script used in this place). |
| *en-IN* | English as spoken in India (Latin script is deduced). |
| *es* | Spanish (Spain region and Latin script are deduced). |
| *es-MX* | Spanish as spoken in Mexico (Latin script is deduced). |
| *zh* | Chinese (China region and Simplified Han script are deduced). |
| *zh-TW* | Chinese as spoken in Taiwan (Traditional Han script is deduced). |
| *ja* | Japanese (Japan region and Japanese script are deduced). |
| *de* | German (Germany region and Latin script are deduced). |
| *pt* | Portuguese (Brazil region and Latin script are deduced). |
| *pt-PT* | Portuguese as spoken in Portugal (Latin script is deduced). |
| *fr* | French (France region and Latin script are deduced). |
| *ru* | Russian (Russia region and Cyrillic script are deduced). |
| *ar* | Arabic (Egypt region and Arabic script are deduced). |

The likely deductibility is computed by using CLDR data, which is based on the
population and the suppress-script data in BCP47 (among others). The data is
heuristically derived, and may change over time.

Figure out the deduced information by looking at the
`cldr.attributes.maxLanguageId` property of a Globalize instance:

```js
var Globalize = require( "globalize" );
Globalize.load( require( "cldr-data" ).entireSupplemental() );
Globalize("en").cldr.attributes.maxLanguageId;
// > "en-Latn-US"
```

Globalize supports all the locales available in CLDR, which are around 740.
For more information, search for coverage charts at the downloads section of
http://cldr.unicode.org/.

Read more details about locale at [UTS#35 locale][].

[UTS#35 locale]: http://www.unicode.org/reports/tr35/#Locale

### Date module

- **`.dateFormatter( [options] )`**

  Return a function that formats a date according to the given `options`. The default formatting is
  numeric year, month, and day (i.e., `{ skeleton: "yMd" }`.

  ```javascript
  .dateFormatter()( new Date() )
  // > "11/30/2010"

  .dateFormatter({ skeleton: "GyMMMd" })( new Date() )
  // > "Nov 30, 2010 AD"

  .dateFormatter({ date: "medium" })( new Date() )
  // > "Nov 1, 2010"

  .dateFormatter({ time: "medium" })( new Date() )
  // > "5:55:00 PM"

  .dateFormatter({ datetime: "medium" })( new Date() )
  // > "Nov 1, 2010, 5:55:00 PM"
  ```

  [Read more...](doc/api/date/date-formatter.md)

- **`.dateParser( [options] )`**

  Return a function that parses a string representing a date into a JavaScript Date object according
  to the given `options`. The default parsing assumes numeric year, month, and day (i.e., `{
  skeleton: "yMd" }`).

  ```javascript
  .dateParser()( "11/30/2010" )
  // > new Date( 2010, 10, 30, 0, 0, 0 )

  .dateParser({ skeleton: "GyMMMd" })( "Nov 30, 2010 AD" )
  // > new Date( 2010, 10, 30, 0, 0, 0 )

  .dateParser({ date: "medium" })( "Nov 1, 2010" )
  // > new Date( 2010, 10, 30, 0, 0, 0 )

  .dateParser({ time: "medium" })( "5:55:00 PM" )
  // > new Date( 2015, 3, 22, 17, 55, 0 ) // i.e., today @ 5:55PM

  .dateParser({ datetime: "medium" })( "Nov 1, 2010, 5:55:00 PM" )
  // > new Date( 2010, 10, 30, 17, 55, 0 )
  ```

  [Read more...](doc/api/date/date-parser.md)

- **`.formatDate( value [, options] )`**

  Alias for `.dateFormatter( [options] )( value )`.

- **`.parseDate( value [, options] )`**

  Alias for `.dateParser( [options] )( value )`.

### Message module

- **`Globalize.loadMessages( json )`**

  Load messages data.

  [Read more...](doc/api/message/load-messages.md)

- **`.messageFormatter( path ) ➡ function( [variables] )`**

  Return a function that formats a message (using ICU message format pattern)
  given its path and a set of variables into a user-readable string. It supports
  pluralization and gender inflections.

  ```javascript
  .messageFormatter( "task" )( 1000 )
  // > "You have 1,000 tasks remaining"

  .messageFormatter( "like" )( 3 )
  // > "You and 2 others liked this"
  ```

  [Read more...](doc/api/message/message-formatter.md)

- **`.formatMessage( path [, variables ] )`**

  Alias for `.messageFormatter( path )([ variables ])`.

### Number module

- **`.numberFormatter( [options] )`**

  Return a function that formats a number according to the given options or locale's defaults.

  ```javascript
  .numberFormatter()( pi )
  // > "3.142"

  .numberFormatter({ maximumFractionDigits: 5 })( pi )
  // > "3.14159"

  .numberFormatter({ round: "floor" })( pi )
  // > "3.141"

  .numberFormatter({ minimumFractionDigits: 2 })( 10000 )
  // > "10,000.00"

  .numberFormatter({ style: "percent" })( 0.5 )
  // > "50%"
  ```

  [Read more...](doc/api/number/number-formatter.md)

- **`.numberParser( [options] )`**

  Return a function that parses a string representing a number according to the given options or
  locale's defaults.

  ```javascript
  .numberParser()( "3.14159" )
  // > 3.14159

  .numberParser()( "10,000.00" )
  // > 10000

  .numberParser({ style: "percent" })( "50%" )
  // > 0.5
  ```

  [Read more...](doc/api/number/number-parser.md)

- **`.formatNumber( value [, options] )`**

  Alias for `.numberFormatter( [options] )( value )`.

- **`.parseNumber( value [, options] )`**

  Alias for `.numberParser( [options] )( value )`.

#### Currency module

- **`.currencyFormatter( currency [, options] )`**

  Return a function that formats a currency according to the given options or
  locale's defaults.

  ```javascript
  .currencyFormatter( "USD" )( 1 )
  // > "$1.00"

  .currencyFormatter( "USD", { style: "accounting" })( -1 )
  // > "($1.00)"

  .currencyFormatter( "USD", { style: "name" })( 69900 )
  // > "69,900.00 US dollars"

  .currencyFormatter( "USD", { style: "code" })( 69900 )
  // > "69,900.00 USD"

  .currencyFormatter( "USD", { round: "ceil" })( 1.491 )
  // > "$1.50"
  ```

  [Read more...](doc/api/currency/currency-formatter.md)

- **`.formatCurrency( value, currency [, options] )`**

  Alias for `.currencyFormatter( currency [, options] )( value )`.

### Plural module

- **`.pluralGenerator( [options] )`**

  Return a function that returns the value's corresponding plural group: `zero`,
  `one`, `two`, `few`, `many`, or `other`.

  The function may be used for cardinals or ordinals.

  ```javascript
  .pluralGenerator()( 0 )
  // > "other"

  .pluralGenerator()( 1 )
  // > "one"

  .pluralGenerator({ type: "ordinal" })( 1 )
  // > "one"

  .pluralGenerator({ type: "ordinal" })( 2 )
  // > "two"
  ```

  [Read more...](doc/api/plural/plural-generator.md)

- **`.plural( value[, options ] )`**

  Alias for `.pluralGenerator( [options] )( value )`.

### Relative time module

- **`.relativeTimeFormatter( unit [, options] )`**

 Returns a function that formats a relative time according to the given unit, options, and the
 default/instance locale.

  ```javascript
  .relativeTimeFormatter( "day" )( 1 )
  // > "tomorrow"

  .relativeTimeFormatter( "month" )( -1 )
  // > "last month"

  .relativeTimeFormatter( "month" )( 3 )
  // > "in 3 months"
  ```

  [Read more...](doc/api/relative-time/relative-time-formatter.md)

- **`.formatRelativeTime( value, unit [, options] )`**

  Alias for `.relativeTimeFormatter( unit, options )( value )`.

## Unit module

- **`.unitFormatter( unit [, options] )`**

  Returns a function that formats a unit according to the given unit, options, and the
  default/instance locale.

  ```javascript
  .unitFormatter( "second" )( 10 )
  // > "10 seconds"

  .unitFormatter( "second", { form: "short" } )( 10 )
  // > "10 secs"

  .unitFormatter( "second", { form: "narrow" } )( 10 )
  // > "10s"
  ```

  [Read more...](doc/api/unit/unit-formatter.md)

- **`.formatUnit( value, unit [, options] )`**

  Alias for `.unitFormatter( unit, options )( value )`.

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


## Contributing

If you are having trouble using Globalize after reading the documentation
carefully, please post a question to [StackOverflow with the
"javascript-globalize" tag][]. Questions that include a minimal demo are more
likely to receive responses.

In the spirit of open source software development, we always encourage
community code contribution. To help you get started and before you jump into
writing code, be sure to read [CONTRIBUTING.md](CONTRIBUTING.md).

[StackOverflow with the "javascript-globalize" tag]: http://stackoverflow.com/tags/javascript-globalize

For ideas where to start contributing, see the following queries to find what
best suites your interest: [quick changes][], [new features][], [bug fixes][],
[documentation improvements][], [date module][], [currency module][], [message
module][], [number module][], [plural module][], [relative time module][]. Last
but not least, feel free to [get in touch](http://irc.jquery.org/).

[bug fixes]: https://github.com/jquery/globalize/labels/bug
[documentation improvements]: https://github.com/jquery/globalize/labels/docs
[new features]: https://github.com/jquery/globalize/labels/new%20feature
[quick changes]: https://github.com/jquery/globalize/labels/quick%20changes

[currency module]: https://github.com/jquery/globalize/labels/currency%20module
[date module]: https://github.com/jquery/globalize/labels/date%20module
[message module]: https://github.com/jquery/globalize/labels/message%20module
[number module]: https://github.com/jquery/globalize/labels/number%20module
[plural module]: https://github.com/jquery/globalize/labels/plural%20module
[relative time module]: https://github.com/jquery/globalize/labels/relative%20time%20module

### Roadmap

Our roadmap is the collection of all open issues and pull requests where you can
find:

- [Ongoing work][] lists our current sprint. Here you find where we're actively
  working on at this very moment. Priority is determined by the community needs
  and volunteering. If there is anything you want to be done, share your
  thoughts with us on any existing or new issue and especially volunteer to do
  it.
- [Everything else][] is potential next work that you could help us to
  accomplish now. Releases are published following semver rules as often as
  possible.

[Ongoing work]: https://github.com/jquery/globalize/labels/Current%20Sprint
[Everything else]: https://github.com/jquery/globalize/issues?utf8=%E2%9C%93&q=is%3Aopen+-label%3A%22Current+Sprint%22+

## Development

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
│   ├── relative-time.js (relative time module)
│   ├── relative-time/ (relative time source code)
│   ├── unit.js (unit module)
│   ├── unit/ (unit source code)
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

### Source files

The source files are as granular as possible. When combined to generate the
build file, all the excessive/overhead wrappers are cut off. It's following
the same build model of jQuery and Modernizr.

Core, and all modules' public APIs are located in the `src/` directory, ie.
`core.js`, `date.js`, `message.js`, `number.js`, and `plural.js`.

### Install development external dependencies

Install Grunt and external dependencies. First, install the
[grunt-cli](http://gruntjs.com/getting-started#installing-the-cli) and
[bower](http://bower.io/) packages if you haven't before. These should be
installed globally (like this: `npm install -g grunt-cli bower`). Then:

```bash
npm install && bower install
```

### Tests

Tests can be run either in the browser or using Node.js (via Grunt) after having
installed the external development dependencies (for more details, see above).

***Unit tests***

To run the unit tests, run `grunt test:unit`, or run `grunt connect:keepalive`
and open `http://localhost:9001/test/unit.html` in a browser. It tests the very
specific functionality of each function (sometimes internal/private).

The goal of the unit tests is to make it easy to spot bugs, easy to debug.

***Functional tests***

To run the functional tests, create the dist files by running `grunt`. Then, run
`grunt test:functional`, or open `http://localhost:9001/test/functional.html` in
a browser. Note that `grunt` will automatically run unit and functional tests
for you to ensure the built files are safe.

The goal of the functional tests is to ensure that everything works as expected
when it is combined.

### Build

Build the distribution files after having installed the external development
dependencies (for more details, see above).

```bash
grunt
```
