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
 * Returns true if the value matches the postalcode pattern for the given locale,
 * otherwise returns false
 *
 * Return the boolean.
 */
Globalize.validatePostalCode =
Globalize.prototype.validatePostalCode = function( value, flag ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeString( value, "value" );
	return this.postalCodeValidator()( value, flag );
};

Globalize.postalCodeValidator =
/**
 * .postalCodeValidator()
 *
 * Return a validatePostalCode function (of the form below).
 *
 * fn( value )
 *
 * @value [String]
 *
 * Returns true if the value matches the postalcode pattern for the given locale,
 * otherwise returns false
 *
 * Return the boolean.
 *
 */
	Globalize.prototype.postalCodeValidator = function() {
		var cldr, regex, pattern;

	cldr = this.cldr;

	validateDefaultLocale( cldr );

	cldr.once( "get", validateCldr );
	pattern = "^" + cldr.supplemental("postalCodeData/{region}") + "$";
	regex = new RegExp(pattern);

	return function( value, flag ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeString( value, "value" );

		if ( flag && typeof flag === "string" ){
			regex = new RegExp( pattern, flag );
		}

		return regex.test( value );
	};
};

return Globalize;

});
