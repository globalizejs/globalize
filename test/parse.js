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

test( "basic, percentage", function() {
	equal( Globalize.parseInt( "12%" ), "12" );
	equal( Globalize.parseInt( "12.34%" ), "12" );
	equal( Globalize.parseInt( "-12.34%" ), "-12" );
	equal( Globalize.parseFloat( "12%" ), "12" );
	equal( Globalize.parseFloat( "12.34%" ), "12.34" );
	equal( Globalize.parseFloat( "-12.34%" ), "-12.34" );
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

	// #44 - Test Currencies with a space between negative and number
	equal( Globalize.parseInt("-R$ 5,51", "pt-BR"), -5 );
	equal( Globalize.parseFloat("-R$ 5,51", "pt-BR"), -5.51 );

});

test("basics, date", function() {
	equal( Globalize.parseDate('2011/17/11 13:23:12','yyyy/dd/MM HH:mm:ss','fr').valueOf(), (new Date(2011, 10, 17, 13, 23, 12)).valueOf() );
	equal( Globalize.parseDate('2011-17-11 13:23:12','yyyy-dd-MM HH:mm:ss','fr').valueOf(), (new Date(2011, 10, 17, 13, 23, 12)).valueOf() );
	equal( Globalize.parseDate('2011/17/11 13:23:12','yyyy/dd/MM HH:mm:ss','fr-CA').valueOf(), (new Date(2011, 10, 17, 13, 23, 12)).valueOf() );
	equal( Globalize.parseDate('2011-17-11 13:23:12','yyyy-dd-MM HH:mm:ss','fr-CA').valueOf(), (new Date(2011, 10, 17, 13, 23, 12)).valueOf() );
});

test("native es5, date", function() {
	var date = new Date(2012, 8, 15, 10, 15, 30, 123);
	// ISO 8601: YYYY-MM-DDTHH:mm:ss.sssZ
	if(date.toISOString){
		equal(Globalize.parseDate(date.toISOString()).valueOf(), date.valueOf(), "should parse date strings from Date.prototype.toISOString");
	} else {
		ok(true, "browser doesn't support Date.prototype.toISOString (ISO 8601)");
	}
	// toJSON
	if(date.toJSON && !isNaN(Date.parse(date.toJSON()))){
		equal(Globalize.parseDate(date.toJSON()).valueOf(), date.valueOf(), "should parse date strings from Date.prototype.toJSON");
	} else {
		ok(true, "browser doesn't support Date.prototype.toJSON or parsing it's output");
	}

});

test("invalid input", function() {
	// #47 - Return NaN instead of 0 for invalid values
	ok( isNaN(Globalize.parseInt("foo")) );
	ok( isNaN(Globalize.parseFloat("foo")) );
});
