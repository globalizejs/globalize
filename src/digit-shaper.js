define([
	"./core",
	"./common/runtime-bind",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type/plain-object",
	"./common/validate/parameter-type/string",
	"./digit-shaper/properties",
	"./digit-shaper/shaper-fn",

	"cldr/event",
	"cldr/supplemental"
], function( Globalize, runtimeBind, validateCldr,
	validateDefaultLocale, validateParameterPresence,
	validateParameterTypePlainObject, validateParameterTypeString,
	digitShaperProperties, digitShaperShaperFn ) {

/**
 * .digitShaper( [options] )
 *
 * @options [Object]:
 * - shaperType: [String] "National" (default), "Contextual" or "None".
 * - textDir: [String] "ltr", "rtl", or "auto" (default).
 *
 * Return a function that shapes digits according to the given options and default/instance
 * locale.
 */
Globalize.digitShaper =
Globalize.prototype.digitShaper = function( options ) {
	var args, cldr, properties, returnFn;

	validateParameterTypePlainObject( options, "options" );

	options = options || {};
	cldr = this.cldr;

	args = [ options ];

	validateDefaultLocale( cldr );

	cldr.on( "get", validateCldr );

	options.shaperType = options.shaperType || "National";
	options.textDir = options.textDir || "auto";

	properties = digitShaperProperties( cldr, options );

	cldr.off( "get", validateCldr );

	returnFn = digitShaperShaperFn( properties );

	runtimeBind( args, cldr, returnFn, [ properties ] );

	return returnFn;
};

/**
 * .shapeDigit( value [, options] )
 *
 * @value [String] text with digits to be shaped.
 *
 * @options [Object]: See numberShaper().
 *
 * Return string with shaped digits according to the context.
 */
Globalize.shapeDigit =
Globalize.prototype.shapeDigit = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeString( value, "value" );

	return this.digitShaper( options )( value );
};

return Globalize;

});
