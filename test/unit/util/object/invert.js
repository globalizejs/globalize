define([
	"src/util/object/invert",
], function( objectInvert ) {

QUnit.module( "Util object invert" );

QUnit.test( "it should invert an object", function( assert ) {
	assert.deepEqual(
		objectInvert({ a: "x", b: "y" }),
		{ x: "a", y: "b" }
	);
});

QUnit.test( "it should invert an object using a custom setter", function( assert ) {
	assert.deepEqual(
		objectInvert({ a: "x", b: "y" }, function( object, key, value ) {
			object[ value ] = "foo-" + key;
			return object;
		}),
		{ x: "foo-a", y: "foo-b" }
	);
});

});
