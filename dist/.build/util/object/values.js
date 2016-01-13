

var objectValues = function( object ) {
	var i,
		result = [];

	for ( i in object ) {
		result.push( object[ i ] );
	}

	return result;
};

