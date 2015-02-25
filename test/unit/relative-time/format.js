define([
	"cldr",
	"src/relative-time/format",
	"src/relative-time/properties",
	"json!cldr-data/main/en/dateFields.json",
	"json!cldr-data/supplemental/likelySubtags.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, format, properties, enDateFields, likelySubtags ) {

var cldr;

Cldr.load( enDateFields );
Cldr.load( likelySubtags );

cldr = new Cldr( "en" );

QUnit.module( "Relative Time Format" );

function makeMockNumberFormatter(assert, expectedValue) {
	return function ( value ) {
		assert.equal( value, expectedValue );
		return expectedValue.toString();
	};
}
function makeMockPluralGenerator(plural) {
	return function () {
		return plural;
	};
}

QUnit.test( "should format number in past", function( assert ) {
	assert.equal(
		format(
			-7,
			makeMockNumberFormatter( assert, 7 ),
			makeMockPluralGenerator( "other" ),
			properties( "month", cldr, {} ) ),
		"7 months ago"
    );
});

QUnit.test( "should format number in future", function( assert ) {
	assert.equal(
		format(
			7,
			makeMockNumberFormatter( assert, 7 ),
			makeMockPluralGenerator( "other" ),
			properties( "month", cldr, {} ) ),
		"in 7 months"
    );
});

QUnit.test( "should format using word if possible", function( assert ) {
	function mockNumberFormatter() {
		assert.ok( false, "no need to call number formatter" );
	}
	function mockPluralGenerator() {
		assert.ok( false, "no need to call plural generator" );
	}
	assert.equal(
		format( 1, mockNumberFormatter, mockPluralGenerator, properties( "month", cldr, {} ) ),
		"next month"
    );
});

QUnit.test( "should format numerically if relative-type is absent", function( assert ) {
	assert.equal(
		format(
			1,
			makeMockNumberFormatter( assert, 1 ),
			makeMockPluralGenerator( "one" ), {
				"relative-type-0": "this month",
				"relativeTime-type-future": {
					"relativeTimePattern-count-one": "in {0} month",
					"relativeTimePattern-count-other": "in {0} months"
				},
				"relativeTime-type-past": {
					"relativeTimePattern-count-one": "{0} month ago",
					"relativeTimePattern-count-other": "{0} months ago"
				}
		} ),
		"in 1 month"
    );
});

});
