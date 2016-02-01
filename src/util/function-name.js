define([], function() {

return function( fn ) {
	if ( fn.name !== undefined ) {
		return fn.name;
	}

	var matches = /^function\s+([\w\$]+)\s*\(/.exec( fn.toString() );

	if ( matches && matches.length > 0 ) {
		return matches[ 1 ];
	}
};

});
