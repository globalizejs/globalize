define([
	"../common/regexp-not-s",
	"../number/numbering-system"
], function( regexpNotS, numberNumberingSystem ) {

/**
 * symbolPattern( currency, cldr )
 *
 * Return pattern replacing `¤` with the appropriate currency symbol literal.
 */
return function( currency, cldr ) {
	var currencySpacing, pattern,
		regexp = {
			"[:digit:]": /\d/,
			"[:^S:]": regexpNotS
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

	// TODO: Allow other `u-cu`s [1].
	pattern = cldr.main([
		"numbers",
		"currencyFormats-numberSystem-" + numberNumberingSystem( cldr ),
		"standard" /* 1 */
	]);

	return pattern.split( ";" ).map(function( pattern ) {

		// "\u00A4" = "¤"
		return pattern.split( "\u00A4" ).map(function( part, i ) {
			var currencyMatch = regexp[ currencySpacing[ i ].currencyMatch ],
				surroundingMatch = regexp[ currencySpacing[ i ].surroundingMatch ],
				insertBetween = "";

			if ( currencyMatch.test( symbol.charAt( i ? symbol.length - 1 : 0 ) ) && part &&
						surroundingMatch.test(
							part.charAt( i ? 0 : part.length - 1 ).replace( /[#@,.]/g, "0" )
						) ) {
				insertBetween = currencySpacing[ i ].insertBetween;
			}

			return ( i ? insertBetween : "" ) + part + ( i ? "" : insertBetween );
		}).join( "'" + symbol + "'" );
	}).join( ";" );
};

});
