

var validateMessagePresence = function( path, value ) {
	path = path.join( "/" );
	validate( "E_MISSING_MESSAGE", "Missing required message content `{path}`.",
		value !== undefined, { path: path } );
};

