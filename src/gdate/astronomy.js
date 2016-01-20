/* Astronomy routines, taken from the ICU CalendarAstronomer package */
/* times are milliseconds from the Unix epoch, 1/1/1970 00:00 GMT */

define([
	"./Gdate"
], function( Gdate ) {

var EPSILON = 60000, // one minute accuracy
	DAY_MS = 86400000, // ms in a day
	JD_EPOCH_MS = -210866760000000, // time of the julian day epoch, January 1, 4713 BCE
	JD_SUN_EPOCH = 2447891.5, // Julian day of the calculation epoch (December 31, 1989)
	MOON_L0 = 318.351648 * Math.PI / 180,   // Mean long. at epoch
	MOON_P0 =  36.340410 * Math.PI / 180,  // Mean long. of perigee
	MOON_N0 = 318.510107 * Math.PI / 180,   // Mean long. of node
	MOON_I  =   5.145366 * Math.PI / 180,   // Inclination of orbit
	MOON_E  =   0.054900,            // Eccentricity of orbit
	DEG2RAD = Math.PI / 180, // convert degrees to radians
	SUN_ETA_G = 4.89078, // Ecliptic longitude at epoch, from
	// https://www.nrel.gov/midc/solpos/spa.html for 1970-01-01 at 00:00
	SUN_OMEGA_G = 282.9372 * Math.PI / 180, // Ecliptic longitude at perigee
	SYNODIC_MONTH = 29.530588853, // solar days from one new moon to the next
	TROPICAL_YEAR = 365.242191, //  days of a year, from vernal equinox to vernal equinox
	TAU = 2 * Math.PI; // http://tauday.com/

Gdate.TAU = TAU;

/* returns the time of the next (if next is true) or
	last (if next is false) winter solstice from the time now */
Gdate.winterSolstice = function( now, next  ) {
	return timeOfAngle(
		sunLongitude,
		Math.PI * 3 / 2, // winter solstice is when the sun is at 270 degrees
		now,
		TROPICAL_YEAR * DAY_MS,
		next
	);
};

function sunLongitude( time ){
	return normTAU( trueSunAnomaly( time ) + SUN_OMEGA_G );
}
Gdate.sunLongitude = sunLongitude;

function ms2jd( time ){
	return ( time - JD_EPOCH_MS ) / DAY_MS;
}
Gdate.ms2jd = ms2jd;
function jd2ms ( jd ){
	return ( jd * DAY_MS ) + JD_EPOCH_MS;
}
Gdate.ms2jd = ms2jd;
Gdate.date2jd = function( date ) { return ms2jd( date.getTime() ); };
Gdate.jd2date = function( jd ) { return new Date( jd2ms ( jd ) ); };

/* returns the time of the next (if next is true) or
    last (if next is false) new moon from the time now */
function newMoon ( now, next ){
	return timeOfAngle(
		moonAge,
		0,
		now,
		SYNODIC_MONTH * DAY_MS,
		next
	);
}
Gdate.newMoon = newMoon;

/* the "anomaly" is the longitude of a celestial body, calculated as radians from perigee.
 * Calculating the "mean anomaly" is relatively
 * easy: it is the angle for a circular orbit.
 * The true anomaly takes the eccentricity of the orbit
 * into account.
 */
function meanSunAnomaly ( time ){
	var day = time  / DAY_MS,
		epochAngle = normTAU( TAU * day / TROPICAL_YEAR );
	return normTAU( epochAngle + SUN_ETA_G - SUN_OMEGA_G );
}
function trueSunAnomaly( time ){
	// From formulas in http://www.stargazing.net/kepler/kepler.html
	var meanAnomaly = meanSunAnomaly ( time );
	return meanAnomaly +
		0.0334168338 * Math.sin( meanAnomaly ) +
		0.0003489884 * Math.sin( 2 * meanAnomaly ) +
		5.05374684623142E-006 * Math.sin( 3 * meanAnomaly );
}

/* returns the angle between the ecliptic longitude of the sun and the moon */
/* see the ICU CalendarAstronomer method getMoonPosition */
/* unfortunately, their source used degrees for the constants, 
   so there's a lot of conversions here */
function moonAge( time ){
	sunLong = sunLongitude ( time );
	meanAnomalySun = meanSunAnomaly( time );
	day = ms2jd ( time ) - JD_SUN_EPOCH; // days since the calculation epoch
	meanLongitude = normTAU( day * 13.1763966 * DEG2RAD + MOON_L0 );
	meanAnomalyMoon = normTAU( meanLongitude - day * 0.1114041 * DEG2RAD - MOON_P0 );
	evection = 1.2739 * DEG2RAD * Math.sin( 2 * (meanLongitude - sunLong ) - meanAnomalyMoon );
	annual = 0.1858 * DEG2RAD * Math.sin( meanAnomalySun );
	meanAnomalyMoon += evection - annual - 0.3700 * DEG2RAD * Math.sin( meanAnomalySun );
	center = 6.2886 * DEG2RAD * Math.sin( meanAnomalyMoon ) +
		0.2140 * DEG2RAD * Math.sin ( 2 * meanAnomalyMoon );
	moonLongitude = meanLongitude + evection + center - annual;
	variation = 0.6583 * DEG2RAD * Math.sin( 2 * ( moonLongitude - sunLong ) );
	moonLongitude += variation;
	// the ascending node is the point where the ecliptic crosses the moon's orbit
	nodeLongitude = normTAU ( MOON_N0 - day * 0.0529529 * DEG2RAD ) -
		0.16 * DEG2RAD * Math.sin( meanAnomalySun );
	x = Math.cos ( moonLongitude - nodeLongitude );
	y = Math.sin ( moonLongitude - nodeLongitude );
	moonEclipLong = Math.atan2( y * Math.cos( MOON_I ), x) + nodeLongitude;
	return normTAU( moonEclipLong - sunLong)
}

/* given a function func( time ) that returns an angle, uses interpolation
 * to return the time when the function
 * will have the desired angle, either after (next === true) or
 * before (next === false) the initial time.
 * period is the approximate periodicity of func, used for the initial estimate
 */
function timeOfAngle( func, target, now, period, next ){
	 var value = func( now );
	 return zeroOfFunc (
		func,
		target,
		next ? now : now - period,
		value,
		next ? now + period : now,
		value + TAU
	 );
}
function zeroOfFunc( func, target, t1, f1, t2, f2 ){
	var f, t;
	 if ( closeEnoughTime ( t1, t2) || closeEnoughAngle( f1, target ) ) {
		 return t1;
	 }
	 if ( target < f1 ) { // bring the angle into range
		 target += TAU;
	 }
	 t = t1 + ( t2 - t1 ) * (target - f1 ) / ( f2 - f1 ); // false-position interpolation
	 f = func ( t );
	 if ( f < f1 ) { // bring the angle into range
		 f += TAU;
	 }
	 if ( f > target ) {
		 return zeroOfFunc( func, target, t1, f1, t, f );
	 } else {
		 return zeroOfFunc( func, target, t, f, t2, f2 );
	 }
}
function closeEnoughTime( t1, t2 ) {
	return Math.abs( t1 - t2 ) < EPSILON;
}
function closeEnoughAngle( f1, f2 ) {
	return Math.abs( f1 - f2 ) < 1e-5;
}

/* not used currently 
function normPI( angle ) {
	// constrain to [-PI..PI)
	return normTAU( angle + Math.PI) - Math.PI;
}
*/

function normTAU( angle ) {
	// constrain to [0..TAU)
	return angle - TAU * Math.floor( angle / TAU );
}

});
