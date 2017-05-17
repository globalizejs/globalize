module.exports = {
	dependencies: function() {
		var Globalize = require( "../../../dist/node-main.js" );

		Globalize.load(
			// core
			require( "../../../external/cldr-data/supplemental/likelySubtags.json" ),
			// currency
			require( "../../../external/cldr-data/main/en/currencies.json" ),
			require( "../../../external/cldr-data/main/de/currencies.json" ),
			require( "../../../external/cldr-data/main/zh/currencies.json" ),
			require( "../../../external/cldr-data/supplemental/currencyData.json" ),
			// number
			require( "../../../external/cldr-data/main/en/numbers.json" ),
			require( "../../../external/cldr-data/main/de/numbers.json" ),
			require( "../../../external/cldr-data/main/zh/numbers.json" ),
			require( "../../../external/cldr-data/supplemental/numberingSystems.json" ),
			// plural
			require( "../../../external/cldr-data/supplemental/plurals.json" ),
			require( "../../../external/cldr-data/supplemental/ordinals.json" )
		);

		return Globalize;
	},
	cases: function( Globalize ) {
		var accounting = { style: "accounting" },
			code = { style: "code" },
			name = { style: "name" },
			teslaS = 69900;

		var de, zh;

		de = Globalize( "de" );
		zh = Globalize( "zh" );
		Globalize.locale( "en" );

		return [
			{ formatter: Globalize.currencyFormatter( "USD" ), args: [ teslaS ] },
			{ formatter: de.currencyFormatter( "USD" ), args: [ teslaS ] },
			{ formatter: zh.currencyFormatter( "USD" ), args: [ teslaS ] },

			{ formatter: Globalize.currencyFormatter( "USD" ), args: [ -teslaS ] },
			{ formatter: de.currencyFormatter( "USD" ), args: [ -teslaS ] },
			{ formatter: zh.currencyFormatter( "USD" ), args: [ -teslaS ] },

			{ formatter: Globalize.currencyFormatter( "USD", code ), args: [ teslaS ] },
			{ formatter: de.currencyFormatter( "USD", code ), args: [ teslaS ] },
			{ formatter: zh.currencyFormatter( "USD", code ), args: [ teslaS ] },

			{ formatter: Globalize.currencyFormatter( "USD", name ), args: [ teslaS ] },
			{ formatter: de.currencyFormatter( "USD", name ), args: [ teslaS ] },
			{ formatter: zh.currencyFormatter( "USD", name ), args: [ teslaS ] },

			{ formatter: Globalize.currencyFormatter( "USD", accounting ), args: [ -1 ] },

			{ formatter: Globalize.currencyFormatter( "CLF" ), args: [ 12345 ] },
			{ formatter: Globalize.currencyFormatter( "CLF" ), args: [ 12345.67 ] },
			{ formatter: Globalize.currencyFormatter( "ZWD" ), args: [ 12345 ] },
			{ formatter: Globalize.currencyFormatter( "ZWD" ), args: [ 12345.67 ] },
			{ formatter: Globalize.currencyFormatter( "JPY" ), args: [ 12345.67 ] },
			{ formatter: Globalize.currencyFormatter( "CLF", code ), args: [ 12345.67 ] },
			{ formatter: Globalize.currencyFormatter( "CLF", name ), args: [ 12345.67 ] },

			{ formatter: Globalize.currencyFormatter( "CLF", {
				minimumFractionDigits: 0
			}), args: [ 12345 ] },
			{ formatter: Globalize.currencyFormatter( "CLF", {
				style: "code",
				minimumFractionDigits: 0
			}), args: [ 12345 ] },
			{ formatter: Globalize.currencyFormatter( "CLF", {
				style: "name",
				minimumFractionDigits: 0
			}), args: [ 12345 ] }
		];
	}
};
