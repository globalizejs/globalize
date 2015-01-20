define([
	"cldr",
	"messageformat",
	"./core",
	"./common/create-error",
	"./common/validate/default-locale",
	"./common/validate/message-bundle",
	"./common/validate/message-presence",
	"./common/validate/message-type",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type",
	"./common/validate/parameter-type/message-variables",
	"./common/validate/parameter-type/plain-object",
	"./common/validate/plural-module-presence",
	"./util/always-array",

	"cldr/event"
], function( Cldr, MessageFormat, Globalize, createError, validateDefaultLocale,
	validateMessageBundle, validateMessagePresence, validateMessageType, validateParameterPresence,
	validateParameterType, validateParameterTypeMessageVariables, validateParameterTypePlainObject,
	validatePluralModulePresence, alwaysArray ) {

var slice = [].slice;

function MessageFormatInit( globalize, cldr ) {
	var plural;
	return new MessageFormat( cldr.locale, function( value ) {
		if ( !plural ) {
			validatePluralModulePresence();
			plural = globalize.pluralGenerator();
		}
		return plural( value );
	});
}

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
	var cldr, formatter, message;

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

	formatter = MessageFormatInit( this, cldr ).compile( message );

	return function( variables ) {
		if ( typeof variables === "number" || typeof variables === "string" ) {
			variables = slice.call( arguments, 0 );
		}
		validateParameterTypeMessageVariables( variables, "variables" );
		return formatter( variables );
	};
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
Globalize.prototype.formatMessage = function( path ) {
	return this.messageFormatter( path ).apply( {}, slice.call( arguments, 1 ) );
};

return Globalize;

});
