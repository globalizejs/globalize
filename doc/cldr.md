# Unicode CLDR usage

## How do I get CLDR data?

The Unicode CLDR is available for download as JSON:
- [`json.zip`](http://www.unicode.org/Public/cldr/latest/json.zip) for the
  most used languages.
- [`json-full.zip`](http://www.unicode.org/Public/cldr/latest/json-full.zip)
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
$.when(
  $.get( "cldr/main/en/ca-gregorian.json" ),
  $.get( "cldr/supplemental/likelySubtags.json" ),
  $.get( "cldr/supplemental/timeData.json" ),
  $.get( "cldr/supplemental/weekData.json" )
).then(function() {

  // Normalize $.get results, we only need the JSON, not the request statuses.
  return [].slice.apply( arguments, [ 0 ] ).map(function( result ) {
      return result[ 0 ];
  });

}).then( Globalize.load ).then(function() {

  // Your code goes here.

});

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

  Globalize.load(
    enCaGregorian,
    likelySubtags,
    timeData,
    weekData
  );

  // Your code goes here.

});
```

Example using Node.js:

```javascript
var cldrData = require( "cldr-data" ),
  Globalize = require( "globalize" );

Globalize.load(
  cldrData( "main/en/ca-gregorian" ),
  cldrData( "supplemental/likelySubtags" ),
  cldrData( "supplemental/timeData" ),
  cldrData( "supplemental/weekData" )
);
```
