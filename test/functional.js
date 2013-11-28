require.config({
	paths: {
		fixtures: "./fixtures",
		globalize: "../dist/globalize",
		json: "../external/requirejs-plugins/src/json",
		src: "../src",
		text: "../external/requirejs-text/text"
	}
});

require([

	/* datetime */
	"./functional/datetime/format",
	"./functional/datetime/parse"

], function() {
	QUnit.start();
});

