define([
	"cldr",
	"./common/get-locale",
	"./core",
	"./util/always-array"
], function( Cldr, commonGetLocale, Globalize, alwaysArray ) {

/**
 * Globalize.loadTranslations( locale, json )
 *
 * @locale [String]
 *
 * @json [JSON]
 *
 * Load translation data per locale.
 */
Globalize.loadTranslations = function( locale, json ) {
	var customData = {
		"globalize-translation": {}
	};
	locale = new Cldr( locale );
	customData[ "globalize-translation" ][ locale.attributes.languageId ] = json;
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
	return locale.get( [ "globalize-translation/{languageId}" ].concat( path ) );
};

return Globalize;

});
