define([
	"cldr",
	"src/number/format-properties",
	"json!fixtures/cldr/main/ar/numbers.json",
	"json!fixtures/cldr/main/en/numbers.json",
	"json!fixtures/cldr/main/es/numbers.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json"
], function( Cldr, properties, arNumbers, enNumbers, esNumbers, likelySubtags ) {

var ar, en, es;

Cldr.load( arNumbers );
Cldr.load( enNumbers );
Cldr.load( esNumbers );
Cldr.load( likelySubtags );

ar = new Cldr( "ar" );
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
	assert.deepEqual( properties( "0", ar )[ 18 ], {
		"%": "٪",
		"+": "‏+",
		",": "٬",
		"-": "‏-",
		".": "٫",
		"E": "اس",
		"‰": "؉"
	});
});

});
