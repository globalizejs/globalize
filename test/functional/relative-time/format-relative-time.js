define( [
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

var de, en;

QUnit.module( ".fomatRelativeTime( value, unit [, options] ) - no CLDR", {
	setup: function( ) {
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
	util.assertCldrContent( assert, function( ) {
		Globalize.formatRelativeTime( 1, "day" );
	});
});

QUnit.module( ".formatRelativeTime( value, unit [, options] )", {
	setup: function( ) {
		Globalize.load( likelySubtags, enDateFields, deDateFields,
			numberingSystems, enNumbers, deNumbers,
			plurals );
		Globalize.locale( "en" );
		de = new Globalize( "de" );
		en = new Globalize( "en" );
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should validate value argument presence", function( assert ) {
	util.assertParameterPresence( assert, "value", function( ) {
		Globalize.formatRelativeTime( );
	});
});

QUnit.test( "should validate value argument is number", function( assert ) {
	util.assertNumberParameter( assert, "value", function( invalidValue ) {
		return function( ) {
			Globalize.formatRelativeTime( invalidValue, "day" );
		};
	});
});

QUnit.test( "should validate unit argument presence", function( assert ) {
	util.assertParameterPresence( assert, "unit", function( ) {
		Globalize.formatRelativeTime( 0 );
	});
});

QUnit.test( "should validate unit argument is string", function( assert ) {
	util.assertStringParameter( assert, "unit", function( invalidValue ) {
		return function( ) {
			Globalize.formatRelativeTime( 0, invalidValue );
		};
	});
});

QUnit.test( "should format long form in past", function( assert ) {
	assert.equal( en.formatRelativeTime( -2, "week" ), "2 weeks ago" );
});

QUnit.test( "should format long form in future", function ( assert ) {
	assert.equal( en.formatRelativeTime( 3, "year" ), "in 3 years" );
});

QUnit.test( "should format 0 offset with as special word", function( assert ) {
	assert.equal( en.formatRelativeTime( 0, "day" ), "today" );
});

QUnit.test( "should format 1 day of offset with special word", function( assert ) {
	assert.equal( en.formatRelativeTime( 1, "day" ), "tomorrow" );
});

QUnit.test( "should format using word if available", function( assert ) {
	assert.equal( de.formatRelativeTime( 2, "day" ), "übermorgen" );
});

});
