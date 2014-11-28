define([
	"./unit-patterns",
	"../number/pattern"
], function( currencyUnitPatterns, numberPattern ) {

/**
 * codeProperties( currency, cldr )
 *
 * Return number pattern with the appropriate currency code in as literal.
 */
return function( currency, cldr ) {
	return {
		currency: currency,
		pattern: numberPattern( "decimal", cldr ),
		unitPatterns: currencyUnitPatterns( cldr )
	};
};

});
