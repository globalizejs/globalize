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

QUnit.test( "should format number in past", function( assert ) {
	function mockNumberFormatter(value) {
		assert.equal(value, 7);
		return "7";
	}
	function mockPluralGenerator() {
		return "other";
	}
	assert.equal( format( -7, mockNumberFormatter, mockPluralGenerator, properties( "month", cldr ) ),
				  "7 months ago" );
});

QUnit.test( "should format number in future", function( assert ) {
	function mockNumberFormatter(value) {
		assert.equal(value, 7);
		return "7";
	}
	function mockPluralGenerator() {
		return "other";
	}
	assert.equal( format( 7, mockNumberFormatter, mockPluralGenerator, properties( "month", cldr ) ),
				  "in 7 months" );
});

QUnit.test( "should format using word if possible", function( assert ) {
	function mockNumberFormatter() {
		assert.ok(false, "no need to call number formatter");
	}
	function mockPluralGenerator() {
		assert.ok(false, "no need to call plural generator");
	}
	assert.equal( format( 1, mockNumberFormatter, mockPluralGenerator, properties( "month", cldr ) ),
				  "next month" );
});

});
