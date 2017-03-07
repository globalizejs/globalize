define( function() {

function getUntilsIndex( original, untils ) {
	var index = 0,
		originalTime = original.getTime();

	// TODO Should we do binary search for improved performance?
	while ( index < untils.length - 1 && originalTime >= untils[ index ] ) {
		index++;
	}
	return index;
}

var GlobalizeDate = function( date, timeZoneData ) {
	this.original = new Date( date.getTime() );
	this.local = new Date( date.getTime() );
	this.isGloblizeDate = true;
	this.timeZoneData = timeZoneData;
	if ( !( timeZoneData.untils && timeZoneData.offsets && timeZoneData.isdsts ) ) {
		throw new Error( "macacos robin" );
	}
	this.setTime( this.local.getTime() - this.getTimezoneOffset() * 60 * 1000 );
};

GlobalizeDate.prototype.setWrap = function( fn ) {
	var offset1 = this.getTimezoneOffset();
	var ret = fn();
	this.original = new Date( this.getTime() );
	var offset2 = this.getTimezoneOffset();
	this.original.setMinutes( this.original.getMinutes() + offset2 - offset1 );
	return ret;
};

GlobalizeDate.prototype.clone = function() {
	return new GlobalizeDate( this.original, this.timeZoneData );
};

GlobalizeDate.prototype.getFullYear = function() {
	return this.local.getUTCFullYear();
};

GlobalizeDate.prototype.getMonth = function() {
	return this.local.getUTCMonth();
};

GlobalizeDate.prototype.getDate = function() {
	return this.local.getUTCDate();
};

GlobalizeDate.prototype.getDay = function() {
	return this.local.getUTCDay();
};

GlobalizeDate.prototype.getHours = function() {
	return this.local.getUTCHours();
};

GlobalizeDate.prototype.getMinutes = function() {
	return this.local.getUTCMinutes();
};

GlobalizeDate.prototype.getSeconds = function() {
	return this.local.getUTCSeconds();
};

GlobalizeDate.prototype.getMilliseconds = function() {
	return this.local.getUTCMilliseconds();
};

GlobalizeDate.prototype.getTime = function() {
	return this.local.getTime() + this.getTimezoneOffset() * 60 * 1000;
};

GlobalizeDate.prototype.getTimezoneOffset = function() {
	var index = getUntilsIndex( this.original, this.timeZoneData.untils );
	return this.timeZoneData.offsets[ index ];
};

GlobalizeDate.prototype.setFullYear = function( year ) {
	var local = this.local;
	return this.setWrap(function() {
		return local.setUTCFullYear( year );
	});
};

GlobalizeDate.prototype.setMonth = function( month ) {
	var local = this.local;
	return this.setWrap(function() {
		return local.setUTCMonth( month );
	});
};

GlobalizeDate.prototype.setDate = function( date ) {
	var local = this.local;
	return this.setWrap(function() {
		return local.setUTCDate( date );
	});
};

GlobalizeDate.prototype.setHours = function( hour ) {
	var local = this.local;
	return this.setWrap(function() {
		return local.setUTCHours( hour );
	});
};

GlobalizeDate.prototype.setMinutes = function( minutes ) {
	var local = this.local;
	return this.setWrap(function() {
		return local.setUTCMinutes( minutes );
	});
};

GlobalizeDate.prototype.setSeconds = function( seconds ) {
	var local = this.local;

	// setWrap is needed here just because abs(seconds) could be >= a minute.
	return this.setWrap(function() {
		return local.setUTCSeconds( seconds );
	});
};

GlobalizeDate.prototype.setMilliseconds = function( milliseconds ) {
	var local = this.local;

	// setWrap is needed here just because abs(seconds) could be >= a minute.
	return this.setWrap(function() {
		return local.setUTCMilliseconds( milliseconds );
	});
};

GlobalizeDate.prototype.setTime = function( time ) {
	return this.local.setTime( time );
};

GlobalizeDate.prototype.isDST = function() {
	var index = getUntilsIndex( this.original, this.timeZoneData.untils );
	return Boolean( this.timeZoneData.isdsts[ index ] );
};

return GlobalizeDate;

});
