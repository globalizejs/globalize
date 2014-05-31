define([
	"globalize",
	"../util"
], function( Globalize, util ) {

QUnit.module( "Globalize.locale()" );

QUnit.test( "should validate parameters", function( assert ) {
	util.assertLocaleOrNullParameter( assert, "locale", function( invalidValue ) {
		return function() {
			Globalize.locale( invalidValue );
		};
	});
});

});
