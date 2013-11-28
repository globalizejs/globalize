require.config({
	paths: {
		fixtures: "./fixtures",
		globalize: "../dist/globalize",
		json: "../external/requirejs-plugins/src/json",
		text: "../external/requirejs-text/text"
	}
});

require([

	/* datetime */
	"./functional/datetime/format"

], function() {
	QUnit.start();
});

