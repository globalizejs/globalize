define([
	"cldr",
	"globalize/core",
	"json!fixtures/cldr/supplemental/likelySubtags.json"
], function( Cldr, Globalize, likelySubtags ) {

Cldr.load( likelySubtags );

module( "Globalize.locale" );

test( "should allow String locale", function() {
	var en = Globalize.locale( "en" );
	equal( en.locale, "en" );
	equal( en instanceof Cldr, true );
});

test( "should allow Cldr instance to be passed as locale", function() {
	var en = new Cldr( "en" );
	equal( Globalize.locale( en ).locale, "en" );
});

});
