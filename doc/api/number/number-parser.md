## .numberParser( [options] )

Return a function that formats a number according to the given options.

### Parameters

**options** Optional

A JSON object including none or any of the following options.

> **style** Optional
>
> String `decimal` (default), or `percent`.

### Example

You can use the static method `Globalize.numberParser()`, which uses the
default locale.

```javascript
var parser;

Globalize.locale( "en" );
parser = Globalize.numberParser();

parser( "3.14" ); // 3.14
```

You can use the instance method `.numberParser()`, which uses the instance
locale.

```javascript
var enParser = Globalize( "ar" ).numberParser(),
  esParser = Globalize( "es" ).numberParser();

enParser( "3.14" ); // 3.14
esParser( "3,14" ); // 3.14
```

Some more examples.

```javascript
var parser = Globalize( "en" ).numberParser();

parser( "12,735.00" ); // 12735
parser( "6.626E-34" ); // 6.626e-34
parser( "∞" ); // Infinity
parser( "invalid-stuff" ); // NaN
```
