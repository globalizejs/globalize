define([
	"./core",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type/currency",
	"./common/validate/parameter-type/number",
	"./common/validate/parameter-type/plain-object",
	"./common/validate/plural-module-presence",
	"./currency/code-properties",
	"./currency/name-format",
	"./currency/name-properties",
	"./currency/symbol-properties",
	"./util/object/omit",

	"./number",
	"cldr/event",
	"cldr/supplemental"
], function( Globalize, validateCldr, validateDefaultLocale, validateParameterPresence,
	validateParameterTypeNumber, validateParameterTypeCurrency, validateParameterTypePlainObject,
	validatePluralModulePresence, currencyCodeProperties, currencyNameFormat,
	currencyNameProperties, currencySymbolProperties, objectOmit ) {

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
	var cldr, numberFormatter, plural, properties, style;

	validateParameterPresence( currency, "currency" );
	validateParameterTypeCurrency( currency, "currency" );

	validateParameterTypePlainObject( options, "options" );

	options = options || {};
	style = options.style || "symbol";
	cldr = this.cldr;

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

	// options = options minus style, plus pattern.
	options = objectOmit( options, "style" );
	options.pattern = properties.pattern;

	// Return formatter when style is "symbol" or "accounting".
	if ( style === "symbol" || style === "accounting" ) {
		return this.numberFormatter( options );
	}

	// Return formatter when style is "code" or "name".
	validatePluralModulePresence();
	numberFormatter = this.numberFormatter( options );
	plural = this.pluralGenerator();
	return function( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeNumber( value, "value" );
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

});
