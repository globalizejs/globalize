var currencyFormatter, dateFormatter, numberFormatter, relativeTimeFormatter, startTime,
	Globalize = require( "globalize" );

startTime = new Date();

currencyFormatter = Globalize.currencyFormatter( "USD" );
dateFormatter = Globalize.dateFormatter({ datetime: "medium" });
numberFormatter = Globalize.numberFormatter({ maximumFractionDigits: 2 });
relativeTimeFormatter = Globalize.relativeTimeFormatter( "second" );
unitFormatter = Globalize.unitFormatter( "mile/hour", { form: "short" } );

document.getElementById( "intro-1" ).textContent = Globalize.formatMessage( "intro-1" );

// Standalone table.
document.getElementById( "currency-label" ).textContent = Globalize.formatMessage( "currency-label" );
document.getElementById( "currency" ).textContent = currencyFormatter( 69900 );

document.getElementById( "date-label" ).textContent = Globalize.formatMessage( "date-label" );
document.getElementById( "date" ).textContent = dateFormatter( new Date() );

document.getElementById( "number-label" ).textContent = Globalize.formatMessage( "number-label" );
document.getElementById( "number" ).textContent = numberFormatter( 12345.6789 );

document.getElementById( "relative-time-label" ).textContent = Globalize.formatMessage( "relative-time-label" );
document.getElementById( "relative-time" ).textContent = relativeTimeFormatter( 0 );
document.getElementById( "unit-label" ).textContent = Globalize.formatMessage( "unit-label" );
document.getElementById( "unit" ).textContent = unitFormatter( 60 );

// Messages.
document.getElementById( "message-1" ).textContent = Globalize.formatMessage( "message-1", {
	currency: currencyFormatter( 69900 ),
	date: dateFormatter( new Date() ),
	number: numberFormatter( 12345.6789 ),
	relativeTime: relativeTimeFormatter( 0 ),
	unit: unitFormatter( 60 )
});

document.getElementById( "message-2" ).textContent = Globalize.formatMessage( "message-2", {
	count: 3
});

// Display demo.
document.getElementById( "requirements" ).style.display = "none";
document.getElementById( "demo" ).style.display = "block";

// Refresh elapsed time
setInterval(function() {
	var elapsedTime = +( ( startTime - new Date() ) / 1000 ).toFixed( 0 );
	document.getElementById( "date" ).textContent = dateFormatter( new Date() );
	document.getElementById( "relative-time" ).textContent = relativeTimeFormatter( elapsedTime );
	document.getElementById( "message-1" ).textContent = Globalize.formatMessage( "message-1", {
		currency: currencyFormatter( 69900 ),
		date: dateFormatter( new Date() ),
		number: numberFormatter( 12345.6789 ),
		relativeTime: relativeTimeFormatter( elapsedTime ),
		unit: unitFormatter( 60 )
	});

}, 1000);

