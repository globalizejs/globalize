

var dateFormatterFn = function( numberFormatters, properties ) {
	return function dateFormatter( value ) {
		validateParameterPresence( value, "value" );
		validateParameterTypeDate( value, "value" );

		return dateFormat( value, numberFormatters, properties );
	};

};

