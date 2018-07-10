var Globalize = require( "globalize" );
var startTime = new Date();

// Standalone table.
var numberFormatter = Globalize.numberFormatter({ maximumFractionDigits: 2 });
document.getElementById( "number" ).textContent = numberFormatter( 12345.6789 );

var numberCompactFormatter = Globalize.numberFormatter({
	compact: "short",
	minimumSignificantDigits: 1,
	maximumSignificantDigits: 3
});
document.getElementById( "number-compact" ).textContent = numberCompactFormatter( 12345.6789 );

var currencyFormatter = Globalize.currencyFormatter( "USD" );
document.getElementById( "currency" ).textContent = currencyFormatter( 69900 );

var dateFormatter = Globalize.dateFormatter({ datetime: "medium" });
document.getElementById( "date" ).textContent = dateFormatter( new Date() );

var dateWithTimeZoneFormatter = Globalize.dateFormatter({
	datetime: "full",
	timeZone: "America/Sao_Paulo"
});
document.getElementById( "date-time-zone" ).textContent = dateWithTimeZoneFormatter( new Date() );

var _dateToPartsFormatter = Globalize.dateToPartsFormatter({ datetime: "medium" });
var dateToPartsFormatter = function( value ) {
	return _dateToPartsFormatter( value, {
		datetime: "medium"
	}).map(function( part ) {
		switch(part.type) {
			case "month": return "<strong>" + part.value + "</strong>";
			default: return part.value;
		}
	}).reduce(function( memo, value ) {
		return memo + value;
	});
};
document.getElementById( "date-to-parts" ).innerHTML = dateToPartsFormatter( new Date() );

var relativeTimeFormatter = Globalize.relativeTimeFormatter( "second" );
document.getElementById( "relative-time" ).textContent = relativeTimeFormatter( 0 );

var unitFormatter = Globalize.unitFormatter( "mile/hour", { form: "short" } );
document.getElementById( "unit" ).textContent = unitFormatter( 60 );

// Messages.
document.getElementById( "intro-1" ).textContent = Globalize.formatMessage( "intro-1" );
document.getElementById( "number-label" ).textContent = Globalize.formatMessage( "number-label" );
document.getElementById( "number-compact-label" ).textContent = Globalize.formatMessage( "number-compact-label" );
document.getElementById( "currency-label" ).textContent = Globalize.formatMessage( "currency-label" );
document.getElementById( "date-label" ).textContent = Globalize.formatMessage( "date-label" );
document.getElementById( "date-time-zone-label" ).textContent = Globalize.formatMessage( "date-time-zone-label" );
document.getElementById( "date-to-parts-label" ).textContent = Globalize.formatMessage( "date-to-parts-label" );
document.getElementById( "relative-time-label" ).textContent = Globalize.formatMessage( "relative-time-label" );
document.getElementById( "unit-label" ).textContent = Globalize.formatMessage( "unit-label" );
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
	document.getElementById( "date-time-zone" ).textContent = dateWithTimeZoneFormatter( new Date() );
	document.getElementById( "date-to-parts" ).innerHTML = dateToPartsFormatter( new Date() );
	document.getElementById( "relative-time" ).textContent = relativeTimeFormatter( elapsedTime );
	document.getElementById( "message-1" ).textContent = Globalize.formatMessage( "message-1", {
		currency: currencyFormatter( 69900 ),
		date: dateFormatter( new Date() ),
		number: numberFormatter( 12345.6789 ),
		relativeTime: relativeTimeFormatter( elapsedTime ),
		unit: unitFormatter( 60 )
	});

}, 1000);
