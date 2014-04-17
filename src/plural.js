define([
	"./core",
	"./plural/form",
	"./common/format-message"
], function( Globalize, pluralForm, formatMessage ) {

/**
 * .formatPlural( value, data, formatValue )
 *
 * @value [Number]
 *
 * @data [JSON] eg. { one: "{0} second", other: "{0} seconds" }
 *
 * @formatValue [String|Number] It defaults to `value`. It's used to replace the
 * {0} variable of plural messages.
 *
 * Return the appropriate message based on value's plural group: zero | one |
 * two | few | many | other.
 */
Globalize.formatPlural =
Globalize.prototype.formatPlural = function( value, data, formatValue ) {
	formatValue = formatValue || value;
	return formatMessage( data[ this.plural( value ) ], [ formatValue ] );
};

/**
 * .plural( value )
 *
 * @value [Number]
 *
 * Return the corresponding form (zero | one | two | few | many | other) of a
 * value given locale.
 */
Globalize.plural =
Globalize.prototype.plural = function( value ) {
	var form;

	if ( typeof value !== "number" ) {
		throw new Error( "Value is not a number" );
	}

	if ( !( form = pluralForm( value, this.cldr ) ) ) {
		throw new Error( "Plural form not found!" );
	}

	return form;
};

return Globalize;

});
