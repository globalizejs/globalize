define([
	"./core",
	"./common/validate",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/parameter-key-presence",
	"./common/validate/parameter-presence",
	"./common/validate/parameter-type",
	"./common/validate/parameter-type/number",
	"./common/validate/parameter-type/plain-object",
	"./plural/form",
	"./common/format-message"
], function( Globalize, validate, validateCldr, validateDefaultLocale, validateParameterKeyPresence,
	validateParameterPresence, validateParameterType, validateParameterTypeNumber,
	validateParameterTypePlainObject, pluralForm, formatMessage ) {

/**
 * .formatPlural( value, data, formatValue )
 *
 * @value [Number]
 *
 * @messageData [JSON] eg. { one: "{0} second", other: "{0} seconds" }
 *
 * @formatValue [String|Number] It defaults to `value`. It's used to replace the
 * {0} variable of plural messages.
 *
 * Return the appropriate message based on value's plural group: zero | one |
 * two | few | many | other.
 */
Globalize.formatPlural =
Globalize.prototype.formatPlural = function( value, messageData, formatValue ) {
	var form;

	// Note: validateParameterTypeNumber( value, "value" ) is deferred to this.plural().
	validateParameterPresence( value, "value" );
	validateParameterPresence( messageData, "messageData" );
	validateParameterTypePlainObject( messageData, "messageData" );

	validateParameterType(
		formatValue,
		"formatValue",
		formatValue === undefined || typeof formatValue === "string" ||
			typeof formatValue === "number",
		"String or Number"
	);

	form = this.plural( value );

	// formatValue defaults to value, but it accepts anything including empty strings.
	formatValue = formatValue === undefined ? value : formatValue;

	validateParameterKeyPresence( messageData, "messageData", form );

	return formatMessage( messageData[ form ], [ formatValue ] );
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
	var cldr, form;

	validateParameterPresence( value, "value" );
	validateParameterTypeNumber( value, "value" );

	cldr = this.cldr;

	validateDefaultLocale( cldr );

	cldr.on( "get", validateCldr );
	form = pluralForm( value, cldr );
	cldr.off( "get", validateCldr );

	validate( "E_INVALID_CLDR", "{description}", typeof form === "string", {
		description: "Missing rules to deduce plural form of `" + value + "`"
	});

	return form;
};

return Globalize;

});
