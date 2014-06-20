define([
	"cldr",
	"src/relative-time/properties",
	"json!cldr-data/main/en/dateFields.json",
	"json!cldr-data/supplemental/likelySubtags.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, properties, enDateFields, likelySubtags ) {

var cldr;

Cldr.load( enDateFields );
Cldr.load( likelySubtags );

cldr = new Cldr( "en" );

QUnit.module( "Relative Time Properties" );

// FIXME
QUnit.test( "FIXME", function( assert ) {
	assert.deepEqual( properties( "month", cldr ), {
		"relative-type--1": "last month",
		"relative-type-0": "this month",
		"relative-type-1": "next month",
		"relativeTime-type-future": {
			"relativeTimePattern-count-one": "in {0} month",
			"relativeTimePattern-count-other": "in {0} months"
		},
		"relativeTime-type-past": {
			"relativeTimePattern-count-one": "{0} month ago",
			"relativeTimePattern-count-other": "{0} months ago"
		}
	});
});

});
