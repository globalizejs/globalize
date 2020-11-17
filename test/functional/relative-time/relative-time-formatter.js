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

var en, de;

QUnit.module( ".relativeTimeFormatter( unit [, options] ) - no CLDR", {
	beforeEach: function() {
		Globalize.load( likelySubtags, {
			main: {
				en: {}
			}
		});
		Globalize.locale( "en" );
	},
	afterEach: util.resetCldrContent
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function( ) {
		Globalize.relativeTimeFormatter( "day" );
	});
});

QUnit.module( ".relativeTimeFormatter( unit [, options] )", {
	beforeEach: function() {
		Globalize.load( likelySubtags, enDateFields, deDateFields,
			numberingSystems, enNumbers, deNumbers,
			plurals );
		Globalize.locale( "en" );
		en = new Globalize( "en" );
		de = new Globalize( "de" );
	},
	afterEach: util.resetCldrContent
});

QUnit.test( "should validate unit argument presence", function( assert ) {
	util.assertParameterPresence( assert, "unit", function( ) {
		Globalize.formatRelativeTime( 0 );
	});
});

QUnit.test( "should validate unit argument is string", function( assert ) {
	util.assertStringParameter( assert, "unit", function( invalidValue ) {
		return function( ) {
			Globalize.relativeTimeFormatter( invalidValue );
		};
	});
});

QUnit.test( "should format long form", function( assert ) {
	assert.equal( en.relativeTimeFormatter( "week" )( -2 ), "2 weeks ago" );
});

QUnit.test( "should format using word if available", function( assert ) {
	assert.equal( de.relativeTimeFormatter( "day" )( 2 ), "übermorgen" );
});

});
