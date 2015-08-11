define([
	"globalize",
	"json!cldr-data/main/ar/numbers.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/es/numbers.json",
	"json!cldr-data/main/sv/numbers.json",
	"json!cldr-data/main/zh/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/numberingSystems.json",
	"../../util",

	"globalize/number"
], function( Globalize, arNumbers, enNumbers, esNumbers, svNumbers, zhNumbers, likelySubtags,
	numberingSystems, util ) {

var ar, es, sv, zh;

function extraSetup() {
	Globalize.load(
		arNumbers,
		enNumbers,
		esNumbers,
		svNumbers,
		zhNumbers,
		numberingSystems
	);
}

QUnit.module( ".parseNumber( value [, options] )", {
	setup: function() {
		Globalize.load( likelySubtags, {
			main: {
				ar: {},
				en: {},
				es: {},
				sv: {},
				zh: {}
			}
		});
		ar = new Globalize( "ar" );
		es = new Globalize( "es" );
		sv = new Globalize( "sv" );
		zh = new Globalize( "zh-u-nu-native" );
		Globalize.locale( "en" );
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should validate parameters", function( assert ) {
	util.assertParameterPresence( assert, "value", function() {
		Globalize.parseNumber();
	});

	util.assertStringParameter( assert, "value", function( invalidValue ) {
		return function() {
			Globalize.parseNumber( invalidValue );
		};
	});

	util.assertPlainObjectParameter( assert, "options", function( invalidValue ) {
		return function() {
			Globalize.parseNumber( "3", invalidValue );
		};
	});
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.parseNumber( "3" );
	});
});

/**
 *  Integers
 */

QUnit.test( "should parse integers", function( assert ) {
	extraSetup();

	assert.equal( Globalize.parseNumber( "3" ), 3 );
	assert.equal( Globalize.parseNumber( "12,735" ), 12735 );
	assert.equal( Globalize.parseNumber( "1,2,7,35" ), 12735 );
	assert.equal( es.parseNumber( "12.735" ), 12735 );
});

QUnit.test( "should parse negative integers", function( assert ) {
	extraSetup();

	assert.equal( Globalize.parseNumber( "-3" ), -3 );
	assert.equal( Globalize.parseNumber( "-12,735" ), -12735 );
});

/**
 *  Decimals
 */

QUnit.test( "should parse decimals", function( assert ) {
	extraSetup();

	assert.equal( Globalize.parseNumber( "3.14" ), 3.14 );
	assert.equal( es.parseNumber( "3,14" ), 3.14 );
	assert.equal( ar.parseNumber( "٣٫١٤" ), 3.14 );
	assert.equal( zh.parseNumber( "三.一四" ), 3.14 );
	assert.equal( Globalize.parseNumber( "3.00" ), 3 );
	assert.equal( Globalize.parseNumber( "12735.0" ), 12735 );
	assert.equal( Globalize.parseNumber( "0.10" ), 0.1 );
});

QUnit.test( "should parse negative decimal", function( assert ) {
	extraSetup();

	assert.equal( Globalize.parseNumber( "-3.14" ), -3.14 );
});

/**
 *  Percent
 */

QUnit.test( "should parse percent", function( assert ) {
	extraSetup();

	assert.equal( Globalize.parseNumber( "1%" ), 0.01 );
	assert.equal( Globalize.parseNumber( "01%" ), 0.01 );
	assert.equal( Globalize.parseNumber( "10%" ), 0.1 );
	assert.equal( Globalize.parseNumber( "50%" ), 0.5 );
	assert.equal( Globalize.parseNumber( "100%" ), 1 );
	assert.equal( Globalize.parseNumber( "0.5%" ), 0.005 );
	assert.equal( Globalize.parseNumber( "0.5%" ), 0.005 );
	assert.equal( ar.parseNumber( "٥٠٪" ), 0.5 );
	assert.equal( Globalize.parseNumber( "-10%" ), -0.1 );
});

/**
 *  Scientific notation
 */
QUnit.test( "should parse scientific notation numbers", function( assert ) {
	extraSetup();

	assert.equal( Globalize.parseNumber( "3E-3" ), 0.003 );
	assert.equal( sv.parseNumber( "3×10^−3" ), 0.003 );
});

/**
 *  Infinite number
 */
QUnit.test( "should parse infinite numbers", function( assert ) {
	extraSetup();

	assert.equal( Globalize.parseNumber( "∞" ), Infinity );
	assert.equal( Globalize.parseNumber( "-∞" ), -Infinity );
});

/**
 *  NaN
 */

QUnit.test( "should parse invalid numbers as NaN", function( assert ) {
	extraSetup();

	assert.deepEqual( Globalize.parseNumber( "invalid" ), NaN );
	assert.deepEqual( Globalize.parseNumber( "NaN" ), NaN );
});

});
