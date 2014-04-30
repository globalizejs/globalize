define([
	"./common/get-cldr",
	"./core",
	"./number/format",
	"./number/pattern"
], function( commonGetCldr, Globalize, numberFormat, numberPattern ) {

/**
 * Globalize.formatNumber( value, pattern, locale )
 *
 * @value [Number]
 *
 * @attributes [Object]:
 * - style: [String] "decimal" (default) or "percent".
 * - see also number/format options.
 *
 * @locale [String]
 *
 * Format a number according to the given attributes and the given locale (or the default locale if not specified).
 */
Globalize.formatNumber = function( value, attributes, locale ) {
	var pattern;

	if ( typeof value !== "number" ) {
		throw new Error( "Value is not a number" );
	}

	attributes = attributes || {};
	locale = commonGetCldr( locale );

	if ( !attributes.pattern ) {
		pattern = numberPattern( attributes.style || "decimal", locale );
	}

	return numberFormat( value, pattern, locale, attributes );
};

/**
 * Globalize.parseNumber( value, patterns, locale )
 *
 * @value [String]
 *
 * @patterns [TBD]
 *
 * @locale [String]
 *
 * Return a Number or null.
 */
Globalize.parseNumber = function( /*value, patterns, locale*/ ) {
	return null;
};

return Globalize;

});
