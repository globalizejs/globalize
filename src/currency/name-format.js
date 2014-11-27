define([
	"../common/format-message"
], function( formatMessage ) {

/**
 */
return function( value, pluralForm, properties ) {
	var displayNames = properties.displayNames,
		unitPatterns = properties.unitPatterns;

	return formatMessage( unitPatterns[ pluralForm ] || unitPatterns.other, [
		value,
		displayNames[ pluralForm ] || displayNames.other
	]);
};

});
