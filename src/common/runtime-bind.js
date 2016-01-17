define([
	"./runtime-key"
], function( runtimeKey ) {

return function( args, cldr, fn, runtimeArgs ) {
	var argsStr = JSON.stringify( args ),
		fnName = fn.name || /^function\s+([\w\$]+)\s*\(/.exec( fn.toString() )[ 1 ],
		locale = cldr.locale;

	fn.runtimeKey = runtimeKey( fnName, locale, null, argsStr );

	fn.generatorString = function() {
		return "Globalize(\"" + locale + "\")." + fnName + "(" + argsStr.slice( 1, -1 ) + ")";
	};

	fn.runtimeArgs = runtimeArgs;

	return fn;
};

});
