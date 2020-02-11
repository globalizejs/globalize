define([
	"./parts/push"
], function( partsPush ) {

/**
 * formatMessage( message, data )
 *
 * @message [String] A message with optional {vars} to be replaced.
 *
 * @data [Array or JSON] Object with replacing-variables content.
 *
 * Return the formatted message. For example:
 *
 * - formatMessage( "{0} second", [ 1 ] );
 * > [{type: "variable", value: "1", name: "0"}, {type: "literal", value: " second"}]
 *
 * - formatMessage( "{0}/{1}", ["m", "s"] );
 * > [
 *     { type: "variable", value: "m", name: "0" },
 *     { type: "literal", value: " /" },
 *     { type: "variable", value: "s", name: "1" }
 *   ]
 */
return function( message, data ) {

	var lastOffset = 0,
		parts = [];

	// Create parts.
	message.replace( /{[0-9a-zA-Z-_. ]+}/g, function( nameIncludingBrackets, offset ) {
		var name = nameIncludingBrackets.slice( 1, -1 );
		partsPush( parts, "literal", message.slice( lastOffset, offset ));
		partsPush( parts, "variable", data[ name ] );
		parts[ parts.length - 1 ].name = name;
		lastOffset += offset + nameIncludingBrackets.length;
	});

	// Skip empty ones such as `{ type: 'literal', value: '' }`.
	return parts.filter(function( part ) {
		return part.value !== "";
	});
};

});
