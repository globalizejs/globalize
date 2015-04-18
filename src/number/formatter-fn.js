define([
	"../common/validate/parameter-presence",
	"../common/validate/parameter-type/number",
	"./format"
], function( validateParameterPresence, validateParameterTypeNumber, numberFormat ) {

return function( properties ) {
	return function numberFormatter( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeNumber( value, "value" );

		return numberFormat( value, properties );
	};
};

});
