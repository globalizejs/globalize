define([
	"../core",
	"./runtime-key"
], function( Globalize, runtimeKey ) {

return function( args, cldr, fn ) {
	var fnName = /^function\s+([\w\$]+)\s*\(/.exec( fn.toString() )[ 1 ];
	Globalize.cache[ runtimeKey( fnName, cldr.locale, args ) ] = fn;
};

});
