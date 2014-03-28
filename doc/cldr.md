# Unicode CLDR usage

## How do I get CLDR data?

The Unicode CLDR is available for download as JSON:
- [`json.zip`](http://www.unicode.org/Public/cldr/latest/json.zip) for the
  most used languages.
- [`json_full.zip`](http://www.unicode.org/Public/cldr/latest/json_full.zip)
  for all the available CLDR languages.

For the examples below, first fetch CLDR JSON data:

```bash
wget http://www.unicode.org/Public/cldr/latest/json.zip
unzip json.zip -d cldr
```

## How do I load CLDR data into Globalize?

The short answer is by using `Globalize.load()` and passing the JSON data as the
first argument. Below, follow several examples on how this could be
accomplished.

Example of embedding CLDR JSON data:

```html
<script>
Globalize.load({
  main: {
    en: {
      ...
    }
  },
  supplemental: {
    likelySubtags: {
      ...
    },
    timeDate: {
      ...
    },
    weekData: {
      ...
    }
  }
});
</script>
```

Example of loading it dynamically:

```html
<script src="jquery.js"></script>
<script>
$.get( "cldr/main/en/ca-gregorian.json", Globalize.load );
$.get( "cldr/supplemental/likelySubtags.json", Globalize.load );
$.get( "cldr/supplemental/timeData.json", Globalize.load );
$.get( "cldr/supplemental/weekData.json", Globalize.load );
</script>
```

Example using AMD (also see our [functional tests](../../test/functional.js)):
```javascript
define([
  "globalize",
  "json!fixtures/cldr/main/en/ca-gregorian.json",
  "json!fixtures/cldr/supplemental/likelySubtags.json",
  "json!fixtures/cldr/supplemental/timeData.json",
  "json!fixtures/cldr/supplemental/weekData.json",
  "globalize/date"
], function( Globalize, enCaGregorian, likelySubtags, timeData, weekData ) {

  Globalize.load( enCaGregorian );
  Globalize.load( likelySubtags );
  Globalize.load( timeData );
  Globalize.load( weekData );

});
```

Example using Node.js:

```javascript
var Globalize = require( "globalize" );
Globalize.load( require( "./cldr/main/en/ca-gregorian.json" ) );
Globalize.load( require( "./cldr/supplemental/likelySubtags.json" ) );
Globalize.load( require( "./cldr/supplemental/timeData.json" ) );
Globalize.load( require( "./cldr/supplemental/weekData.json" ) );
```
