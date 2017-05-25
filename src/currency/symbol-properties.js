define([
	"./supplemental-override",
	"../number/numbering-system",
	"../util/regexp/not-s",
	"../util/regexp/letter"
], function( currencySupplementalOverride, numberNumberingSystem, regexpNotS, regexpLetter ) {

/**
 * The default currencySpacing used when CLDR data does not have currencySpacing.
 */
var defaultCurrencySpacing = {
	currencyMatch: "[:letter:]",
	surroundingMatch: "[:digit:]",
	insertBetween: " "
};

/**
 * symbolProperties( currency, cldr )
 *
 * Return pattern replacing `¤` with the appropriate currency symbol literal.
 */
return function( currency, cldr, options ) {
	var currencySpacing, pattern,
		regexp = {
			"[:digit:]": /\d/,
			"[:^S:]": regexpNotS,
			"[:letter:]": regexpLetter
		},
		symbol = cldr.main([
			"numbers/currencies",
			currency,
			"symbol"
		]);

	currencySpacing = [ "beforeCurrency", "afterCurrency" ].map(function( position ) {
		return cldr.main([
			"numbers",
			"currencyFormats-numberSystem-" + numberNumberingSystem( cldr ),
			"currencySpacing",
			position
		]);
	});

	// Overwrite everything with the defaults unless
	// both beforeCurrency and afterCurrency were found in CLDR.
	// This is consistent with ICU4J and ICU.
	if ( !currencySpacing[0] || !currencySpacing[1] ) {
		currencySpacing = [
			defaultCurrencySpacing,
			defaultCurrencySpacing
		];
	}

	pattern = cldr.main([
		"numbers",
		"currencyFormats-numberSystem-" + numberNumberingSystem( cldr ),
		options.style === "accounting" ? "accounting" : "standard"
	]);

	if ( pattern === undefined ) {

		// Fall back to standard format
		pattern = cldr.main([
			"numbers",
			"currencyFormats-numberSystem-" + numberNumberingSystem( cldr ),
			"standard"
		]);

		// Alternatively, fall back to latin, like ICU4J
		/* pattern = cldr.main([
			"numbers",
			"currencyFormats-numberSystem-latn",
			options.style === "accounting" ? "accounting" : "standard"
		]); */
	}

	pattern =

		// The number of decimal places and the rounding for each currency is not locale-specific.
		// Those values are overridden by Supplemental Currency Data.
		currencySupplementalOverride( currency, pattern, cldr )

		// Replace "¤" (\u00A4) with the appropriate symbol literal.
		.split( ";" ).map(function( pattern ) {

			return pattern.split( "\u00A4" ).map(function( part, i ) {
				var currencyMatch = regexp[ currencySpacing[ i ].currencyMatch ],
					surroundingMatch = regexp[ currencySpacing[ i ].surroundingMatch ],
					insertBetween = "";

				// For currencyMatch and surroundingMatch definitions, read [1].
				// When i === 0, beforeCurrency is being handled. Otherwise, afterCurrency.
				// 1: http://www.unicode.org/reports/tr35/tr35-numbers.html#Currencies
				currencyMatch = currencyMatch.test( symbol.charAt( i ? symbol.length - 1 : 0 ) );
				surroundingMatch = surroundingMatch.test(
					part.charAt( i ? 0 : part.length - 1 ).replace( /[#@,.]/g, "0" )
				);

				if ( currencyMatch && part && surroundingMatch ) {
					insertBetween = currencySpacing[ i ].insertBetween;
				}

				return ( i ? insertBetween : "" ) + part + ( i ? "" : insertBetween );
			}).join( "'" + symbol + "'" );
		}).join( ";" );

	return {
		pattern: pattern
	};
};

});
