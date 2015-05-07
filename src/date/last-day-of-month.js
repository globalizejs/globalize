define(function() {

/**
 * lastDayOfMonth( date )
 *
 * @date [Date]
 *
 * Return the last day of the given date's month
 */
return function( gdate ) {
  // no choice but to move forward one at a time
  for (var tomorrow = gdate.nextDate(1); tomorrow.getMonth() === gdate.getMonth();){
    gdate = tomorrow;
		tomorrow = gdate.nextDate(1);
  }
  return gdate.getDate();
};

});
