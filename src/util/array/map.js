define(function() {

return function( array, callback ) {
	var clone, i, length;
	if ( array.map ) {
		return array.map( callback );
	}
	for ( clone = [], i = 0, length = array.length; i < length; i++ ) {
		clone[ i ] = callback( array[ i ], i, array );
	}
	return clone;
};

});
