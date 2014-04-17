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

QUnit.module( ".formatPlural()", {
	setup: function() {
		Globalize.load( likelySubtags );
		Globalize.locale( "en" );
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should validate parameters", function( assert ) {
	util.assertParameterPresence( assert, "value", function() {
		Globalize.formatPlural();
	});

	util.assertNumberParameter( assert, "value", function( invalidValue ) {
		return function() {
			Globalize.formatPlural( invalidValue, { foo: "bar" } );
		};
	});

	util.assertParameterPresence( assert, "messageData", function() {
		Globalize.formatPlural( 1 );
	});

	util.assertPlainObjectParameter( assert, "messageData", function( invalidValue ) {
		return function() {
			Globalize.formatPlural( 1, invalidValue );
		};
	});

	util.assertPluralFormatValueParameter( assert, "formatValue", function( invalidValue ) {
		return function() {
			Globalize.formatPlural( 1, { foo: "bar" }, invalidValue );
		};
	});

	extraSetup();

	util.assertParameterMissingKey( assert, "messageData", "one", function() {
		Globalize.formatPlural( 1, { foo: "bar" } );
	});

});

QUnit.test( "should validate CLDR content", function( assert ) {
	util.assertCldrContent( assert, function() {
		Globalize.formatPlural( 1, { foo: "bar" } );
	});
});

QUnit.test( "should return the appropriate message based on plural form", function( assert ) {
	var message = {
		zero: "nothing",
		one: "one kitty ({0})",
		few: "some kitties ({0})",
		many: "lots of kitties ({0})",
		other: "{0} kitties"
	};

	extraSetup();

	assert.equal( Globalize.formatPlural( 0, message ), "0 kitties" );
	assert.equal( Globalize.formatPlural( 0, message, "no" ), "no kitties" );
	assert.equal( Globalize.formatPlural( 0, message, "" ), " kitties" );
	assert.equal( Globalize.formatPlural( 5, message ), "5 kitties" );
	assert.equal( Globalize( "ar" ).formatPlural( 0, message ), "nothing" );
});


});
