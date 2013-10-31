define(function() {

	return function( stringOrArray ) {
		return typeof stringOrArray === "string" ?  [ stringOrArray ] : stringOrArray;
	};

});
