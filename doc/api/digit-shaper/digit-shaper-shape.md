## .digitShaper( [options] ) âžœ function( value )

 Return a function that shapes digits according to the given options and default/instance locale.

The returned function is invoked with one argument: the string `value` with digits to be shaped.

### Parameters

**options** Optional

A JSON object including none or any of the following options.

> **shaperType** Optional
> String `National` (default), `Contextual` or `None`.
>
> **textDir** 
> String `ltr`, `rtl`, or `auto` (default).

**value**

String with digits to be shaped, eg. `"اول 123 abc 123"`.


### Example

Prior to using any digit shaper methods, you must load `cldr/main/{locale}/numbers.json`
and `cldr/supplemental/numberingSystems.jsons`.
Read [CLDR content][] if you need more information.

[CLDR content]: ../../../README.md#2-cldr-content

You can use the static method `Globalize.digitShaper()`, which uses the default locale.

```javascript
var shaper;

Globalize.locale( "ar" );
shaper = Globalize.digitShaper( {"shaperType": "Contextual", "textDir": "rtl"} );

shaper( "اول 123 abc 123" );
// > "اول ١٢٣ abc 123"

shaper = Globalize.digitShaper( {"shaperType": "National", "textDir": "rtl"} );
shaper( "اول 123 abc 123" );
// > "اول ١٢٣ abc ١٢٣"
```

You can use the instance method `.digitShaper()`, which uses the instance locale.

```javascript
var shaper = new Globalize( "ar" ).digitShaper( {"shaperType": "Contextual", "textDir": "rtl"} );

shaper( "اول 123 abc 123" );
// > "اول ١٢٣ abc 123"
```
