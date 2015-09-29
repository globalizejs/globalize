define([
	"../common/validate/parameter-presence",
	"../common/validate/parameter-type/number",
	"./format"
], function( validateParameterPresence, validateParameterTypeNumber, unitFormat ) {

return function( unitProperties, pluralGenerator ) {
	return function unitFormatter( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeNumber( value, "value" );

		return unitFormat( value, unitProperties, pluralGenerator );
	};

};

});
