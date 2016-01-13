

/**
 * parseProperties( cldr )
 *
 * @cldr [Cldr instance].
 *
 * Return parser properties.
 */
var dateParseProperties = function( cldr ) {
	return {
		preferredTimeData: cldr.supplemental.timeData.preferred()
	};
};

