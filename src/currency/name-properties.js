define([
	"./supplemental-override",
	"./unit-patterns",
	"../util/object/filter",
	"../number/pattern"
], function( currencySupplementalOverride, currencyUnitPatterns, objectFilter, numberPattern ) {

/**
 * nameProperties( currency, cldr )
 *
 * Return number pattern with the appropriate currency code in as literal.
 */
return function( currency, cldr ) {
	var pattern = numberPattern( "decimal", cldr );

	// The number of decimal places and the rounding for each currency is not locale-specific. Those
	// values overridden by Supplemental Currency Data.
	pattern = currencySupplementalOverride( currency, pattern, cldr );

	return {
		displayNames: objectFilter( cldr.main([
			"numbers/currencies",
			currency
		]), /^displayName/ ),
		pattern: pattern,
		unitPatterns: currencyUnitPatterns( cldr )
	};
};

});
