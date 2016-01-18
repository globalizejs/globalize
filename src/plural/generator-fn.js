define([
	"../common/validate/parameter-presence",
	"../common/validate/parameter-type/number"
], function( validateParameterPresence, validateParameterTypeNumber ) {

return function( plural ) {
	return function pluralGenerator( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeNumber( value, "value" );

		return plural( value );
	};
};

});
