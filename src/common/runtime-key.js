define([
	"./runtime-stringify",
	"../util/string/hash"
], function( runtimeStringify, stringHash ) {

return function( fnName, locale, args, argsStr ) {
	var hash;
	argsStr = argsStr || runtimeStringify( args );
	hash = stringHash( fnName + locale + argsStr );
	return hash > 0 ? "a" + hash : "b" + Math.abs( hash );
};

});
