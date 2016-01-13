

var pluralGeneratorFn = function( plural ) {
	return function pluralGenerator( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeNumber( value, "value" );

		return plural( value );
	};
};

