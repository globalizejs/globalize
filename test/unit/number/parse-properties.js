define([
	"cldr",
	"src/number/parse-properties",
	"json!fixtures/cldr/main/en/numbers.json",
	"json!fixtures/cldr/main/es/numbers.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json"
], function( Cldr, properties, enNumbers, esNumbers, likelySubtags ) {

var en, es;

Cldr.load( enNumbers );
Cldr.load( esNumbers );
Cldr.load( likelySubtags );

en = new Cldr( "en" );
es = new Cldr( "es" );

QUnit.module( "Number Parse Properties" );

QUnit.test( "should return infinitySymbol", function( assert ) {
	assert.equal( properties( "0", en )[ 0 ], "∞" );
});

QUnit.test( "should return invertedSymbolMap", function( assert ) {
	assert.deepEqual( properties( "0", es )[ 1 ], {
		"%": "%",
		"+": "+",
		",": ".",
		"-": "-",
		".": ",",
		"E": "E",
		"‰": "‰"
	});
});

QUnit.test( "should return negativePrefix", function( assert ) {
	assert.equal( properties( "0", en )[ 2 ], "-" );
	assert.equal( properties( "0;(0)", en )[ 2 ], "(" );
});

QUnit.test( "should return negativeSuffix", function( assert ) {
	assert.equal( properties( "0", en )[ 3 ], "" );
	assert.equal( properties( "0;(0)", en )[ 3 ], ")" );
});

});
