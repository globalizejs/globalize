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

test("basics, date", function() {
	equal( Globalize.parseDate('2011/17/11 13:23:12','yyyy/dd/MM HH:mm:ss','fr').valueOf(), (new Date(2011, 10, 17, 13, 23, 12)).valueOf() );
	equal( Globalize.parseDate('2011-17-11 13:23:12','yyyy-dd-MM HH:mm:ss','fr').valueOf(), (new Date(2011, 10, 17, 13, 23, 12)).valueOf() );
	equal( Globalize.parseDate('2011/17/11 13:23:12','yyyy/dd/MM HH:mm:ss','fr-CA').valueOf(), (new Date(2011, 10, 17, 13, 23, 12)).valueOf() );
	equal( Globalize.parseDate('2011-17-11 13:23:12','yyyy-dd-MM HH:mm:ss','fr-CA').valueOf(), (new Date(2011, 10, 17, 13, 23, 12)).valueOf() );
});

test("basics, group separators", function() {
	// Native
	equal( parseFloat("500,600"), 500)
	equal( parseFloat("500a600"), 500)
	
	// Globalize - using "en" culture that has a "," group separator and a "." decimal separator 
	Globalize.culture("en");
	ok( isNaN( Globalize.parseFloat("500 600")));
	ok( isNaN( Globalize.parseFloat("500a600")));
	
	// Globalize - using "fr" culture that has a " " group separator and a "," decimal separator
	Globalize.culture("fr");
	equal( Globalize.parseFloat("500.600"), 500.6);
	ok( isNaN( Globalize.parseFloat("500a600")));
		
	// Globalize - using "nl" culture that has a "." group separator and a "," decimal separator
	Globalize.culture("nl");
	equals( Globalize.parseFloat("1"), 1);
	equals( Globalize.parseFloat("1,01"), 1.01);
	equals( Globalize.parseFloat("10"), 10);
	equals( Globalize.parseFloat("10,01"), 10.01);
	equals( Globalize.parseFloat("100"), 100);
	equals( Globalize.parseFloat("100,01"), 100.01);
	equals( Globalize.parseFloat("1.000"), 1000);
	equals( Globalize.parseFloat("1.000,01"), 1000.01);
	equals( Globalize.parseFloat("10.000"), 10000);
	equals( Globalize.parseFloat("10.000,01"), 10000.01);
	
	// incorrect group separators
	ok( isNaN( Globalize.parseFloat("1.")));
	ok( isNaN( Globalize.parseFloat("1.0")));
	ok( isNaN( Globalize.parseFloat("1.00")));
	ok( isNaN( Globalize.parseFloat("10.00")));
	ok( isNaN( Globalize.parseFloat("100.00")));
	ok( isNaN( Globalize.parseFloat("1000.00")));	
	ok( isNaN( Globalize.parseFloat("10000.00")));
	ok( isNaN( Globalize.parseFloat("10000.000")));
});

test("invalid input", function() {
	// #47 - Return NaN instead of 0 for invalid values
	ok( isNaN(Globalize.parseInt("foo")) );
	ok( isNaN(Globalize.parseFloat("foo")) );
});
