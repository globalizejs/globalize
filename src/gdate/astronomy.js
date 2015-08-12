/* Astronomy routines, taken from the ICU CalendarAstronomer package */
/* times are milliseconds from the Unix epoch, 1/1/1970 00:00 GMT */

define([
	"./Gdate"
], function( Gdate ) {

var EPSILON = 60000, // one minute accuracy
	DAY_MS = 86400000, // ms in a day
	JD_EPOCH_MS = -210866760000000, // time of the julian day epoch, Januart 1, 4713 BCE
	JD_SUN_EPOCH = 2447891.5, // Julian day of the calculation epoch (December 31, 1989)
	SUN_E = 0.016713, // eccentricity of sun's orbit
	SUN_ETA_G = 279.403303 * Math.PI / 180, // Ecliptic longitude at epoch
	SUN_OMEGA_G = 282.768422 * Math.PI / 180, // Ecliptic longitude at perigee
	TROPICAL_YEAR = 365.242191, //  days of a year, from vernal equinox to vernal equinox
	TAU = 2 * Math.PI; // http://tauday.com/

/* returns the time of the next (if next is true) or
	last (if next is false) winter solstice from the time now */
Gdate.winterSolstice = function(now, next) {
	return timeOfAngle(
		Gdate.sunLongitude,
		Math.PI * 3 / 2, // winter solstice is when the sun is at 270 degrees
		now,
		TROPICAL_YEAR * DAY_MS,
		next
	);
};

function sunLongitude( time ){
	var day = ms2jd( time ) - JD_SUN_EPOCH,
		epochAngle = normTAU( TAU * day / TROPICAL_YEAR ),
		meanAnomaly = normTAU( epochAngle + SUN_ETA_G - SUN_OMEGA_G );
		return normTAU( trueAnomaly( meanAnomaly, SUN_E ) + SUN_OMEGA_G );
}
Gdate.sunLongitude = sunLongitude;

function ms2jd( time ){
	return ( time - JD_EPOCH_MS ) / DAY_MS;
}
Gdate.ms2jd = ms2jd;
function jd2ms ( jd ){
	return ( jd *DAY_MS ) + JD_EPOCH_MS;
}
Gdate.ms2jd = ms2jd;
Gdate.date2jd = function( date ) { return ms2jd( date.getTime() ); };
Gdate.jd2date = function( jd ) { return new Date( jd2ms ( jd ) ); };

/* the "anomaly" is the longitude of a celestial body, calculated as radians from perigee.
 * Calculating the "mean anomaly" is relatively
 * easy: it is the angle for a circular orbit.
 * The true anomaly takes the eccentricity of the orbit
 * into account. Here we solve iteratively (see the ICU code for more details).
 */
 function trueAnomaly( meanAnomaly, eccentricity ){
	 var delta, 
		E = meanAnomaly;
		do {
			delta = E - eccentricity * Math.sin( E ) - meanAnomaly;
			E -= delta / ( 1 - eccentricity * Math.cos( E ) );
		} while ( Math.abs( delta ) > 1e-5 );
		return 2 * Math.atan (
			Math.tan( E / 2 ) * Math.sqrt ( ( 1 + eccentricity ) / ( 1 - eccentricity ) )
		);
 }

/* given a function func( time ) that returns an angle, uses extrapolation
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
	 if ( closeEnough ( t1, t2) || normTAU( f1 ) === normTAU( target ) ) {
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
function closeEnough( t1, t2 ) {
	return Math.abs( t1 - t2 ) < EPSILON;
}


/* testing */
function linear( time){
	return normTAU( time);
}
 /* old version
function timeOfAngle( time, desired, func, period, next ){
	var lastAngle, lastDeltaTime,
		t = time,
		epsilon = 60000, // accuracy to within one minute
		angle = func( time ), // current value of func
		deltaAngle = normTAU( desired - angle ), // how far off we are
		deltaT = ( deltaAngle + ( next ? 0 : -TAU ) ) * period / TAU; // first estimate
	do {
		t += deltaT;
		lastAngle = angle;
		angle = func( t );
		lastDeltaTime = deltaT;
		// extrapolation
		deltaT = normPI( desired - angle ) * Math.abs( deltaT / normPI ( angle - lastAngle ) );
		// problem: the extrapolation sometimes diverges.
		// If so, move away from the current solution and try again
		if ( Math.abs( deltaT ) > Math.abs( lastDeltaTime ) ) {
			deltaT = period / 8; // empirically, try 1/8th of the way around
			time += next ? deltaT : -deltaT;
			return timeOfAngle( time, desired, func, period, next );
		}
	} while ( Math.abs( deltaT ) > epsilon );
	return t + deltaT;
}
*/

function normPI( angle ) {
	// constrain to [-PI..PI)
	return normTAU( angle + Math.PI) - Math.PI;
}
function normTAU( angle ) {
	// constrain to [0..TAU)
	return angle - TAU * Math.floor( angle / TAU );
}

});
