define([
	"cldr",
	"src/relative-time/properties",
	"json!cldr-data/main/en/dateFields.json",
	"json!cldr-data/main/de/dateFields.json",
	"json!cldr-data/supplemental/likelySubtags.json",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, properties, enDateFields, deDateFields, likelySubtags ) {

var cldr, de;

Cldr.load( enDateFields );
Cldr.load( deDateFields );
Cldr.load( likelySubtags );

cldr = new Cldr( "en" );
de = new Cldr( "de" );

QUnit.module( "Relative Time Properties" );

QUnit.test( "should return month info in english", function( assert ) {
	assert.deepEqual( properties( "month", cldr, {} ), {
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

QUnit.test( "should return complete day info in german", function( assert ) {
	assert.deepEqual( properties( "day", de, {} ), {
		"relative-type--1": "gestern",
		"relative-type--2": "vorgestern",
		"relative-type-0": "heute",
		"relative-type-1": "morgen",
		"relative-type-2": "übermorgen",
		"relativeTime-type-future": {
			"relativeTimePattern-count-one": "in {0} Tag",
			"relativeTimePattern-count-other": "in {0} Tagen"
		},
		"relativeTime-type-past": {
			"relativeTimePattern-count-one": "vor {0} Tag",
			"relativeTimePattern-count-other": "vor {0} Tagen"
		}
	});
});

QUnit.test( "should return short info when requested", function( assert ) {
	assert.deepEqual( properties( "month", cldr, { form: "short" } ), {
		"relative-type--1": "last mo.",
		"relative-type-0": "this mo.",
		"relative-type-1": "next mo.",
		"relativeTime-type-future": {
			"relativeTimePattern-count-one": "in {0} mo.",
			"relativeTimePattern-count-other": "in {0} mo."
		},
		"relativeTime-type-past": {
			"relativeTimePattern-count-one": "{0} mo. ago",
			"relativeTimePattern-count-other": "{0} mo. ago"
		}
	});
});

QUnit.test( "should return narrow info when requested", function( assert ) {
	assert.deepEqual( properties( "month", cldr, { form: "narrow" } ), {
		"relative-type--1": "last mo.",
		"relative-type-0": "this mo.",
		"relative-type-1": "next mo.",
		"relativeTime-type-future": {
			"relativeTimePattern-count-one": "in {0} mo.",
			"relativeTimePattern-count-other": "in {0} mo."
		},
		"relativeTime-type-past": {
			"relativeTimePattern-count-one": "{0} mo. ago",
			"relativeTimePattern-count-other": "{0} mo. ago"
		}
	});
});

});
