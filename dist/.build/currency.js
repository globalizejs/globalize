

function validateRequiredCldr( path, value ) {
	validateCldr( path, value, {
		skip: [ /supplemental\/currencyData\/fractions\/[A-Za-z]{3}$/ ]
	});
}

/**
 * .currencyFormatter( currency [, options] )
 *
 * @currency [String] 3-letter currency code as defined by ISO 4217.
 *
 * @options [Object]:
 * - style: [String] "symbol" (default), "accounting", "code" or "name".
 * - see also number/format options.
 *
 * Return a function that formats a currency according to the given options and default/instance
 * locale.
 */
Globalize.currencyFormatter =
Globalize.prototype.currencyFormatter = function( currency, options ) {
	var args, cldr, numberFormatter, pluralGenerator, properties, returnFn, style;

	validateParameterPresence( currency, "currency" );
	validateParameterTypeCurrency( currency, "currency" );

	validateParameterTypePlainObject( options, "options" );

	cldr = this.cldr;
	options = options || {};

	args = [ currency, options ];
	style = options.style || "symbol";

	validateDefaultLocale( cldr );

	// Get properties given style ("symbol" default, "code" or "name").
	cldr.on( "get", validateRequiredCldr );
	properties = ({
		accounting: currencySymbolProperties,
		code: currencyCodeProperties,
		name: currencyNameProperties,
		symbol: currencySymbolProperties
	}[ style ] )( currency, cldr, options );
	cldr.off( "get", validateRequiredCldr );

	// options = options minus style, plus raw pattern.
	options = objectOmit( options, "style" );
	options.raw = properties.pattern;

	// Return formatter when style is "symbol" or "accounting".
	if ( style === "symbol" || style === "accounting" ) {
		numberFormatter = this.numberFormatter( options );

		returnFn = currencyFormatterFn( numberFormatter );

		runtimeBind( args, cldr, returnFn, [ numberFormatter ] );

	// Return formatter when style is "code" or "name".
	} else {
		numberFormatter = this.numberFormatter( options );
		pluralGenerator = this.pluralGenerator();

		returnFn = currencyFormatterFn( numberFormatter, pluralGenerator, properties );

		runtimeBind( args, cldr, returnFn, [ numberFormatter, pluralGenerator, properties ] );
	}

	return returnFn;
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
Globalize.prototype.formatCurrency = function( value, currency, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeNumber( value, "value" );

	return this.currencyFormatter( currency, options )( value );
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

