define([
	"cldr",
	"make-plural",
	"./common/runtime-bind",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type",
	"./common/validate/parameter-type/number",
	"./common/validate/parameter-type/plain-object",
	"./common/validate/parameter-type/plural-type",
	"./core",
	"./plural/generator-fn",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, MakePlural, runtimeBind, validateCldr, validateDefaultLocale,
	validateParameterPresence, validateParameterType, validateParameterTypeNumber,
	validateParameterTypePlainObject, validateParameterTypePluralType, Globalize,
	pluralGeneratorFn ) {

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
	var args, cldr, isOrdinal, isCardinal, plural, returnFn, type;

	validateParameterTypePlainObject( options, "options" );

	options = options || {};
	cldr = this.cldr;

	args = [ options ];
	type = options.type || "cardinal";

	validateParameterTypePluralType( options.type, "options.type" );

	validateDefaultLocale( cldr );

	isOrdinal = type === "ordinal" || type === "both";
	isCardinal = type === "cardinal" || type === "both";

	cldr.on( "get", validateCldr );
	if ( isOrdinal ) {
		cldr.supplemental([ "plurals-type-ordinal", "{language}" ]);
	}
	if ( isCardinal ) {
		cldr.supplemental([ "plurals-type-cardinal", "{language}" ]);
	}
	cldr.off( "get", validateCldr );

	MakePlural.rules = {};
	if ( isOrdinal ) {
		MakePlural.rules.ordinal = cldr.supplemental( "plurals-type-ordinal" );
	}
	if ( isCardinal ) {
		MakePlural.rules.cardinal = cldr.supplemental( "plurals-type-cardinal" );
	}

	plural = new MakePlural( cldr.attributes.language, {
		"ordinals": isOrdinal,
		"cardinals": isCardinal
	});

	returnFn = pluralGeneratorFn( plural );

	runtimeBind( args, cldr, returnFn, [ plural ] );

	return returnFn;
};

return Globalize;

});
