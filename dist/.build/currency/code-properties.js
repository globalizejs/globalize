

/**
 * codeProperties( currency, cldr )
 *
 * Return number pattern with the appropriate currency code in as literal.
 */
var currencyCodeProperties = function( currency, cldr ) {
	var pattern = numberPattern( "decimal", cldr );

	// The number of decimal places and the rounding for each currency is not locale-specific. Those
	// values overridden by Supplemental Currency Data.
	pattern = currencySupplementalOverride( currency, pattern, cldr );

	return {
		currency: currency,
		pattern: pattern,
		unitPatterns: currencyUnitPatterns( cldr )
	};
};

