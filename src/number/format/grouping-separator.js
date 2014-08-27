define(function() {

/**
 * goupingSeparator( number, primaryGroupingSize, secondaryGroupingSize )
 *
 * @number [Number].
 *
 * @primaryGroupingSize [Number]
 *
 * @secondaryGroupingSize [Number]
 *
 * Return the formatted number with group separator.
 */
return function( number, primaryGroupingSize, secondaryGroupingSize ) {
	var index,
		currentGroupingSize = primaryGroupingSize,
		ret = "",
		sep = ",",
		switchToSecondary = secondaryGroupingSize ? true : false;

	number = String( number ).split( "." );
	index = number[ 0 ].length;

	while ( index > currentGroupingSize ) {
		ret = number[ 0 ].slice( index - currentGroupingSize, index ) +
			( ret.length ? sep : "" ) + ret;
		index -= currentGroupingSize;
		if ( switchToSecondary ) {
			currentGroupingSize = secondaryGroupingSize;
			switchToSecondary = false;
		}
	}

	number[ 0 ] = number[ 0 ].slice( 0, index ) + ( ret.length ? sep : "" ) + ret;
	return number.join( "." );
};

});
