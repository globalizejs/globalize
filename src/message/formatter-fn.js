define([
	"../common/validate/parameter-type/message-variables"
], function( validateParameterTypeMessageVariables ) {

return function( formatter ) {
	return function messageFormatter( variables ) {
		if ( typeof variables === "number" || typeof variables === "string" ) {
			variables = [].slice.call( arguments, 0 );
		}
		validateParameterTypeMessageVariables( variables, "variables" );
		return formatter( variables );
	};
};

});
