define([
	"globalize",
	"json!cldr-data/main/ar/numbers.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/en-IN/numbers.json",
	"json!cldr-data/main/es/numbers.json",
	"json!cldr-data/main/fa/numbers.json",
	"json!cldr-data/main/sv/numbers.json",
	"json!cldr-data/main/zh/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/numberingSystems.json",
	"../../util",

	"globalize/number"
], function( Globalize, arNumbers, enNumbers, enInNumbers, esNumbers, faNumbers, svNumbers,
	zhNumbers, likelySubtags, numberingSystems, util ) {

var ar, enIn, es, fa, sv, zh;

function extraSetup() {
	Globalize.load(
		arNumbers,
		enNumbers,
		enInNumbers,
		esNumbers,
		faNumbers,
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
				"en-IN": {},
				es: {},
				fa: {},
				sv: {},
				zh: {}
			}
		});
		ar = new Globalize( "ar" );
		enIn = new Globalize( "en-IN" );
		es = new Globalize( "es" );
		fa = new Globalize( "fa" );
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
	assert.equal( Globalize.parseNumber( "12735" ), 12735 );

	// Loose match: ignore control format symbols.
	assert.equal( ar.parseNumber( "-٣" ), -3 );

	// Grouping separator.
	assert.equal( Globalize.parseNumber( "12,735" ), 12735 );
	assert.equal( enIn.parseNumber( "76,54,321" ), 7654321 );
	assert.deepEqual( enIn.parseNumber( "654,321" ), NaN );
	assert.equal( es.parseNumber( "12.735" ), 12735 );
	assert.equal( sv.parseNumber( "12\xA0735" ), 12735 );

	// Loose match: map all characters in [:Zs:] to U+0020 SPACE, e.g., accept non-breaking space as
	// grouping separator.
	assert.equal( sv.parseNumber( "12 735" ), 12735 );
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
	assert.deepEqual( Globalize.parseNumber( "3,14" ), NaN );
	assert.equal( es.parseNumber( "3,14" ), 3.14 );
	assert.deepEqual( es.parseNumber( "3.14" ), NaN );
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

	assert.equal( Globalize.parseNumber( "1%", { style: "percent" } ), 0.01 );
	assert.equal( Globalize.parseNumber( "01%", { style: "percent" } ), 0.01 );
	assert.equal( Globalize.parseNumber( "10%", { style: "percent" } ), 0.1 );
	assert.equal( Globalize.parseNumber( "50%", { style: "percent" } ), 0.5 );
	assert.equal( Globalize.parseNumber( "100%", { style: "percent" } ), 1 );

	assert.equal( Globalize.parseNumber( "0.5%", {
		style: "percent",
		minimumFractionDigits: 0,
		maximumFractionDigits: 1
	}), 0.005 );

	assert.equal( Globalize.parseNumber( "0.5%", {
		style: "percent",
		minimumFractionDigits: 0,
		maximumFractionDigits: 1
	}), 0.005 );

	assert.equal( ar.parseNumber( "٥٠٪", { style: "percent" } ), 0.5 );
	assert.equal( Globalize.parseNumber( "-10%", { style: "percent" } ), -0.1 );
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

/**
 *  Prefix
 */

QUnit.test( "should parse literals", function( assert ) {
	extraSetup();

	// TODO: Move this test to parse-currency when implemented.
	assert.equal( Globalize.parseNumber( "-$1,214.12", { raw: "'$'#,##0.##" } ), -1214.12 );
});

/**
 *  Other
 */
QUnit.test( "should parse a formatted number (reverse operation test)", function( assert ) {
	extraSetup();
	var options;
	var number = 12345.67;
	assert.equal( Globalize.parseNumber( Globalize.formatNumber( number ) ), number );
	assert.equal( ar.parseNumber( ar.formatNumber( number ) ), number );
	assert.equal( fa.parseNumber( fa.formatNumber( number ) ), number );

	number = -12345.67;
	assert.equal( Globalize.parseNumber( Globalize.formatNumber( number ) ), number );
	assert.equal( ar.parseNumber( ar.formatNumber( number ) ), number );
	assert.equal( fa.parseNumber( fa.formatNumber( number ) ), number );

	number = 0.5;
	options = { style: "percent" };

	assert.equal(
		Globalize.parseNumber( Globalize.formatNumber( number, options ), options ),
		number
	);

	assert.equal( ar.parseNumber( ar.formatNumber( number, options ), options ), number );
	assert.equal( fa.parseNumber( fa.formatNumber( number, options ), options ), number );
});

});
