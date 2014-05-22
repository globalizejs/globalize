define(function() {

return function( array, callback ) {
	var i, length;
	if ( array.forEach ) {
		return array.forEach( callback );
	}
	for ( i = 0, length = array.length; i < length; i++ ) {
		callback( array[ i ], i, array );
	}
};

});
