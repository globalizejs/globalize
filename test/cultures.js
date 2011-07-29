module( "cultures", lifecycle );

test("Culture name property and key", function() {
	var name,
		culture;

	for ( name in Globalize.cultures ) {
		// default is an exception since it has the name default
		// inside cultures but internally its name is 'en' (neutral English)
		if ( name !== "default" ) {
			culture = Globalize.cultures[ name ];
			equal( culture.name, name, "Name property in culture matches name key in cultures" );
		}
	}
});
