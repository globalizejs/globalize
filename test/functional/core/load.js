define([
	"globalize",
	"../../util"
], function( Globalize, util ) {

QUnit.module( "Globalize.load( cldrJSONData )" );

QUnit.test( "should validate parameters", function( assert ) {
	util.assertParameterPresence( assert, "json", function() {
		Globalize.load();
	});

	util.assertCldrJsonDataParameter( assert, "json", function( invalidValue ) {
		return function() {
			Globalize.load( invalidValue );
		};
	});
});

});
