define([], function( ) {

return function( args ) {
	return JSON.stringify( args, function( _key, value ) {
		if ( value && value.runtimeKey ) {
			return value.runtimeKey;
		}
		return value;
	} );
};

});
