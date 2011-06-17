
test('set and retrieve translations', function() {
	Globalize.addCultureInfo("fr", {
		messages: {
			"translate": "traduire"
		}
	})
	strictEqual( Globalize.localize("translate", "fr"), "traduire", "translate 'translate' to french" );
	strictEqual( Globalize("fr").localize("translate"), "traduire", "translate 'translate' to french" );
});

test('retrieve transtaltions with new culture', function() {
	Globalize.addCultureInfo( "pirate", {
		messages: {
			"translate": "TARRRR"
		}
	});
	Globalize.culture("pirate");
	strictEqual( Globalize.localize("translate"), "TARRRR", "translate 'translate' to pirate language" );
});
