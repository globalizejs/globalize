define([
	"cldr",
	"src/number/format",
	"json!fixtures/cldr/main/ar/numbers.json",
	"json!fixtures/cldr/main/en/numbers.json",
	"json!fixtures/cldr/main/es/numbers.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json"
], function( Cldr, format, arNumbers, enNumbers, esNumbers, likelySubtags ) {

// 1: Earth average diameter according to:
// http://www.wolframalpha.com/input/?i=earth+diameter
var ar, en, es,
	deci = 0.1,
	earthDiameter = 12735, /* 1 */
	pi = 3.14159265359;

Cldr.load( arNumbers );
Cldr.load( enNumbers );
Cldr.load( esNumbers );
Cldr.load( likelySubtags );

ar = new Cldr( "ar" );
en = new Cldr( "en" );
es = new Cldr( "es" );

QUnit.module( "Number Format" );

/**
 *  Integers
 */

QUnit.test( "should format integers", function( assert ) {
	assert.equal( format( pi, "#0", en ), "3" );
	assert.equal( format( pi, "###0", en ), "3" );
});

QUnit.test( "should zero-pad minimum integer digits", function( assert ) {
	assert.equal( format( pi, "0", en ), "3" );
	assert.equal( format( pi, "00", en ), "03" );
	assert.equal( format( pi, "000", en ), "003" );
});

QUnit.test( "should not limit the maximum number of digits of integers", function( assert ) {
	assert.equal( format( earthDiameter, "0", en ), "12735" );
	assert.equal( format( earthDiameter, "00", en ), "12735" );
	assert.equal( format( earthDiameter, "#0", en ), "12735" );
});

QUnit.test( "should format negative integer", function( assert ) {
	assert.equal( format( -earthDiameter, "0", en ), "-12735" );
	assert.equal( format( -earthDiameter, "0;(0)", en ), "(12735)" );

	// The number of digits, minimal digits, and other characteristics shall be ignored in the negative subpattern.
	assert.equal( format( -earthDiameter, "0;(0.0##)", en ), "(12735)" );
});

/**
 *  Decimals
 */

QUnit.test( "should format decimals", function( assert ) {
	assert.equal( format( pi, "0.##", en ), "3.14" );
});

QUnit.test( "should limit maximum fraction digits", function( assert ) {
	assert.equal( format( pi, "0.##", en ), "3.14" );
	assert.equal( format( pi, "0.0#", en ), "3.14" );
	assert.equal( format( pi, "0.####", en ), "3.1416" );
	assert.equal( format( 0.10004, "0.##", en ), "0.1" );
});

QUnit.test( "should zero-pad minimum fraction digits", function( assert ) {
	assert.equal( format( earthDiameter, "0.0", en ), "12735.0" );
	assert.equal( format( deci, "0.00", en ), "0.10" );
});

QUnit.test( "should localize decimal separator symbol (.)", function( assert ) {
	assert.equal( format( pi, "0.##", es ), "3,14" );
	assert.equal( format( pi, "0.##", ar ), "3٫14" );
});

QUnit.test( "should allow integer and fraction options override", function( assert ) {
	// Overriding minimum integer digits only.
	assert.equal( format( pi, "0", en, { minimumIntegerDigits: 2 } ), "03" );

	// Overriding both fraction options.
	assert.equal( format( pi, "0.##", en, {
		maximumFractionDigits: 5,
		minimumFractionDigits: 3
	} ), "3.14159" );
	assert.equal( format( 0.1, "0.##", en, {
		maximumFractionDigits: 5,
		minimumFractionDigits: 3
	} ), "0.100" );

	// Overriding maximum fraction digits only.
	assert.equal( format( pi, "0.##", en, { maximumFractionDigits: 0 } ), "3" );
	assert.equal( format( pi, "0.##", en, { maximumFractionDigits: 1 } ), "3.1" );
	assert.equal( format( pi, "0.##", en, { maximumFractionDigits: 3 } ), "3.142" );
	assert.equal( format( 0.01, "0.##", en, { maximumFractionDigits: 1 } ), "0" );
	assert.equal( format( 0.01, "0.0#", en, { maximumFractionDigits: 1 } ), "0.0" );

	// Sanity normalization: minimumFractionDigits = min( minimumFractionDigits, maximumFractionDigits )
	assert.equal( format( 0.1, "0.0000", en, { maximumFractionDigits: 2 } ), "0.10" );

	// Overriding minimum fraction digits only.
	assert.equal( format( 1, "0.00", en, { minimumFractionDigits: 0 } ), "1" );
	assert.equal( format( 0.1, "0.00", en, { minimumFractionDigits: 0 } ), "0.1" );
	assert.equal( format( 0.001, "0.00", en, { minimumFractionDigits: 0 } ), "0" );
	assert.equal( format( 0.1, "0.##", en, { minimumFractionDigits: 2 } ), "0.10" );

	// Sanity normalization: maximumFractionDigits = max( minimumFractionDigits, maximumFractionDigits ).
	assert.equal( format( pi, "0.##", en, { minimumFractionDigits: 5 } ), "3.14159" );

	// Overriding both minimum and maximum fraction digits.
	assert.equal( format( pi, "0.##", en, {
		minimumFractionDigits: 1,
		maximumFractionDigits: 4
	}), "3.1416" );
	assert.equal( format( pi, "0.##", en, {
		minimumIntegerDigits: 2,
		maximumFractionDigits: 3
	}), "03.142" );

	// Overriding both integer and fraction options.
	assert.equal( format( 1.1, "0.##", en, {
		minimumIntegerDigits: 2,
		minimumFractionDigits: 3
	}), "01.100" );
	assert.equal( format( 1.1, "0.##", en, {
		minimumIntegerDigits: 2,
		maximumFractionDigits: 3
	}), "01.1" );
});

QUnit.test( "should allow rounding", function( assert ) {
	assert.equal( format( pi, "0.10", en ), "3.10" );
	assert.equal( format( pi, "0.20", en ), "3.20" );
	assert.equal( format( pi, "0.5", en ), "3.0" );
	assert.equal( format( pi, "0.1", en ), "3.1" );
});

QUnit.test( "should allow different rounding options", function( assert ) {
	assert.equal( format( pi, "0.##", en, { round: "ceil" } ), "3.15" );
	assert.equal( format( pi, "0.##", en, { round: "floor"} ), "3.14" );
	assert.equal( format( pi, "0.##", en, { round: "round" } ), "3.14" );
	assert.equal( format( pi, "0.##", en, { round: "truncate"} ), "3.14" );
	assert.equal( format( pi, "0.####", en, { round: "ceil" } ), "3.1416" );
	assert.equal( format( pi, "0.####", en, { round: "floor"} ), "3.1415" );
	assert.equal( format( pi, "0.####", en, { round: "round" } ), "3.1416" );
	assert.equal( format( pi, "0.####", en, { round: "truncate"} ), "3.1415" );
	assert.equal( format( -pi, "0.##", en, { round: "ceil" } ), "-3.14" );
	assert.equal( format( -pi, "0.##", en, { round: "floor"} ), "-3.15" );
	assert.equal( format( -pi, "0.##", en, { round: "round" } ), "-3.14" );
	assert.equal( format( -pi, "0.##", en, { round: "truncate"} ), "-3.14" );
	assert.equal( format( -pi, "0.####", en, { round: "ceil" } ), "-3.1415" );
	assert.equal( format( -pi, "0.####", en, { round: "floor"} ), "-3.1416" );
	assert.equal( format( -pi, "0.####", en, { round: "round" } ), "-3.1416" );
	assert.equal( format( -pi, "0.####", en, { round: "truncate"} ), "-3.1415" );
});

QUnit.test( "should format significant digits", function( assert ) {
	assert.equal( format( 123, "@@@", en ), "123" );
	assert.equal( format( 12345, "@@@", en ), "12300" );
	assert.equal( format( 12345, "@@#", en ), "12300" );
	assert.equal( format( 12345, "@##", en ), "12300" );
	assert.equal( format( pi, "@@", en ), "3.1" );
	assert.equal( format( pi, "@@#", en ), "3.14" );
	assert.equal( format( pi, "@@##", en ), "3.142" );
	assert.equal( format( pi, "@####", en ), "3.1416" );
	assert.equal( format( 0.10004, "@@", en ), "0.10" );
	assert.equal( format( 0.10004, "@##", en ), "0.1" );
	assert.equal( format( 0.12345, "@@@", en ), "0.123" );
	assert.equal( format( 1.23004, "@@##", en ), "1.23" );
});

QUnit.test( "should format negative decimal", function( assert ) {
	assert.equal( format( -pi, "0.##", en ), "-3.14" );
	assert.equal( format( -pi, "0.##;(0.##)", en ), "(3.14)" );
	assert.equal( format( -pi, "@@#", en ), "-3.14" );
	assert.equal( format( -pi, "@@#;(@@#)", en ), "(3.14)" );

	// The number of digits, minimal digits, and other characteristics shall be ignored in the negative subpattern.
	assert.equal( format( -pi, "0.##;(0)", en ), "(3.14)" );
	assert.equal( format( -pi, "@@#;(0)", en ), "(3.14)" );
});

/**
 *  Grouping separators
 */

QUnit.test( "should format grouping separators", function( assert ) {
	assert.equal( format( earthDiameter, "#,##0.#", en ), "12,735" );
	assert.equal( format( earthDiameter, "#,#,#0.#", en ), "1,2,7,35" );
	assert.equal( format( 123456789, "#,##,###,###0", en ), "12,345,6789" );
	assert.equal( format( 123456789, "###,###,###0", en ), "12,345,6789" );
	assert.equal( format( 123456789, "##,#,###,###0", en ), "12,345,6789" );
});

/**
 *  Percent
 */

QUnit.test( "should format percent", function( assert ) {
	assert.equal( format( 0.01, "0%", en ), "1%" );
	assert.equal( format( 0.01, "00%", en ), "01%" );
	assert.equal( format( 0.1, "0%", en ), "10%" );
	assert.equal( format( 0.5, "#0%", en ), "50%" );
	assert.equal( format( 1, "0%", en ), "100%" );
	assert.equal( format( 0.005, "##0.#%", en ), "0.5%" );
	assert.equal( format( 0.005, "##0.#%", en ), "0.5%" );
});

QUnit.test( "should localize percent symbol (%)", function( assert ) {
	assert.equal( format( 0.5, "#0%", ar ), "50٪" );
});

QUnit.test( "should format negative percentage", function( assert ) {
	assert.equal( format( -0.1, "0%", en ), "-10%" );
	assert.equal( format( -0.1, "0%;(0%)", en ), "(10%)" );
	assert.equal( format( -0.1, "0%;(0)%", en ), "(10)%" );
});

/**
 *  Per mille
 */

QUnit.test( "should format per mille", function( assert ) {
	assert.equal( format( 0.001, "0\u2030", en ), "1\u2030" );
	assert.equal( format( 0.001, "00\u2030", en ), "01\u2030" );
	assert.equal( format( 0.01, "0\u2030", en ), "10\u2030" );
	assert.equal( format( 0.1, "0\u2030", en ), "100\u2030" );
	assert.equal( format( 0.5, "#0\u2030", en ), "500\u2030" );
	assert.equal( format( 1, "0\u2030", en ), "1000\u2030" );
	assert.equal( format( 0.0005, "##0.#\u2030", en ), "0.5\u2030" );
	assert.equal( format( 0.0005, "##0.#\u2030", en ), "0.5\u2030" );
	assert.equal( format( 0.5, "#0‰", en ), "500\u2030" );
	assert.equal( format( 0.5, "#0‰", en ), "500‰" );
});

QUnit.test( "should localize per mille symbol (\u2030)", function( assert ) {
	assert.equal( format( 0.5, "#0\u2030", ar ), "500؉" );
});

QUnit.test( "should format negative mille", function( assert ) {
	assert.equal( format( -0.001, "0\u2030", en ), "-1\u2030" );
	assert.equal( format( -0.001, "0\u2030;(0\u2030)", en ), "(1\u2030)" );
	assert.equal( format( -0.001, "0\u2030;(0)\u2030", en ), "(1)\u2030" );
});

/**
 *  Infinity
 */

QUnit.test( "should format infinite numbers", function( assert ) {
	assert.equal( format( Math.pow(2, 2000), "0", en ), "∞" );
	assert.equal( format( Math.pow(-2, 2001), "0", en ), "-∞" );
});

/**
 *  NaN
 */

QUnit.test( "should format infinite numbers", function( assert ) {
	assert.equal( format( NaN, "0", en ), "NaN" );
});

});
