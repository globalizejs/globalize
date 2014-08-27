define([
	"cldr",
	"./common/create-error",
	"./common/format-message",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/presence",
	"./common/validate/range",
	"./common/validate/type",
	"./common/validate/type/locale",
	"./common/validate/type/plain-object",
	"./util/always-array",
	"./util/always-cldr",
	"./util/is-plain-object",
	"cldr/event"
], function( Cldr, createError, formatMessage, validateCldr, validateDefaultLocale,
	validatePresence, validateRange, validateType, validateTypeLocale, validateTypePlainObject,
	alwaysArray, alwaysCldr, isPlainObject ) {

function validateLikelySubtags( cldr ) {
	cldr.once( "get", validateCldr );
	cldr.get( "supplemental/likelySubtags" );
}

/**
 * [new] Globalize( locale|cldr )
 *
 * @locale [String]
 *
 * @cldr [Cldr instance]
 *
 * Create a Globalize instance.
 */
function Globalize( locale ) {
	if ( !( this instanceof Globalize ) ) {
		return new Globalize( locale );
	}

	validatePresence( locale, "locale" );
	validateTypeLocale( locale, "locale" );

	this.cldr = alwaysCldr( locale );

	validateLikelySubtags( this.cldr );
}

/**
 * Globalize.load( json )
 *
 * @json [JSON]
 *
 * Load resolved or unresolved cldr data.
 * Somewhat equivalent to previous Globalize.addCultureInfo(...).
 */
Globalize.load = function( json ) {
	validatePresence( json, "json" );
	validateTypePlainObject( json, "json" );

	Cldr.load( json );
};

/**
 * Globalize.locale( [locale|cldr] )
 *
 * @locale [String]
 *
 * @cldr [Cldr instance]
 *
 * Set default Cldr instance if locale or cldr argument is passed.
 *
 * Return the default Cldr instance.
 */
Globalize.locale = function( locale ) {
	validateTypeLocale( locale, "locale" );

	if ( arguments.length ) {
		this.cldr = alwaysCldr( locale );
		validateLikelySubtags( this.cldr );
	}
	return this.cldr;
};

/**
 * Optimization to avoid duplicating some internal functions across modules.
 */
Globalize._alwaysArray = alwaysArray;
Globalize._createError = createError;
Globalize._formatMessage = formatMessage;
Globalize._isPlainObject = isPlainObject;
Globalize._validateCldr = validateCldr;
Globalize._validateDefaultLocale = validateDefaultLocale;
Globalize._validatePresence = validatePresence;
Globalize._validateRange = validateRange;
Globalize._validateTypePlainObject = validateTypePlainObject;
Globalize._validateType = validateType;

return Globalize;

});
