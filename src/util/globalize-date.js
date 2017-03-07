
define( function() {
var GlobalizeDate = function( date, timeZonedata ) {
	this.date = new Date( date.getTime() );
	this.timeZoneData = timeZonedata;
	this.setTime( this.date.getTime() - this.getTimeZoneAdjustment() * 60 * 1000 );
};

GlobalizeDate.prototype.getFullYear = function() {
	return this.date.getUTCFullYear();
};

GlobalizeDate.prototype.getMonth = function() {
	return this.date.getUTCMonth();
};

GlobalizeDate.prototype.getDay = function() {
	return this.date.getUTCDay();
};

GlobalizeDate.prototype.getDate = function() {
	return this.date.getUTCDate();
};

GlobalizeDate.prototype.getMinutes = function() {
	return this.date.getUTCMinutes();
};

GlobalizeDate.prototype.getSeconds = function() {
	return this.date.getUTCSeconds();
};

GlobalizeDate.prototype.getHours = function() {
	return this.date.getUTCHours();
};

GlobalizeDate.prototype.getMinutes = function() {
	return this.date.getUTCMinutes();
};

GlobalizeDate.prototype.getSeconds = function() {
	return this.date.getUTCSeconds();
};

GlobalizeDate.prototype.getMilliseconds = function() {
	return this.date.getUTCMilliseconds();
};

GlobalizeDate.prototype.getTime = function() {
	return this.date.getTime();
};

GlobalizeDate.prototype.setFullYear = function( year ) {
	return this.date.setUTCFullYear( year );
};

GlobalizeDate.prototype.setMonth = function( month ) {
	return this.date.setUTCMonth( month );
};

GlobalizeDate.prototype.setDay = function( date ) {
	return this.date.setUTCDay( date );
};

GlobalizeDate.prototype.setDate = function( date ) {
	return this.date.setUTCDate( date );
};

GlobalizeDate.prototype.setMinutes = function( minutes ) {
	return this.date.setUTCMinutes( minutes );
};

GlobalizeDate.prototype.setSeconds = function( seconds ) {
	return this.date.setUTCSeconds( seconds );
};

GlobalizeDate.prototype.setHours = function( hour ) {
	return this.date.setUTCHours( hour );
};

GlobalizeDate.prototype.setMinutes = function( minutes ) {
	return this.date.setUTCMinutes( minutes );
};

GlobalizeDate.prototype.setSeconds = function( seconds ) {
	return this.date.setUTCSeconds( seconds );
};

GlobalizeDate.prototype.setMilliseconds = function( milliseconds ) {
	return this.date.setUTCMilliseconds( milliseconds );
};

GlobalizeDate.prototype.setTime = function( time ) {
	return this.date.setTime( time );
};

GlobalizeDate.prototype.isDST = function() {
	return this.getStdOffset() !== -this.getTimeZoneAdjustment();
};

GlobalizeDate.prototype.getTimezoneOffset = function() {
	return this.getTimeZoneAdjustment();
};

GlobalizeDate.prototype.getStdOffset = function() {
	var stdOffset = -1;
	if ( this.timeZoneData.offsets > 1 ) {
		stdOffset *= Math.max(
			this.timeZoneData.offsets[ this.timeZoneData.offsets.length - 1 ],
			this.timeZoneData.offsets[ this.timeZoneData.offsets.length - 2 ]
		);
	} else {
		stdOffset *= this.timeZoneData.offsets[ this.timeZoneData.offsets.length - 1 ];
	}
	return stdOffset;
};

GlobalizeDate.prototype.getTimeZoneAdjustment = function() {
	var index = 0;
	while ( index < this.timeZoneData.untils.length - 1 &&
		this.date.getTime() >= this.timeZoneData.untils[ index ] ) {
		index++;
	}
	return index === 0 ? 0 : this.timeZoneData.offsets[ index ];
};

return GlobalizeDate;
});
