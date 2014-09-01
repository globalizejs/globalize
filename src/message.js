define([
	"cldr",
	"./core",
	"./common/validate/default-locale",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type",
	"./common/validate/parameter-type/plain-object",
	"./util/always-array"
], function( Cldr, Globalize, validateDefaultLocale, validateParameterPresence,
	validateParameterType, validateParameterTypePlainObject, alwaysArray ) {

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

	validateParameterPresence( json, "json" );
	validateParameterTypePlainObject( json, "json" );

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

	validateParameterPresence( path, "path" );
	validateParameterType( path, "path", typeof path === "string" || Array.isArray( path ),
		"a String nor an Array" );

	path = alwaysArray( path );
	cldr = this.cldr;

	validateDefaultLocale( cldr );

	return cldr.get( [ "globalize-translations/{languageId}" ].concat( path ) );
};

return Globalize;

});
