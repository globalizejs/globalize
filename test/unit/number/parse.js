define([
	"cldr",
	"src/number/parse",
	"src/number/parse-properties",
	"json!fixtures/cldr/main/ar/numbers.json",
	"json!fixtures/cldr/main/dz/numbers.json",
	"json!fixtures/cldr/main/en/numbers.json",
	"json!fixtures/cldr/main/es/numbers.json",
	"json!fixtures/cldr/main/sv/numbers.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json"
], function( Cldr, parse, properties, arNumbers, dzNumbers, enNumbers, esNumbers, svNumbers,
	likelySubtags ) {

var ar, dz, en, es, sv;

Cldr.load( arNumbers );
Cldr.load( dzNumbers );
Cldr.load( enNumbers );
Cldr.load( esNumbers );
Cldr.load( svNumbers );
Cldr.load( likelySubtags );

ar = new Cldr( "ar" );
dz = new Cldr( "dz" );
en = new Cldr( "en" );
es = new Cldr( "es" );
sv = new Cldr( "sv" );

QUnit.module( "Number Parse" );

/**
 *  Integers
 */

QUnit.test( "should parse integers", function( assert ) {
	assert.equal( parse( "3", properties( "0", en ) ), 3 );
});

QUnit.test( "should parse zero-padded integers", function( assert ) {
	assert.equal( parse( "003", properties( "000", en ) ), 3 );
});

QUnit.test( "should parse grouping separators", function( assert ) {
	assert.equal( parse( "12,735", properties( "#,##0.#", en ) ), 12735 );
	assert.equal( parse( "1,2,7,35", properties( "#,#,#0.#", en ) ), 12735 );
	assert.equal( parse( "12.735", properties( "#,##0", es ) ), 12735 );
});

QUnit.test( "should parse negative integers", function( assert ) {
	assert.equal( parse( "-3", properties( "0", en ) ), -3 );
	assert.equal( parse( "(3)", properties( "0;(0)", en ) ), -3 );
});

/**
 *  Decimals
 */

QUnit.test( "should parse decimals", function( assert ) {
	assert.equal( parse( "3.14", properties( "0.##", en ) ), 3.14 );
	assert.equal( parse( "3,14", properties( "0.##", es ) ), 3.14 );
	assert.equal( parse( "3٫14", properties( "0.##", ar ) ), 3.14 );
	assert.equal( parse( "3.00", properties( "0.##", en ) ), 3 );
});

QUnit.test( "should parse zero-padded decimals", function( assert ) {
	assert.equal( parse( "12735.0", properties( "0.0", en ) ), 12735 );
	assert.equal( parse( "0.10", properties( "0.00", en ) ), 0.1 );
});

QUnit.test( "should parse negative decimal", function( assert ) {
	assert.equal( parse( "-3.14", properties( "0.##", en ) ), -3.14 );
	assert.equal( parse( "(3.14)", properties( "0.##;(0.##)", en ) ), -3.14 );
});

/**
 *  Percent
 */

QUnit.test( "should parse percent", function( assert ) {
	assert.equal( parse( "1%", properties( "0%", en ) ), 0.01 );
	assert.equal( parse( "01%", properties( "00%", en ) ), 0.01 );
	assert.equal( parse( "10%", properties( "0%", en ) ), 0.1 );
	assert.equal( parse( "50%", properties( "#0%", en ) ), 0.5 );
	assert.equal( parse( "100%", properties( "0%", en ) ), 1 );
	assert.equal( parse( "0.5%", properties( "##0.#%", en ) ), 0.005 );
	assert.equal( parse( "0.5%", properties( "##0.#%", en ) ), 0.005 );
});

QUnit.test( "should localize percent symbol (%)", function( assert ) {
	assert.equal( parse( "50٪", properties( "#0%", ar ) ), 0.5 );
});

QUnit.test( "should parse negative percentage", function( assert ) {
	assert.equal( parse( "-10%", properties( "0%", en ) ), -0.1 );
	assert.equal( parse( "(10%)", properties( "0%;(0%)", en ) ), -0.1 );
	assert.equal( parse( "(10)%", properties( "0%;(0)%", en ) ), -0.1 );
});

/**
 *  Per mille
 */

QUnit.test( "should parse per mille", function( assert ) {
	assert.equal( parse( "1\u2030", properties( "0\u2030", en ) ), 0.001 );
	assert.equal( parse( "01\u2030", properties( "00\u2030", en ) ), 0.001 );
	assert.equal( parse( "10\u2030", properties( "0\u2030", en ) ), 0.01 );
	assert.equal( parse( "100\u2030", properties( "0\u2030", en ) ), 0.1 );
	assert.equal( parse( "500\u2030", properties( "#0\u2030", en ) ), 0.5 );
	assert.equal( parse( "1000\u2030", properties( "0\u2030", en ) ), 1 );
	assert.equal( parse( "0.5\u2030", properties( "##0.#\u2030", en ) ), 0.0005 );
	assert.equal( parse( "0.5\u2030", properties( "##0.#\u2030", en ) ), 0.0005 );
	assert.equal( parse( "500\u2030", properties( "#0‰", en ) ), 0.5 );
	assert.equal( parse( "500‰", properties( "#0‰", en ) ), 0.5 );
	assert.equal( parse( "500؉", properties( "#0\u2030", ar ) ), 0.5 );
});

QUnit.test( "should parse negative mille", function( assert ) {
	assert.equal( parse( "-1\u2030", properties( "0\u2030", en ) ), -0.001 );
	assert.equal( parse( "(1\u2030)", properties( "0\u2030;(0\u2030)", en ) ), -0.001 );
	assert.equal( parse( "(1)\u2030", properties( "0\u2030;(0)\u2030", en ) ), -0.001 );
});

/**
 *  Scientific notation
 */
QUnit.test( "should parse scientific notation numbers", function( assert ) {
	assert.equal( parse( "3E-3", properties( "0", en ) ), 0.003 );
	assert.equal( parse( "3×10^-3", properties( "0", sv ) ), 0.003 );
});

/**
 *  Infinite number
 */
QUnit.test( "should parse infinite numbers", function( assert ) {
	assert.equal( parse( "∞", properties( "0", en ) ), Infinity );
	assert.equal( parse( "-∞", properties( "0", en ) ), -Infinity );
	assert.equal( parse( "(∞)", properties( "0;(0)", en ) ), -Infinity );
	assert.equal( parse( "གྲངས་མེད", properties( "0", dz ) ), Infinity );
});

/**
 *  NaN
 */

QUnit.test( "should parse invalid numbers as NaN", function( assert ) {
	assert.deepEqual( parse( "invalid", properties( "0", en ) ), NaN );
	assert.deepEqual( parse( "NaN", properties( "0", en ) ), NaN );
});


});
