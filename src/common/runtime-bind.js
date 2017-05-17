define([
	"./runtime-key",
	"../util/function-name"
], function( runtimeKey, functionName ) {

return function( args, cldr, fn, runtimeArgs ) {

	var argsStr = JSON.stringify( args ),
		fnName = functionName( fn ),
		locale = cldr.locale;

	// If name of the function is not available, this is most likely due to uglification,
	// which most likely means we are in production, and runtimeBind here is not necessary.
	if ( !fnName ) {
		return fn;
	}

	fn.runtimeKey = runtimeKey( fnName, locale, null, argsStr );

	fn.generatorString = function() {
		return "Globalize(\"" + locale + "\")." + fnName + "(" + argsStr.slice( 1, -1 ) + ")";
	};

	fn.runtimeArgs = runtimeArgs;

	return fn;
};

});
