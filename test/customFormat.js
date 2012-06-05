test("Number Formatting - custom w/ 0 padding", function() {
	equal( Globalize.format(1234.567, "0"), "1235" );
	equal( Globalize.format(1234.567, ",0"), "1235" );
	equal( Globalize.format(1234.567, "00"), "1235" );
	equal( Globalize.format(1234.567, ".00"), "1234.57" );
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
	equal( Globalize.format(0.567, "#.#"), ".6" );
	equal( Globalize.format(-0.567, "#.#"), "-.6" );
	equal( Globalize.format(1234.567, ",#"), "1235" );
	equal( Globalize.format(1234.567, "##"), "1235" );
	equal( Globalize.format(1234.567, ".##"), "1234.57" );
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
	equal( Globalize.format(1234.567, "0,#,#,0.0#"), "1,234.57" );
	equal( Globalize.format(-0.59, '#,##0.00'), "-0.59" );
	equal( Globalize.format(-2.2, '#,##0.00##'), "-2.20" );
	equal( Globalize.format(-300.35, '#,##0.00##'), "-300.35" );
});

test("Number Formatting - custom w/ mixed # and 0 and integers", function() {
	equal( Globalize.format(1234, "0.0000##"), "1234.0000" );
	equal( Globalize.format(1234, "00000#"), "001234" );
});

test("Number Formatting - custom w/ pattern for +/-", function() {
	equal( Globalize.format(1234.567, "+#;-#"), "+1235" );
	equal( Globalize.format(1234.567, "Positive: 0;Negative: 0;zero;ignored"), "Positive: 1235" );
	equal( Globalize.format(-1234.567, "Positive: 0;Negative: 0;zero;ignored"), "Negative: 1235" );
	equal( Globalize.format(0, "Positive: 0;Negative: 0;zero;ignored"), "zero" );
	equal( Globalize.format(0.00001, "Positive: 0;Negative: 0;zero;ignored"), "zero" );
	equal( Globalize.format(-0.00001, "Positive: 0;Negative: 0.0000#;zero;ignored"), "Negative: 0.00001" );
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
	equal( Globalize.format(5417543010, "(000) 000-0000"), "(541) 754-3010" );
	equal( Globalize.format(123123, "0000|,|000"), "0,123,||123" );
	equal( Globalize.format(1234.567, "# 0 # # 0 0|0.0|0 0 0 # #"), " 0 0 1 2 3|4.5|6 7 0  " );
	equal( Globalize.format(1234.567, "# 0 # #,000.0|0 0 0 # #"), " 0 0 1,234.5|6 7 0  " );
	equal( Globalize.format(1234.567, "# 0 # #,000|.|0|0 0 0 # #"), " 0 0 1,234|.|5|6 7 0  " );
	equal( Globalize.format(-1234.567, "# 0 # # 0 0|0.0|0 0 0 # #"), "- 0 0 1 2 3|4.5|6 7 0  " );
	equal( Globalize.format(-1234.567, "0 # # 0 0|0.0|0 0 0 # #"), "-0 0 1 2 3|4.5|6 7 0  " );
	equal( Globalize.format(-1234.567, "0 # # 0 \\0|0.0|0 0 0 # #"), "-0 1 2 3 0|4.5|6 7 0  " );
	equal( Globalize.format(-1234.567, "<a href=\"\\#go\">#</a>"), "<a href=\"#go\">-1235</a>" );
	equal( Globalize.format(1234.567, '\\\\00000'), "\\01235" );
});

test("Number Formatting - custom w/ various edge cases", function() {
	equal( Globalize.format(1234.567, "#.# \\"), "1234.6 " );
	equal( Globalize.format(1234.567, "#....#"), "1234.6" );
	equal( Globalize.format(1234.567, "#,,,#.#"), "1,234.6" );
	equal( Globalize.format(1234.567, "#.#,#"), "1234.57" );
	equal( Globalize.format(1234.567, ",#.#"), "1234.6" );
	equal( Globalize.format(1234.567, "#,.#"), "1.2" );
	equal( Globalize.format(1234.567, ",.#"), "1234.6" );
	equal( Globalize.format(1234.567, ""), "1234.567" );
	equal( Globalize.format(1234.567, "0000, ,0000, ,0000.00"), "000,0 00,00 1,234.57" );
	equal( Globalize.format(1234.567, "000, ,000, ,000.00"), "000, 001, 234.57" );
	equal( Globalize.format(1234.567, "00 00, ,00, ,00.00"), "00, 00 1,2 34.57" );
	equal( Globalize.format(1234567890, "##0bill ##0mill ##0thousands and ##0"), "1bill 234mill 567thousands and 890" );
	equal( Globalize.format(12.23, "##0bill ##0mill ##0thousands and ##0"), "0bill 000mill 000thousands and 012" );
	equal( Globalize.format(0.1234, ".####"), ".1234" );
	equal( Globalize.format(0.1234, ".## ##"), ".12 34" );
	equal( Globalize.format(0.1234, "."), "" );
	equal( Globalize.format(0.1234, ","), "" );
	equal( Globalize.format(0.1234, ",."), "" );
	equal( Globalize.format(0.1234, "0."), "0" );
	equal( Globalize.format(0, "positive\\;still positive;negative;zero"), "zero" );
});