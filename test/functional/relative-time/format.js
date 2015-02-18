define([
	"globalize",
	"json!cldr-data/main/en/dateFields.json",
	"json!cldr-data/main/de/dateFields.json",
	"json!cldr-data/main/en/numbers.json",
	"json!cldr-data/main/de/numbers.json",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/numberingSystems.json",
	"json!cldr-data/supplemental/plurals.json",
	"../../util",

	"globalize/number",
	"globalize/relative-time"
], function( Globalize, enDateFields, deDateFields, enNumbers, deNumbers,
			 likelySubtags, numberingSystems, plurals, util ) {

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
		Globalize.formatRelativeTime(1, "day");
	});
});

var en, de;

QUnit.module( "formatRelativeTime function", {
	setup: function() {
		Globalize.load( likelySubtags, enDateFields, deDateFields,
						numberingSystems, enNumbers, deNumbers,
						plurals );
		Globalize.locale( "en" );
		en = new Globalize( "en" );
		de = new Globalize( "de" );
	},
	teardown: util.resetCldrContent
} );

QUnit.test( "should validate unit argument presence", function( assert ) {
	util.assertParameterPresence( assert, "unit", function() {
		Globalize.formatRelativeTime(0 );
	});
});

QUnit.test( "should validate unit argument is string", function( assert ) {
	util.assertStringParameter( assert, "unit", function(invalidValue) {
		return function() {
			Globalize.formatRelativeTime(0, invalidValue);
		};
	});
});

QUnit.test( "should validate value argument presence", function( assert ) {
	util.assertParameterPresence( assert, "value", function() {
		Globalize.relativeTimeFormatter("day")();
	});
});

QUnit.test( "should validate value argument is number", function( assert ) {
	util.assertNumberParameter( assert, "value", function(invalidValue) {
		return function() {
			Globalize.formatRelativeTime(invalidValue, "day");
		};
	});
});

QUnit.test( "should format 1 day ago", function( assert ) {
	assert.equal( en.formatRelativeTime(-1, "day", { maxWordOffset: 0 }), "1 day ago" );
});

QUnit.test( "should format 2 weeks ago", function( assert ) {
	assert.equal( en.formatRelativeTime(-2, "week"), "2 weeks ago" );
});

QUnit.test( "should format german 1 day ago", function( assert ) {
	assert.equal( de.formatRelativeTime(-1, "day", { maxWordOffset: 0 }), "vor 1 Tag" );
});

QUnit.test( "should format 1 wk. ago", function( assert ) {
	assert.equal( en.formatRelativeTime(-1, "week", { maxWordOffset: 0, form: "short" }), "1 wk. ago" );
});

QUnit.test( "should format in 3 years", function ( assert ) {
	assert.equal( en.formatRelativeTime(3, "year"), "in 3 years");
});

QUnit.test( "should format today", function( assert ) {
	assert.equal( en.formatRelativeTime(0, "day"), "today" );
});

QUnit.test( "should format tomorrow", function( assert ) {
	assert.equal( en.formatRelativeTime(1, "day"), "tomorrow" );
});

QUnit.test( "should format the day after tomorrow in german", function( assert ) {
	assert.equal( de.formatRelativeTime(2, "day"), "übermorgen" );
});

});
