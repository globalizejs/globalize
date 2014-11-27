define([
	"./core",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type/currency",
	"./common/validate/parameter-type/plain-object",
	"./currency/code-pattern",
	"./currency/name-format",
	"./currency/name-pattern",
	"./currency/symbol-pattern",
	"./util/object/omit",
	"./number",
	"cldr/event"
], function( Globalize, validateCldr, validateDefaultLocale, validateParameterPresence,
	validateParameterTypeCurrency, validateParameterTypePlainObject, currencyCodePattern,
	currencyNameFormat, currencyNamePattern, currencySymbolPattern, objectOmit ) {

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
	var cldr, numberFormatter, pattern, patternFn;

	validateParameterPresence( currency, "currency" );
	validateParameterTypeCurrency( currency, "currency" );

	validateParameterTypePlainObject( options, "options" );

	options = options || {};
	cldr = this.cldr;

	validateDefaultLocale( cldr );

	cldr.on( "get", validateCldr );

	// Get pattern given style "symbol" (default), "code" or "name".
	patternFn = { code: currencyCodePattern, name: currencyNamePattern };
	pattern = ( patternFn[ options.style ] || currencySymbolPattern )( currency, cldr );

	cldr.off( "get", validateCldr );

	// Return formatter when style is "symbol" or "code".
	if ( typeof pattern === "string" ) {

		// options = options minus style, plus pattern.
		options = objectOmit( options, "style" );
		options.pattern = pattern;
		return this.numberFormatter( options );
	}

	// Return formatter when style is "name".
	numberFormatter = this.numberFormatter( pattern.pattern );
	// FIXME validate plural presence or throw "load plural module" error.
	//plural = this.plural(); // FIXME generator
	return function( value ) {
		return currencyNameFormat( numberFormatter( value ), /* plural( value ), */ pattern );
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
