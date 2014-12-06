/*!
 * Globalize v@VERSION
 *
 * http://github.com/jquery/globalize
 *
 * Copyright 2010, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: @DATE
 */

var Globalize,
	cldrData = require( "cldr-data" );

// Core
module.exports = Globalize = require( "./globalize" );

// Extent core with the following modules
require( "./globalize/date" );
require( "./globalize/message" );
require( "./globalize/number" );
require( "./globalize/plural" );

// Auto-load CLDR content for:
Globalize.load(

	// ... core module
	cldrData( "supplemental/likelySubtags" ),

	// ... date module
	cldrData.main( "ca-gregorian" ),
	cldrData.main( "timeZoneNames" ),
	cldrData( "supplemental/timeData" ),
	cldrData( "supplemental/weekData" ),

	// ... number module
	cldrData.main( "numbers" ),

	// ... plural module
	cldrData( "supplemental/plurals" )
);


