# Globalize

[![Build Status](https://secure.travis-ci.org/jquery/globalize.png)](http://travis-ci.org/jquery/globalize)
[![devDependency Status](https://david-dm.org/jquery/globalize/status.png)](https://david-dm.org/jquery/globalize#info=dependencies)
[![devDependency Status](https://david-dm.org/jquery/globalize/dev-status.png)](https://david-dm.org/jquery/globalize#info=devDependencies)

A JavaScript library for internationalization and localization that leverage the
official [Unicode CLDR](http://cldr.unicode.org/) JSON data. The library works both for the browser and as a
Node.js module.

- [Heads up!](#heads_up)
  - [This is an alpha 1.x version](#alpha)
  - [Not accepting 0.x fixes anymore](#0.x-fixes)
- [About Globalize](#about)
  - [Why globalization?](#why)
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
  - [Number module](#number_module)
  - [Date module](#date_module)
  - [Message module](#message_module)
  - more to come...
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

<a name="where_to_use"></a>
### Where to use it?

It's designed to work both in the [browser](#browser_support), or in
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

| File | Minified size | Summary |
|---|--:|---|
| globalize.js | 0.4KB | [Core library](#core) |
| globalize/date.js | +9.2KB | [Date module](#date_module) provides date formatting and parsing |
| globalize/number.js | +3.7KB | [Number module](#number_module) provides number formatting and parsing |
| globalize/translate.js | +0.7KB | [Message module](#message_module) provides message translation |
<!--- By updating this table, also update its clone in #usage -->

<a name="browser_support"></a>
### Browser Support

We officialy support http://jquery.com/browser-support/. If you find any bugs,
please just [let us know](https://github.com/jquery/globalize/issues).


<a name="getting_started"></a>
## Getting Started

<a name="requirements"></a>
### Requirements

<a name="dependencies"></a>
#### 1. Dependencies

You need to satisfy Globalize dependencies prior to using it. The good news
is, there is only one. It's the [cldr.js](https://github.com/rxaviers/cldrjs),
which is a CLDR low level manipulation tool.

If you use a package manager like bower or npm, you don't need to worry at all
about it. If this isn't the case, so yes you need to manually download it
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
| Number module | cldr/main/`locale`/numbers.json |
| Date module | cldr/main/`locale`/ca-gregorian.json<br>cldr/supplemental/timeData.json<br>cldr/supplemental/weekData.json |

*(b) How am I supposed to get and load CLDR content?*

Learn [how to get and load CLDR content...](doc/cldr.md).

<a name="installation"></a>
### Installation

*By downloading a ZIP or a TAR.GZ...*

Click at the github [releases tab](https://github.com/jquery/globalize/releases)
and download the package.

*By using a package manager...*

Use bower `bower install globalize`, or npm `npm install globalize`.

*By using source files...*

1. `git clone https://github.com/jquery/globalize.git`.
1. [Build the distrubution files](https://github.com/jquery/globalize/#build).

<a name="usage"></a>
### Usage

Globalize's consumable-files are located in the `./dist` directory. If you
don't find it, it's because you are using a development branch. You should
either use a tagged version or [build the distrubution files yourself](#build).
Read [installation](#installation) above if you need more information on how to
download.

Globalize can be used for a variety of different i18n tasks, eg. format or parse
dates, format or parse numbers, format messages, etc. You may NOT need Globalize
in its entirety. For that reason, we made it modular. So, you can cherry-pick
the pieces you need, eg. load `dist/globalize.js` to get Globalize core, load
`dist/globalize/date.js` to extend Globalize with Date functionalities, etc.

An example is worth a thousand words. Check out our Hello World demo (available
to you in different flavors):
- [Hello World (AMD + bower)](doc/hello-world/amd-bower/).
- [Hello World (Node.js + npm)](doc/hello-world/node-npm/).
- [Hello World (plain JavaScript)](doc/hello-world/plain-javascript/).


<a name="api"></a>
## API

<a name="core"></a>
### Core module

- **`Globalize.load( cldrJSONData )`**

 This method allows you to load CLDR JSON locale data. `Globalize.load()` is a
 proxy to `Cldr.load()`.

 [Read more...](doc/api/core/load.md)

- **`Globalize.locale( [locale] )`**

 Set default locale, or get it if locale argument is omitted.

 [Read more...](doc/api/core/locale.md)

<a name="number_module"></a>
### Number module

- **`Globalize.formatNumber( value [, attributes] [, locale] )`**

  Format a number according to the given attributes and the given locale (or the
  default locale if not specified).

 [Read more...](doc/api/number/format.md)

- **`Globalize.parseNumber( value [, formats], [locale] )`**

 TBD

<a name="date_module"></a>
### Date module

- **`Globalize.formatDate( value, format [, locale] )`**

  Format a date according to the given format and locale (or the current locale
  if not specified).

 [Read more...](doc/api/date/format.md)

- **`Globalize.parseDate( value [, formats] [, locale] )`**

 Parse a string representing a date into a JavaScript Date object, taking into
 account the given possible formats (or the given locale's set of preset formats
 if not provided). As before, the current locale is used if one is not
 specified.

 [Read more...](doc/api/date/parse.md)

<a name="message_module"></a>
### Message module

- **`Globalize.loadMessages( locale, messageData )`**

 Load message data per locale.

 [Read more...](doc/api/message/load.md)

- **`Globalize.translate( path [, locale] )`**

 Translate item given its path.

 [Read more...](doc/api/message/translate.md)


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


## License

MIT © [jQuery Foundation](http://jquery.com/) and other contributors.
