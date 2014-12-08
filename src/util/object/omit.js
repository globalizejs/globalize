define([
	"../always-array"
], function( alwaysArray ) {

/**
 * objectOmit( object, keys )
 *
 * Return a copy of the object, filtered to omit the blacklisted key or array of keys.
 */
return function( object, keys ) {
	var key,
		copy = {};

	keys = alwaysArray( keys );

	for ( key in object ) {
		if ( keys.indexOf( key ) === -1 ) {
			copy[ key ] = object[ key ];
		}
	}

	return copy;
};

});
