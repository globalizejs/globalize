define([
	"cldr",
	"src/number/format-properties",
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

QUnit.module( "Number Format Properties" );

QUnit.test( "should return positivePattern", function( assert ) {
	assert.equal( properties( "0", en )[ 11 ], "0" );
	assert.equal( properties( "#,##0.0#;(0)", en )[ 11 ], "#,##0.0#" );
});

QUnit.test( "should return negativePattern", function( assert ) {
	assert.equal( properties( "0", en )[ 12 ], "-0" );
	assert.equal( properties( "#,##0.0#;(0)", en )[ 12 ], "(#,##0.0#)" );
});

QUnit.test( "should return negativePrefix", function( assert ) {
	assert.equal( properties( "#,##0.0#;(0)", en )[ 13 ], "(" );
});

QUnit.test( "should return negativeSuffix", function( assert ) {
	assert.equal( properties( "#,##0.0#;(0)", en )[ 14 ], ")" );
});

QUnit.test( "should return round function", function( assert ) {
	assert.equal( properties( "0", en )[ 15 ]( 123.45 ), "123" );
	assert.equal( properties( "0", en, {
		round: "ceil"
	})[ 15 ]( 123.45 ), "124" );
});

QUnit.test( "should return infinitySymbol", function( assert ) {
	assert.equal( properties( "0", en )[ 16 ], "∞" );
});

QUnit.test( "should return nanSymbol", function( assert ) {
	assert.equal( properties( "0", en )[ 17 ], "NaN" );
});

QUnit.test( "should return symbolMap", function( assert ) {
	assert.deepEqual( properties( "0", es )[ 18 ], {
		"%": "%",
		"+": "+",
		",": ".",
		"-": "-",
		".": ",",
		"E": "E",
		"‰": "‰"
	});
});

});
