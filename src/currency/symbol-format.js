define(function() {

/**
 * symbolFormat( parts, symbol )
 *
 * Return the appropriate symbol/account form format.
 */
return function( parts, symbol ) {
	parts.forEach(function( part ) {
		if ( part.type === "currency" ) {
			part.value = symbol;
		}
	});
	return parts;
};

});
