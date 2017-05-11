define([], function( ) {

return function( args ) {
	return JSON.stringify( args, function( key, value ) {
		if ( typeof value === "function" ) {
			return value.runtimeKey; // if undefined, the value will be filtered out.
		}
		return value;
	} );
};

});
