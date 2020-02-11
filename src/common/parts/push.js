define(function() {

/**
 * Pushes part to parts array, concat two consecutive parts of the same type.
 */
return function( parts, type, value ) {

		// Concat two consecutive parts of same type
		if ( parts.length && parts[ parts.length - 1 ].type === type ) {
			parts[ parts.length - 1 ].value += value;
			return;
		}

		parts.push( { type: type, value: value } );
};

});
