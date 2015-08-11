define([
	"../util/string/hash"
], function( stringHash ) {

return function( fnName, locale, args ) {
	var hash;
	hash = stringHash( fnName + locale + JSON.stringify( args ) );
	return hash > 0 ? "a" + hash : "b" + Math.abs( hash );
};

});
