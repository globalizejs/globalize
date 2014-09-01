define([
	"./core",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type/number",
	"./common/validate/parameter-type/plain-object",
	"./common/validate/parameter-type/string",
	"./number/format",
	"./number/parse",
	"./number/pattern",
	"cldr/event"
], function( Globalize, validateCldr, validateDefaultLocale, validateParameterPresence,
	validateParameterTypeNumber, validateParameterTypePlainObject, validateParameterTypeString,
	numberFormat, numberParse, numberPattern ) {

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
	var cldr, pattern, ret;

	validateParameterPresence( value, "value" );
	validateParameterTypeNumber( value, "value" );
	validateParameterTypePlainObject( attributes, "attributes" );

	attributes = attributes || {};
	cldr = this.cldr;

	validateDefaultLocale( cldr );

	cldr.on( "get", validateCldr );

	if ( !attributes.pattern ) {
		pattern = numberPattern( attributes.style || "decimal", cldr );
	}

	ret = numberFormat( value, pattern, cldr, attributes );

	cldr.off( "get", validateCldr );

	return ret;
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
	var cldr, pattern, ret;

	validateParameterPresence( value, "value" );
	validateParameterTypeString( value, "value" );

	cldr = this.cldr;

	validateDefaultLocale( cldr );

	cldr.on( "get", validateCldr );

	// TODO: What about per mille? Which "style" does it belong to?
	pattern = numberPattern( value.indexOf( "%" ) !== -1 ? "percent" : "decimal", cldr );

	ret = numberParse( value, pattern, cldr );

	cldr.off( "get", validateCldr );

	return ret;
};

return Globalize;

});
