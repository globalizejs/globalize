define([
	"cldr",
	"./core",
	"./common/validate/default-locale",
	"./common/validate/presence",
	"./common/validate/type",
	"./common/validate/type/plain-object",
	"./util/always-array"
], function( Cldr, Globalize, validateDefaultLocale, validatePresence, validateType, validateTypePlainObject, alwaysArray ) {

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

	validatePresence( json, "json" );
	validateTypePlainObject( json, "json" );

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
	var cldr;

	validatePresence( path, "path" );
	validateType( path, "path", typeof path === "string" || Array.isArray( path ), "a String nor an Array");

	path = alwaysArray( path );
	cldr = this.cldr;

	validateDefaultLocale( cldr );

	return cldr.get( [ "globalize-translations/{languageId}" ].concat( path ) );
};

return Globalize;

});
