## [new] Globalize.bidiEngine( options )

Create Bidi engine instance.

### Parameters

** options **

A JSON object with optional parameters defining Bidi reordering
Remark. This parameter is optional. If not defined, default values are used. These values can be updated at 
any moment by calling 'setOptions' method of bidi engine.

**isInputVisual** - ordering scheme of source string, true for 'Visual', false for 'Logical' 
(defaults to false)  
**isInputRtl** - text orientation of source string, true for 'right-to-left', false for 'left-to-right', 
undefined for 'conextual' i.e.direction defined by first strong character of input string (defaults to 'conextual')   
**isOutputVisual** - ordering scheme of target string, true for 'Visual', false for 'Logical' 
(defaults to false)  
**isOutputRtl** - text orientation of target string, true for 'right-to-left', false for 'left-to-right',
undefined for 'conextual' i.e.direction defined by first strong character of input string (defaults to 'conextual')  
**isSymmetricSwapping** - whether to replace characters with the "mirrored" property in RTL runs 
(like brackets) by their mirror-image mapping valid values true/false (defaults to false) 
	
### Example

```javascript
  var options = {
	isInputVisual: true,
	isInputRtl: false,
	isOutputVisual: false,
	isOutputRtl: true,
	isSymmetricSwapping: true
  };
  var bidiEngine = Globalize.bidiEngine( options );

## .doBidiReorder( sourceText, sourceToTargetMap, levels );

  Returns reordered text.

### Parameters
  
** sourceText **
Input parameter - String to be reordered

** sourceToTargetMap **
Output optional parameter - Array containing mapping between indexes 
of corresponding characters in source and returned (reordered) strings

** levels **
Output optional parameter - Array containing Bidi levels of characters in source string

  ```javascript
  var sourceToTargetMap = [], levels = [];
  var bidiEngine = Globalize.bidiEngine( {isInputVisual: true, isSymmetricSwapping: true} );
  var reorderedString = bidiEngine.doBidiReorder( "a(b)cA<B>C& 123", sourceToTargetMap, levels ); 
  // reorderedString > "123 &C<B>Aa(b)c" (upper case stands for Arabic or Hebrew)
  // sourceToTargetMap >
  // levels >

## .setOptions( options );

  Sets parameters for Bidi reordering.
  Remark: parameters for Bidi reordering might be set at Bidi engine initializations via constructor,
  however part or all of them may be updated later on using 'setOptions'. From that momnet invokation of
  'doBidiReorder' will be based on updated set of options
### Parameters

** options **

A JSON object with optional parameters defining Bidi reordering

For details see above, Globalize.bidiEngine

  ```javascript

var bidiEngine = Globalize.bidiEngine( );
var options = [];
options.isInputVisual = false;
options.isOutputVisual = true;
options.isInputRtl = true;

bidiEngine.setOptions( options );

var ret = bidiEngine.doBidiReorder( "Input text" );