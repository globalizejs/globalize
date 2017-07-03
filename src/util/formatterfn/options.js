define(function() {

return function( fn, options ) {
	options = options || {};
	return function( ) {
		var args = [].slice.call( arguments, 0 );
		if ( args.length === 1 && ( options.split === undefined || options.split === true ) ) {
			args = args[0].split( "," );
		}
		if ( options.trim === undefined || options.trim === true ) {
			args = args.map( function( v ) {
				return v.trim();
			});
		}
		return fn.apply( this, args );
	};
};

});
