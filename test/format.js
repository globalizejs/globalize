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

test("Number Formatting - custom w/ 0 padding", function() {
	equal( Globalize.format(1234.567, "0"), "1235" );
	equal( Globalize.format(1234.567, ",0"), "1235" );
	equal( Globalize.format(1234.567, "00"), "1235" );
	equal( Globalize.format(1234.567, ".00"), ".57" );
	equal( Globalize.format(1234.567, "00000"), "01235" );
	equal( Globalize.format(1234.567, "000.00"), "1234.57" );
	equal( Globalize.format(1234.123, "000.00"), "1234.12" );
	equal( Globalize.format(-1234.567, "00000"), "-01235" );
	equal( Globalize.format(-1234.567, "000.00"), "-1234.57" );
	equal( Globalize.format(2.34e12, "000.00"), "2340000000000.00" );
	equal( Globalize.format(1234.567, "0.0"), "1234.6" );
	equal( Globalize.format(1234.567, "0.00"), "1234.57" );
	equal( Globalize.format(1234.567, "0.000"), "1234.567" );
	equal( Globalize.format(1234.567, "0.0000"), "1234.5670" );
	equal( Globalize.format(1234.567, "0,0.00"), "1,234.57" );
	equal( Globalize.format(1234.567, "0000000.00"), "0001234.57" );
	equal( Globalize.format(1234.567, "000000,0.00"), "0,001,234.57" );
	equal( Globalize.format(1234.567, "0,000,000.00"), "0,001,234.57" );
	equal( Globalize.format(1234.567, "0,0,0,0.00"), "1,234.57" );
	equal( Globalize.format(1234.567, "0,0,0,0,0.00"), "01,234.57" );
});

test("Number Formatting - custom w/ #", function() {
	equal( Globalize.format(1234.567, "#"), "1235" );
	equal( Globalize.format(1234.567, "#."), "1235" );
	equal( Globalize.format(1234.567, ",#"), "1235" );
	equal( Globalize.format(1234.567, "##"), "1235" );
	equal( Globalize.format(1234.567, ".##"), ".57" );
	equal( Globalize.format(1234.567, "#####"), "1235" );
	equal( Globalize.format(1234.567, "###.##"), "1234.57" );
	equal( Globalize.format(-1234.567, "#####"), "-1235" );
	equal( Globalize.format(-1234.567, "###.##"), "-1234.57" );
	equal( Globalize.format(1234.567, "#.#"), "1234.6" );
	equal( Globalize.format(1234.567, "#.##"), "1234.57" );
	equal( Globalize.format(1234.567, "#.###"), "1234.567" );
	equal( Globalize.format(1234.567, "#.####"), "1234.567" );
	equal( Globalize.format(1234.567, "#,#.##"), "1,234.57" );
	equal( Globalize.format(1234.567, "#,#,#.##"), "1,234.57" );
});

test("Number Formatting - custom w/ mixed # and 0", function() {
	equal( Globalize.format(1234.567, "#00000"), "01235" );
	equal( Globalize.format(1234.567, "#,##0"), "1,235" );
	equal( Globalize.format(1234.567, "#,##0.00"), "1,234.57" );
	equal( Globalize.format(1234.567, "###.#0"), "1234.57" );
	equal( Globalize.format(1234.567, "###.0#"), "1234.57" );
	equal( Globalize.format(1234.567, "#,###.00"), "1,234.57" );
	equal( Globalize.format(1234.567, "#,0.0#"), "1,234.57" );
});

test("Number Formatting - custom w/ pattern for +/-", function() {
	equal( Globalize.format(1234.567, "+#;-#"), "+1235" );
	equal( Globalize.format(1234.567, "Positive: 0;Negative: 0;zero;ignored"), "Positive: 1235" );
	equal( Globalize.format(-1234.567, "Positive: 0;Negative: 0;zero;ignored"), "Negative: 1235" );
	equal( Globalize.format(0, "Positive: 0;Negative: 0;zero;ignored"), "zero" );
	equal( Globalize.format(0.00001, "Positive: 0;Negative: 0;zero;ignored"), "zero" );
	equal( Globalize.format(0.00001, "Positive: 0;Negative: 0.0000#;zero;ignored"), "Negative: 0.00001" );
	equal( Globalize.format(0.00001, "Positive: 0;Negative: 0;;ignored"), "Positive: 0" );
	equal( Globalize.format(-0.00001, "Positive: 0;Negative: 0;;ignored"), "Positive: 0" );
	// the test below gives a different result (zero) in C#.
	// I do not believe that is the expected behaviour, as if I want to add
	// a positive/negative class to an element, it'd be extremely wrong to receive
	// zero or positive for a negative number.
	equal( Globalize.format(-0.00001, "positive;negative;zero;ignored"), "negative" );
	equal( Globalize.format(-0.00001, "Positive: 0;;zero;ignored"), "zero" );
});

test("Number Formatting - custom w/ non-formatting text", function() {
	equal( Globalize.format(1234.567, "# 0 # # 0 0|0.0|0 0 0 # #"), " 0 0 1 2 3|4.5|6 7 0" );
	equal( Globalize.format(-1234.567, "# 0 # # 0 0|0.0|0 0 0 # #"), "- 0 0 1 2 3|4.5|6 7 0" );
	equal( Globalize.format(-1234.567, "0 # # 0 0|0.0|0 0 0 # #"), "-0 0 1 2 3|4.5|6 7 0" );
	equal( Globalize.format(-1234.567, "0 # # 0 \\0|0.0|0 0 0 # #"), "-0 1 2 3 0|4.5|6 7 0" );
	equal( Globalize.format(1234.567, "<a href=\"\\#go\">#</a>"), "<a href=\"#go\">1235</a>" );
	equal( Globalize.format(1234.567, '\\\\00000'), "\\01235" );
});

test("Number Formatting - custom w/ various edge cases", function() {
	equal( Globalize.format(1234.567, "#.# \\"), "1234.6 " );
	equal( Globalize.format(1234.567, "#....#"), "1234.6 " );
	equal( Globalize.format(1234.567, "#,,,#.#"), "1234.6 " );
	equal( Globalize.format(1234.567, "#.#,#"), "1234.6 " );
	equal( Globalize.format(1234.567, ",#.#"), "1234.6" );
	equal( Globalize.format(1234.567, "#,.#"), "1.2" );
	equal( Globalize.format(1234.567, ",.#"), "1234.6" );
	equal( Globalize.format(1234.567, ""), "1234.567" );
	equal( Globalize.format(1234.567, "0000, ,0000, ,0000.00"), "000,0 00,00 1,234.57" );
	equal( Globalize.format(1234.567, "000, ,000, ,000.00"), "000, 001, 234.57" );
	equal( Globalize.format(1234.567, "00 00, ,00, ,00.00"), "00, 00 1,2 34.57" );
	equal( Globalize.format(1234567890, "##0bill ##0mill ##0thousands and ##0"), "1bill 234mill 567thousands and 890" );
	equal( Globalize.format(12,23, "##0bill ##0mill ##0thousands and ##0"), "0bill 000mill 000thousands and 012" );
	equal( Globalize.format(0.1234, ".####"), ".1234" );
	equal( Globalize.format(0.1234, ".## ##"), ".12 34" );
	equal( Globalize.format(0.1234, "."), "" );
	equal( Globalize.format(0.1234, ","), "" );
	equal( Globalize.format(0.1234, ",."), "" );
	equal( Globalize.format(0.1234, "0."), "0" );
	equal( Globalize.format(0, "positive\\;still positive;negative;zero"), "zero" );
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

test("expontential notation", function() {
	equal( Globalize.format( 1e-0, "n9" ), "1.000000000" );
	equal( Globalize.format( 1e-1, "n9" ), "0.100000000" );
	equal( Globalize.format( 1e-2, "n9" ), "0.010000000" );
	equal( Globalize.format( 1e-3, "n9" ), "0.001000000" );
	equal( Globalize.format( 1e-4, "n9" ), "0.000100000" );
	equal( Globalize.format( 1e-5, "n9" ), "0.000010000" );
	equal( Globalize.format( 1e-6, "n9" ), "0.000001000" );
	equal( Globalize.format( 1e-7, "n9" ), "0.000000100" );
	equal( Globalize.format( 1e-8, "n9" ), "0.000000010" );
	equal( Globalize.format( 1e-9, "n9" ), "0.000000001" );
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
