define([
	"../common/validate/parameter-presence",
	"../common/validate/parameter-type/number",
	"./name-format",
	"./symbol-format"
], function( validateParameterPresence, validateParameterTypeNumber, currencyNameFormat,
	currencySymbolFormat ) {

return function( numberToPartsFormatter, pluralGenerator, properties ) {
	var fn;

	// Return formatter when style is "name".
	if ( pluralGenerator && properties ) {
		fn = function currencyToPartsFormatter( value ) {
			validateParameterPresence( value, "value" );
			validateParameterTypeNumber( value, "value" );
			return currencyNameFormat(
				numberToPartsFormatter( value ),
				pluralGenerator( value ),
				properties
			);
		};

	// Return formatter when style is "symbol", "accounting", or "code".
	} else {
		fn = function currencyToPartsFormatter( value ) {

			// 1: Reusing pluralGenerator argument, but in this case it is actually `symbol`
			return currencySymbolFormat( numberToPartsFormatter( value ), pluralGenerator /* 1 */ );
		};
	}

	return fn;
};

});
