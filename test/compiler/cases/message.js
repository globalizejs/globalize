module.exports = {
	dependencies: function() {
		var Globalize = require( "../../../dist/node-main.js" );

		Globalize.load(
			// core
			require( "../../../external/cldr-data/supplemental/likelySubtags.json" )
		);

		Globalize.loadMessages({
			en: {
				greetings: {
					hello: "Hello, {name}"
				}
			}
		});

		return Globalize;
	},
	cases: function( Globalize ) {
		Globalize.locale( "en" );
		return [
			{ formatter: Globalize( "en" ).messageFormatter( "greetings/hello" ), args: [ {
				name: "Beethoven"
			} ] }
		];
	}
};
