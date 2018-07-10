var like, number;

// Use Globalize to format dates.
document.getElementById( "date" ).textContent = Globalize.formatDate( new Date(), {
	datetime: "medium"
});

// Use Globalize to format dates on specific time zone.
document.getElementById( "zonedDate" ).textContent = Globalize.formatDate( new Date(), {
	datetime: "full",
	timeZone: "America/Sao_Paulo"
});

// Use Globalize to format dates to parts.
document.getElementById( "dateToParts" ).innerHTML = Globalize.formatDateToParts( new Date(), {
	datetime: "medium"
}).map(function( part ) {
	switch(part.type) {
		case "month": return "<strong>" + part.value + "</strong>";
		default: return part.value;
	}
}).reduce(function( memo, value ) {
	return memo + value;
});

// Use Globalize to format numbers.
number = Globalize.numberFormatter();
document.getElementById( "number" ).textContent = number( 12345.6789 );
document.getElementById( "number-compact" ).textContent = Globalize.formatNumber( 12345.6789, {
	compact: "short",
	minimumSignificantDigits: 1,
	maximumSignificantDigits: 3
});

// Use Globalize to format currencies.
document.getElementById( "currency" ).textContent = Globalize.formatCurrency( 69900, "USD" );

// Use Globalize to get the plural form of a numeric value.
document.getElementById( "plural-number" ).textContent = number( 12345.6789 );
document.getElementById( "plural-form" ).textContent = Globalize.plural( 12345.6789 );

// Use Globalize to format a message with plural inflection.
like = Globalize.messageFormatter( "like" );
document.getElementById( "message-0" ).textContent = like( 0 );
document.getElementById( "message-1" ).textContent = like( 1 );
document.getElementById( "message-2" ).textContent = like( 2 );
document.getElementById( "message-3" ).textContent = like( 3 );

// Use Globalize to format a relative time.
document.getElementById( "relative-time" ).textContent = Globalize.formatRelativeTime( -35, "second" );

// Use Globalize to format a unit.
document.getElementById( "unit" ).textContent = Globalize.formatUnit( 60, "mile/hour", {
	form: "short"
});

document.getElementById( "requirements" ).style.display = "none";
document.getElementById( "demo" ).style.display = "block";
