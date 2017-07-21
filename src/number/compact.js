define([
	"./numbering-system"
], function( numberNumberingSystem ) {

/**
 * Compact( name, cldr )
 *
 * @compactType [String] Compact mode, `short` or `long`.
 *
 * @cldr [Cldr instance].
 *
 * Return the localized compact map for the given compact mode.
 */
return function( compactType, cldr ) {
	var maxExponent = 0;

	var object = cldr.main([
		"numbers/decimalFormats-numberSystem-" + numberNumberingSystem( cldr ),
		compactType,
		"decimalFormat"
	]);

	object = Object.keys( object ).reduce(function( newObject, compactKey ) {
		var numberExponent = compactKey.split( "0" ).length - 1;
		var pluralForm = compactKey.split( "-" )[ 2 ];
		newObject[ numberExponent ] = newObject[ numberExponent ] || {};
		newObject[ numberExponent ][ pluralForm ] = object[ compactKey ];
		maxExponent = Math.max( numberExponent, maxExponent );
		return newObject;
	}, {});

	object.maxExponent = maxExponent;

	return object;
};

});
