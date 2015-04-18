# Hello World (AMD + bower)

We assume you know what [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) and
[bower](http://bower.io/) is.

The demo is composed of the following files:

```
.
├── index.html
└── main.js
```

Before running it, execute the requirements below.


## Requirements

**1. Install Globalize**

Let's use bower to download Globalize. For more information on regard of
installation, please read [Getting Started](../../README.md#installation).

```
bower install
```

Note bower will also fetch some other dependencies of this demo, eg. require.js
and its json plugin.

You'll get this:

```
.
├── bower_components/
│   ├── globalize/ 
│   │   └── dist/
│   │       ├── globalize
│   │       │   ├── date.js
│   │       │   └── ...
│   │       └── globalize.js
│   └── ...
├── index.html
└── main.js
```

**2. Install Dependencies**

No action needed, because bower has already handled that for us.

**3. CLDR content**

No action needed, because bower has already handled that for us. Note `.bowerrc`
has postinstall hook that populates bower's cldr-data skeleton. For more
information, see [bower's cldr-data](https://github.com/rxaviers/cldr-data-bower).


## Running the demo

Once you've completed the requirements above:

1. Start a server by running `python -m SimpleHTTPServer` or other alternative servers such as [http-server](https://github.com/nodeapps/http-server), [nginx](http://nginx.org/en/docs/), [apache](http://httpd.apache.org/docs/trunk/).
1. Point your browser at `http://localhost:8000/`.
1. Understand the demo by reading the source code (both index.html and main.js).
We have comments there for you.
