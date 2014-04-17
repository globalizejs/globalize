define([
	"globalize",
	"json!fixtures/cldr/supplemental/likelySubtags.json",
	"json!fixtures/cldr/supplemental/plurals.json",
	"../../util",
	"globalize/plural"
], function( Globalize, likelySubtags, plurals, util ) {

function extraSetup() {
	Globalize.load( plurals );
}

QUnit.module( ".plural()", {
	setup: function() {
		Globalize.load( likelySubtags );
		Globalize.locale( "en" );
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should validate parameters", function( assert ) {
	util.assertParameterPresence( assert, "value", function() {
		Globalize.plural();
	});

	util.assertNumberParameter( assert, "value", function( invalidValue ) {
		return function() {
			Globalize.plural( invalidValue );
		};
	});
});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.plural( 1 );
	});

	// Assert E_INVALID_CLDR "Missing rules to deduce plural form of `1`".
	Globalize.load({
		supplemental: {
			"plurals-type-cardinal": { en: {} }
		}
	});

	assert.throws(function() {
		Globalize.plural( 1 );
	}, function E_INVALID_CLDR( error ) {
		return error.code === "E_INVALID_CLDR" &&
			"description" in error &&
			error.description === "Missing rules to deduce plural form of `1`";
	}, "Expected \"E_MISSING_CLDR\" to be thrown" );
});

QUnit.test( "should return plural form", function( assert ) {
	extraSetup();
	assert.equal( Globalize.plural( 0 ), "other" );
	assert.equal( Globalize( "ar" ).plural( 0 ), "zero" );
});


});
