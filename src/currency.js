define([
	"./core",
	"./common/create-error/plural-module-presence",
	"./common/runtime-bind",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type/currency",
	"./common/validate/parameter-type/number",
	"./common/validate/parameter-type/plain-object",
	"./currency/formatter-fn",
	"./currency/name-properties",
	"./currency/symbol-properties",
	"./currency/to-parts-formatter-fn",
	"./util/object/omit",
	"./number",

	"cldr/event",
	"cldr/supplemental"

], function( Globalize, createErrorPluralModulePresence, runtimeBind, validateCldr,
	validateDefaultLocale, validateParameterPresence, validateParameterTypeCurrency,
	validateParameterTypeNumber, validateParameterTypePlainObject, currencyFormatterFn,
	currencyNameProperties, currencySymbolProperties, currencyToPartsFormatterFn, objectOmit ) {

function validateRequiredCldr( path, value ) {
	validateCldr( path, value, {
		skip: [
			/numbers\/currencies\/[^/]+\/symbol-alt-/,
			/supplemental\/currencyData\/fractions\/[A-Za-z]{3}$/
		]
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
	var args, currencyToPartsFormatter, returnFn;

	validateParameterPresence( currency, "currency" );
	validateParameterTypeCurrency( currency, "currency" );

	validateParameterTypePlainObject( options, "options" );

	options = options || {};
	args = [ currency, options ];

	currencyToPartsFormatter = this.currencyToPartsFormatter( currency, options );
	returnFn = currencyFormatterFn( currencyToPartsFormatter );
	runtimeBind( args, this.cldr, returnFn, [ currencyToPartsFormatter ] );

	return returnFn;
};

/**
 * .currencyToPartsFormatter( currency [, options] )
 *
 * @currency [String] 3-letter currency code as defined by ISO 4217.
 *
 * @options [Object]:
 * - style: [String] "symbol" (default), "accounting", "code" or "name".
 * - see also number/format options.
 *
 * Return a currency formatter function (of the form below) according to the given options and the
 * default/instance locale.
 *
 * fn( value )
 *
 * @value [Number]
 *
 * Return a function that formats a currency to parts according to the given options
 * and the default/instance locale.
 */
Globalize.currencyToPartsFormatter =
Globalize.prototype.currencyToPartsFormatter = function( currency, options ) {
	var args, cldr, numberToPartsFormatter, pluralGenerator, properties, returnFn, style;

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
	try {
		properties = ({
			accounting: currencySymbolProperties,
			code: currencySymbolProperties,
			name: currencyNameProperties,
			symbol: currencySymbolProperties
		}[ style ] )( currency, cldr, options );
	} finally {
		cldr.off( "get", validateRequiredCldr );
	}

	// options = options minus style, plus raw pattern.
	options = objectOmit( options, "style" );
	options.raw = properties.pattern;

	// Return formatter when style is "symbol", "accounting", or "code".
	if ( style === "symbol" || style === "accounting" || style === "code" ) {
		numberToPartsFormatter = this.numberToPartsFormatter( options );

		returnFn = currencyToPartsFormatterFn( numberToPartsFormatter, properties.symbol );

		runtimeBind( args, cldr, returnFn, [ numberToPartsFormatter, properties.symbol ] );

	// Return formatter when style is "name".
	} else {
		numberToPartsFormatter = this.numberToPartsFormatter( options );

		// Is plural module present? Yes, use its generator. Nope, use an error generator.
		pluralGenerator = this.plural !== undefined ?
			this.pluralGenerator() :
			createErrorPluralModulePresence;

		returnFn = currencyToPartsFormatterFn(
			numberToPartsFormatter,
			pluralGenerator,
			properties
		);

		runtimeBind( args, cldr, returnFn, [
			numberToPartsFormatter,
			pluralGenerator,
			properties
		]);
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
 * .formatCurrencyToParts( value, currency [, options] )
 *
 * @value [Number] number to be formatted.
 *
 * @currency [String] 3-letter currency code as defined by ISO 4217.
 *
 * @options [Object] see currencyFormatter.
 *
 * Format a currency to parts according to the given options and the default/instance locale.
 */
Globalize.formatCurrencyToParts =
Globalize.prototype.formatCurrencyToParts = function( value, currency, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeNumber( value, "value" );
	return this.currencyToPartsFormatter( currency, options )( value );
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
