define([
	"./array/is-array"
], function( arrayIsArray ) {

return function( stringOrArray ) {
	return arrayIsArray( stringOrArray ) ?  stringOrArray : [ stringOrArray ];
};

});
