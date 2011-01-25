module("findClosestCulture");

test("match xx for xx-XX request", function() {
	var all = $.global.cultures,
		de = $.global.cultures.de,
		deDE = $.global.cultures["de-DE"];
	$.global.cultures = {
		de: de,
		"de-DE": deDE
	};
	
	// use QUnit.equiv to avoid page-long printing
	ok( QUnit.equiv($.global.findClosestCulture("de"), de) );
	
	$.global.cultures = {
		"de-DE": deDE
	};
	
	// use QUnit.equiv to avoid page-long printing
	ok( QUnit.equiv($.global.findClosestCulture("de"), deDE) );
	
	$.global.cultures = all;
});