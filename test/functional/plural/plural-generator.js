define([
	"globalize",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/plurals.json",
	"json!cldr-data/supplemental/ordinals.json",
	"../../util",

	"globalize/plural"
], function( Globalize, likelySubtags, plurals, ordinals, util ) {

QUnit.module( ".pluralGenerator()", {
	beforeEach: function() {
		Globalize.load( likelySubtags, plurals, ordinals, {
			main: {
				en: {}
			}
		});
		Globalize.locale( "en" );
	},
	afterEach: util.resetCldrContent
});

});
