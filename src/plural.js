define([
	"./core",
	"./plural/form"
], function( Globalize, pluralForm ) {

/**
 * Globalize.formatPlural( value, messageData )
 *
 * @value [Number]
 *
 * @messageData [JSON]
 *
 * Return the appropriate message based on value's plural group: zero | one | two | few | many | other.
 */
Globalize.formatPlural =
Globalize.prototype.formatPlural =
function( value, messageData ) {
	var form;

	if ( typeof value !== "number" ) {
		throw new Error( "Value is not a number" );
	}

	if ( !( form = pluralForm( value, this.cldr ) ) ) {
		throw new Error( "Plural form not found!" );
	}

	return messageData[ form ];
};

return Globalize;

});
