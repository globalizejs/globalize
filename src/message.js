define([
	"cldr",
	"./common/get-locale",
	"./core",
	"./util/always-array"
], function( Cldr, commonGetLocale, Globalize, alwaysArray ) {

/**
 * Globalize.loadMessages( locale, json )
 *
 * @locale [String]
 *
 * @json [JSON]
 *
 * Load messages (translation) data per locale.
 */
Globalize.loadMessages = function( locale, json ) {
	var customData = {
		"globalize-messages": {}
	};
	locale = new Cldr( locale );
	customData[ "globalize-messages" ][ locale.attributes.languageId ] = json;
	Cldr.load( customData );
};

/**
 * Globalize.translate( path, locale )
 *
 * @path [String or Array]
 *
 * @locale [String]
 *
 * Translate item given its path.
 */
Globalize.translate = function( path , locale ) {
	locale = commonGetLocale( locale );
	path = alwaysArray( path );
	return locale.get( [ "globalize-messages/{languageId}" ].concat( path ) );
};

return Globalize;

});
