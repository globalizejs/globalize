module("parseFloat");

test("basics, float", function() {
	equal( $.global.parseInt("5.51"), 5 );
	equal( $.global.parseFloat("5.51"), 5.51 );
	equal( $.global.parseInt("5,51", 10, "de-DE"), 5 );
	equal( $.global.parseFloat("5,51", 10, "de-DE"), 5.51 );
});

test("format-parse all, float", function() {
	$.each($.global.cultures, function(culture, cultureInfo) {
		// TODO is there a better approach to verify cultures with no/just one decimal?
		var value = cultureInfo.numberFormat.decimals ? cultureInfo.numberFormat.decimals > 1 ? 6.51 : 6.5 : 5;
		var formatted = $.global.format(value, "n", culture);
		equal( $.global.parseFloat(formatted, 10, culture), value, culture + ": " + formatted );
	});
});

test("basics, currency", function() {
	equal( $.global.parseInt("$5.51"), 5 );
	equal( $.global.parseFloat("$5.51"), 5.51 );
	equal( $.global.parseInt("5,51 €", 10, "de-DE"), 5 );
	equal( $.global.parseFloat("5,51 €", 10, "de-DE"), 5.51 );
	equal( $.global.parseFloat("5,51 €", "de-DE"), 5.51, "optional radix" );
});

test("format-parse all, currency", function() {
	$.each($.global.cultures, function(culture, cultureInfo) {
		// TODO is there a better approach to verify cultures with no decimal?
		var value = cultureInfo.numberFormat.currency.decimals ? 6.51 : 5;
		var formatted = $.global.format(value, "c", culture);
		equal( $.global.parseFloat(formatted, culture), value, culture + ": " + formatted );
	});
});

test("format-parse all, date", function() {
	// FIXME
	return;
	$.each($.global.cultures, function(culture, cultureInfo) {
		var value = new Date();
		// TODO is there a better way to get comparable results?
		value.setTime(0);
		var formatted = $.global.format(value, "F", culture);
		deepEqual( $.global.parseDate(formatted, "F", culture), value, culture + ": " + formatted );
	});
});
