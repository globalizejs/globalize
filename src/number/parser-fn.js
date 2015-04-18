define([
	"../common/validate/parameter-presence",
	"../common/validate/parameter-type/string",
	"./parse"
], function( validateParameterPresence, validateParameterTypeString, numberParse ) {

return function( properties ) {
	return function numberParser( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeString( value, "value" );

		return numberParse( value, properties );
	};

};

});
