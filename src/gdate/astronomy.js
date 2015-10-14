/* Astronomy routines, taken from the ICU CalendarAstronomer package */
/* times are milliseconds from the Unix epoch, 1/1/1970 00:00 GMT */

define([
	"./Gdate"
], function( Gdate ) {

var EPSILON = 60000, // one minute accuracy
	DAY_MS = 86400000, // ms in a day
	JD_EPOCH_MS = -210866760000000, // time of the julian day epoch, January 1, 4713 BCE
	JD_SUN_EPOCH = 2447891.5, // Julian day of the calculation epoch (December 31, 1989)
	SUN_ETA_G = 4.89078, // Ecliptic longitude at epoch
	SUN_OMEGA_G = 282.9372 * Math.PI / 180, // Ecliptic longitude at perigee
	TROPICAL_YEAR = 365.242191, //  days of a year, from vernal equinox to vernal equinox
	TAU = 2 * Math.PI; // http://tauday.com/

/* From: http://www.nrel.gov/midc/apps/spa.pl?syear=1970&smonth=1&sday=1&eyear=1970&emonth=1&eday=1&step=10&stepunit=1&latitude=39.743&longitude=-105.178&timezone=0&elev=1829&press=835&temp=10&dut1=0.0&deltat=64.797&azmrot=180&slope=0&refract=0.5667&field=27&zip=0
 * note: Date,Time,Apparent sun longitude
 * 1/1/1970,0:00:00,280.156553
  */

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
	var day = time  / DAY_MS,
		epochAngle = normTAU( TAU * day / TROPICAL_YEAR ),
		meanAnomaly = normTAU( epochAngle + SUN_ETA_G - SUN_OMEGA_G );
		return normTAU( trueSunAnomaly( meanAnomaly ) + SUN_OMEGA_G );
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

/* the "anomaly" is the longitude of a celestial body, calculated as radians from perigee.
 * Calculating the "mean anomaly" is relatively
 * easy: it is the angle for a circular orbit.
 * The true anomaly takes the eccentricity of the orbit
 * into account. Here we solve iteratively (see the ICU code for more details).
 */ 
 function trueSunAnomaly( meanAnomaly ){
	 	 // From formulas in http://www.stargazing.net/kepler/kepler.html
	return meanAnomaly +
		0.0334168338 * Math.sin( meanAnomaly ) +
		0.0003489884 * Math.sin( 2 * meanAnomaly ) +
		5.05374684623142E-006 * Math.sin( 3 * meanAnomaly );
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

function normPI( angle ) {
	// constrain to [-PI..PI)
	return normTAU( angle + Math.PI) - Math.PI;
}
function normTAU( angle ) {
	// constrain to [0..TAU)
	return angle - TAU * Math.floor( angle / TAU );
}

console.log(sunLongitude(0));
});
