define([
	"cldr",
	"src/number/parse-properties",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/es/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, properties, enNumbers, esNumbers, likelySubtags ) {

var en, es;

Cldr.load(
	enNumbers,
	esNumbers,
	likelySubtags
);

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
