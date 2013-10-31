define(function() {

	return function( array, callback ) {
		var i, length;
		if ( array.every ) {
			return array.every( callback );
		}
		for ( i = 0, length = array.length; i < length; i++ ) {
			if ( !callback( array[ i ], i, array ) ) {
				return false;
			}
		}
		return true;
	};

});
