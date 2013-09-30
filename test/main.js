require.config({
	paths: {
		globalize: "../src"
	}
});

require([

	/* datetime */
	"./spec/datetime/format"

], function() {
	mocha.run();
});

