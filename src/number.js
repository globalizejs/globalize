define([
	"./core",
	"./number/format",
	"./number/parse",
	"./number/pattern"
], function( Globalize, numberFormat, numberParse, numberPattern ) {

/**
 * .formatNumber( value, pattern )
 *
 * @value [Number]
 *
 * @attributes [Object]:
 * - style: [String] "decimal" (default) or "percent".
 * - see also number/format options.
 *
 * Format a number according to the given attributes and default/instance locale.
 */
Globalize.formatNumber =
Globalize.prototype.formatNumber = function( value, attributes ) {
	var cldr, pattern;

	if ( typeof value !== "number" ) {
		throw new Error( "Value is not a number" );
	}

	attributes = attributes || {};
	cldr = this.cldr;

	if ( !attributes.pattern ) {
		pattern = numberPattern( attributes.style || "decimal", cldr );
	}

	return numberFormat( value, pattern, cldr, attributes );
};

/**
 * .parseNumber( value )
 *
 * @value [String]
 *
 * Return the parsed Number (including Infinity) or NaN when value is invalid.
 */
Globalize.parseNumber =
Globalize.prototype.parseNumber = function( value ) {
	var cldr, pattern;

	if ( typeof value !== "string" ) {
		throw new Error( "Value is not a string" );
	}

	cldr = this.cldr;

	// TODO: What about per mille? Which "style" does it belong to?
	pattern = numberPattern( value.indexOf( "%" ) !== -1 ? "percent" : "decimal", cldr );

	return numberParse( value, pattern, cldr );
};

return Globalize;

});
