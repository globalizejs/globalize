define([
	"./array/is_array"
], function( arrayIsArray ) {

return function( stringOrArray ) {
	return arrayIsArray( stringOrArray ) ?  stringOrArray : [ stringOrArray ];
};

});
