define([
	"../common/validate/parameter-presence",
	"../common/validate/parameter-type/number",
	"./format"
], function( validateParameterPresence, validateParameterTypeNumber, relativeTimeFormat ) {

return function( numberFormatter, pluralGenerator, properties ) {
	return function relativeTimeFormatter( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeNumber( value, "value" );

		return relativeTimeFormat( value, numberFormatter, pluralGenerator, properties );
	};

};

});
