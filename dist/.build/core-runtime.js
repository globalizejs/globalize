

function Globalize( locale ) {
	if ( !( this instanceof Globalize ) ) {
		return new Globalize( locale );
	}

	validateParameterPresence( locale, "locale" );
	validateParameterTypeString( locale, "locale" );

	this._locale = locale;
}

Globalize.locale = function( locale ) {
	validateParameterTypeString( locale, "locale" );

	if ( arguments.length ) {
		this._locale = locale;
	}
	return this._locale;
};

Globalize._createError = createError;
Globalize._formatMessage = formatMessage;
Globalize._regexpEscape = regexpEscape;
Globalize._runtimeKey = runtimeKey;
Globalize._stringPad = stringPad;
Globalize._validateParameterPresence = validateParameterPresence;
Globalize._validateParameterTypeString = validateParameterTypeString;
Globalize._validateParameterType = validateParameterType;

return Globalize;

