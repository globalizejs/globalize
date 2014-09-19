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

Download the [latest Unicode CLDR JSON
ZIP](http://www.unicode.org/Public/cldr/latest/json.zip) and unzip it into
`cldr/`. For more information read [Getting Started](../../README.md#cldr).

```
wget http://www.unicode.org/Public/cldr/latest/json.zip
unzip json.zip -d cldr
```

Then, you'll get this:

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
├── cldr/
│   ├── main/
│   │   └── ...
│   └── supplemental/
│       └── ...
├── index.html
└── main.js
```


## Running the demo

Once you've completed the requirements above:

1. Point your browser at `./index.html`.
1. Open your JavaScript console to see the demo output.
1. Understand the demo by reading the source code (both index.html and main.js).
We have comments there for you.
