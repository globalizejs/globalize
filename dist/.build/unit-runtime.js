

Globalize._unitFormatterFn = unitFormatterFn;

Globalize.formatUnit =
Globalize.prototype.formatUnit = function( value, unit, options ) {
	return this.unitFormatter( unit, options )( value );
};

Globalize.unitFormatter =
Globalize.prototype.unitFormatter = function( unit, options ) {
	return Globalize[ runtimeKey( "unitFormatter", this._locale, [ unit, options ] ) ];
};

return Globalize;

