define([
	"src/common/runtime-bind",
], function( runtimeBind ) {

QUnit.module( "Common (runtimeBind)" );

QUnit.test( "runtimeBind should work with anonymous function", function( assert ) {
	var fn = function() { return "passed"; };
	assert.equal( runtimeBind({}, {}, fn, {})(), "passed" );
});

});
