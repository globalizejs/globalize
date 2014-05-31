define(function() {

/**
 * Function inspired by jQuery Core, but reduced to our use case.
 */
return function( obj ) {
	return obj !== null && "" + obj === "[object Object]";
};

});
