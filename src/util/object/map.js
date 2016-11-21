define(function() {

/**
 * objectMap( object, fn)
 *
 * - object
 *
 * - fn( pair ) => pair
 */
return function( object, fn ) {
	return Object.keys( object ).map(function( key ) {
		return fn([ key, object[ key ] ]);
	}).reduce(function( object, pair ) {
		object[ pair[ 0 ] ] = pair[ 1 ];
		return object;
	}, {});
};

});
