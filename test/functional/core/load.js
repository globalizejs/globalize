define([
	"globalize",
	"../util"
], function( Globalize, util ) {

QUnit.module( "Globalize.load()" );

QUnit.test( "should validate parameters", function( assert ) {
	util.assertParameterPresence( assert, "json", function() {
		Globalize.load();
	});

	util.assertPlainObjectParameter( assert, "json", function( invalidValue ) {
		return function() {
			Globalize.load( invalidValue );
		};
	});
});

});
