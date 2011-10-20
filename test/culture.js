module( "culture", lifecycle );

test("culture setter", function() {
	// Issue #45: Globalize.culture("es-AO") appears to work but does not set culture
	// For this test to be valid, it must use a selector that is a close
	// but not exact match, so de-DE does not work as it is an exact match
	// de-de would work but is only different by case, so we'll use de-FOO
	var closestReturn, closestSet;
	
	// Set current culture using a close (but not exact) culture selector
	closestReturn = Globalize.culture("de-FOO");
	
	// Get current culture testing set by previous call to culture(sel) setter
	closestSet = Globalize.culture();

	equal( closestReturn.name, "de" );
	equal( closestSet.name, "de" );
});
