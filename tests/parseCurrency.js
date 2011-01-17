module("parseCurrency");

test("basics", function() {
	equal( $.global.parseCurrency("$5.51", ""), 5.51 );
	equal( $.global.parseCurrency("USD 5.51", ""), 5.51 );
	equal( $.global.parseCurrency("5,51 €", "de-DE"), 5.51 );
	equal( $.global.parseCurrency("5,51 EUR", "de-DE"), 5.51 );
	equal( $.global.parseCurrency("€ 5,51", "de-DE"), 5.51 );
});
