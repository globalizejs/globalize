define([
	"cldr",
	"./core",
	"./util/always-array"
], function( Cldr, Globalize, alwaysArray ) {

/**
 * .loadTranslations( json )
 *
 * @json [JSON]
 *
 * Load translation data.
 */
Globalize.loadTranslations = function( json ) {
	var customData = {
		"globalize-translations": json
	};
	Cldr.load( customData );
};

/**
 * .translate( path )
 *
 * @path [String or Array]
 *
 * Translate item given its path.
 */
Globalize.translate =
Globalize.prototype.translate = function( path ) {
	path = alwaysArray( path );
	return this.cldr.get( [ "globalize-translations/{languageId}" ].concat( path ) );
};

return Globalize;

});
