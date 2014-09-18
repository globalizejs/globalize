define(function() {

/**
 * parseProperties( cldr )
 *
 * @cldr [Cldr instance].
 *
 * Return parser properties.
 */
return function( cldr ) {
	return {
		preferredTimeData: cldr.supplemental.timeData.preferred()
	};
};

});
