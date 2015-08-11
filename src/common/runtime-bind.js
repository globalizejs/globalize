define([
	"./runtime-key"
], function( runtimeKey ) {

return function( args, cldr, fn, runtimeArgs ) {
	var locale = cldr.locale;

	fn.runtimeKey = runtimeKey( fn.name, locale, args );

	// Stringify arguments.
	args = JSON.stringify( args ).slice( 1, -1 );

	fn.generatorString = function() {
		return "Globalize(\"" + locale + "\")." + fn.name + "(" + args + ")";
	};

	fn.runtimeArgs = runtimeArgs;

	return fn;
};

});
