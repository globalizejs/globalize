define([
	"globalize",
	"json!fixtures/cldr/main/ar/numbers.json",
	"json!fixtures/cldr/main/dz/numbers.json",
	"json!fixtures/cldr/main/en/numbers.json",
	"json!fixtures/cldr/main/es/numbers.json",
	"json!fixtures/cldr/main/sv/numbers.json",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"globalize/number"
], function( Globalize, arNumbers, dzNumbers, enNumbers, esNumbers, svNumbers, likelySubtags ) {

var ar, dz, es, sv;

Globalize.load( arNumbers );
Globalize.load( dzNumbers );
Globalize.load( enNumbers );
Globalize.load( esNumbers );
Globalize.load( svNumbers );
Globalize.load( likelySubtags );

ar = new Globalize( "ar" );
dz = new Globalize( "dz" );
es = new Globalize( "es" );
sv = new Globalize( "sv" );
Globalize.locale( "en" );

module( "Number Parse" );

/**
 *  Integers
 */

test( "should parse integers", function() {
	equal( Globalize.parseNumber( "3" ), 3 );
	equal( Globalize.parseNumber( "12,735" ), 12735 );
	equal( Globalize.parseNumber( "1,2,7,35" ), 12735 );
	equal( es.parseNumber( "12.735" ), 12735 );
});

test( "should parse negative integers", function() {
	equal( Globalize.parseNumber( "-3" ), -3 );
	equal( Globalize.parseNumber( "-12,735" ), -12735 );
});

/**
 *  Decimals
 */

test( "should parse decimals", function() {
	equal( Globalize.parseNumber( "3.14" ), 3.14 );
	equal( es.parseNumber( "3,14" ), 3.14 );
	equal( ar.parseNumber( "3٫14" ), 3.14 );
	equal( Globalize.parseNumber( "3.00" ), 3 );
	equal( Globalize.parseNumber( "12735.0" ), 12735 );
	equal( Globalize.parseNumber( "0.10" ), 0.1 );
});

test( "should parse negative decimal", function() {
	equal( Globalize.parseNumber( "-3.14" ), -3.14 );
});

/**
 *  Percent
 */

test( "should parse percent", function() {
	equal( Globalize.parseNumber( "1%" ), 0.01 );
	equal( Globalize.parseNumber( "01%" ), 0.01 );
	equal( Globalize.parseNumber( "10%" ), 0.1 );
	equal( Globalize.parseNumber( "50%" ), 0.5 );
	equal( Globalize.parseNumber( "100%" ), 1 );
	equal( Globalize.parseNumber( "0.5%" ), 0.005 );
	equal( Globalize.parseNumber( "0.5%" ), 0.005 );
	equal( ar.parseNumber( "50٪" ), 0.5 );
	equal( Globalize.parseNumber( "-10%" ), -0.1 );
});

/**
 *  Scientific notation
 */
test( "should parse scientific notation numbers", function() {
	equal( Globalize.parseNumber( "3E-3" ), 0.003 );
	equal( sv.parseNumber( "3×10^-3" ), 0.003 );
});

/**
 *  Infinite number
 */
test( "should parse infinite numbers", function() {
	equal( Globalize.parseNumber( "∞" ), Infinity );
	equal( Globalize.parseNumber( "-∞" ), -Infinity );
	equal( dz.parseNumber( "གྲངས་མེད" ), Infinity );
});

/**
 *  NaN
 */

test( "should parse invalid numbers as NaN", function() {
	deepEqual( Globalize.parseNumber( "invalid" ), NaN );
	deepEqual( Globalize.parseNumber( "NaN" ), NaN );
});

});
