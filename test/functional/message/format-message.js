define([
	"globalize",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/plurals.json",
	"../../util",

	"globalize/message",
	"globalize/plural"
], function( Globalize, likelySubtags, plurals, util ) {

QUnit.module( ".formatMessage( path [, variables] )", {
	setup: function() {
		Globalize.load( likelySubtags );
		Globalize.load( plurals );
		Globalize.loadMessages({
			en: {
				greetings: {
					hello: "Hello, {name}"
				}
			}
		});
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should validate parameters", function( assert ) {
	util.assertParameterPresence( assert, "path", function() {
		Globalize( "en" ).formatMessage();
	});

	util.assertPathParameter( assert, "path", function( invalidValue ) {
		return function() {
			Globalize( "en" ).formatMessage( invalidValue );
		};
	});

	util.assertMessageVariablesType( assert, "variables", function( invalidValue ) {
		return function() {
			Globalize( "en" ).formatMessage( "greetings/hello", invalidValue );
		};
	});
});

QUnit.test( "should format a message", function( assert ) {
	assert.equal( Globalize( "en" ).formatMessage( "greetings/hello", {
		name: "Beethoven"
	}), "Hello, Beethoven" );
});

});
