# Globalize usage

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
