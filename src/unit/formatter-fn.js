define([
	"../common/validate/parameter-presence",
	"../common/validate/parameter-type/number",
	"./format"
], function( validateParameterPresence, validateParameterTypeNumber, unitFormat ) {

return function( numberFormatter, pluralGenerator, unitProperties ) {
	return function unitFormatter( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeNumber( value, "value" );

		return unitFormat( value, numberFormatter, pluralGenerator, unitProperties );
	};

};

});
