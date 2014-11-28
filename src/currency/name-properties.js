define([
	"./unit-patterns",
	"../number/pattern",
	"../util/object/filter"
], function( currencyUnitPatterns, numberPattern, objectFilter ) {

/**
 * nameProperties( currency, cldr )
 *
 * Return number pattern with the appropriate currency code in as literal.
 */
return function( currency, cldr ) {
	return {
		currency: currency,
		displayNames: objectFilter( cldr.main([
			"numbers/currencies",
			currency
		]), /^displayName/ ),
		pattern: numberPattern( "decimal", cldr ),
		unitPatterns: currencyUnitPatterns( cldr )
	};
};

});
