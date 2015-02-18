define([
	"../common/format-message"
], function( formatMessage ) {

/**
 * format( formattedNumber, pluralForm, properties )
 *
 * @formattedNumber [String]
 *
 * @pluralForm [String]
 *
 * @properties [Object] containing relative time plural message.
 *
 * Format relative time.
 */
return function( value, numberFormatter, pluralGenerator, properties ) {

	var relativeTime, message = properties[ "relative-type-" + value ];

	if (message) {
		return message;
	}

	relativeTime = value < 0 ? properties[ "relativeTime-type-past" ]
							 : properties[ "relativeTime-type-future" ];

	value = Math.abs(value);

	message = relativeTime[ "relativeTimePattern-count-" + pluralGenerator(value) ];
	return formatMessage( message, [ numberFormatter(value) ] );
};

});
