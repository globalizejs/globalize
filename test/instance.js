module("instance");

test("constructor sets culture", function() {
	var globalizeDe = Globalize("de");
	equal( Globalize.parseFloat("5.3"), 5.3 );
	equal( Globalize.parseFloat("5,3"), 53 );
	equal( globalizeDe.parseFloat("5.3"), 53 );
	equal( globalizeDe.parseFloat("5,3"), 5.3 );
});
