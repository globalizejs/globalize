define([
	"cldr",
	"./common/create-error",
	"./common/format-message",
	"./common/validate",
	"./util/always-array",
	"./util/always-cldr",
	"./util/is-plain-object",
	"./util/object/extend",
	"./util/regexp/escape",
	"./util/string/pad",

	"cldr/event"
], function( Cldr, createError, formatMessage, validate, alwaysArray, alwaysCldr,
	isPlainObject, objectExtend, regexpEscape, stringPad ) {

function validateLikelySubtags( cldr ) {
	cldr.once( "get", validate.cldr );
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

	validate.parameterPresence( locale, "locale" );
	validate.parameterTypeLocale( locale, "locale" );

	this.cldr = alwaysCldr( locale );

	validateLikelySubtags( this.cldr );
}

/**
 * Globalize.load( json, ... )
 *
 * @json [JSON]
 *
 * Load resolved or unresolved cldr data.
 * Somewhat equivalent to previous Globalize.addCultureInfo(...).
 */
Globalize.load = function() {
	// validations are delegated to Cldr.load().
	Cldr.load.apply( Cldr, arguments );
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
	validate.parameterTypeLocale( locale, "locale" );

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
Globalize._objectExtend = objectExtend;
Globalize._regexpEscape = regexpEscape;
Globalize._stringPad = stringPad;
Globalize._validate = validate;

return Globalize;

});
