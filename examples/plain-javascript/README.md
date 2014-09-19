# Hello World (plain javascript)

The demo contains one single file:

```
.
└── index.html
```

Before running it, execute the requirements below.


## Requirements

**1. Dependencies**

Globalize's dependencies are listed on [Getting
Started](../../README.md#dependencies), and the only one is
[cldr.js](https://github.com/rxaviers/cldrjs). You are free to fetch it the way
you want. But, as an exercise of this demo, we'll download it ourselves. So:

1. Click at [cldr.js releases tab](https://github.com/rxaviers/cldrjs/releases).
1. Download the latest package.
1. Unzip it.
1. Copy its `dist/` files into this directory.

Then, you'll get this:

```
.
├── cldr
│   ├── event.js
│   └── supplemental.js
├── cldr.js
└── index.html
```

For more information read [cldr.js' usage and
installation](https://github.com/rxaviers/cldrjs#usage-and-installation) docs.

**2. CLDR content**

Another tipical Globalize requirement is to fetch CLDR content yourself. But, on
this demo we made the things a little easier for you: we've embedded static JSON
into the demo. So, you don't need to actually fetch it anywhere.

No action needed here.


## Running the demo

Once you've completed the requirements above:

1. Point your browser at `./index.html`.
1. Open your JavaScript console to see the demo output.
1. Understand the demo by reading the source code. We have comments there for
you.
