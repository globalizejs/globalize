module.exports = {
	dependencies: function() {
		var Globalize = require( "../../../dist/node-main.js" );

		Globalize.load(
			// core
			require( "../../../external/cldr-data/supplemental/likelySubtags.json" ),
			// relative time
			require( "../../../external/cldr-data/main/en/dateFields.json" ),
			require( "../../../external/cldr-data/main/de/dateFields.json" ),
			// number
			require( "../../../external/cldr-data/main/en/numbers.json" ),
			require( "../../../external/cldr-data/main/de/numbers.json" ),
			require( "../../../external/cldr-data/supplemental/numberingSystems.json" ),
			// plural
			require( "../../../external/cldr-data/supplemental/plurals.json" ),
			require( "../../../external/cldr-data/supplemental/ordinals.json" )
		);

		return Globalize;
	},
	cases: function( Globalize ) {
		var de, en;
		Globalize.locale( "en" );
		de = new Globalize( "de" );
		en = new Globalize( "en" );

		return [
			{ formatter: en.relativeTimeFormatter( "week" ), args: [ -2 ] },
			{ formatter: en.relativeTimeFormatter( "year" ), args: [ 3 ] },
			{ formatter: en.relativeTimeFormatter( "day" ), args: [ 0 ] },
			{ formatter: en.relativeTimeFormatter( "day" ), args: [ 1 ] },
			{ formatter: de.relativeTimeFormatter( "day" ), args: [ 2 ] }
		];
	}
};
