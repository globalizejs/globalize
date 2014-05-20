define([
	"cldr",
	"./core",
	"./util/always-array"
], function( Cldr, Globalize, alwaysArray ) {

/**
 * .loadMessages( json )
 *
 * @json [JSON]
 *
 * Load messages (translation) data for default/instance locale.
 */
Globalize.loadMessages =
Globalize.prototype.loadMessages = function( json ) {
	var customData = {
		"globalize-messages": {}
	};
	customData[ "globalize-messages" ][ this.cldr.attributes.languageId ] = json;
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
	return this.cldr.get( [ "globalize-messages/{languageId}" ].concat( path ) );
};

return Globalize;

});
