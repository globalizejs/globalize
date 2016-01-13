

var validateMessageBundle = function( cldr ) {
	validate(
		"E_MISSING_MESSAGE_BUNDLE",
		"Missing message bundle for locale `{locale}`.",
		cldr.attributes.bundle && cldr.get( "globalize-messages/{bundle}" ) !== undefined,
		{
			locale: cldr.locale
		}
	);
};

