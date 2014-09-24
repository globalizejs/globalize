# Hello World (Node.js + npm)

We assume you know what [Node.js](http://nodejs.org/) and
[npm](https://www.npmjs.org/) is.

The demo contains one single file:

```
.
└── main.js
```

Before running it, execute the requirements below.


## Requirements

**1. Install Globalize**

Let's use npm to download Globalize. For more information on regard of
installation, please read [Getting Started](../../README.md#installation).

```
npm install
```

Then, you'll get this:

```
.
├── node_modules/
│   ├── globalize/ 
│   │   └── dist/
│   │       ├── globalize
│   │       │   ├── date.js
│   │       │   └── ...
│   │       └── globalize.js
│   └── ...
└── main.js
```

**2. Dependencies**

No action needed, because npm has already handled that for us.

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
├── node_modules/
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
└── main.js
```


## Running the demo

Once you've completed the requirements above:

1. Run `node main.js`.
1. Understand the demo by reading the source code (both index.html and main.js).
We have comments there for you.
