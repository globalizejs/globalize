

/**
 * format( value, numberFormatter, pluralGenerator, properties )
 *
 * @value [Number] The number to format
 *
 * @numberFormatter [String] A numberFormatter from Globalize.numberFormatter
 *
 * @pluralGenerator [String] A pluralGenerator from Globalize.pluralGenerator
 *
 * @properties [Object] containing relative time plural message.
 *
 * Format relative time.
 */
var relativeTimeFormat = function( value, numberFormatter, pluralGenerator, properties ) {

	var relativeTime,
		message = properties[ "relative-type-" + value ];

	if ( message ) {
		return message;
	}

	relativeTime = value <= 0 ? properties[ "relativeTime-type-past" ]
		: properties[ "relativeTime-type-future" ];

	value = Math.abs( value );

	message = relativeTime[ "relativeTimePattern-count-" + pluralGenerator( value ) ];
	return formatMessage( message, [ numberFormatter( value ) ] );
};

