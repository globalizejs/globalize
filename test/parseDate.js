module("parseDate", lifecycle );

function offsetDelta(offset) {
	var currentOffset = new Date().getTimezoneOffset() / 60;
	return offset + currentOffset;
}

test("basics, date, default culture", function() {
	equal( Globalize.parseDate('2011-11-17T13:23:12+11:00').valueOf(), (new Date(2011, 10, 17, 13 - offsetDelta(11), 23, 12)).valueOf() );
	equal( Globalize.parseDate('2011-11-17T13:23:12+10:00').valueOf(), (new Date(2011, 10, 17, 13 - offsetDelta(10), 23, 12)).valueOf() );
	
	equal( Globalize.parseDate('2011-11-17T13:23:12+11:00').valueOf(), (new Date(2011, 10, 17, 13 - offsetDelta(11), 23, 12)).valueOf() );
	equal( Globalize.parseDate('2011-11-17T13:23:12+10:00').valueOf(), (new Date(2011, 10, 17, 13 - offsetDelta(10), 23, 12)).valueOf() );
	equal( Globalize.parseDate('2011-11-17T13:23:12-10:00').valueOf(), (new Date(2011, 10, 17, 13 - offsetDelta(-10), 23, 12)).valueOf() );
});

test("basics, date, en-GB culture", function() {
	Globalize.culture("en-GB");

	equal( Globalize.parseDate('2011-11-17T13:23:12+11:00').valueOf(), (new Date(2011, 10, 17, 13 - offsetDelta(11), 23, 12)).valueOf() );
	equal( Globalize.parseDate('2011-11-17T13:23:12+10:00').valueOf(), (new Date(2011, 10, 17, 13 - offsetDelta(10), 23, 12)).valueOf() );
	
	equal( Globalize.parseDate('2011-11-17T13:23:12+11:00').valueOf(), (new Date(2011, 10, 17, 13 - offsetDelta(11), 23, 12)).valueOf() );
	equal( Globalize.parseDate('2011-11-17T13:23:12+10:00').valueOf(), (new Date(2011, 10, 17, 13 - offsetDelta(10), 23, 12)).valueOf() );
	equal( Globalize.parseDate('2011-11-17T13:23:12-10:00').valueOf(), (new Date(2011, 10, 17, 13 - offsetDelta(-10), 23, 12)).valueOf() );
});

test("basics, date, specific format and culture", function() {
	equal( Globalize.parseDate('2011/17/11 13:23:12','yyyy/dd/MM HH:mm:ss','fr').valueOf(), (new Date(2011, 10, 17, 13, 23, 12)).valueOf() );
	equal( Globalize.parseDate('2011-17-11 13:23:12','yyyy-dd-MM HH:mm:ss','fr').valueOf(), (new Date(2011, 10, 17, 13, 23, 12)).valueOf() );
	equal( Globalize.parseDate('2011/17/11 13:23:12','yyyy/dd/MM HH:mm:ss','fr-CA').valueOf(), (new Date(2011, 10, 17, 13, 23, 12)).valueOf() );
	equal( Globalize.parseDate('2011-17-11 13:23:12','yyyy-dd-MM HH:mm:ss','fr-CA').valueOf(), (new Date(2011, 10, 17, 13, 23, 12)).valueOf() );
});
