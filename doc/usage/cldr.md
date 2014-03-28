# Unicode CLDR usage

## How do I get CLDR data?

The Unicode CLDR is available for download as JSON
([`json.zip`](http://www.unicode.org/Public/cldr/latest/json.zip)). This file
contains the complete data of what the Unicode CLDR Project considers the top
20 languages (at the time of this writing).

You can generate the JSON representation of the languages not available in the
ZIP file by using the official conversion tool
([`tools.zip`](http://www.unicode.org/Public/cldr/latest/)). This ZIP contains a
README with instructions on how to build the data.

You can choose to generate unresolved data to save space or bandwidth (`-r false`
option of the conversion tool), and instead have it resolve at runtime.

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
