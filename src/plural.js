define([
	"cldr",
	"make-plural",
	"./core",
	"./common/validate",

	"cldr/event",
	"cldr/supplemental"
], function( Cldr, MakePlural, Globalize, validate ) {

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
	validate.parameterPresence( value, "value" );
	validate.parameterTypeNumber( value, "value" );
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

	validate.parameterTypePlainObject( options, "options" );

	options = options || {};
	type = options.type || "cardinal";
	cldr = this.cldr;

	validate.parameterTypePluralType( options.type, "options.type" );

	validate.defaultLocale( cldr );

	isOrdinal = type === "ordinal";

	cldr.on( "get", validate.cldr );
	cldr.supplemental([ "plurals-type-" + type, "{language}" ]);
	cldr.off( "get", validate.cldr );

	MakePlural.rules = {};
	MakePlural.rules[ type ] = cldr.supplemental( "plurals-type-" + type );

	plural = new MakePlural( cldr.attributes.language, {
		"ordinals": isOrdinal,
		"cardinals": !isOrdinal
	});

	return function( value ) {
		validate.parameterPresence( value, "value" );
		validate.parameterTypeNumber( value, "value" );

		return plural( value );
	};
};

return Globalize;

});
