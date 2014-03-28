define([
	"cldr",
	"globalize/number/format",
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

module( "Number Format" );

/**
 *  Integers
 */

test( "should format integers", function() {
	equal( format( pi, "#0", en ), "3", "" );
	equal( format( pi, "###0", en ), "3", "" );
});

test( "should zero-pad minimum integer digits", function() {
	equal( format( pi, "0", en ), "3", "" );
	equal( format( pi, "00", en ), "03", "" );
	equal( format( pi, "000", en ), "003", "" );
});

test( "should not limit the maximum number of digits of integers", function() {
	equal( format( earthDiameter, "0", en ), "12735", "" );
	equal( format( earthDiameter, "00", en ), "12735", "" );
	equal( format( earthDiameter, "#0", en ), "12735", "" );
});

test( "should format negative integer", function() {
	equal( format( -earthDiameter, "0", en ), "-12735", "" );
	equal( format( -earthDiameter, "0;(0)", en ), "(12735)", "" );

	// The number of digits, minimal digits, and other characteristics shall be ignored in the negative subpattern.
	equal( format( -earthDiameter, "0;(0.0##)", en ), "(12735)", "" );
});

/**
 *  Decimals
 */

test( "should format decimals", function() {
	equal( format( pi, "0.##", en ), "3.14", "" );
});

test( "should limit maximum fraction digits", function() {
	equal( format( pi, "0.##", en ), "3.14", "" );
	equal( format( pi, "0.0#", en ), "3.14", "" );
	equal( format( pi, "0.####", en ), "3.1416", "" );
	equal( format( 0.10004, "0.##", en ), "0.1", "" );
});

test( "should zero-pad minimum fraction digits", function() {
	equal( format( earthDiameter, "0.0", en ), "12735.0", "" );
	equal( format( deci, "0.00", en ), "0.10", "" );
});

test( "should localize decimal separator symbol (.)", function() {
	equal( format( pi, "0.##", es ), "3,14", "" );
	equal( format( pi, "0.##", ar ), "3٫14", "" );
});

test( "should allow integer and fraction options override", function() {
	equal( format( pi, "0.##", en, { minimumIntegerDigits: 2 } ), "03.14", "" );
	equal( format( pi, "0.##", en, { maximumFractionDigits: 1 } ), "3.1", "" );
	equal( format( 0.1, "0.##", en, { minimumFractionDigits: 2 } ), "0.10", "" );
	equal( format( 1.1, "0.##", en, {
		minimumIntegerDigits: 2,
		minimumFractionDigits: 3
	}), "01.100", "" );

	// Use minimumFractionDigits, but no maximumFractionDigits. Sanity check.
	equal( format( pi, "0.##", en, { minimumFractionDigits: 4 }), "3.1416", "" );
});

test( "should allow rounding", function() {
	equal( format( pi, "0.10", en ), "3.10", "" );
	equal( format( pi, "0.20", en ), "3.20", "" );
	equal( format( pi, "0.5", en ), "3.0", "" );
	equal( format( pi, "0.1", en ), "3.1", "" );
});

test( "should allow different rounding options", function() {
	equal( format( pi, "0.##", en, { round: "ceil" } ), "3.15", "" );
	equal( format( pi, "0.##", en, { round: "floor"} ), "3.14", "" );
	equal( format( pi, "0.##", en, { round: "round" } ), "3.14", "" );
	equal( format( pi, "0.##", en, { round: "truncate"} ), "3.14", "" );
	equal( format( pi, "0.####", en, { round: "ceil" } ), "3.1416", "" );
	equal( format( pi, "0.####", en, { round: "floor"} ), "3.1415", "" );
	equal( format( pi, "0.####", en, { round: "round" } ), "3.1416", "" );
	equal( format( pi, "0.####", en, { round: "truncate"} ), "3.1415", "" );
	equal( format( -pi, "0.##", en, { round: "ceil" } ), "-3.14", "" );
	equal( format( -pi, "0.##", en, { round: "floor"} ), "-3.15", "" );
	equal( format( -pi, "0.##", en, { round: "round" } ), "-3.14", "" );
	equal( format( -pi, "0.##", en, { round: "truncate"} ), "-3.14", "" );
	equal( format( -pi, "0.####", en, { round: "ceil" } ), "-3.1415", "" );
	equal( format( -pi, "0.####", en, { round: "floor"} ), "-3.1416", "" );
	equal( format( -pi, "0.####", en, { round: "round" } ), "-3.1416", "" );
	equal( format( -pi, "0.####", en, { round: "truncate"} ), "-3.1415", "" );
});

test( "should format negative decimal", function() {
	equal( format( -pi, "0.##", en ), "-3.14", "" );
	equal( format( -pi, "0.##;(0.##)", en ), "(3.14)", "" );

	// The number of digits, minimal digits, and other characteristics shall be ignored in the negative subpattern.
	equal( format( -pi, "0.##;(0)", en ), "(3.14)", "" );
});

/**
 *  Percent
 */

test( "should format percent", function() {
	equal( format( 0.01, "0%", en ), "1%", "" );
	equal( format( 0.01, "00%", en ), "01%", "" );
	equal( format( 0.1, "0%", en ), "10%", "" );
	equal( format( 0.5, "#0%", en ), "50%", "" );
	equal( format( 1, "0%", en ), "100%", "" );
	equal( format( 0.005, "##0.#%", en ), "0.5%", "" );
	equal( format( 0.005, "##0.#%", en ), "0.5%", "" );
});

test( "should localize percent symbol (%)", function() {
	equal( format( 0.5, "#0%", ar ), "50٪", "" );
});

test( "should format negative percentage", function() {
	equal( format( -0.1, "0%", en ), "-10%", "" );
	equal( format( -0.1, "0%;(0%)", en ), "(10%)", "" );
	equal( format( -0.1, "0%;(0)%", en ), "(10)%", "" );
});

/**
 *  Per mille
 */

test( "should format per mille", function() {
	equal( format( 0.001, "0\u2030", en ), "1\u2030", "" );
	equal( format( 0.001, "00\u2030", en ), "01\u2030", "" );
	equal( format( 0.01, "0\u2030", en ), "10\u2030", "" );
	equal( format( 0.1, "0\u2030", en ), "100\u2030", "" );
	equal( format( 0.5, "#0\u2030", en ), "500\u2030", "" );
	equal( format( 1, "0\u2030", en ), "1000\u2030", "" );
	equal( format( 0.0005, "##0.#\u2030", en ), "0.5\u2030", "" );
	equal( format( 0.0005, "##0.#\u2030", en ), "0.5\u2030", "" );
	equal( format( 0.5, "#0‰", en ), "500\u2030", "" );
	equal( format( 0.5, "#0‰", en ), "500‰", "" );
});

test( "should localize per mille symbol (\u2030)", function() {
	equal( format( 0.5, "#0\u2030", ar ), "500؉", "" );
});

test( "should format negative mille", function() {
	equal( format( -0.001, "0\u2030", en ), "-1\u2030", "" );
	equal( format( -0.001, "0\u2030;(0\u2030)", en ), "(1\u2030)", "" );
	equal( format( -0.001, "0\u2030;(0)\u2030", en ), "(1)\u2030", "" );
});

});
