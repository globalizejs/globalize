define([
	"./core",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type/currency",
	"./common/validate/parameter-type/plain-object",
	"./common/validate/plural-module-presence",
	"./currency/code-properties",
	"./currency/name-format",
	"./currency/name-properties",
	"./currency/symbol-pattern",
	"./util/object/omit",
	"./number",
	"cldr/event"
], function( Globalize, validateCldr, validateDefaultLocale, validateParameterPresence,
	validateParameterTypeCurrency, validateParameterTypePlainObject, validatePluralModulePresence,
	currencyCodeProperties, currencyNameFormat, currencyNameProperties, currencySymbolPattern,
	objectOmit ) {

/**
 * .currencyFormatter( currency [, options] )
 *
 * @currency [String] 3-letter currency code as defined by ISO 4217.
 *
 * @options [Object]:
 * - style: [String] "symbol" (default), "code" or "name".
 * - see also number/format options.
 *
 * Return a function that formats a currency according to the given options and default/instance
 * locale.
 */
Globalize.currencyFormatter =
Globalize.prototype.currencyFormatter = function( currency, options ) {
	var cldr, fn, numberFormatter, plural, properties;

	validateParameterPresence( currency, "currency" );
	validateParameterTypeCurrency( currency, "currency" );

	validateParameterTypePlainObject( options, "options" );

	options = options || {};
	cldr = this.cldr;

	validateDefaultLocale( cldr );

	cldr.on( "get", validateCldr );

	// Get properties given style ("symbol" default, "code" or "name").
	fn = { code: currencyCodeProperties, name: currencyNameProperties };
	properties = ( fn[ options.style ] || currencySymbolPattern )( currency, cldr );

	cldr.off( "get", validateCldr );

	// Return formatter when style is "symbol".
	if ( typeof properties === "string" ) {

		// options = options minus style, plus pattern.
		options = objectOmit( options, "style" );
		options.pattern = properties;
		return this.numberFormatter( options );
	}

	// Return formatter when style is "code" or "name".
	validatePluralModulePresence();
	numberFormatter = this.numberFormatter({ pattern: properties.pattern });
	plural = this.pluralGenerator();
	return function( value ) {
		return currencyNameFormat( numberFormatter( value ), plural( value ), properties );
	};
};

/**
 * .currencyParser( currency [, options] )
 *
 * @currency [String] 3-letter currency code as defined by ISO 4217.
 *
 * @options [Object] see currencyFormatter.
 *
 * Return the currency parser according to the given options and the default/instance locale.
 */
Globalize.currencyParser =
Globalize.prototype.currencyParser = function( /* currency, options */ ) {

	// TODO implement parser.

};

/**
 * .formatCurrency( value, currency [, options] )
 *
 * @value [Number] number to be formatted.
 *
 * @currency [String] 3-letter currency code as defined by ISO 4217.
 *
 * @options [Object] see currencyFormatter.
 *
 * Format a currency according to the given options and the default/instance locale.
 */
Globalize.formatCurrency =
Globalize.prototype.formatCurrency = function( /* value, currency, options */ ) {
};

/**
 * .parseCurrency( value, currency [, options] )
 *
 * @value [String]
 *
 * @currency [String] 3-letter currency code as defined by ISO 4217.
 *
 * @options [Object]: See currencyFormatter.
 *
 * Return the parsed currency or NaN when value is invalid.
 */
Globalize.parseCurrency =
Globalize.prototype.parseCurrency = function( /* value, currency, options */ ) {
};

return Globalize;

});
