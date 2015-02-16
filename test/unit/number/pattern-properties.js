define([
	"cldr",
	"src/number/format-properties",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, properties, enNumbers, likelySubtags ) {

var en;

Cldr.load( enNumbers, likelySubtags );

en = new Cldr( "en" );

QUnit.module( "Number Pattern Properties" );

QUnit.test( "should return prefix", function( assert ) {
	assert.equal( properties( "0", en )[ 0 ], "" );
	assert.equal( properties( "foo 0", en )[ 0 ], "foo " );
	assert.equal( properties( "-0", en )[ 0 ], "-" );
});

QUnit.test( "should return minimumIntegerDigits", function( assert ) {
	assert.equal( properties( "0", en )[ 2 ], 1 );
	assert.equal( properties( "#,##0", en )[ 2 ], 1 );
	assert.equal( properties( "00", en )[ 2 ], 2 );
	assert.equal( properties( "#0.00", en )[ 2 ], 1 );
});

QUnit.test( "should return minimumFractionDigits", function( assert ) {
	assert.equal( properties( "0", en )[ 3 ], undefined );
	assert.equal( properties( "0.##", en )[ 3 ], 0 );
	assert.equal( properties( "0.0#", en )[ 3 ], 1 );
});

QUnit.test( "should return maximumFractionDigits", function( assert ) {
	assert.equal( properties( "0", en )[ 4 ], undefined );
	assert.equal( properties( "0.##", en )[ 4 ], 2 );
	assert.equal( properties( "0.0#", en )[ 4 ], 2 );
});

QUnit.test( "should return minimumSignificantDigits", function( assert ) {
	assert.equal( properties( "0", en )[ 5 ], undefined );
	assert.equal( properties( "0.##", en )[ 5 ], undefined );
	assert.equal( properties( "@##", en )[ 5 ], 1 );
	assert.equal( properties( "#,#@@", en )[ 5 ], 2 );
});

QUnit.test( "should return maximumSignificantDigits", function( assert ) {
	assert.equal( properties( "0", en )[ 6 ], undefined );
	assert.equal( properties( "0.##", en )[ 6 ], undefined );
	assert.equal( properties( "@##", en )[ 6 ], 3 );
	assert.equal( properties( "#,#@@", en )[ 6 ], 2 );
});

QUnit.test( "should return roundIncrement", function( assert ) {
	assert.equal( properties( "0.##", en )[ 7 ], undefined );
	assert.equal( properties( "0.05", en )[ 7 ], 0.05 );
	assert.equal( properties( "0.002", en )[ 7 ], 0.002 );
});

QUnit.test( "should return primaryGroupingSize", function( assert ) {
	assert.equal( properties( "0.##", en )[ 8 ], undefined );
	assert.equal( properties( "#,##0.##", en )[ 8 ], 3 );
	assert.equal( properties( "#,##,##0.##", en )[ 8 ], 3 );
});

QUnit.test( "should return secondaryGroupingSize", function( assert ) {
	assert.equal( properties( "0.##", en )[ 9 ], undefined );
	assert.equal( properties( "#,##0.##", en )[ 9 ], undefined );
	assert.equal( properties( "#,##,##0.##", en )[ 9 ], 2 );
});

QUnit.test( "should return suffix", function( assert ) {
	assert.equal( properties( "0.##", en )[ 10 ], "" );
	assert.equal( properties( "0.## bar", en )[ 10 ], " bar" );
});

});
