module("instance", lifecycle );

test("constructor sets culture", function() {
	var globalizeDe = Globalize("de");
	equal( Globalize.parseFloat("5.3"), 5.3 );
	equal( Globalize.parseFloat("5,3"), 53 );
	equal( Globalize.parseFloat("5.3", "de"), 53 );
	equal( Globalize.parseFloat("5,3", "de"), 5.3 );
	equal( globalizeDe.parseFloat("5.3"), 53 );
	equal( globalizeDe.parseFloat("5,3"), 5.3 );
	equal( globalizeDe.parseFloat("5.3", "en"), 5.3 );
	equal( globalizeDe.parseFloat("5,3", "en"), 53 );
});
