define([
	"../common/format-message-to-parts",
	"../common/parts/push"
], function( formatMessageToParts, partsPush ) {

/**
 * nameFormat( formattedNumber, pluralForm, properties )
 *
 * Return the appropriate name form currency format.
 */
return function( formattedNumber, pluralForm, properties ) {
	var displayName, unitPattern,
		parts = [],
		displayNames = properties.displayNames || {},
		unitPatterns = properties.unitPatterns;

	displayName = displayNames[ "displayName-count-" + pluralForm ] ||
		displayNames[ "displayName-count-other" ] ||
		displayNames.displayName ||
		properties.currency;
	unitPattern = unitPatterns[ "unitPattern-count-" + pluralForm ] ||
		unitPatterns[ "unitPattern-count-other" ];

	formatMessageToParts( unitPattern, [ formattedNumber, displayName ]).forEach(function( part ) {
		if ( part.type === "variable" && part.name === "0" ) {
			part.value.forEach(function( part ) {
				partsPush( parts, part.type, part.value );
			});
		} else if ( part.type === "variable" && part.name === "1" ) {
			partsPush( parts, "currency", part.value );
		} else {
			partsPush( parts, "literal", part.value );
		}
	});

	return parts;
};

});
