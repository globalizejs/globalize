/*!
 * Globalize v1.7.1
 *
 * https://github.com/globalizejs/globalize
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2025-09-29T18:41Z
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
require( "./globalize/unit" );
