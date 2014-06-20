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
return function( formattedNumber, pluralForm, properties ) {
	var message;

	// FIXME REMOVEME Impementation based on:
	// http://www.unicode.org/reports/tr35/tr35-dates.html#Calendar_Fields
	//
	// Feel free to create any helper function you judge necessary. They must all
	// live inside src/relative-time/. Ideally, each file must hold one single
  // function for easy unit testing.

	message = properties[ "relativeTime-type-past" ][ "relativeTimePattern-count-" + pluralForm ];
	return formatMessage( message, [ formattedNumber ] );
};

});
