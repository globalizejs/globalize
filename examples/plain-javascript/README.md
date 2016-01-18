# Hello World (plain javascript)

The demo contains one single file:

```
.
└── index.html
```

Before running it, execute the requirements below.


## Requirements

**1. Dependencies**

The demo requires Globalize and its dependencies. Globalize's dependencies are listed on [Getting
Started](../../README.md#dependencies), and the only one is
[cldrjs](https://github.com/rxaviers/cldrjs). You are free to fetch it the way you want. But, as an
exercise of this demo, we'll download it ourselves. So:

1. Click at [Globalize releases tab](https://github.com/rxaviers/globalize/releases).
1. Download the latest package.
1. Unzip it.
1. Rename the extracted directory `globalize` and move it alongside `index.html` and `README.md`.
1. Click at [cldrjs releases tab](https://github.com/rxaviers/cldrjs/releases).
1. Download the latest package.
1. Unzip it.
1. Rename the extracted directory `cldrjs` and move it alongside `index.html` and `README.md`.

Then, you'll get this:

```
.
├── cldrjs
│   └── dist
│       ├── cldr.js
│       ├── ...
│       └── cldr
│           ├── event.js
│           ├── supplemental.js
│           └── ...
├── globalize
│   └── dist
│       ├── globalize.js
│       ├── ...
│       └── globalize
│           ├── currency.js
│           ├── date.js
│           └── ...
├── index.html
└── README.md
```

For more information read [cldrjs' usage and
installation](https://github.com/rxaviers/cldrjs#usage-and-installation) docs.

**2. CLDR content**

Another typical Globalize requirement is to fetch CLDR content yourself. But, on
this demo we made the things a little easier for you: we've embedded static JSON
into the demo. So, you don't need to actually fetch it anywhere. For more
information about fetching Unicode CLDR JSON data, see [How do I get CLDR
data?](../../doc/cldr.md).

No action needed here.

**3. Globalize `dist` files**

*This step only applies if you are building the source files. If you have downloaded a ZIP or a TAR.GZ or are using a package manager (such as bower or npm) to install then you can ignore this step.*

[Install the development external dependencies](../../README.md#install-development-external-dependencies) and [build the distribution files](../../README.md#build).

## Running the demo

Once you've completed the requirements above:

1. Point your browser at `./index.html`.
1. Open your JavaScript console to see the demo output.
1. Understand the demo by reading the source code. We have comments there for
you.
