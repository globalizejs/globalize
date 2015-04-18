define([
	"./runtime-key"
], function( runtimeKey ) {

return function( args, cldr, fn, runtimeArgs ) {
	var argsStr = JSON.stringify( args ),
		locale = cldr.locale;

	fn.runtimeKey = runtimeKey( fn.name, locale, null, argsStr );

	fn.generatorString = function() {
		return "Globalize(\"" + locale + "\")." + fn.name + "(" + argsStr.slice( 1, -1 ) + ")";
	};

	fn.runtimeArgs = runtimeArgs;

	return fn;
};

});
