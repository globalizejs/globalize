define([
	"../common/validate/parameter-presence",
	"../common/validate/parameter-type/date",
	"./format"
], function( validateParameterPresence, validateParameterTypeDate, dateFormat ) {

return function( numberFormatters, properties ) {
	return function dateFormatter( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeDate( value, "value" );

		return dateFormat( value, numberFormatters, properties );
	};

};

});
