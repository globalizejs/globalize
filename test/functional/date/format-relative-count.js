define([
	"globalize",
	"json!cldr-data/main/en/dateFields.json",
	"json!cldr-data/main/de/dateFields.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"../../util",

	"globalize/number",
	"globalize/date"
], function( Globalize, enDateFields, deDateFields, likelySubtags, util ) {

QUnit.module( "fomatRelativeCount function (no cldr)", {
	setup: function() {
		Globalize.load( likelySubtags, {
			main: {
				en: {}
			}
		});
		Globalize.locale( "en" );
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.formatRelativeCount("day", 1);
	});
});

var en, de;

QUnit.module( "formatRelativeCount function", {
	setup: function() {
		Globalize.load( likelySubtags, enDateFields, deDateFields);
		Globalize.locale( "en" );
		en = new Globalize( "en" );
		de = new Globalize( "de" );
	},
	teardown: util.resetCldrContent
} );

QUnit.test( "should validate type argument presence", function( assert ) {
	util.assertParameterPresence( assert, "type", function() {
		Globalize.formatRelativeCount( );
	});
});

QUnit.test( "should validate type argument is string", function( assert ) {
	util.assertStringParameter( assert, "type", function(invalidValue) {
		return function() {
			Globalize.formatRelativeCount(invalidValue, 0);
		};
	});
});

QUnit.test( "should validate count argument presence", function( assert ) {
	util.assertParameterPresence( assert, "count", function() {
		Globalize.formatRelativeCount( "day" );
	});
});

QUnit.test( "should validate count argument is number", function( assert ) {
	util.assertNumberParameter( assert, "count", function(invalidValue) {
		return function() {
			Globalize.formatRelativeCount("day", invalidValue);
		};
	});
});

QUnit.test( "should validate maxWordOffset argument is number", function( assert ) {
	util.assertNumberParameter( assert, "maxWordOffset", function(invalidValue) {
		return function() {
			Globalize.formatRelativeCount("day", 1, invalidValue);
		};
	});
});

QUnit.test( "should format 1 day ago", function( assert ) {
	assert.equal( en.formatRelativeCount("day", -1, 0), "1 day ago" );
});

QUnit.test( "should format 2 weeks ago", function( assert ) {
	assert.equal( en.formatRelativeCount("week", -2), "2 weeks ago" );
});

QUnit.test( "should format german 1 day ago", function( assert ) {
	assert.equal( de.formatRelativeCount("day", -1, 0), "vor 1 Tag" );
});

QUnit.test( "should format 1 wk. ago", function( assert ) {
	assert.equal( en.formatRelativeCount("week-short", -1, 0), "1 wk. ago" );
});

QUnit.test( "should format in 3 years", function ( assert ) {
	assert.equal( en.formatRelativeCount("year", 3), "in 3 years");
});

QUnit.test( "should format today", function( assert ) {
	assert.equal( en.formatRelativeCount("day", 0), "today" );
});

QUnit.test( "should format tomorrow", function( assert ) {
	assert.equal( en.formatRelativeCount("day", 1), "tomorrow" );
});

QUnit.test( "should format the day after tomorrow in german", function( assert ) {
	assert.equal( de.formatRelativeCount("day", 2), "übermorgen" );
});

});
