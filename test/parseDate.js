module("parseDate", lifecycle );

test("basics, date", function() {
	equal( Globalize.parseDate('2011/17/11 13:23:12','yyyy/dd/MM HH:mm:ss','fr').valueOf(), (new Date(2011, 10, 17, 13, 23, 12)).valueOf() );
	equal( Globalize.parseDate('2011-17-11 13:23:12','yyyy-dd-MM HH:mm:ss','fr').valueOf(), (new Date(2011, 10, 17, 13, 23, 12)).valueOf() );
	equal( Globalize.parseDate('2011/17/11 13:23:12','yyyy/dd/MM HH:mm:ss','fr-CA').valueOf(), (new Date(2011, 10, 17, 13, 23, 12)).valueOf() );
	equal( Globalize.parseDate('2011-17-11 13:23:12','yyyy-dd-MM HH:mm:ss','fr-CA').valueOf(), (new Date(2011, 10, 17, 13, 23, 12)).valueOf() );
});
