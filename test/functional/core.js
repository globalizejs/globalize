define([
	"globalize",
	"../util"
], function( Globalize, util ) {

QUnit.module( "Globalize class constructor" );

QUnit.test( "should validate parameters", function( assert ) {
	util.assertParameterPresence( assert, "locale", function() {
		new Globalize();
	});

	util.assertParameterPresence( assert, "locale", function() {
		Globalize();
	});

	util.assertLocaleParameter( assert, "locale", function( invalidValue ) {
		return function() {
			new Globalize( invalidValue );
		};
	});

	util.assertLocaleParameter( assert, "locale", function( invalidValue ) {
		return function() {
			Globalize( invalidValue );
		};
	});
});

});
