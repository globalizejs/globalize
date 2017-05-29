# Unicode CLDR usage

## How do I get CLDR data?

*By downloading the JSON packages individually...*

Unicode CLDR is available as JSON at https://github.com/unicode-cldr/ (after this [json-packaging proposal][] took place). Please, read https://github.com/unicode-cldr/cldr-json for more information about package organization.

[json-packaging proposal]: http://cldr.unicode.org/development/development-process/design-proposals/json-packaging

*By using a package manager...*

`cldr-data` can be used for convenience. It always downloads from the correct source.

Use bower `bower install cldr-data` ([detailed instructions][]) or npm `npm install cldr-data`. For more information, see:

- https://github.com/rxaviers/cldr-data-npm
- https://github.com/rxaviers/cldr-data-bower

[detailed instructions]: https://github.com/rxaviers/cldr-data-bower

## How do I load CLDR data into Globalize?

The short answer is by using `Globalize.load()` and passing the JSON data as the first argument. Below, follow several examples on how this could be accomplished.

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

// Use $.getJSON instead of $.get if your server is not configured to return the
// right MIME type for .json files.
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
  "json!cldr-data/main/en/ca-gregorian.json",
  "json!cldr-data/supplemental/likelySubtags.json",
  "json!cldr-data/supplemental/timeData.json",
  "json!cldr-data/supplemental/weekData.json",
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
var Globalize = require( "globalize" );

Globalize.load(
  require( "cldr-data/main/en/ca-gregorian" ),
  require( "cldr-data/supplemental/likelySubtags" ),
  require( "cldr-data/supplemental/timeData" ),
  require( "cldr-data/supplemental/weekData" )
);
```
