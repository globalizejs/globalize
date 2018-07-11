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
		var big = 99999999.99;
		Globalize.locale( "en" );
		return [
			{ formatter: Globalize.numberFormatter(), args: [ Math.PI ] },
			{ formatter: Globalize( "es" ).numberFormatter(), args: [ Math.PI ] },
			{ formatter: Globalize( "ar" ).numberFormatter(), args: [ Math.PI ] },
			{ formatter: Globalize( "zh-u-nu-native" ).numberFormatter(), args: [ Math.PI ] },
			{ formatter: Globalize.numberFormatter(), args: [ big ] },

			{ formatter: Globalize.numberFormatter( {
				minimumIntegerDigits: 2,
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			} ), args: [ Math.PI ] },
			{ formatter: Globalize.numberFormatter( {
				maximumFractionDigits: 0
			} ), args: [ Math.PI ] },
			{ formatter: Globalize.numberFormatter( {
				minimumFractionDigits: 3
			} ), args: [ 1.1 ] },
			{ formatter: Globalize.numberFormatter( {
				minimumSignificantDigits: 1,
				maximumSignificantDigits: 3
			} ), args: [ Math.PI ] },
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
			{ formatter: Globalize.numberFormatter( { useGrouping: false } ), args: [ big ] },

			{ formatter: Globalize.numberFormatter( { style: "percent" } ), args: [ Math.PI ] },
			{ formatter: Globalize( "ar" ).numberFormatter( { style: "percent" } ), args: [ Math.PI ] },
			{ formatter: Globalize.numberFormatter( { compact: "short" } ), args: [ big ] },
			{ formatter: Globalize.numberFormatter( { compact: "long" } ), args: [ big ] }
		];
	}
};
