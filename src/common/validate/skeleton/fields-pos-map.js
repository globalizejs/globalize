define(function() {

/**
 * Create a map between the skeleton fields and their positions, e.g.,
 * {
 *   G: 0
 *   y: 1
 *   ...
 * }
 */
return "GyYuUrQqMLlwWEecdDFghHKkmsSAzZOvVXx".split( "" ).reduce(function( memo, item, i ) {
	memo[ item ] = i;
	return memo;
}, {});

});
