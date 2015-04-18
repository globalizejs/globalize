var like, number;

// Set default locale as "en".
Globalize.locale( "en" );

// Use Globalize to format dates.
document.getElementById( "date" ).innerHTML = Globalize.formatDate( new Date(), {
	datetime: "medium"
});

// Use Globalize to format numbers.
number = Globalize.numberFormatter();
document.getElementById( "number" ).innerHTML = number( 12345.6789 );

// Use Globalize to format currencies.
document.getElementById( "currency" ).innerHTML = Globalize.formatCurrency( 69900, "USD" );

// Use Globalize to get the plural form of a numeric value.
document.getElementById( "plural-number" ).innerHTML = number( 12345.6789 );
document.getElementById( "plural-form" ).innerHTML = Globalize.plural( 12345.6789 );

// Use Globalize to format a message with plural inflection.
like = Globalize.messageFormatter( "like" );
document.getElementById( "message-0" ).innerHTML = like( 0 );
document.getElementById( "message-1" ).innerHTML = like( 1 );
document.getElementById( "message-2" ).innerHTML = like( 2 );
document.getElementById( "message-3" ).innerHTML = like( 3 );

// Use Globalize to format a relative time.
document.getElementById( "relative-time" ).innerText = Globalize.formatRelativeTime( -35, "second" );

document.getElementById( "requirements" ).style.display = "none";
document.getElementById( "demo" ).style.display = "block";
