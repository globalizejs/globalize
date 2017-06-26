define([
	"cldr",
	"src/number/parse",
	"src/number/parse-properties",
	"json!cldr-data/main/ar/numbers.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/es/numbers.json",
	"json!cldr-data/main/pt/numbers.json",
	"json!cldr-data/main/ru/numbers.json",
	"json!cldr-data/main/sv/numbers.json",
	"json!cldr-data/main/zh/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/numberingSystems.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, parse, properties, arNumbers, enNumbers, esNumbers, ptNumbers, ruNumbers,
	svNumbers, zhNumbers, likelySubtags, numberingSystems ) {

var ar, en, es, pt, ru, sv, zh;

Cldr.load(
	arNumbers,
	enNumbers,
	esNumbers,
	ptNumbers,
	ruNumbers,
	svNumbers,
	zhNumbers,
	likelySubtags,
	numberingSystems
);

ar = new Cldr( "ar" );
en = new Cldr( "en" );
es = new Cldr( "es" );
pt = new Cldr( "pt" );
ru = new Cldr( "ru" );
sv = new Cldr( "sv" );
zh = new Cldr( "zh-u-nu-native" );

QUnit.module( "Number Parse" );

/**
 *  Integers
 */

QUnit.test( "should parse integers", function( assert ) {
	assert.equal( parse( "3", properties( "0", en ) ), 3 );
});

QUnit.test( "should parse invalid integers as NaN", function( assert ) {
	assert.deepEqual( parse( "", properties( "0", en ) ), NaN );
});

QUnit.test( "should parse zero-padded integers", function( assert ) {
	assert.equal( parse( "003", properties( "000", en ) ), 3 );
});

QUnit.test( "should parse grouping separators", function( assert ) {
	assert.equal( parse( "12,735", properties( "#,##0.#", en ) ), 12735 );
	assert.equal( parse( "12735", properties( "#,##0.#", en ) ), 12735 );
	assert.equal( parse( "1,2,7,35", properties( "#,#,#0.#", en ) ), 12735 );
	assert.equal( parse( "12.735", properties( "#,##0", es ) ), 12735 );
	assert.equal( parse( "1000", properties( "#,##0", en ) ), 1000 );
	assert.equal( parse( "1000", properties( "#,##,##0", en ) ), 1000 );
});

QUnit.test( "should parse invalid grouping separators as NaN", function( assert ) {
	assert.deepEqual( parse( "1,2735", properties( "#,##0.#", en ) ), NaN );
	assert.deepEqual( parse( "1,2,735", properties( "#,#,#0.#", en ) ), NaN );
	assert.deepEqual( parse( "1,27,35", properties( "#,#,#0.#", en ) ), NaN );
	assert.deepEqual( parse( "12,7,35", properties( "#,#,#0.#", en ) ), NaN );
	assert.deepEqual( parse( "1.2735", properties( "#,##0", es ) ), NaN );
});

QUnit.test( "should parse negative integers", function( assert ) {
	assert.equal( parse( "-3", properties( "0", en ) ), -3 );
	assert.equal( parse( "(3)", properties( "0;(0)", en ) ), -3 );
	assert.equal( parse( "-3", properties( "0", sv ) ), -3 );
	assert.equal( parse( "\u22123", properties( "0", sv ) ), -3 );
});

QUnit.test( "should parse mixed non breaking space and breaking space", function( assert ) {
	assert.equal( parse( "12\xA0735", properties( "#,##0", sv ) ), 12735 );
	assert.equal( parse( "12 735", properties( "#,##0", sv ) ), 12735 );
});

/**
 *  Decimals
 */

QUnit.test( "should parse decimals", function( assert ) {
	assert.equal( parse( "3.14", properties( "0.##", en ) ), 3.14 );
	assert.equal( parse( "3,14", properties( "0.##", es ) ), 3.14 );
	assert.equal( parse( "٣٫١٤", properties( "0.##", ar ) ), 3.14 );
	assert.equal( parse( "三.一四", properties( "0.##", zh ) ), 3.14 );
	assert.equal( parse( "3.00", properties( "0.##", en ) ), 3 );
});

QUnit.test( "should parse invalid decimals as NaN", function( assert ) {
	assert.deepEqual( parse( "", properties( "0.#", en ) ), NaN );
	assert.deepEqual( parse( "3,14", properties( "0.#", en ) ), NaN );
	assert.deepEqual( parse( "3.14", properties( "0.#", es ) ), NaN );
});

QUnit.test( "should parse zero-padded decimals", function( assert ) {
	assert.equal( parse( "12735.0", properties( "0.0", en ) ), 12735 );
	assert.equal( parse( "0.10", properties( "0.00", en ) ), 0.1 );
});

QUnit.test( "should parse trailing decimal separator", function( assert ) {
	assert.equal( parse( "1.", properties( "0.0", en ) ), 1 );
	assert.equal( parse( "١٫", properties( "0.0", ar ) ), 1 );
	assert.equal( parse( "1,", properties( "0.0", pt ) ), 1 );
});

QUnit.test( "should parse non-padded decimals", function( assert ) {
	assert.equal( parse( ".14159", properties( "0.0", en ) ), 0.14159 );
	assert.equal( parse( ".752", properties( "0.0", en ) ), 0.752 );
	assert.equal( parse( "٫١٤١٥٩", properties( "0.0", ar ) ), 0.14159 );
	assert.equal( parse( ",752", properties( "0.0", pt ) ), 0.752 );
});

QUnit.test( "should parse negative decimal", function( assert ) {
	assert.equal( parse( "-3.14", properties( "0.##", en ) ), -3.14 );
	assert.equal( parse( "(3.14)", properties( "0.##;(0.##)", en ) ), -3.14 );
});

QUnit.test( "should not parse too permissive", function( assert ) {
	assert.deepEqual( parse( "3.14", properties( "0.##", ru ) ), NaN );
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
	assert.equal( parse( "%100", properties( "%0", en ) ), 1 );
	assert.deepEqual( parse( "1", properties( "0%", en ) ), NaN );
});

QUnit.test( "should localize percent symbol (%)", function( assert ) {
	assert.equal( parse( "٥٠٪", properties( "#0%", ar ) ), 0.5 );
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
	assert.equal( parse( "٥٠٠؉", properties( "#0\u2030", ar ) ), 0.5 );
});

QUnit.test( "should parse negative mille", function( assert ) {
	assert.equal( parse( "-1\u2030", properties( "0\u2030", en ) ), -0.001 );
	assert.equal( parse( "(1\u2030)", properties( "0\u2030;(0\u2030)", en ) ), -0.001 );
	assert.equal( parse( "(1)\u2030", properties( "0\u2030;(0)\u2030", en ) ), -0.001 );
});

/**
 *  Infinite number
 */
QUnit.test( "should parse infinite numbers", function( assert ) {
	assert.equal( parse( "∞", properties( "0", en ) ), Infinity );
	assert.equal( parse( "-∞", properties( "0", en ) ), -Infinity );
	assert.equal( parse( "(∞)", properties( "0;(0)", en ) ), -Infinity );
});

/**
 *  NaN
 */
QUnit.test( "should parse NaN", function( assert ) {
	assert.deepEqual( parse( "NaN", properties( "0", en ) ), NaN );
});

/**
 *  Prefix
 */
QUnit.test( "should parse invalid prefix as NaN", function( assert ) {
	assert.deepEqual( parse( "invalid", properties( "0", en ) ), NaN );
	assert.deepEqual( parse( "garbage123", properties( "0", en ) ), NaN );
});

/**
 *  Suffix
 */
QUnit.test( "should parse invalid suffix as NaN", function( assert ) {
	assert.deepEqual( parse( "123garbage", properties( "0", en ) ), NaN );
});

});
