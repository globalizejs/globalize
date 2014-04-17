define([
	"./core",
	"./common/validate",
	"./common/validate/cldr",
	"./common/validate/default-locale",
	"./common/validate/presence",
	"./common/validate/type/number",
	"./common/validate/type/plain-object",
	"./common/validate/type/plural-format-value",
	"./plural/form",
	"./common/format-message"
], function( Globalize, validate, validateCldr, validateDefaultLocale, validatePresence, validateTypeNumber, validateTypePlainObject, validateTypePluralFormatValue, pluralForm, formatMessage ) {

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

	// Note: validateTypeNumber( value, "value" ) is deferred to this.plural().
	validatePresence( value, "value" );
	validatePresence( data, "data" );
	validateTypePlainObject( data, "data" );
	validateTypePluralFormatValue( formatValue, "formatValue" );

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
	var cldr, form;

	validatePresence( value, "value" );
	validateTypeNumber( value, "value" );

	cldr = this.cldr;

	validateDefaultLocale( cldr );

	cldr.on( "get", validateCldr );
	form = pluralForm( value, cldr );
	cldr.off( "get", validateCldr );

	validate( "E_PLURAL_FORM_NOT_FOUND", "Plural form not found for value `{value}`", typeof form === "string", {
		value: value
	});

	return form;
};

return Globalize;

});
