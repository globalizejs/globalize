module.exports = {
	dependencies: function() {
		var Globalize = require( "../../../dist/node-main.js" );

		Globalize.load(
			// core
			require( "../../../external/cldr-data/supplemental/likelySubtags.json" ),
			// plural
			require( "../../../external/cldr-data/supplemental/plurals.json" ),
			require( "../../../external/cldr-data/supplemental/ordinals.json" )
		);

		return Globalize;
	},
	cases: function( Globalize ) {
		Globalize.locale( "en" );
		return [
			{ formatter: Globalize.pluralGenerator(), args: [ 0 ] },
			{ formatter: Globalize.pluralGenerator(), args: [ 0.14 ] },

			{ formatter: Globalize( "en" ).pluralGenerator(), args: [ 0 ] },
			{ formatter: Globalize( "en" ).pluralGenerator(), args: [ 1 ] },
			{ formatter: Globalize( "en" ).pluralGenerator(), args: [ 2 ] },
			{ formatter: Globalize( "en" ).pluralGenerator(), args: [ 1412 ] },
			{ formatter: Globalize( "en" ).pluralGenerator(), args: [ 0.14 ] },
			{ formatter: Globalize( "en" ).pluralGenerator(), args: [ 3.14 ] },

			{ formatter: Globalize( "en" ).pluralGenerator( { type: "ordinal" } ), args: [ 0 ] },
			{ formatter: Globalize( "en" ).pluralGenerator( { type: "ordinal" } ), args: [ 1 ] },
			{ formatter: Globalize( "en" ).pluralGenerator( { type: "ordinal" } ), args: [ 2 ] },
			{ formatter: Globalize( "en" ).pluralGenerator( { type: "ordinal" } ), args: [ 3 ] },
			{ formatter: Globalize( "en" ).pluralGenerator( { type: "ordinal" } ), args: [ 1412 ] },
			{ formatter: Globalize( "en" ).pluralGenerator( { type: "ordinal" } ), args: [ 0.14 ] },
			{ formatter: Globalize( "en" ).pluralGenerator( { type: "ordinal" } ), args: [ 3.14 ] },

			{ formatter: Globalize( "ar" ).pluralGenerator(), args: [ 0 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator(), args: [ 1 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator(), args: [ 2 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator(), args: [ 3 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator(), args: [ 6 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator(), args: [ 9 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator(), args: [ 10 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator(), args: [ 11 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator(), args: [ 15 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator(), args: [ 21 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator(), args: [ 70 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator(), args: [ 99 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator(), args: [ 100 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator(), args: [ 101 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator(), args: [ 102 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator(), args: [ 103 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator(), args: [ 111 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator(), args: [ 199 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator(), args: [ 3.14 ] },

			{ formatter: Globalize( "ar" ).pluralGenerator( { type: "ordinal" } ), args: [ 0 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator( { type: "ordinal" } ), args: [ 1 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator( { type: "ordinal" } ), args: [ 2 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator( { type: "ordinal" } ), args: [ 3 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator( { type: "ordinal" } ), args: [ 9 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator( { type: "ordinal" } ), args: [ 10 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator( { type: "ordinal" } ), args: [ 11 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator( { type: "ordinal" } ), args: [ 99 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator( { type: "ordinal" } ), args: [ 100 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator( { type: "ordinal" } ), args: [ 101 ] },
			{ formatter: Globalize( "ar" ).pluralGenerator( { type: "ordinal" } ), args: [ 3.14 ] },


			{ formatter: Globalize( "ja" ).pluralGenerator(), args: [ 0 ] },
			{ formatter: Globalize( "ja" ).pluralGenerator(), args: [ 1 ] },
			{ formatter: Globalize( "ja" ).pluralGenerator(), args: [ 2 ] },
			{ formatter: Globalize( "ja" ).pluralGenerator(), args: [ 3.14 ] },

			{ formatter: Globalize( "pt" ).pluralGenerator(), args: [ 0 ] },
			{ formatter: Globalize( "pt" ).pluralGenerator(), args: [ 1 ] },
			{ formatter: Globalize( "pt" ).pluralGenerator(), args: [ 2 ] },
			{ formatter: Globalize( "pt" ).pluralGenerator(), args: [ 0.1 ] },
			{ formatter: Globalize( "pt" ).pluralGenerator(), args: [ 3.14 ] },

			{ formatter: Globalize( "ru" ).pluralGenerator(), args: [ 0 ] },
			{ formatter: Globalize( "ru" ).pluralGenerator(), args: [ 1 ] },
			{ formatter: Globalize( "ru" ).pluralGenerator(), args: [ 2 ] },
			{ formatter: Globalize( "ru" ).pluralGenerator(), args: [ 3 ] },
			{ formatter: Globalize( "ru" ).pluralGenerator(), args: [ 4 ] },
			{ formatter: Globalize( "ru" ).pluralGenerator(), args: [ 5 ] },
			{ formatter: Globalize( "ru" ).pluralGenerator(), args: [ 6 ] },
			{ formatter: Globalize( "ru" ).pluralGenerator(), args: [ 9 ] },
			{ formatter: Globalize( "ru" ).pluralGenerator(), args: [ 11 ] },
			{ formatter: Globalize( "ru" ).pluralGenerator(), args: [ 12 ] },
			{ formatter: Globalize( "ru" ).pluralGenerator(), args: [ 19 ] },
			{ formatter: Globalize( "ru" ).pluralGenerator(), args: [ 21 ] },
			{ formatter: Globalize( "ru" ).pluralGenerator(), args: [ 22 ] },
			{ formatter: Globalize( "ru" ).pluralGenerator(), args: [ 29 ] },
			{ formatter: Globalize( "ru" ).pluralGenerator(), args: [ 3.14 ] },

			{ formatter: Globalize( "zh" ).pluralGenerator(), args: [ 0 ] },
			{ formatter: Globalize( "zh" ).pluralGenerator(), args: [ 1 ] },
			{ formatter: Globalize( "zh" ).pluralGenerator(), args: [ 2 ] },
			{ formatter: Globalize( "zh" ).pluralGenerator(), args: [ 3.14 ] }
		];
	}
};
