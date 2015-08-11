define([
	"../util/string/hash"
], function( stringHash ) {

return function( fnName, locale, args, argsStr ) {
	var hash;
	argsStr = argsStr || JSON.stringify( args );
	hash = stringHash( fnName + locale + argsStr );
	return hash > 0 ? "a" + hash : "b" + Math.abs( hash );
};

});
