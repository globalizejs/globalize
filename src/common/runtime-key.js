define([
	"../util/string/hash"
], function( stringHash ) {

return function( fnName, locale, argsOrArgsStr ) {
	var argsStr, hash;
	argsStr = typeof argsOrArgsStr === "string" ? argsOrArgsStr : JSON.stringify( argsOrArgsStr );
	hash = stringHash( fnName + locale + argsStr );
	return hash > 0 ? "a" + hash : "b" + Math.abs( hash );
};

});
