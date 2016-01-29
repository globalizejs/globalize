define([
	"./runtime-key"
], function( runtimeKey ) {

return function( args, cldr, fn, runtimeArgs ) {

	var fnName = fn.name;

	// fn.name is not supported by IE
	if ( !fnName ) {
		var matches = /^function\s+([\w\$]+)\s*\(/.exec( fn.toString() );

		if ( matches && matches.length > 0 ) {
			fnName = matches[ 1 ];
		}
	}

	// If name of the function is not available, this is most likely due uglification,
	// which most likely means we are in production, and runtimeBind here is not necessary.
	if ( !fnName ) {
		return fn;
	}

	var argsStr = JSON.stringify( args ),
		locale = cldr.locale;

	fn.runtimeKey = runtimeKey( fnName, locale, null, argsStr );

	fn.generatorString = function() {
		return "Globalize(\"" + locale + "\")." + fnName + "(" + argsStr.slice( 1, -1 ) + ")";
	};

	fn.runtimeArgs = runtimeArgs;

	return fn;
};

});
