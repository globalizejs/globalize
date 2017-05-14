module.exports = {
	dependencies: function() {
		var Globalize = require( "../../../dist/node-main.js" );

		Globalize.load(
			// core
			require( "../../../external/cldr-data/supplemental/likelySubtags.json" ),
			// number
			require( "../../../external/cldr-data/main/ar/numbers.json" ),
			require( "../../../external/cldr-data/main/en/numbers.json" ),
			require( "../../../external/cldr-data/main/es/numbers.json" ),
			require( "../../../external/cldr-data/main/zh/numbers.json" ),
			require( "../../../external/cldr-data/supplemental/numberingSystems.json" )
		);

		return Globalize;
	},
	cases: function( Globalize ) {
		var pi = 3.14159265359;
		Globalize.locale( "en" );
		return [
			{ formatter: Globalize.numberFormatter(), args: [ pi ] },
			{ formatter: Globalize( "es" ).numberFormatter(), args: [ pi ] },
			{ formatter: Globalize( "ar" ).numberFormatter(), args: [ pi ] },
			{ formatter: Globalize( "zh-u-nu-native" ).numberFormatter(), args: [ pi ] },
			{ formatter: Globalize.numberFormatter(), args: [ 99999999.99 ] },

			{ formatter: Globalize.numberFormatter( {
				minimumIntegerDigits: 2,
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			} ), args: [ pi ] },
			{ formatter: Globalize.numberFormatter( {
				maximumFractionDigits: 0
			} ), args: [ pi ] },
			{ formatter: Globalize.numberFormatter( {
				minimumFractionDigits: 3
			} ), args: [ 1.1 ] },
			{ formatter: Globalize.numberFormatter( {
				minimumSignificantDigits: 1,
				maximumSignificantDigits: 3
			} ), args: [ pi ] },
			{ formatter: Globalize.numberFormatter( {
				minimumSignificantDigits: 1,
				maximumSignificantDigits: 3
			} ), args: [ 12345 ] },
			{ formatter: Globalize.numberFormatter( {
				minimumSignificantDigits: 1,
				maximumSignificantDigits: 3
			} ), args: [ 0.00012345 ] },
			{ formatter: Globalize.numberFormatter( {
				minimumSignificantDigits: 1,
				maximumSignificantDigits: 3
			} ), args: [ 0.00010001 ] },
			{ formatter: Globalize.numberFormatter( { useGrouping: false } ), args: [ 99999999.99 ] },

			{ formatter: Globalize.numberFormatter( { style: "percent" } ), args: [ pi ] },
			{ formatter: Globalize( "ar" ).numberFormatter( { style: "percent" } ), args: [ pi ] }
		];
	}
};
