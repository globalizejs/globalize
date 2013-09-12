module("instance", lifecycle );

test("constructor sets culture", function() {
	var globalizeDe = Globalize("de");
	equal( Globalize.parseFloat("5.3"), 5.3 );
	ok( isNaN( Globalize.parseFloat("5,3")));
	ok( isNaN( Globalize.parseFloat("5.3", "de")));
	equal( Globalize.parseFloat("5,3", "de"), 5.3 );
	ok( isNaN( globalizeDe.parseFloat("5.3")));
	equal( globalizeDe.parseFloat("5,3"), 5.3 );
	equal( globalizeDe.parseFloat("5.3", "en"), 5.3 );
	ok( isNaN(globalizeDe.parseFloat("5,3", "en")));
});
