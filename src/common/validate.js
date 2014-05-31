define([
	"./create-error"
], function( createError ) {

return function( code, message, check, attributes ) {
	if ( !check ) {
		throw createError( code, message, attributes );
	}
};

});
