define([
	"cldr",
	"make-plural",
	"./core",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type",
	"./common/validate/parameter-type/number",
	"./common/validate/parameter-type/plain-object",
	"./common/validate/parameter-type/plural-type",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, MakePlural, Globalize, validateCldr, validateDefaultLocale,
	validateParameterPresence, validateParameterType, validateParameterTypeNumber,
	validateParameterTypePlainObject, validateParameterTypePluralType ) {

/**
 * .plural( value )
 *
 * @value [Number]
 *
 * Return the corresponding form (zero | one | two | few | many | other) of a
 * value given locale.
 */
Globalize.plural =
Globalize.prototype.plural = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeNumber( value, "value" );
	return this.pluralGenerator( options )( value );
};

/**
 * .pluralGenerator( [options] )
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
Globalize.prototype.pluralGenerator = function( options ) {
	var cldr, isOrdinal, plural, type;

	validateParameterTypePlainObject( options, "options" );

	options = options || {};
	type = options.type || "cardinal";
	cldr = this.cldr;

	validateParameterTypePluralType( options.type, "options.type" );

	validateDefaultLocale( cldr );

	isOrdinal = type === "ordinal";

	cldr.on( "get", validateCldr );
	cldr.supplemental([ "plurals-type-" + type, "{language}" ]);
	cldr.off( "get", validateCldr );

	MakePlural.rules = {};
	MakePlural.rules[ type ] = cldr.supplemental( "plurals-type-" + type );

	// FIXME
	if ( isOrdinal ) {
		delete MakePlural.rules.cardinal;
	}

	plural = new MakePlural( cldr.attributes.language, {
		"ordinals": isOrdinal,
		"cardinals": !isOrdinal
	});

	return function( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeNumber( value, "value" );

		return plural( value );
	};
};

return Globalize;

});
