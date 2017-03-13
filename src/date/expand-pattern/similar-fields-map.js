define([
	"../../util/object/invert"
], function( objectInvert ) {

// Invert key and values, e.g., {"e": "eEc"} ==> {"e": "e", "E": "e", "c": "e"}.
return objectInvert({
	"e": "eEc",
	"L": "ML"
}, function( object, key, value ) {
	value.split( "" ).forEach(function( field ) {
		object[ field ] = key;
	});
	return object;
});

});
