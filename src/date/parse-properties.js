define([
	"./get-time-zone-data"
], function( dateGetTimeZoneData ) {

/**
 * parseProperties( cldr )
 *
 * @cldr [Cldr instance].
 *
 * @timeZone [String] FIXME.
 *
 * Return parser properties.
 */
return function( cldr, timeZone ) {
	var properties = {
		preferredTimeData: cldr.supplemental.timeData.preferred()
	};

	if ( timeZone ) {
		properties.timeZoneData = dateGetTimeZoneData( cldr, timeZone );
	}

	return properties;
};

});
