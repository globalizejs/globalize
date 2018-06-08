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
	assert.equal( format( pi, properties( "#0", en ) ), "3" );
	assert.equal( format( pi, properties( "###0", en ) ), "3" );
});

QUnit.test( "should zero-pad minimum integer digits", function( assert ) {
	assert.equal( format( pi, properties( "0", en ) ), "3" );
	assert.equal( format( pi, properties( "00", en ) ), "03" );
	assert.equal( format( pi, properties( "000", en ) ), "003" );
});

QUnit.test( "should not limit the maximum number of digits of integers", function( assert ) {
	assert.equal( format( earthDiameter, properties( "0", en ) ), "12735" );
	assert.equal( format( earthDiameter, properties( "00", en ) ), "12735" );
	assert.equal( format( earthDiameter, properties( "#0", en ) ), "12735" );
});

QUnit.test( "should format negative integer", function( assert ) {
	assert.equal( format( -earthDiameter, properties( "0", en ) ), "-12735" );
	assert.equal( format( -earthDiameter, properties( "0;(0)", en ) ), "(12735)" );

	// The number of digits, minimal digits, and other characteristics shall be ignored in the negative subpattern.
	assert.equal( format( -earthDiameter, properties( "0;(0.0##)", en ) ), "(12735)" );
});

/**
 *  Decimals
 */

QUnit.test( "should format decimals", function( assert ) {
	assert.equal( format( pi, properties( "0.##", en ) ), "3.14" );
});

QUnit.test( "should limit maximum fraction digits", function( assert ) {
	assert.equal( format( pi, properties( "0.##", en ) ), "3.14" );
	assert.equal( format( pi, properties( "0.0#", en ) ), "3.14" );
	assert.equal( format( pi, properties( "0.####", en ) ), "3.1416" );
	assert.equal( format( 0.10004, properties( "0.##", en ) ), "0.1" );
});

QUnit.test( "should zero-pad minimum fraction digits", function( assert ) {
	assert.equal( format( earthDiameter, properties( "0.0", en ) ), "12735.0" );
	assert.equal( format( deci, properties( "0.00", en ) ), "0.10" );
});

QUnit.test( "should localize decimal separator symbol (.)", function( assert ) {
	assert.equal( format( pi, properties( "0.##", es ) ), "3,14" );
	assert.equal( format( pi, properties( "0.##", ar ) ), "٣٫١٤" );
	assert.equal( format( pi, properties( "0.##", zh ) ), "三.一四" );
});

QUnit.test( "should allow integer and fraction options override", function( assert ) {
	// Overriding minimum integer digits only.
	assert.equal( format( pi, properties( "0", en, { minimumIntegerDigits: 2 } ) ), "03" );

	// Overriding both fraction options.
	assert.equal( format( pi, properties( "0.##", en, {
		maximumFractionDigits: 5,
		minimumFractionDigits: 3
	} ) ), "3.14159" );
	assert.equal( format( 0.1, properties( "0.##", en, {
		maximumFractionDigits: 5,
		minimumFractionDigits: 3
	} ) ), "0.100" );

	// Overriding maximum fraction digits only.
	assert.equal( format( pi, properties( "0.##", en, { maximumFractionDigits: 0 } ) ), "3" );
	assert.equal( format( pi, properties( "0.##", en, { maximumFractionDigits: 1 } ) ), "3.1" );
	assert.equal( format( pi, properties( "0.##", en, { maximumFractionDigits: 3 } ) ), "3.142" );
	assert.equal( format( 0.01, properties( "0.##", en, { maximumFractionDigits: 1 } ) ), "0" );
	assert.equal( format( 0.01, properties( "0.0#", en, { maximumFractionDigits: 1 } ) ), "0.0" );

	// Sanity normalization: minimumFractionDigits = min( minimumFractionDigits, maximumFractionDigits )
	assert.equal( format( 0.1, properties( "0.0000", en, { maximumFractionDigits: 2 } ) ), "0.10" );

	// Overriding minimum fraction digits only.
	assert.equal( format( 1, properties( "0.00", en, { minimumFractionDigits: 0 } ) ), "1" );
	assert.equal( format( 0.1, properties( "0.00", en, { minimumFractionDigits: 0 } ) ), "0.1" );
	assert.equal( format( 0.001, properties( "0.00", en, { minimumFractionDigits: 0 } ) ), "0" );
	assert.equal( format( 0.1, properties( "0.##", en, { minimumFractionDigits: 2 } ) ), "0.10" );

	// Sanity normalization: maximumFractionDigits = max( minimumFractionDigits, maximumFractionDigits ).
	assert.equal( format( pi, properties( "0.##", en, { minimumFractionDigits: 5 } ) ), "3.14159" );

	// Overriding both minimum and maximum fraction digits.
	assert.equal( format( pi, properties( "0.##", en, {
		minimumFractionDigits: 1,
		maximumFractionDigits: 4
	}) ), "3.1416" );
	assert.equal( format( pi, properties( "0.##", en, {
		minimumIntegerDigits: 2,
		maximumFractionDigits: 3
	}) ), "03.142" );

	// Overriding both integer and fraction options.
	assert.equal( format( 1.1, properties( "0.##", en, {
		minimumIntegerDigits: 2,
		minimumFractionDigits: 3
	}) ), "01.100" );
	assert.equal( format( 1.1, properties( "0.##", en, {
		minimumIntegerDigits: 2,
		maximumFractionDigits: 3
	}) ), "01.1" );
});

QUnit.test( "should allow rounding", function( assert ) {
	assert.equal( format( pi, properties( "0.10", en ) ), "3.10" );
	assert.equal( format( pi, properties( "0.20", en ) ), "3.20" );
	assert.equal( format( pi, properties( "0.5", en ) ), "3.0" );
	assert.equal( format( pi, properties( "0.1", en ) ), "3.1" );

	// Handle inaccurate floating point arithmetics like 0.00015 * 10000 = 1.49999999999999.
	// See #376.
	assert.equal( format( 0.00015, properties( "0.0000", en ) ), "0.0002" );
});

QUnit.test( "should allow different rounding options", function( assert ) {
	assert.equal( format( pi, properties( "0.##", en, { round: "ceil" } ) ), "3.15" );
	assert.equal( format( pi, properties( "0.##", en, { round: "floor"} ) ), "3.14" );
	assert.equal( format( pi, properties( "0.##", en, { round: "round" } ) ), "3.14" );
	assert.equal( format( pi, properties( "0.##", en, { round: "truncate"} ) ), "3.14" );
	assert.equal( format( pi, properties( "0.####", en, { round: "ceil" } ) ), "3.1416" );
	assert.equal( format( pi, properties( "0.####", en, { round: "floor"} ) ), "3.1415" );
	assert.equal( format( pi, properties( "0.####", en, { round: "round" } ) ), "3.1416" );
	assert.equal( format( pi, properties( "0.####", en, { round: "truncate"} ) ), "3.1415" );
	assert.equal( format( -pi, properties( "0.##", en, { round: "ceil" } ) ), "-3.14" );
	assert.equal( format( -pi, properties( "0.##", en, { round: "floor"} ) ), "-3.15" );
	assert.equal( format( -pi, properties( "0.##", en, { round: "round" } ) ), "-3.14" );
	assert.equal( format( -pi, properties( "0.##", en, { round: "truncate"} ) ), "-3.14" );
	assert.equal( format( -pi, properties( "0.####", en, { round: "ceil" } ) ), "-3.1415" );
	assert.equal( format( -pi, properties( "0.####", en, { round: "floor"} ) ), "-3.1416" );
	assert.equal( format( -pi, properties( "0.####", en, { round: "round" } ) ), "-3.1416" );
	assert.equal( format( -pi, properties( "0.####", en, { round: "truncate"} ) ), "-3.1415" );
});

QUnit.test( "should format significant digits", function( assert ) {
	assert.equal( format( 123, properties( "@@@", en ) ), "123" );
	assert.equal( format( 12345, properties( "@@@", en ) ), "12300" );
	assert.equal( format( 12345, properties( "@@#", en ) ), "12300" );
	assert.equal( format( 12345, properties( "@##", en ) ), "12300" );
	assert.equal( format( pi, properties( "@@", en ) ), "3.1" );
	assert.equal( format( pi, properties( "@@#", en ) ), "3.14" );
	assert.equal( format( pi, properties( "@@##", en ) ), "3.142" );
	assert.equal( format( pi, properties( "@####", en ) ), "3.1416" );
	assert.equal( format( 0.10004, properties( "@@", en ) ), "0.10" );
	assert.equal( format( 0.10004, properties( "@##", en ) ), "0.1" );

	// This also test for the following inaccurate floating point arithmetics:
	// `1234 * 0.0001 = 0.12340000000000001`.
	assert.equal( format( 0.12345, properties( "@@@", en ) ), "0.123" );

	assert.equal( format( 1.23004, properties( "@@##", en ) ), "1.23" );
});

QUnit.test( "should format negative decimal", function( assert ) {
	assert.equal( format( -pi, properties( "0.##", en ) ), "-3.14" );
	assert.equal( format( -pi, properties( "0.##;(0.##)", en ) ), "(3.14)" );
	assert.equal( format( -pi, properties( "@@#", en ) ), "-3.14" );
	assert.equal( format( -pi, properties( "@@#;(@@#)", en ) ), "(3.14)" );

	// The U+002D HYPHEN-MINUS sign shall be localized.
	assert.equal( format( -pi, properties( "0.##", fa ) ), "\u200e\u2212۳٫۱۴" );

	// The number of digits, minimal digits, and other characteristics shall be ignored in the negative subpattern.
	assert.equal( format( -pi, properties( "0.##;(0)", en ) ), "(3.14)" );
	assert.equal( format( -pi, properties( "@@#;(0)", en ) ), "(3.14)" );
});

/**
 *  Grouping separators
 */

QUnit.test( "should format grouping separators", function( assert ) {
	assert.equal( format( earthDiameter, properties( "#,##0.#", en ) ), "12,735" );
	assert.equal( format( earthDiameter, properties( "#,#,#0.#", en ) ), "1,2,7,35" );
	assert.equal( format( 123456789, properties( "#,##,###,###0", en ) ), "12,345,6789" );
	assert.equal( format( 123456789, properties( "###,###,###0", en ) ), "12,345,6789" );
	assert.equal( format( 123456789, properties( "##,#,###,###0", en ) ), "12,345,6789" );
});

/**
 *  Percent
 */

QUnit.test( "should format percent", function( assert ) {
	assert.equal( format( 0.01, properties( "0%", en ) ), "1%" );
	assert.equal( format( 0.01, properties( "00%", en ) ), "01%" );
	assert.equal( format( 0.1, properties( "0%", en ) ), "10%" );
	assert.equal( format( 0.5, properties( "#0%", en ) ), "50%" );
	assert.equal( format( 1, properties( "0%", en ) ), "100%" );
	assert.equal( format( 0.005, properties( "##0.#%", en ) ), "0.5%" );
	assert.equal( format( 0.005, properties( "##0.#%", en ) ), "0.5%" );
});

QUnit.test( "should localize percent symbol (%)", function( assert ) {
	assert.equal( format( 0.5, properties( "#0%", ar ) ), "٥٠٪" );
});

QUnit.test( "should format negative percentage", function( assert ) {
	assert.equal( format( -0.1, properties( "0%", en ) ), "-10%" );
	assert.equal( format( -0.1, properties( "0%;(0%)", en ) ), "(10%)" );
	assert.equal( format( -0.1, properties( "0%;(0)%", en ) ), "(10)%" );
});

/**
 *  Per mille
 */

QUnit.test( "should format per mille", function( assert ) {
	assert.equal( format( 0.001, properties( "0\u2030", en ) ), "1\u2030" );
	assert.equal( format( 0.001, properties( "00\u2030", en ) ), "01\u2030" );
	assert.equal( format( 0.01, properties( "0\u2030", en ) ), "10\u2030" );
	assert.equal( format( 0.1, properties( "0\u2030", en ) ), "100\u2030" );
	assert.equal( format( 0.5, properties( "#0\u2030", en ) ), "500\u2030" );
	assert.equal( format( 1, properties( "0\u2030", en ) ), "1000\u2030" );
	assert.equal( format( 0.0005, properties( "##0.#\u2030", en ) ), "0.5\u2030" );
	assert.equal( format( 0.0005, properties( "##0.#\u2030", en ) ), "0.5\u2030" );
	assert.equal( format( 0.5, properties( "#0‰", en ) ), "500\u2030" );
	assert.equal( format( 0.5, properties( "#0‰", en ) ), "500‰" );
});

QUnit.test( "should localize per mille symbol (\u2030)", function( assert ) {
	assert.equal( format( 0.5, properties( "#0\u2030", ar ) ), "٥٠٠؉" );
});

QUnit.test( "should format negative mille", function( assert ) {
	assert.equal( format( -0.001, properties( "0\u2030", en ) ), "-1\u2030" );
	assert.equal( format( -0.001, properties( "0\u2030;(0\u2030)", en ) ), "(1\u2030)" );
	assert.equal( format( -0.001, properties( "0\u2030;(0)\u2030", en ) ), "(1)\u2030" );
});

/**
 *  Infinity
 */

QUnit.test( "should format infinite numbers", function( assert ) {
	assert.equal( format( Math.pow(2, 2000 ), properties( "0", en ) ), "∞" );
	assert.equal( format( Math.pow(-2, 2001 ), properties( "0", en ) ), "-∞" );
});

/**
 *  NaN
 */

QUnit.test( "should format infinite numbers", function( assert ) {
	assert.equal( format( NaN, properties( "0", en ) ), "NaN" );
});

/**
 *  Literal
 */

QUnit.test( "should format literal (')", function( assert ) {
	assert.equal( format( 69900, properties( "'$'#,##0", en ) ), "$69,900" );
	assert.equal( format( 69900, properties( "'$'#,##0.00", en ) ), "$69,900.00" );

	// Make sure quoted characters (in this case, minus sign) aren't localized.
	assert.equal( format( -pi, properties( "0.##;'-'0.##", fa ) ), "-۳٫۱۴" );
});

/**
 *  Compact Numbers
 */

QUnit.test( "should format numbers in compact mode", function( assert ) {
	assert.equal( format( 273.7, properties( "0", en, { compact: "short" } ) ), "274" );
	assert.equal( format( 273.7, properties( "0", en, { compact: "long" } ) ), "274" );
	assert.equal( format( 273, properties( "0", en, { compact: "short" } ) ), "273" );
	assert.equal( format( 273, properties( "0", en, { compact: "long" } ) ), "273" );
	assert.equal( format( 573, properties( "0", en, { compact: "short" } ) ), "573" );
	assert.equal( format( 573, properties( "0", en, { compact: "long" } ) ), "573" );
	assert.equal( format( 1273, properties( "0", en, { compact: "short" } ) ), "1K" );
	assert.equal( format( 1273, properties( "0", en, { compact: "long" } ) ), "1 thousand" );
	assert.equal( format( 1234000000000000, properties( "0", en, { compact: "short" } ) ), "1234T" );
	assert.equal( format( 1273000, properties( "0", es, {
		compact: "long"
	} ), esPluralGenerator ), "1 millón" );
	assert.equal( format( 2273000, properties( "0", es, {
		compact: "long"
	} ), esPluralGenerator ), "2 millones" );
	assert.equal( format( 27371, properties( "0", zhSimplified, { compact: "short" } ) ), "3万" );
	assert.equal( format( 27371, properties( "0", zhSimplified, { compact: "long" } ) ), "3万" );
	assert.equal( format( 9999.9, properties( "0", en, { compact: "long" } ) ), "10 thousand" );
	assert.equal( format( 12735, properties( "0", en, { compact: "short" } ) ), "13K" );
	assert.equal( format( 12735, properties( "0", en, { compact: "long" } ) ), "13 thousand" );
	assert.equal( format( 127350, properties( "0", en, { compact: "short" } ) ), "127K" );
	assert.equal( format( 127350, properties( "0", en, { compact: "long" } ) ), "127 thousand" );
	assert.equal( format( 1273500, properties( "0", en, { compact: "short" } ) ), "1M" );
	assert.equal( format( 1273500, properties( "0", en, { compact: "long" } ) ), "1 million" );
	assert.equal( format( -1273500, properties( "0", en, { compact: "short" } ) ), "-1M" );
	assert.equal( format( -1273500, properties( "0", en, { compact: "long" } ) ), "-1 million" );
	assert.equal( format( -1273500, properties( "0;(0)", en, { compact: "short" } ) ), "(1M)" );
	assert.equal( format( -1273500, properties( "0;(0)", en, { compact: "long" } ) ), "(1 million)" );

	// Some hungarian short formats have a terminating E, which is treated as a special
	// character in non-compact formats.
	// \u00A0 is a unicode non-breaking space.
	assert.equal( format( 1273, properties( "0", hu, { compact: "short" } ) ), "1\u00A0E" );
	assert.equal( format( 1273, properties( "0", hu, { compact: "long" } ) ), "1 ezer" );
	assert.equal( format( 9000000, properties( "0", hu, { compact: "short" } ) ), "9\u00A0M" );
	assert.equal( format( 9000000, properties( "0", hu, { compact: "long" } ) ), "9 millió" );
});

QUnit.test( "should format numbers that lack pattern in compact mode (use default compact mode pattern)", function( assert ) {
	assert.equal( format( 0.01, properties( "0", en, { compact: "short" } ) ), "0" );
	assert.equal( format( 273.7, properties( "0", en, { compact: "short" } ) ), "274" );
	assert.equal( format( 273.7, properties( "0", en, { compact: "long" } ) ), "274" );
	assert.equal( format( 2737, properties( "0", zhSimplified, { compact: "short" } ) ), "2737" );
	assert.equal( format( 2737, properties( "0", zhSimplified, { compact: "long" } ) ), "2737" );
});

QUnit.test( "numbers should support fraction digits in compact mode", function( assert ) {
	assert.equal( format( 1273, properties( "0", en, {
		compact: "short",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), "1.3K" );
	assert.equal( format( 1273, properties( "0", en, {
		compact: "long",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), "1.3 thousand" );
	assert.equal( format( 1273000, properties( "0", es, {
		compact: "long",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	}), esPluralGenerator ), "1,3 millones" );
	assert.equal( format( 2273000, properties( "0", es, {
		compact: "long",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	} ), esPluralGenerator ), "2,3 millones" );
	assert.equal( format( 12735, properties( "0", en, {
		compact: "short",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), "12.7K" );
	assert.equal( format( 12735, properties( "0", en, {
		compact: "long",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), "12.7 thousand" );
	assert.equal( format( 127350, properties( "0", en, {
		compact: "short",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), "127.4K" );
	assert.equal( format( 127350, properties( "0", en, {
		compact: "long",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), "127.4 thousand" );
	assert.equal( format( 1273500, properties( "0", en, {
		compact: "short",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), "1.3M" );
	assert.equal( format( 1273500, properties( "0", en, {
		compact: "long",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), "1.3 million" );
	assert.equal( format( -1273500, properties( "0", en, {
		compact: "short",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), "-1.3M" );
	assert.equal( format( -1273500, properties( "0", en, {
		compact: "long",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), "-1.3 million" );
	assert.equal( format( -1273500, properties( "0;(0)", en, {
		compact: "short",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), "(1.3M)" );
	assert.equal( format( -1273500, properties( "0;(0)", en, {
		compact: "long",
		maximumFractionDigits: 1,
		minimumFractionDigits: 1
	})), "(1.3 million)" );
});

QUnit.test( "numbers should support significant digits in compact mode", function( assert ) {
	assert.equal( format( 12735, properties( "0", en, {
		compact: "short",
		maximumSignificantDigits: 3,
		minimumSignificantDigits: 3
	})), "12.7K" );
	assert.equal( format( 12735, properties( "0", en, {
		compact: "short",
		maximumSignificantDigits: 2,
		minimumSignificantDigits: 2
	})), "13K" );
	assert.equal( format( 12735, properties( "0", en, {
		compact: "short",
		maximumSignificantDigits: 1,
		minimumSignificantDigits: 1
	})), "10K" );
	assert.equal( format( -127350, properties( "0", en, {
		compact: "short",
		maximumSignificantDigits: 3,
		minimumSignificantDigits: 1
	})), "-127K" );
	assert.equal( format( -127350000, properties( "0", en, {
		compact: "short",
		maximumSignificantDigits: 3,
		minimumSignificantDigits: 1
	})), "-127M" );

	assert.equal( format( 12849872883, properties("0", en, {
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 3,
		compact: "short"
	})), "12.8B" );
	
	assert.equal( format( 12850172883, properties("0", en, {
		minimumSignificantDigits: 1,
		maximumSignificantDigits: 3,
		compact: "short"
	})), "12.9B" );
});

QUnit.test( "numbers should support rounding in compact mode", function( assert ) {
	assert.equal( format( 12735, properties( "0", en, {
		compact: "short",
		maximumFractionDigits: 2,
		minimumFractionDigits: 1
	} ) ), "12.74K" );
	assert.equal( format( 12735, properties( "0", en, {
		compact: "short",
		maximumFractionDigits: 2,
		minimumFractionDigits: 1,
		round: "ceil"
	} ) ), "12.74K" );
	assert.equal( format( 12735, properties( "0", en, {
		compact: "short",
		maximumFractionDigits: 2,
		minimumFractionDigits: 1,
		round: "floor"
	} ) ), "12.73K" );
	assert.equal( format( 12735, properties( "0", en, {
		compact: "short",
		maximumFractionDigits: 2,
		minimumFractionDigits: 1,
		round: "truncate"
	} ) ), "12.73K" );
});

QUnit.test( "percents should format in compact mode", function( assert ) {
	assert.equal( format( 127, properties( "0%", en, { compact: "short" } ) ), "13K%" );
	assert.equal( format( 127, properties( "0%", en, { compact: "long" } ) ), "13 thousand%" );
});

QUnit.test( "given pattern properties should be ignored in compact mode", function( assert ) {

	// minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits, minimumSignificantDigits,
	// maximumSignificantDigits extracted from the pattern should be ignored.
	assert.equal( format( 2737, properties( "0.#", en, { compact: "short" } ) ), "3K" );
	assert.equal( format( 2737, properties( "0.0", en, { compact: "short" } ) ), "3K" );
	assert.equal( format( 2737, properties( "0.0#", en, { compact: "short" } ) ), "3K" );
	assert.equal( format( 2737, properties( "@@", en, { compact: "short" } ) ), "3K" );
	assert.equal( format( 69900, properties( "'$'#,##0.00", en, {compact: "short"} ) ), "$70K" );

	assert.equal( format( 12.01, properties( "0.#", en, { compact: "short" } ) ), "12" );
	assert.equal( format( 12.01, properties( "0.#", en, { compact: "short" } ) ), "12" );
	assert.equal( format( 12.01, properties( "0.0", en, { compact: "short" } ) ), "12" );
	assert.equal( format( 12.01, properties( "0.0#", en, { compact: "short" } ) ), "12" );
	assert.equal( format( 12.01, properties( "@@", en, { compact: "short" } ) ), "12" );
	assert.equal( format( 12.01, properties( "'$'#,##0.00", en, {compact: "short"} ) ), "$12" );

	// Preserve grouping separator from original pattern. (only used in very big numbers)
	assert.equal( format( 1234000000000000, properties( "#,##0", en, { compact: "short" } ) ), "1,234T" );

	// Preserve prefix and suffix
	assert.equal( format( 2737, properties( "(0.0#)", en, { compact: "short" } ) ), "(3K)" );
});

});
