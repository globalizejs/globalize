

var validate = function( code, message, check, attributes ) {
	if ( !check ) {
		throw createError( code, message, attributes );
	}
};

