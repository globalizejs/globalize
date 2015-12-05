define([
	"../common/validate/parameter-presence",
	"../common/validate/parameter-type/string",
	"../common/validate/parameter-type/plain-object",
	"./shape"
], function( validateParameterPresence, validateParameterTypeString,
		validateParameterTypePlainObject, numberShape ) {

return function( properties ) {
	return function numberShaper( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeString( value, "value" );

		return numberShape( value, properties );
	};

};

});
