/* eslint-disable object-curly-spacing */
define([
	"cldr",
	"src/number/format",
	"src/number/format-properties",
	"json!cldr-data/main/ar/numbers.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/es/numbers.json",
	"json!cldr-data/main/fa/numbers.json",
	"json!cldr-data/main/hu/numbers.json",
	"json!cldr-data/main/zh/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/numberingSystems.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, format, properties, arNumbers, enNumbers, esNumbers, faNumbers, huNumbers,
	zhNumbers, likelySubtags, numberingSystems ) {

// 1: Earth average diameter according to:
// http://www.wolframalpha.com/input/?i=earth+diameter
var ar, en, es, fa, hu, zh, zhSimplified,
	deci = 0.1,
	earthDiameter = 12735, /* 1 */
	pi = 3.14159265359;

Cldr.load(
	arNumbers,
	enNumbers,
	esNumbers,
	faNumbers,
	huNumbers,
	zhNumbers,
	likelySubtags,
	numberingSystems
);

ar = new Cldr( "ar" );
en = new Cldr( "en" );
es = new Cldr( "es" );
fa = new Cldr( "fa" );
hu = new Cldr( "hu" );
zh = new Cldr( "zh-u-nu-native" );
zhSimplified = new Cldr( "zh" );

QUnit.module( "Number Format" );

function esPluralGenerator( n ) {
  return ( n === 1 ) ? "one" : "other";
}

/**
 *  Integers
 */

QUnit.test( "should format integers", function( assert ) {
	assert.deepEqual( format( pi, properties( "#0", en ) ), [{type: "integer", value: "3"}] );
	assert.deepEqual( format( pi, properties( "###0", en ) ), [{type: "integer", value: "3"}] );
});

QUnit.test( "should zero-pad minimum integer digits", function( assert ) {
	assert.deepEqual( format( pi, properties( "0", en ) ), [{type: "integer", value: "3"}] );
	assert.deepEqual( format( pi, properties( "00", en ) ), [{type: "integer", value: "03"}] );
	assert.deepEqual( format( pi, properties( "000", en ) ), [{type: "integer", value: "003"}] );
});

QUnit.test( "should not limit the maximum number of digits of integers", function( assert ) {
	assert.deepEqual( format( earthDiameter, properties( "0", en ) ), [{type: "integer", value: "12735"}] );
	assert.deepEqual( format( earthDiameter, properties( "00", en ) ), [{type: "integer", value: "12735"}] );
	assert.deepEqual( format( earthDiameter, properties( "#0", en ) ), [{type: "integer", value: "12735"}] );
});

QUnit.test( "should format negative integer", function( assert ) {
	assert.deepEqual( format( -earthDiameter, properties( "0", en ) ), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "12735"
		}
	]);

	assert.deepEqual( format( -earthDiameter, properties( "0;(0)", en ) ), [
		{
			"type": "literal",
			"value": "("
		},
		{
			"type": "integer",
			"value": "12735"
		},
		{
			"type": "literal",
			"value": ")"
		}
	]);


	// The number of digits, minimal digits, and other characteristics shall be ignored in the negative subpattern.
	assert.deepEqual( format( -earthDiameter, properties( "0;(0.0##)", en ) ), [
		{
			"type": "literal",
			"value": "("
		},
		{
			"type": "integer",
			"value": "12735"
		},
		{
			"type": "literal",
			"value": ")"
		}
	]);
});

/**
 *  Decimals
 */

QUnit.test( "should format decimals", function( assert ) {
	assert.deepEqual( format( pi, properties( "0.##", en ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "14"
		}
	]);
});

QUnit.test( "should limit maximum fraction digits", function( assert ) {
	assert.deepEqual( format( pi, properties( "0.##", en ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "14"
		}
	]);

	assert.deepEqual( format( pi, properties( "0.0#", en ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "14"
		}
	]);

	assert.deepEqual( format( pi, properties( "0.####", en ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "1416"
		}
	]);

	assert.deepEqual( format( 0.10004, properties( "0.##", en ) ), [
		{
			"type": "integer",
			"value": "0"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "1"
		}
	]);
});

QUnit.test( "should zero-pad minimum fraction digits", function( assert ) {
	assert.deepEqual( format( earthDiameter, properties( "0.0", en ) ), [
		{
			"type": "integer",
			"value": "12735"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "0"
		}
	]);

	assert.deepEqual( format( deci, properties( "0.00", en ) ), [
		{
			"type": "integer",
			"value": "0"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "10"
		}
	]);
});

QUnit.test( "should localize decimal separator symbol (.)", function( assert ) {
	assert.deepEqual( format( pi, properties( "0.##", es ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": ","
		},
		{
			"type": "fraction",
			"value": "14"
		}
	]);

	assert.deepEqual( format( pi, properties( "0.##", ar ) ), [
		{
			"type": "integer",
			"value": "٣"
		},
		{
			"type": "decimal",
			"value": "٫"
		},
		{
			"type": "fraction",
			"value": "١٤"
		}
	]);

	assert.deepEqual( format( pi, properties( "0.##", zh ) ), [
		{
			"type": "integer",
			"value": "三"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "一四"
		}
	]);
});

QUnit.test( "should allow integer and fraction options override", function( assert ) {
	// Overriding minimum integer digits only.
	assert.deepEqual( format( pi, properties( "0", en, { minimumIntegerDigits: 2 } ) ), [
		{
			"type": "integer",
			"value": "03"
		}
	]);

	// Overriding both fraction options.
	assert.deepEqual( format( pi, properties( "0.##", en, {
		maximumFractionDigits: 5,
		minimumFractionDigits: 3
	} ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "14159"
		}
	]);

	assert.deepEqual( format( 0.1, properties( "0.##", en, {
		maximumFractionDigits: 5,
		minimumFractionDigits: 3
	} ) ), [
		{
			"type": "integer",
			"value": "0"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "100"
		}
	]);

	// Overriding maximum fraction digits only.
	assert.deepEqual( format( pi, properties( "0.##", en, { maximumFractionDigits: 0 } ) ), [
		{
			"type": "integer",
			"value": "3"
		}
	]);

	assert.deepEqual( format( pi, properties( "0.##", en, { maximumFractionDigits: 1 } ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "1"
		}
	]);

	assert.deepEqual( format( pi, properties( "0.##", en, { maximumFractionDigits: 3 } ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "142"
		}
	]);

	assert.deepEqual( format( 0.01, properties( "0.##", en, { maximumFractionDigits: 1 } ) ), [
		{
			"type": "integer",
			"value": "0"
		}
	]);

	assert.deepEqual( format( 0.01, properties( "0.0#", en, { maximumFractionDigits: 1 } ) ), [
		{
			"type": "integer",
			"value": "0"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "0"
		}
	]);

	// Sanity normalization: minimumFractionDigits = min( minimumFractionDigits, maximumFractionDigits )
	assert.deepEqual( format( 0.1, properties( "0.0000", en, { maximumFractionDigits: 2 } ) ), [
		{
			"type": "integer",
			"value": "0"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "10"
		}
	]);

	// Overriding minimum fraction digits only.
	assert.deepEqual( format( 1, properties( "0.00", en, { minimumFractionDigits: 0 } ) ), [
		{
			"type": "integer",
			"value": "1"
		}
	]);

	assert.deepEqual( format( 0.1, properties( "0.00", en, { minimumFractionDigits: 0 } ) ), [
		{
			"type": "integer",
			"value": "0"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "1"
		}
	]);

	assert.deepEqual( format( 0.001, properties( "0.00", en, { minimumFractionDigits: 0 } ) ), [
		{
			"type": "integer",
			"value": "0"
		}
	]);

	assert.deepEqual( format( 0.1, properties( "0.##", en, { minimumFractionDigits: 2 } ) ), [
		{
			"type": "integer",
			"value": "0"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "10"
		}
	]);

	// Sanity normalization: maximumFractionDigits = max( minimumFractionDigits, maximumFractionDigits ).
	assert.deepEqual( format( pi, properties( "0.##", en, { minimumFractionDigits: 5 } ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "14159"
		}
	]);

	// Overriding both minimum and maximum fraction digits.
	assert.deepEqual( format( pi, properties( "0.##", en, {
		minimumFractionDigits: 1,
		maximumFractionDigits: 4
	}) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "1416"
		}
	]);

	assert.deepEqual( format( pi, properties( "0.##", en, {
		minimumIntegerDigits: 2,
		maximumFractionDigits: 3
	}) ), [
		{
			"type": "integer",
			"value": "03"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "142"
		}
	]);

	// Overriding both integer and fraction options.
	assert.deepEqual( format( 1.1, properties( "0.##", en, {
		minimumIntegerDigits: 2,
		minimumFractionDigits: 3
	}) ), [
		{
			"type": "integer",
			"value": "01"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "100"
		}
	]);

	assert.deepEqual( format( 1.1, properties( "0.##", en, {
		minimumIntegerDigits: 2,
		maximumFractionDigits: 3
	}) ), [
		{
			"type": "integer",
			"value": "01"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "1"
		}
	]);
});

QUnit.test( "should allow rounding", function( assert ) {
	assert.deepEqual( format( pi, properties( "0.10", en ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "10"
		}
	]);

	assert.deepEqual( format( pi, properties( "0.20", en ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "20"
		}
	]);

	assert.deepEqual( format( pi, properties( "0.5", en ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "0"
		}
	]);

	assert.deepEqual( format( pi, properties( "0.1", en ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "1"
		}
	]);

	// Handle inaccurate floating point arithmetics like 0.00015 * 10000 = 1.49999999999999.
	// See #376.
	assert.deepEqual( format( 0.00015, properties( "0.0000", en ) ), [
		{
			"type": "integer",
			"value": "0"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "0002"
		}
	]);
});

QUnit.test( "should allow different rounding options", function( assert ) {
	assert.deepEqual( format( pi, properties( "0.##", en, { round: "ceil" } ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "15"
		}
	]);

	assert.deepEqual( format( pi, properties( "0.##", en, { round: "floor"} ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "14"
		}
	]);

	assert.deepEqual( format( pi, properties( "0.##", en, { round: "round" } ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "14"
		}
	]);

	assert.deepEqual( format( pi, properties( "0.##", en, { round: "truncate"} ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "14"
		}
	]);

	assert.deepEqual( format( pi, properties( "0.####", en, { round: "ceil" } ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "1416"
		}
	]);

	assert.deepEqual( format( pi, properties( "0.####", en, { round: "floor"} ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "1415"
		}
	]);

	assert.deepEqual( format( pi, properties( "0.####", en, { round: "round" } ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "1416"
		}
	]);

	assert.deepEqual( format( pi, properties( "0.####", en, { round: "truncate"} ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "1415"
		}
	]);

	assert.deepEqual( format( -pi, properties( "0.##", en, { round: "ceil" } ) ), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "14"
		}
	]);

	assert.deepEqual( format( -pi, properties( "0.##", en, { round: "floor"} ) ), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "15"
		}
	]);

	assert.deepEqual( format( -pi, properties( "0.##", en, { round: "round" } ) ), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "14"
		}
	]);

	assert.deepEqual( format( -pi, properties( "0.##", en, { round: "truncate"} ) ), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "14"
		}
	]);

	assert.deepEqual( format( -pi, properties( "0.####", en, { round: "ceil" } ) ), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "1415"
		}
	]);

	assert.deepEqual( format( -pi, properties( "0.####", en, { round: "floor"} ) ), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "1416"
		}
	]);

	assert.deepEqual( format( -pi, properties( "0.####", en, { round: "round" } ) ), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "1416"
		}
	]);

	assert.deepEqual( format( -pi, properties( "0.####", en, { round: "truncate"} ) ), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "1415"
		}
	]);
});

QUnit.test( "should format significant digits", function( assert ) {
	assert.deepEqual( format( 123, properties( "@@@", en ) ), [
		{
			"type": "integer",
			"value": "123"
		}
	]);

	assert.deepEqual( format( 12345, properties( "@@@", en ) ), [
		{
			"type": "integer",
			"value": "12300"
		}
	]);

	assert.deepEqual( format( 12345, properties( "@@#", en ) ), [
		{
			"type": "integer",
			"value": "12300"
		}
	]);

	assert.deepEqual( format( 12345, properties( "@##", en ) ), [
		{
			"type": "integer",
			"value": "12300"
		}
	]);

	assert.deepEqual( format( pi, properties( "@@", en ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "1"
		}
	]);

	assert.deepEqual( format( pi, properties( "@@#", en ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "14"
		}
	]);

	assert.deepEqual( format( pi, properties( "@@##", en ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "142"
		}
	]);

	assert.deepEqual( format( pi, properties( "@####", en ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "1416"
		}
	]);

	assert.deepEqual( format( 0.10004, properties( "@@", en ) ), [
		{
			"type": "integer",
			"value": "0"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "10"
		}
	]);

	assert.deepEqual( format( 0.10004, properties( "@##", en ) ), [
		{
			"type": "integer",
			"value": "0"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "1"
		}
	]);

	// This also test for the following inaccurate floating point arithmetics:
	// `1234 * 0.0001 = 0.12340000000000001`.
	assert.deepEqual( format( 0.12345, properties( "@@@", en ) ), [
		{
			"type": "integer",
			"value": "0"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "123"
		}
	]);

	assert.deepEqual( format( 1.23004, properties( "@@##", en ) ), [
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "23"
		}
	]);

});

QUnit.test( "should format negative decimal", function( assert ) {
	assert.deepEqual( format( -pi, properties( "0.##", en ) ), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "14"
		}
	]);

	assert.deepEqual( format( -pi, properties( "0.##;(0.##)", en ) ), [
		{
			"type": "literal",
			"value": "("
		},
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "14"
		},
		{
			"type": "literal",
			"value": ")"
		}
	]);

	assert.deepEqual( format( -pi, properties( "@@#", en ) ), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "14"
		}
	]);

	assert.deepEqual( format( -pi, properties( "@@#;(@@#)", en ) ), [
		{
			"type": "literal",
			"value": "("
		},
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "14"
		},
		{
			"type": "literal",
			"value": ")"
		}
	]);


	// The U+002D HYPHEN-MINUS sign shall be localized.
	assert.deepEqual( format( -pi, properties( "0.##", fa ) ), [
		{
			"type": "minusSign",
			"value": "\u200e\u2212"
		},
		{
			"type": "integer",
			"value": "۳"
		},
		{
			"type": "decimal",
			"value": "٫"
		},
		{
			"type": "fraction",
			"value": "۱۴"
		}
	]);

	// The number of digits, minimal digits, and other characteristics shall be ignored in the negative subpattern.
	assert.deepEqual( format( -pi, properties( "0.##;(0)", en ) ), [
		{
			"type": "literal",
			"value": "("
		},
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "14"
		},
		{
			"type": "literal",
			"value": ")"
		}
	]);

	assert.deepEqual( format( -pi, properties( "@@#;(0)", en ) ), [
		{
			"type": "literal",
			"value": "("
		},
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "14"
		},
		{
			"type": "literal",
			"value": ")"
		}
	]);

});

/**
 *  Grouping separators
 */

QUnit.test( "should format grouping separators", function( assert ) {
	assert.deepEqual( format( earthDiameter, properties( "#,##0.#", en ) ), [
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "735"
		}
	]);

	assert.deepEqual( format( earthDiameter, properties( "#,#,#0.#", en ) ), [
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "2"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "7"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "35"
		}
	]);

	assert.deepEqual( format( 123456789, properties( "#,##,###,###0", en ) ), [
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "345"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "6789"
		}
	]);

	assert.deepEqual( format( 123456789, properties( "###,###,###0", en ) ), [
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "345"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "6789"
		}
	]);

	assert.deepEqual( format( 123456789, properties( "##,#,###,###0", en ) ), [
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "345"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "6789"
		}
	]);

});

/**
 *  Percent
 */

QUnit.test( "should format percent", function( assert ) {
	assert.deepEqual( format( 0.01, properties( "0%", en ) ), [
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "percentSign",
			"value": "%"
		}
	]);

	assert.deepEqual( format( 0.01, properties( "00%", en ) ), [
		{
			"type": "integer",
			"value": "01"
		},
		{
			"type": "percentSign",
			"value": "%"
		}
	]);

	assert.deepEqual( format( 0.1, properties( "0%", en ) ), [
		{
			"type": "integer",
			"value": "10"
		},
		{
			"type": "percentSign",
			"value": "%"
		}
	]);

	assert.deepEqual( format( 0.5, properties( "#0%", en ) ), [
		{
			"type": "integer",
			"value": "50"
		},
		{
			"type": "percentSign",
			"value": "%"
		}
	]);

	assert.deepEqual( format( 1, properties( "0%", en ) ), [
		{
			"type": "integer",
			"value": "100"
		},
		{
			"type": "percentSign",
			"value": "%"
		}
	]);

	assert.deepEqual( format( 0.005, properties( "##0.#%", en ) ), [
		{
			"type": "integer",
			"value": "0"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "5"
		},
		{
			"type": "percentSign",
			"value": "%"
		}
	]);

	assert.deepEqual( format( 0.005, properties( "##0.#%", en ) ), [
		{
			"type": "integer",
			"value": "0"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "5"
		},
		{
			"type": "percentSign",
			"value": "%"
		}
	]);

});

QUnit.test( "should localize percent symbol (%)", function( assert ) {
	assert.deepEqual( format( 0.5, properties( "#0%", ar ) ), [
		{
			"type": "integer",
			"value": "٥٠"
		},
		{
			"type": "percentSign",
			"value": "٪"
		}
	]);
});

QUnit.test( "should format negative percentage", function( assert ) {
	assert.deepEqual( format( -0.1, properties( "0%", en ) ), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "10"
		},
		{
			"type": "percentSign",
			"value": "%"
		}
	]);

	assert.deepEqual( format( -0.1, properties( "0%;(0%)", en ) ), [
		{
			"type": "literal",
			"value": "("
		},
		{
			"type": "integer",
			"value": "10"
		},
		{
			"type": "percentSign",
			"value": "%"
		},
		{
			"type": "literal",
			"value": ")"
		}
	]);

	assert.deepEqual( format( -0.1, properties( "0%;(0)%", en ) ), [
		{
			"type": "literal",
			"value": "("
		},
		{
			"type": "integer",
			"value": "10"
		},
		{
			"type": "literal",
			"value": ")"
		},
		{
			"type": "percentSign",
			"value": "%"
		}
	]);
});

/**
 *  Per mille
 */

QUnit.test( "should format per mille", function( assert ) {
	assert.deepEqual( format( 0.001, properties( "0\u2030", en ) ), [
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "perMille",
			"value": "‰"
		}
	]);

	assert.deepEqual( format( 0.001, properties( "00\u2030", en ) ), [
		{
			"type": "integer",
			"value": "01"
		},
		{
			"type": "perMille",
			"value": "‰"
		}
	]);

	assert.deepEqual( format( 0.01, properties( "0\u2030", en ) ), [
		{
			"type": "integer",
			"value": "10"
		},
		{
			"type": "perMille",
			"value": "‰"
		}
	]);

	assert.deepEqual( format( 0.1, properties( "0\u2030", en ) ), [
		{
			"type": "integer",
			"value": "100"
		},
		{
			"type": "perMille",
			"value": "‰"
		}
	]);


	assert.deepEqual( format( 0.5, properties( "#0\u2030", en ) ), [
		{
			"type": "integer",
			"value": "500"
		},
		{
			"type": "perMille",
			"value": "‰"
		}
	]);

	assert.deepEqual( format( 1, properties( "0\u2030", en ) ), [
		{
			"type": "integer",
			"value": "1000"
		},
		{
			"type": "perMille",
			"value": "‰"
		}
	]);

	assert.deepEqual( format( 0.0005, properties( "##0.#\u2030", en ) ), [
		{
			"type": "integer",
			"value": "0"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "5"
		},
		{
			"type": "perMille",
			"value": "‰"
		}
	]);

	assert.deepEqual( format( 0.0005, properties( "##0.#\u2030", en ) ), [
		{
			"type": "integer",
			"value": "0"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "5"
		},
		{
			"type": "perMille",
			"value": "‰"
		}
	]);

	assert.deepEqual( format( 0.5, properties( "#0‰", en ) ), [
		{
			"type": "integer",
			"value": "500"
		},
		{
			"type": "perMille",
			"value": "‰"
		}
	]);

	assert.deepEqual( format( 0.5, properties( "#0‰", en ) ), [
		{
			"type": "integer",
			"value": "500"
		},
		{
			"type": "perMille",
			"value": "‰"
		}
	]);
});

QUnit.test( "should localize per mille symbol (\u2030)", function( assert ) {
	assert.deepEqual( format( 0.5, properties( "#0\u2030", ar ) ), [
		{
			"type": "integer",
			"value": "٥٠٠"
		},
		{
			"type": "perMille",
			"value": "؉"
		}
	]);
});

QUnit.test( "should format negative mille", function( assert ) {
	assert.deepEqual( format( -0.001, properties( "0\u2030", en ) ), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "perMille",
			"value": "\u2030"
		}
	]);

	assert.deepEqual( format( -0.001, properties( "0\u2030;(0\u2030)", en ) ), [
		{
			"type": "literal",
			"value": "("
		},
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "perMille",
			"value": "\u2030"
		},
		{
			"type": "literal",
			"value": ")"
		}
	]);

	assert.deepEqual( format( -0.001, properties( "0\u2030;(0)\u2030", en ) ), [
		{
			"type": "literal",
			"value": "("
		},
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "literal",
			"value": ")"
		},
		{
			"type": "perMille",
			"value": "\u2030"
		}
	]);
});

/**
 *  Infinity
 */

QUnit.test( "should format infinite numbers", function( assert ) {
	assert.deepEqual( format( Math.pow(2, 2000 ), properties( "0", en ) ), [
		{
			"type": "infinity",
			"value": "∞"
		}
	]);

	assert.deepEqual( format( Math.pow(-2, 2001 ), properties( "0", en ) ), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "infinity",
			"value": "∞"
		}
	]);
});

/**
 *  NaN
 */

QUnit.test( "should format infinite numbers", function( assert ) {
	assert.deepEqual( format( NaN, properties( "0", en ) ), [
		{
			"type": "nan",
			"value": "NaN"
		}
	]);
});

/**
 *  Literal
 */

QUnit.test( "should format literal (')", function( assert ) {
	assert.deepEqual( format( 69900, properties( "'$'#,##0", en ) ), [
		{
			"type": "literal",
			"value": "$"
		},
		{
			"type": "integer",
			"value": "69"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "900"
		}
	]);

	assert.deepEqual( format( 69900, properties( "'$'#,##0.00", en ) ), [
		{
			"type": "literal",
			"value": "$"
		},
		{
			"type": "integer",
			"value": "69"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "900"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "00"
		}
	]);

	// Make sure quoted characters (in this case, minus sign) aren't localized.
	assert.deepEqual( format( -pi, properties( "0.##;'-'0.##", fa ) ), [
		{
			"type": "literal",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "۳"
		},
		{
			"type": "decimal",
			"value": "٫"
		},
		{
			"type": "fraction",
			"value": "۱۴"
		}
	]);
});

/**
 *  Compact Numbers
 */

QUnit.test( "should format numbers in compact mode", function( assert ) {
	assert.deepEqual( format( 273.7, properties( "0", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "274"
		}
	]);

	assert.deepEqual( format( 273.7, properties( "0", en, { compact: "long" } ) ), [
		{
			"type": "integer",
			"value": "274"
		}
	]);

	assert.deepEqual( format( 273, properties( "0", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "273"
		}
	]);

	assert.deepEqual( format( 273, properties( "0", en, { compact: "long" } ) ), [
		{
			"type": "integer",
			"value": "273"
		}
	]);

	assert.deepEqual( format( 573, properties( "0", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "573"
		}
	]);

	assert.deepEqual( format( 573, properties( "0", en, { compact: "long" } ) ), [
		{
			"type": "integer",
			"value": "573"
		}
	]);

	assert.deepEqual( format( 1273, properties( "0", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "compact",
			"value": "K"
		}
	]);

	assert.deepEqual( format( 1273, properties( "0", en, { compact: "long" } ) ), [
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "thousand"
		}
	]);

	assert.deepEqual( format( 1234000000000000, properties( "0", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "1234"
		},
		{
			"type": "compact",
			"value": "T"
		}
	]);

	assert.deepEqual( format( 1273000, properties( "0", es, {
		compact: "long"
	} ), esPluralGenerator ), [
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "millón"
		}
	]);

	assert.deepEqual( format( 2273000, properties( "0", es, {
		compact: "long"
	} ), esPluralGenerator ), [
		{
			"type": "integer",
			"value": "2"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "millones"
		}
	]);

	assert.deepEqual( format( 27371, properties( "0", zhSimplified, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "compact",
			"value": "万"
		}
	]);

	assert.deepEqual( format( 27371, properties( "0", zhSimplified, { compact: "long" } ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "compact",
			"value": "万"
		}
	]);

	assert.deepEqual( format( 9999.9, properties( "0", en, { compact: "long" } ) ), [
		{
			"type": "integer",
			"value": "10"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "thousand"
		}
	]);

	assert.deepEqual( format( 12735, properties( "0", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "13"
		},
		{
			"type": "compact",
			"value": "K"
		}
	]);

	assert.deepEqual( format( 12735, properties( "0", en, { compact: "long" } ) ), [
		{
			"type": "integer",
			"value": "13"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "thousand"
		}
	]);

	assert.deepEqual( format( 127350, properties( "0", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "127"
		},
		{
			"type": "compact",
			"value": "K"
		}
	]);

	assert.deepEqual( format( 127350, properties( "0", en, { compact: "long" } ) ), [
		{
			"type": "integer",
			"value": "127"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "thousand"
		}
	]);

	assert.deepEqual( format( 1273500, properties( "0", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "compact",
			"value": "M"
		}
	]);

	assert.deepEqual( format( 1273500, properties( "0", en, { compact: "long" } ) ), [
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "million"
		}
	]);

	assert.deepEqual( format( -1273500, properties( "0", en, { compact: "short" } ) ), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "compact",
			"value": "M"
		}
	]);

	assert.deepEqual( format( -1273500, properties( "0", en, { compact: "long" } ) ), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "million"
		}
	]);

	assert.deepEqual( format( -1273500, properties( "0;(0)", en, { compact: "short" } ) ), [
		{
			"type": "literal",
			"value": "("
		},
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "compact",
			"value": "M"
		},
		{
			"type": "literal",
			"value": ")"
		}
	]);

	assert.deepEqual( format( -1273500, properties( "0;(0)", en, { compact: "long" } ) ), [
		{
			"type": "literal",
			"value": "("
		},
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "million"
		},
		{
			"type": "literal",
			"value": ")"
		}
	]);


	// Some hungarian short formats have a terminating E, which is treated as a special
	// character in non-compact formats.
	// \u00A0 is a unicode non-breaking space.
	assert.deepEqual( format( 1273, properties( "0", hu, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "E"
		}
	]);

	assert.deepEqual( format( 1273, properties( "0", hu, { compact: "long" } ) ), [
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "ezer"
		}
	]);

	assert.deepEqual( format( 9000000, properties( "0", hu, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "9"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "M"
		}
	]);

	assert.deepEqual( format( 9000000, properties( "0", hu, { compact: "long" } ) ), [
		{
			"type": "integer",
			"value": "9"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "millió"
		}
	]);

});

QUnit.test( "should format numbers that lack pattern in compact mode (use default compact mode pattern)", function( assert ) {
	assert.deepEqual( format( 0.01, properties( "0", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "0"
		}
	]);

	assert.deepEqual( format( 273.7, properties( "0", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "274"
		}
	]);

	assert.deepEqual( format( 273.7, properties( "0", en, { compact: "long" } ) ), [
		{
			"type": "integer",
			"value": "274"
		}
	]);

	assert.deepEqual( format( 2737, properties( "0", zhSimplified, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "2737"
		}
	]);

	assert.deepEqual( format( 2737, properties( "0", zhSimplified, { compact: "long" } ) ), [
		{
			"type": "integer",
			"value": "2737"
		}
	]);

});

QUnit.test( "numbers should support fraction digits in compact mode", function( assert ) {
	assert.deepEqual( format( 1273, properties( "0", en, {
		compact: "short",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), [
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "3"
		},
		{
			"type": "compact",
			"value": "K"
		}
	]);

	assert.deepEqual( format( 1273, properties( "0", en, {
		compact: "long",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), [
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "3"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "thousand"
		}
	]);

	assert.deepEqual( format( 1273000, properties( "0", es, {
		compact: "long",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	}), esPluralGenerator ), [
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "decimal",
			"value": ","
		},
		{
			"type": "fraction",
			"value": "3"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "millones"
		}
	]);

	assert.deepEqual( format( 2273000, properties( "0", es, {
		compact: "long",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	} ), esPluralGenerator ), [
		{
			"type": "integer",
			"value": "2"
		},
		{
			"type": "decimal",
			"value": ","
		},
		{
			"type": "fraction",
			"value": "3"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "millones"
		}
	]);

	assert.deepEqual( format( 12735, properties( "0", en, {
		compact: "short",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), [
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "7"
		},
		{
			"type": "compact",
			"value": "K"
		}
	]);

	assert.deepEqual( format( 12735, properties( "0", en, {
		compact: "long",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), [
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "7"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "thousand"
		}
	]);

	assert.deepEqual( format( 127350, properties( "0", en, {
		compact: "short",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), [
		{
			"type": "integer",
			"value": "127"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "4"
		},
		{
			"type": "compact",
			"value": "K"
		}
	]);

	assert.deepEqual( format( 127350, properties( "0", en, {
		compact: "long",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), [
		{
			"type": "integer",
			"value": "127"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "4"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "thousand"
		}
	]);

	assert.deepEqual( format( 1273500, properties( "0", en, {
		compact: "short",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), [
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "3"
		},
		{
			"type": "compact",
			"value": "M"
		}
	]);

	assert.deepEqual( format( 1273500, properties( "0", en, {
		compact: "long",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), [
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "3"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "million"
		}
	]);

	assert.deepEqual( format( -1273500, properties( "0", en, {
		compact: "short",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "3"
		},
		{
			"type": "compact",
			"value": "M"
		}
	]);

	assert.deepEqual( format( -1273500, properties( "0", en, {
		compact: "long",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "3"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "million"
		}
	]);

	assert.deepEqual( format( -1273500, properties( "0;(0)", en, {
		compact: "short",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), [
		{
			"type": "literal",
			"value": "("
		},
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "3"
		},
		{
			"type": "compact",
			"value": "M"
		},
		{
			"type": "literal",
			"value": ")"
		}
	]);

	assert.deepEqual( format( -1273500, properties( "0;(0)", en, {
		compact: "long",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), [
		{
			"type": "literal",
			"value": "("
		},
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "3"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "million"
		},
		{
			"type": "literal",
			"value": ")"
		}
	]);

});

QUnit.test( "numbers should support significant digits in compact mode", function( assert ) {
	assert.deepEqual( format( 12735, properties( "0", en, {
		compact: "short",
		maximumSignificantDigits: 3,
		minimumSignificantDigits: 3
	})), [
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "7"
		},
		{
			"type": "compact",
			"value": "K"
		}
	]);

	assert.deepEqual( format( 12735, properties( "0", en, {
		compact: "short",
		maximumSignificantDigits: 2,
		minimumSignificantDigits: 2
	})), [
		{
			"type": "integer",
			"value": "13"
		},
		{
			"type": "compact",
			"value": "K"
		}
	]);

	assert.deepEqual( format( 12735, properties( "0", en, {
		compact: "short",
		maximumSignificantDigits: 1,
		minimumSignificantDigits: 1
	})), [
		{
			"type": "integer",
			"value": "10"
		},
		{
			"type": "compact",
			"value": "K"
		}
	]);

	assert.deepEqual( format( -127350, properties( "0", en, {
		compact: "short",
		maximumSignificantDigits: 3,
		minimumSignificantDigits: 1
	})), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "127"
		},
		{
			"type": "compact",
			"value": "K"
		}
	]);

	assert.deepEqual( format( -127350000, properties( "0", en, {
		compact: "short",
		maximumSignificantDigits: 3,
		minimumSignificantDigits: 1
	})), [
		{
			"type": "minusSign",
			"value": "-"
		},
		{
			"type": "integer",
			"value": "127"
		},
		{
			"type": "compact",
			"value": "M"
		}
	]);

	assert.deepEqual( format( 12849872883, properties("0", en, {
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 3,
		compact: "short"
	})), [
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "8"
		},
		{
			"type": "compact",
			"value": "B"
		}
	]);

	assert.deepEqual( format( 12850172883, properties("0", en, {
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 3,
		compact: "short"
	})), [
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "9"
		},
		{
			"type": "compact",
			"value": "B"
		}
	]);
});

QUnit.test( "numbers should support rounding in compact mode", function( assert ) {
	assert.deepEqual( format( 12735, properties( "0", en, {
		compact: "short",
		maximumFractionDigits: 2,
		minimumFractionDigits: 1
	} ) ), [
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "74"
		},
		{
			"type": "compact",
			"value": "K"
		}
	]);

	assert.deepEqual( format( 12735, properties( "0", en, {
		compact: "short",
		maximumFractionDigits: 2,
		minimumFractionDigits: 1,
		round: "ceil"
	} ) ), [
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "74"
		},
		{
			"type": "compact",
			"value": "K"
		}
	]);

	assert.deepEqual( format( 12735, properties( "0", en, {
		compact: "short",
		maximumFractionDigits: 2,
		minimumFractionDigits: 1,
		round: "floor"
	} ) ), [
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "73"
		},
		{
			"type": "compact",
			"value": "K"
		}
	]);

	assert.deepEqual( format( 12735, properties( "0", en, {
		compact: "short",
		maximumFractionDigits: 2,
		minimumFractionDigits: 1,
		round: "truncate"
	} ) ), [
		{
			"type": "integer",
			"value": "12"
		},
		{
			"type": "decimal",
			"value": "."
		},
		{
			"type": "fraction",
			"value": "73"
		},
		{
			"type": "compact",
			"value": "K"
		}
	]);

});

QUnit.test( "percents should format in compact mode", function( assert ) {
	assert.deepEqual( format( 127, properties( "0%", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "13"
		},
		{
			"type": "compact",
			"value": "K"
		},
		{
			"type": "percentSign",
			"value": "%"
		}
	]);

	assert.deepEqual( format( 127, properties( "0%", en, { compact: "long" } ) ), [
		{
			"type": "integer",
			"value": "13"
		},
		{
			"type": "literal",
			"value": " "
		},
		{
			"type": "compact",
			"value": "thousand"
		},
		{
			"type": "percentSign",
			"value": "%"
		}
	]);
});


QUnit.test( "given pattern properties should be ignored in compact mode", function( assert ) {

	// minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits, minimumSignificantDigits,
	// maximumSignificantDigits extracted from the pattern should be ignored.
	assert.deepEqual( format( 2737, properties( "0.#", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "compact",
			"value": "K"
		}
	]);

	assert.deepEqual( format( 2737, properties( "0.0", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "compact",
			"value": "K"
		}
	]);

	assert.deepEqual( format( 2737, properties( "0.0#", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "compact",
			"value": "K"
		}
	]);

	assert.deepEqual( format( 2737, properties( "@@", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "compact",
			"value": "K"
		}
	]);

	assert.deepEqual( format( 69900, properties( "'$'#,##0.00", en, {compact: "short"} ) ), [
		{
			"type": "literal",
			"value": "$"
		},
		{
			"type": "integer",
			"value": "70"
		},
		{
			"type": "compact",
			"value": "K"
		}
	]);

	assert.deepEqual( format( 12.01, properties( "0.#", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "12"
		}
	]);

	assert.deepEqual( format( 12.01, properties( "0.#", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "12"
		}
	]);

	assert.deepEqual( format( 12.01, properties( "0.0", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "12"
		}
	]);

	assert.deepEqual( format( 12.01, properties( "0.0#", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "12"
		}
	]);

	assert.deepEqual( format( 12.01, properties( "@@", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "12"
		}
	]);

	assert.deepEqual( format( 12.01, properties( "'$'#,##0.00", en, {compact: "short"} ) ), [
		{
			"type": "literal",
			"value": "$"
		},
		{
			"type": "integer",
			"value": "12"
		}
	]);

	// Preserve grouping separator from original pattern. (only used in very big numbers)
	assert.deepEqual( format( 1234000000000000, properties( "#,##0", en, { compact: "short" } ) ), [
		{
			"type": "integer",
			"value": "1"
		},
		{
			"type": "group",
			"value": ","
		},
		{
			"type": "integer",
			"value": "234"
		},
		{
			"type": "compact",
			"value": "T"
		}
	]);

	// Preserve prefix and suffix
	assert.deepEqual( format( 2737, properties( "(0.0#)", en, { compact: "short" } ) ), [
		{
			"type": "literal",
			"value": "("
		},
		{
			"type": "integer",
			"value": "3"
		},
		{
			"type": "compact",
			"value": "K"
		},
		{
			"type": "literal",
			"value": ")"
		}
	]);
});

});
