define(function() {

/**
 * Returns a new object created by using `object`'s values as keys, and the keys as values.
 */
return function( object, fn ) {
	fn = fn || function( object, key, value ) {
		object[ value ] = key;
		return object;
	};
	return Object.keys( object ).reduce(function( newObject, key ) {
		return fn( newObject, key, object[ key ] );
	}, {});
};

});
