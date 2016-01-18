# Globalize App example using webpack

This example demonstrates how to integrate Globalize with Webpack in your
Application. If you already have an existing Application using Webpack stack,
this example should as well provide you guidance on how to integrate Globalize.
It focuses on the [Globalize Webpack Plugin][], which automates data loading
(CLDR and app messages) during development and automates Globalize compilation
and the usage of Globalize runtime modules for production. It assumes knowledge
of Globalize, npm, and Webpack usage basics.

## Requirements

**1. Install app development dependencies**

This example uses `npm` to download the app development dependencies (i.e.,
Globalize, CLDR data, Cldrjs, Webpack, [Globalize Webpack Plugin][], and
others).

```
npm install
```

## Running the example

### Development mode

```
npm start
```

1. Start a server by running `npm start`, which uses webpack's live reload HMR
(Hot Module Replacement). See `package.json` to understand the actual shell
command that is used.
1. Point your browser at `http://localhost:8080`. Note that your browser will
automatically reload on any changes made to the application code (`app/*.js`
files). Also note that for faster page reload, formatters are created
dynamically and automatically by the [Globalize Webpack Plugin][].
1. Note you can specify the development locale of your choice by setting the
`developmentLocale` property of the Globalize Webpack Plugin on the Webpack
config file.
1. Note that CLDR data and your messages data are automatically loaded by the
[Globalize Webpack Plugin][].
1. Understand the demo by reading the source code. We have comments there for
you.

### Production mode

```
npm run build
```

1. Generate the compiled bundles by running `npm run build`, which will be
created at `./dist`. Note the production bundles are split into three chunks:
(a) vendor, which holds third-party libraries, which in this case means
Globalize Runtime modules, (b) i18n precompiled data, which means the minimum
yet sufficient set of precompiled i18n data that your application needs (one
file for each supported locale), and (c) app, which means your application code.
Also note that all the production code is already minified using UglifyJS. See
`package.json` to understand the actual shell command that is used.
1. Note that your formatters are already precompiled. This is
obvious, but worth emphasizing. It means your formatters are prebuilt, so no client
CPU clock is wasted to generate them and no CLDR or messages data needs to be
dynamically loaded. It means fast to load code (small code) and fast to run
code.
1. Point your browser at `./dist/index.html` to run the application using the
generated production files. Edit this file to display the application using a
different locale (source code has instructions).
1. Understand the demo by reading the source code. We have comments there for
you.

For more information about the plugin, see the [Globalize Webpack Plugin][]
documentation.

[Globalize Webpack Plugin]: https://github.com/rxaviers/globalize-webpack-plugin
