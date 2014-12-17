define([
	"cldr",
	"make-plural",
	"./core",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type",
	"./common/validate/parameter-type/number",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, MakePlural, Globalize, validateCldr, validateDefaultLocale,
	validateParameterPresence, validateParameterType, validateParameterTypeNumber ) {

/**
 * .plural( value )
 *
 * @value [Number]
 *
 * Return the corresponding form (zero | one | two | few | many | other) of a
 * value given locale.
 */
Globalize.plural =
Globalize.prototype.plural = function( value ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeNumber( value, "value" );
	return this.pluralGenerator()( value );
};

/**
 * .pluralGenerator()
 *
 * Return a plural function (of the form below).
 *
 * fn( value )
 *
 * @value [Number]
 *
 * Return the corresponding form (zero | one | two | few | many | other) of a value given the
 * default/instance locale.
 */
Globalize.pluralGenerator =
Globalize.prototype.pluralGenerator = function() {
	var cldr, plural;

	cldr = this.cldr;

	validateDefaultLocale( cldr );

	cldr.on( "get", validateCldr );
	cldr.supplemental( "plurals-type-cardinal/{language}" );
	cldr.off( "get", validateCldr );

	// Set CLDR data
	MakePlural.rules = {
		cardinal: cldr.supplemental( "plurals-type-cardinal" )
	};

	plural = MakePlural( cldr.attributes.language, { "no_tests": true } );

	return function( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeNumber( value, "value" );

		return plural( value );
	};
};

return Globalize;

});
