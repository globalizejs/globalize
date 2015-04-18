define([
	"./runtime-key"
], function( runtimeKey ) {

return function( args, cldr, fn, runtimeArgs ) {
	var fnName = /^function\s+([\w\$]+)\s*\(/.exec( fn.toString() )[ 1 ],
		locale = cldr.locale;

	fn.runtimeKey = runtimeKey( fnName, locale, args );

	// Stringify arguments.
	args = JSON.stringify( args ).slice( 1, -1 );

	fn.generatorString = function() {
		return "Globalize(\"" + locale + "\")." + fnName + "(" + args + ")";
	};

	fn.runtimeArgs = runtimeArgs;

	return fn;
};

});
