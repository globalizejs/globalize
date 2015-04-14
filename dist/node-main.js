/*!
 * Globalize v1.0.0-alpha.20
 *
 * http://github.com/jquery/globalize
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-14T12:27Z
 */

// Core
module.exports = require( "./globalize" );

// Extent core with the following modules
require( "./globalize/message" );
require( "./globalize/number" );
require( "./globalize/plural" );

// Load after globalize/number
require( "./globalize/currency" );
require( "./globalize/date" );

// Load after globalize/number and globalize/plural
require( "./globalize/relative-time" );
