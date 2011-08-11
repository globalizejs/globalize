module( "format", lifecycle );

test("Number Formatting - n for number", function() {
	equal( Globalize.format(123.45, "n"), "123.45" );
	equal( Globalize.format(123.45, "n0"), "123" );
	equal( Globalize.format(123.45, "n1"), "123.5" );
});

test("Number Formatting - d for decimal", function() {
	equal( Globalize.format(123.45, "d"), "123" );
	equal( Globalize.format(-123.9, "d"), "-123" );
	equal( Globalize.format(12, "d3"), "012" );
	equal( Globalize.format(-12, "d"), "-12" );
	equal( Globalize.format(-12, "d4"), "-0012" );
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

test("NaN", function() {
	equal( Globalize.format(NaN, "n"), "NaN" );
	equal( Globalize.format(NaN, "n1"), "NaN" );
	equal( Globalize.format(NaN, "d"), "NaN" );
	equal( Globalize.format(NaN, "d1"), "NaN" );
	equal( Globalize.format(NaN, "c"), "NaN" );
	equal( Globalize.format(NaN, "c1"), "NaN" );
	equal( Globalize.format(NaN, "p"), "NaN" );
	equal( Globalize.format(NaN, "p1"), "NaN" );
});

test("Negative Infinity", function() {
	equal( Globalize.format(-Infinity, "n"), "-Infinity" );
	equal( Globalize.format(-Infinity, "n1"), "-Infinity" );
	equal( Globalize.format(-Infinity, "d"), "-Infinity" );
	equal( Globalize.format(-Infinity, "d1"), "-Infinity" );
	equal( Globalize.format(-Infinity, "c"), "-Infinity" );
	equal( Globalize.format(-Infinity, "c1"), "-Infinity" );
	equal( Globalize.format(-Infinity, "p"), "-Infinity" );
	equal( Globalize.format(-Infinity, "p1"), "-Infinity" );
});

test("Positive Infinity", function() {
	equal( Globalize.format(Infinity, "n"), "Infinity" );
	equal( Globalize.format(Infinity, "n1"), "Infinity" );
	equal( Globalize.format(Infinity, "d"), "Infinity" );
	equal( Globalize.format(Infinity, "d1"), "Infinity" );
	equal( Globalize.format(Infinity, "c"), "Infinity" );
	equal( Globalize.format(Infinity, "c1"), "Infinity" );
	equal( Globalize.format(Infinity, "p"), "Infinity" );
	equal( Globalize.format(Infinity, "p1"), "Infinity" );
});
