var currencyFormatter, dateFormatter, numberFormatter, relativeTimeFormatter,
	startTime, Globalize = require( "globalize" );

var startTime = new Date();

// Date variable that will be rendered and changed through user input
var date = new Date();

// Variables for changing the message variables
var messageCurrency = 69900;
var messageDate = new Date( date.setSeconds( date.getSeconds() + 1 ) );
var messageNumber = 12345.6789;

currencyFormatter = Globalize.currencyFormatter( "USD" );
dateFormatter = Globalize.dateFormatter( { datetime: "medium" } );
numberFormatter = Globalize.numberFormatter( { maximumFractionDigits: 2 } );
relativeTimeFormatter = Globalize.relativeTimeFormatter( "second" );

document.getElementById( "intro-1" ).innerHTML =
	Globalize.formatMessage( "intro-1" );

// Standalone table.
document.getElementById( "currency-label" ).innerHTML =
	Globalize.formatMessage( "currency-label" );
document.getElementById( "currency" ).innerHTML = currencyFormatter( 69900 );

document.getElementById( "date-label" ).innerHTML =
	Globalize.formatMessage( "date-label" );
document.getElementById( "date" ).innerHTML =
	dateFormatter( new Date() );

document.getElementById( "number-label" ).innerHTML =
	Globalize.formatMessage( "number-label" );
document.getElementById( "number" ).innerHTML = numberFormatter( 12345.6789 );

document.getElementById( "relative-time-label" ).innerHTML =
	Globalize.formatMessage( "relative-time-label" );
document.getElementById( "relative-time" ).innerHTML = relativeTimeFormatter( 0 );


// Changes format values of the element with id
var changeValue = function( id, values ) {
	document.getElementById( id ).innerHTML =
		Globalize.formatMessage( id, values );
}

// Number
var numberButton = document.getElementById( "number-button" );
var numberInput  = document.getElementById( "number-input" );

numberButton.addEventListener( "click", function() {
	document.getElementById( "number" ).innerHTML =
		messageNumber = Number( numberInput.value ) || 12345.6789;
		numberFormatter( Number( numberInput.value ) || 12345.6789 );
});

// Currency
var currencyButton = document.getElementById( "currency-button" );
var currencyInput  = document.getElementById( "currency-input" );

currencyButton.addEventListener( "click", function() {
	var newAmount = Number(currencyInput.value) || 69900;

	messageCurrency = newAmount;

	document.getElementById( "currency" ).innerHTML =
		currencyFormatter( newAmount );
});

// Date
var dateButton = document.getElementById( "date-button" );
var dateInput  = document.getElementById( "date-input" );

dateButton.addEventListener( "click", function() {
	messageDate = new Date(dateInput.value) || new Date();
	date = new Date(dateInput.value) || new Date();
});

// Relative time
var timeButton = document.getElementById( "time-button" );
var timeInput = document.getElementById( "time-input" );

timeButton.addEventListener( "click", function() {
	var userTime = Number( timeInput.value ) * 1000;

	startTime.setTime(startTime.getTime() - userTime);
});

// Quantity
var countButton   = document.getElementById( "count-button" );
var quantityInput = document.getElementById( "count" );

countButton.addEventListener( "click", function() {
	changeValue("message-2", {
		count: Number(quantityInput.value) || 3
	});
});

document.getElementById( "message-2" ).innerHTML =
	Globalize.formatMessage( "message-2", {
		count: 3
});

// Messages
document.getElementById( "message-1" ).innerHTML =
	Globalize.formatMessage( "message-1", {
		currency: currencyFormatter( messageCurrency ),
		date: dateFormatter( new Date() ),
		number: numberFormatter( 12345.6789 ),
		relativeTime: relativeTimeFormatter( 0 )
});

// Display demo
document.getElementById( "requirements" ).style.display = "none";
document.getElementById( "demo" ).style.display = "block";

// Refresh elapsed time
setInterval( function() {
	elapsedTime = +( ( startTime - new Date() ) / 1000 ).toFixed( 0 );
	document.getElementById( "date" ).innerHTML = dateFormatter( date );
	document.getElementById( "relative-time" ).innerHTML =
		relativeTimeFormatter( elapsedTime );
	document.getElementById( "message-1" ).innerHTML =
		Globalize.formatMessage( "message-1", {
			currency: currencyFormatter( messageCurrency ),
			date: dateFormatter( messageDate ),
			number: numberFormatter( messageNumber ),
			relativeTime: relativeTimeFormatter( elapsedTime )
	});
}, 1000);
