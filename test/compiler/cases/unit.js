module.exports = {
	dependencies: function() {
		var Globalize = require( "../../../dist/node-main.js" );

		Globalize.load(
			// core
			require( "../../../external/cldr-data/supplemental/likelySubtags.json" ),
			// unit
			require( "../../../external/cldr-data/main/en/units.json" ),
			require( "../../../external/cldr-data/main/de/units.json" ),
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
			{ formatter: Globalize.unitFormatter( "hour", {
				numberFormatter: Globalize.numberFormatter( { minimumIntegerDigits: 1 } )
			} ), args: [ 3 ] },
			{ formatter: Globalize.unitFormatter( "hour", {
				numberFormatter: Globalize.numberFormatter( { minimumIntegerDigits: 2 } )
			} ), args: [ 3 ] },

			{ formatter: en.unitFormatter( "day" ), args: [ 1 ] },
			{ formatter: en.unitFormatter( "day" ), args: [ 100 ] },

			{ formatter: de.unitFormatter( "day" ), args: [ 1 ] },
			{ formatter: de.unitFormatter( "day" ), args: [ 100 ] },

			{ formatter: en.unitFormatter( "day", { form: "long" } ), args: [ 1 ] },
			{ formatter: en.unitFormatter( "day", { form: "long" } ), args: [ 100 ] },

			{ formatter: de.unitFormatter( "day", { form: "long" } ), args: [ 1 ] },
			{ formatter: de.unitFormatter( "day", { form: "long" } ), args: [ 100 ] },

			{ formatter: en.unitFormatter( "second", { form: "short" } ), args: [ 1 ] },
			{ formatter: en.unitFormatter( "second", { form: "short" } ), args: [ 100 ] },

			{ formatter: en.unitFormatter( "second", { form: "narrow" } ), args: [ 1 ] },
			{ formatter: en.unitFormatter( "second", { form: "narrow" } ), args: [ 100 ] },

			{ formatter: en.unitFormatter( "mile-per-hour", { form: "narrow" } ), args: [ 5 ] },

			{ formatter: en.unitFormatter( "mile-per-second", { form: "narrow" } ), args: [ 5 ] },

			{ formatter: en.unitFormatter( "mile/hour", { form: "narrow" } ), args: [ 5 ] },

			{ formatter: en.unitFormatter( "mile/second", { form: "narrow" } ), args: [ 5 ] },

			{ formatter: en.unitFormatter( "mile/hour", { form: "short" } ), args: [ 55000 ] },
			{ formatter: de.unitFormatter( "mile/hour", { form: "short" } ), args: [ 55000 ] }
		];
	}
};
