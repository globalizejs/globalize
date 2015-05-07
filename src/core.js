define([
	"cldr",
	"./calendars/calendarForLocale",
	"./calendars/Gdate",
	"./calendars/GregorianDate",
	"./common/create-error",
	"./common/format-message",
	"./common/validate",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-range",
	"./common/validate/parameter-type",
	"./common/validate/parameter-type/locale",
	"./common/validate/parameter-type/plain-object",
	"./util/always-array",
	"./util/always-cldr",
	"./util/is-plain-object",
	"./util/object/extend",
	"./util/regexp/escape",
	"./util/string/pad",

	"cldr/event"
], function( Cldr, calendarForLocale, Gdate, GregorianDate, createError, formatMessage,
	validate, validateCldr, validateDefaultLocale,
	validateParameterPresence, validateParameterRange, validateParameterType,
	validateParameterTypeLocale, validateParameterTypePlainObject, alwaysArray, alwaysCldr,
	isPlainObject, objectExtend, regexpEscape, stringPad ) {

function validateLikelySubtags( cldr ) {
	cldr.once( "get", validateCldr );
	cldr.get( "supplemental/likelySubtags" );
}

function setLocale ( object, locale ){
	validateParameterPresence( locale, "locale" );
	validateParameterTypeLocale( locale, "locale" );
	object.cldr = alwaysCldr( locale );
	calendar = calendarForLocale( object.cldr );
	validateParameterType ( calendar, "calendar",
		calendar in Globalize.calendars, "a defined calendar system" );
	object.cldr.attributes.calendar = calendar;
	validateLikelySubtags( object.cldr );
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

	setLocale( this, locale );
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
	var calendar;

	validateParameterTypeLocale( locale, "locale" );

	if ( arguments.length ) {
		setLocale( this, locale );
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
Globalize._validateCldr = validateCldr;
Globalize._validateDefaultLocale = validateDefaultLocale;
Globalize._validateParameterPresence = validateParameterPresence;
Globalize._validateParameterRange = validateParameterRange;
Globalize._validateParameterTypePlainObject = validateParameterTypePlainObject;
Globalize._validateParameterType = validateParameterType;
Globalize._Gdate = Gdate;

Globalize.calendars = {
  gregorian: GregorianDate
};

return Globalize;

});
