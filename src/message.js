define([
	"cldr",
	"messageformat",
	"./common/create-error",
	"./common/create-error/plural-module-presence",
	"./common/runtime-bind",
	"./common/validate/default-locale",
	"./common/validate/message-bundle",
	"./common/validate/message-presence",
	"./common/validate/message-type",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type",
	"./common/validate/parameter-type/plain-object",
	"./core",
	"./message/formatter-fn",
	"./message/formatter-runtime-bind",
	"./util/always-array",

	"cldr/event"
], function( Cldr, MessageFormat, createError, createErrorPluralModulePresence, runtimeBind,
	validateDefaultLocale, validateMessageBundle, validateMessagePresence, validateMessageType,
	validateParameterPresence, validateParameterType, validateParameterTypePlainObject, Globalize,
	messageFormatterFn, messageFormatterRuntimeBind, alwaysArray ) {

var slice = [].slice;

/**
 * .loadMessages( json )
 *
 * @json [JSON]
 *
 * Load translation data.
 */
Globalize.loadMessages = function( json ) {
	var locale,
		customData = {
			"globalize-messages": json,
			"main": {}
		};

	validateParameterPresence( json, "json" );
	validateParameterTypePlainObject( json, "json" );

	// Set available bundles by populating customData main dataset.
	for ( locale in json ) {
		if ( json.hasOwnProperty( locale ) ) {
			customData.main[ locale ] = {};
		}
	}

	Cldr.load( customData );
};

/**
 * .messageFormatter( path )
 *
 * @path [String or Array]
 *
 * Format a message given its path.
 */
Globalize.messageFormatter =
Globalize.prototype.messageFormatter = function( path ) {
	var cldr, formatter, message, pluralGenerator, returnFn,
		args = slice.call( arguments, 0 );

	validateParameterPresence( path, "path" );
	validateParameterType( path, "path", typeof path === "string" || Array.isArray( path ),
		"a String nor an Array" );

	path = alwaysArray( path );
	cldr = this.cldr;

	validateDefaultLocale( cldr );
	validateMessageBundle( cldr );

	message = cldr.get( [ "globalize-messages/{bundle}" ].concat( path ) );
	validateMessagePresence( path, message );

	// If message is an Array, concatenate it.
	if ( Array.isArray( message ) ) {
		message = message.join( " " );
	}
	validateMessageType( path, message );

	// Is plural module present? Yes, use its generator. Nope, use an error generator.
	pluralGenerator = this.plural !== undefined ?
		this.pluralGenerator() :
		createErrorPluralModulePresence;

	formatter = new MessageFormat( cldr.locale, pluralGenerator ).compile( message );

	returnFn = messageFormatterFn( formatter );

	runtimeBind( args, cldr, returnFn,
		[ messageFormatterRuntimeBind( cldr, formatter ), pluralGenerator ] );

	return returnFn;
};

/**
 * .formatMessage( path [, variables] )
 *
 * @path [String or Array]
 *
 * @variables [Number, String, Array or Object]
 *
 * Format a message given its path.
 */
Globalize.formatMessage =
Globalize.prototype.formatMessage = function( path /* , variables */ ) {
	return this.messageFormatter( path ).apply( {}, slice.call( arguments, 1 ) );
};

return Globalize;

});
