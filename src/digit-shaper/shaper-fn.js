define([
	"../common/validate/parameter-presence",
	"../common/validate/parameter-type/string",
	"../common/validate/parameter-type/plain-object",
	"./shape"
], function( validateParameterPresence, validateParameterTypeString,
		validateParameterTypePlainObject, digitShaperShape ) {

return function( properties ) {
	return function digitShaper( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeString( value, "value" );

		return digitShaperShape( value, properties );
	};

};

});
