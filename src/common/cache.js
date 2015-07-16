define([
	"../core"
], function( Globalize ) {

return function( fn ) {
	Globalize.cache[ fn.cacheKey ] = fn;
	return fn;
};

});
