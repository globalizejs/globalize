define([
	"../core",
	"./runtime-key"
], function( Globalize, runtimeKey ) {

return function( fnName, args, cldr ) {
	return Globalize.cache[ runtimeKey( fnName, cldr.locale, args ) ];
};

});
