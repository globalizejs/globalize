define([
	"cldr",
	"messageformat",
	"./core",
	"./common/create-error",
	"./common/validate",
	"./util/always-array",

	"cldr/event"
], function( Cldr, MessageFormat, Globalize, createError, validate, alwaysArray ) {

var slice = [].slice;

function MessageFormatInit( globalize, cldr ) {
	var plural;
	return new MessageFormat( cldr.locale, function( value ) {
		if ( !plural ) {
			validate.pluralModulePresence();
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

	validate.parameterPresence( json, "json" );
	validate.parameterTypePlainObject( json, "json" );

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

	validate.parameterPresence( path, "path" );
	validate.parameterType( path, "path", typeof path === "string" || Array.isArray( path ),
		"a String nor an Array" );

	path = alwaysArray( path );
	cldr = this.cldr;

	validate.defaultLocale( cldr );
	validate.messageBundle( cldr );

	message = cldr.get( [ "globalize-messages/{bundle}" ].concat( path ) );
	validate.messagePresence( path, message );

	// If message is an Array, concatenate it.
	if ( Array.isArray( message ) ) {
		message = message.join( " " );
	}
	validate.messageType( path, message );

	formatter = MessageFormatInit( this, cldr ).compile( message );

	return function( variables ) {
		if ( typeof variables === "number" || typeof variables === "string" ) {
			variables = slice.call( arguments, 0 );
		}
		validate.parameterTypeArrayOrObject( variables, "variables" );
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
Globalize.prototype.formatMessage = function( path /* , variables */ ) {
	return this.messageFormatter( path ).apply( {}, slice.call( arguments, 1 ) );
};

return Globalize;

});
