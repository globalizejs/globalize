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
Globalize.prototype.validatePostalCode = function( value, region ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeString( value, "value" );
	return this.postalCodeValidator( region )( value );
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
 * Returns true if the value matches the postalcode pattern for the given locale,
 * otherwise returns false
 *
 * Return the boolean.
 *
 */
Globalize.postalCodeValidator =
Globalize.prototype.postalCodeValidator = function( region ) {
	var cldr, pattern, regex;

	cldr = this.cldr;
	region = region || cldr.attributes.region;

	validateParameterPresence( region, "region" );
	validateParameterTypeString( region, "region" );

	validateDefaultLocale( cldr );

	cldr.once( "get", validateCldr );
	pattern = "^" + cldr.supplemental([ "postalCodeData", region ]) + "$";
	regex = new RegExp( pattern );

	return function( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeString( value, "value" );

		return regex.test( value );
	};
};

return Globalize;

});
