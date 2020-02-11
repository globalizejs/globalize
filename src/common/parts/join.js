define(function() {

/**
 * Returns joined parts values.
 */
return function( parts ) {
	return parts.map( function( part ) {
		return part.value;
	}).join( "" );
};

});
