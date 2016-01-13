

var alwaysArray = function( stringOrArray ) {
	return Array.isArray( stringOrArray ) ? stringOrArray : stringOrArray ? [ stringOrArray ] : [];
};

