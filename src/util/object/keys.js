define(function() {

return function( object ) {
	var i,
		result = [];

	if ( Object.keys ) {
		return Object.keys( object );
	}

	for ( i in object ) {
		result.push( i );
	}

	return result;
};

});
