var currencyFormatter, dateFormatter, numberFormatter, relativeTimeFormatter, startTime,
	Globalize = require( "globalize" );

startTime = new Date();

currencyFormatter = Globalize.currencyFormatter( "USD" );
dateFormatter = Globalize.dateFormatter({ datetime: "medium" });
numberFormatter = Globalize.numberFormatter({ maximumFractionDigits: 2 });
relativeTimeFormatter = Globalize.relativeTimeFormatter( "second" );

document.getElementById( "intro-1" ).innerHTML = Globalize.formatMessage( "intro-1" );

// Standalone table.
document.getElementById( "currency-label" ).innerHTML = Globalize.formatMessage( "currency-label" );
document.getElementById( "currency" ).innerHTML = currencyFormatter( 69900 );

document.getElementById( "date-label" ).innerHTML = Globalize.formatMessage( "date-label" );
document.getElementById( "date" ).innerHTML = dateFormatter( new Date() );

document.getElementById( "number-label" ).innerHTML = Globalize.formatMessage( "number-label" );
document.getElementById( "number" ).innerHTML = numberFormatter( 12345.6789 );

document.getElementById( "relative-time-label" ).innerHTML = Globalize.formatMessage( "relative-time-label" );
document.getElementById( "relative-time" ).innerHTML = relativeTimeFormatter( 0 );

// Messages.
document.getElementById( "message-1" ).innerHTML = Globalize.formatMessage( "message-1", {
	currency: currencyFormatter( 69900 ),
	date: dateFormatter( new Date() ),
	number: numberFormatter( 12345.6789 ),
	relativeTime: relativeTimeFormatter( 0 )
});

document.getElementById( "message-2" ).innerHTML = Globalize.formatMessage( "message-2", {
	count: 3
});

// Display demo.
document.getElementById( "requirements" ).style.display = "none";
document.getElementById( "demo" ).style.display = "block";

// Refresh elapsed time
setInterval(function() {
	var elapsedTime = +( ( startTime - new Date() ) / 1000 ).toFixed( 0 );
	document.getElementById( "date" ).innerHTML = dateFormatter( new Date() );
	document.getElementById( "relative-time" ).innerHTML = relativeTimeFormatter( elapsedTime );
	document.getElementById( "message-1" ).innerHTML = Globalize.formatMessage( "message-1", {
		currency: currencyFormatter( 69900 ),
		date: dateFormatter( new Date() ),
		number: numberFormatter( 12345.6789 ),
		relativeTime: relativeTimeFormatter( elapsedTime )
	});

}, 1000);

