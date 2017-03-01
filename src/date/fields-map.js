define([
	"./inverse-fields-map"
], function( dateInverseFieldsMap ) {

// Invert key and values, e.g., {"year": "yY"} ==> {"y": "year", "Y": "year"}
return Object.keys( dateInverseFieldsMap ).reduce( function( map, key ) {
	var value = dateInverseFieldsMap[ key ];
	value.split( "" ).forEach(function( symbol ) {
		map[ symbol ] = key;
	});
	return map;
}, {});

});
