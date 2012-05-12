module( "localize", lifecycle );

test('set and retrieve translations', function() {
	Globalize.addCultureInfo("fr", {
		messages: {
			"translate": "traduire"
		}
	})
	strictEqual( Globalize.localize("translate", "fr"), "traduire", "translate 'translate' to french" );
	strictEqual( Globalize("fr").localize("translate"), "traduire", "translate 'translate' to french" );
});

test('retrieve translations with new culture', function() {
	Globalize.addCultureInfo( "pirate", {
		messages: {
			"translate": "TARRRR"
		}
	});
	Globalize.culture("pirate");
	strictEqual( Globalize.localize("translate"), "TARRRR", "translate 'translate' to pirate language" );
});

test('Retrieve translations for the most appropriate culture', function() {
	Globalize.addCultureInfo("default", {
		messages: {
			"hello": "hello",
			"world": "world"
		}
	});

	Globalize.addCultureInfo("es", {
		messages: {
			"world": "mundo"
		}
	});

	Globalize.culture("es");

	strictEqual( Globalize.localize("world"), "mundo", "Key exists in current culture 'es'");
	strictEqual( Globalize.localize("world", "es"), "mundo", "Key exists in specified culture");
	strictEqual( Globalize.localize("world", "fr"), "world",
		"Key does not exist in specified culture but does exist in default culture");
	strictEqual( Globalize.localize("hello"), "hello",
		"Key does not exist in current culture, but does exist in default culture");
	strictEqual( Globalize.localize("goodbye"), undefined,
		"Key does not exist in current culture or default culture");
});
