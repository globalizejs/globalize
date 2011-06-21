module( "format", {} );

test("Number Formatting - n for number", function() {
	equal( Globalize.format(123.45, "n"), "123.45" );
	equal( Globalize.format(123.45, "n0"), "123" );
	equal( Globalize.format(123.45, "n1"), "123.5" );
});

test("Number Formatting - d for decimal", function() {
	equal( Globalize.format(123.45, "d"), "123" );
	equal( Globalize.format(12, "d3"), "012" );
});

test("Number Formatting - c for currency", function() {
	equal( Globalize.format(123.45, "c"), "$123.45" );
	equal( Globalize.format(123.45, "c0"), "$123" );
	equal( Globalize.format(123.45, "c1"), "$123.5" );
	equal( Globalize.format(-123.45, "c"), "($123.45)" );
});

test("Number Formatting - p for percentage", function() {
	equal( Globalize.format(0.12345, "p"), "12.35 %" );
	equal( Globalize.format(0.12345, "p0"), "12 %" );
	equal( Globalize.format(0.12345, "p4"), "12.3450 %" );
});
