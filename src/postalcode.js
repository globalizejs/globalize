define([
	"cldr",
	"./core",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type/string",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, Globalize, validateCldr, validateDefaultLocale,
	validateParameterPresence, validateParameterTypeString ) {

/**
 * .validatePostalCode( value )
 *
 * @value [String]
 *
 * TRUE if the value is matched with postalcode pattern given the locale.
 * FALSE if the value is not matched with postalcode pattern given the locale.
 *
 * Return the boolean.
 */
Globalize.validatePostalCode =
Globalize.prototype.validatePostalCode = function( value ) {
	validateParameterPresence( value, "value" );
    validateParameterTypeString( value, "value" );
	return this.postalCodeValidator()( value );
};

/**
 * .postalCodeValidator()
 *
 * Return a validatePostalCode function (of the form below).
 *
 * fn( value )
 *
 * @value [String]
 *
 *
 * TRUE if the value is matched with postalcode pattern given the locale.
 * FALSE if the value is not matched with postalcode pattern given the locale.
 *
 * Return the boolean.
 *
 */
Globalize.postalCodeValidator =
Globalize.prototype.postalCodeValidator = function() {
	var cldr, regex,
        beginning = "^",
        end = "$";

	cldr = this.cldr;

	validateDefaultLocale( cldr );

	cldr.on( "get", validateCldr );
    regex = new RegExp(beginning + cldr.supplemental("postalCodeData/{region}") + end);
	cldr.off( "get", validateCldr );

	return function( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeString( value, "value" );

		return regex.test(value);
	};
};

return Globalize;

});
