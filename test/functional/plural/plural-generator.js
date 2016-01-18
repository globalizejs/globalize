define([
	"globalize",
	"json!cldr-data/supplemental/likelySubtags.json",
	"json!cldr-data/supplemental/plurals.json",
	"json!cldr-data/supplemental/ordinals.json",
	"../../util",

	"globalize/plural"
], function( Globalize, likelySubtags, plurals, ordinals, util ) {

QUnit.module( ".pluralGenerator()", {
	setup: function() {
		Globalize.load( likelySubtags, plurals, ordinals, {
			main: {
				en: {}
			}
		});
		Globalize.locale( "en" );
	},
	teardown: util.resetCldrContent
});

QUnit.test( "should allow for runtime compilation", function( assert ) {
	util.assertRuntimeBind(
		assert,
		Globalize.pluralGenerator(),
		"a1662346136",
		"Globalize(\"en\").pluralGenerator({})",
		function( runtimeArgs ) {
			assert.equal( runtimeArgs[ 0 ].toString(), "function(n) {   var s = " +
				"String(n).split(\'.\'), v0 = !s[1];\n  return (n == 1 && v0) ? " +
				"\'one\' : \'other\';\n}"
			);
		}
	);
});

});
