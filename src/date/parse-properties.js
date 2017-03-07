define(function() {

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
		properties.timeZoneData = {
			offsets: cldr.get([ "globalize-iana/zoneData", timeZone, "offsets" ]),
			untils: cldr.get([ "globalize-iana/zoneData", timeZone, "untils" ]),
			isdsts: cldr.get([ "globalize-iana/zoneData", timeZone, "isdsts" ])
		};
	}

	return properties;
};

});
