module("parseFloat", lifecycle );

test("basics, float", function() {
	equal( Globalize.parseFloat("5.51"), 5.51 );
	equal( Globalize.parseFloat("-5.51"), -5.51 );
	equal( Globalize.parseFloat("5,51", 10, "de-DE"), 5.51 );
});

test("basics, int", function() {
	equal( Globalize.parseInt("5.51"), 5 );
	equal( Globalize.parseInt("-5.51"), -5 );
	equal( Globalize.parseInt("5,51", 10, "de-DE"), 5 );
	equal( Globalize.parseInt("5000000000"), 5000000000 );
	equal( Globalize.parseInt("-5000000000"), -5000000000 );
});

test("basics, currency", function() {
	equal( Globalize.parseInt("$5.51"), 5 );
	equal( Globalize.parseFloat("$5.51"), 5.51 );
	equal( Globalize.parseInt("($5.51)"), -5 );
	equal( Globalize.parseFloat("($5.51)"), -5.51 );

	// #44 - The cultures "lo" and "lo-LA" are unique in that they
	// use the format "(n)" in both currency and number formatting
	equal( Globalize.parseInt("(5.51₭)", "lo"), -5 );
	equal( Globalize.parseFloat("(5.51₭)", "lo"), -5.51 );
	equal( Globalize.parseInt("5,51 €", 10, "de-DE"), 5 );
	equal( Globalize.parseFloat("5,51 €", 10, "de-DE"), 5.51 );
	equal( Globalize.parseFloat("5,51 €", "de-DE"), 5.51, "optional radix" );
});

test("invalid input", function() {
	// #47 - Return NaN instead of 0 for invalid values
	ok( isNaN(Globalize.parseInt("foo")) );
	ok( isNaN(Globalize.parseFloat("foo")) );
});
