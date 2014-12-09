define([
	"./format-message",
	"../util/object/extend"
], function( formatMessage, objectExtend ) {

return function( code, message, attributes ) {
	var error;

	message = code + ( message ? ": " + formatMessage( message, attributes ) : "" );
	error = new Error( message );
	error.code = code;

	objectExtend( error, attributes );

	return error;
};

});
