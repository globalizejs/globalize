/*
Based on http://www.math.nus.edu.sg/aslaksen/calendar/cal.pdf

To calculate dates in the traditional Chinese calendar (a lunisolar calendar), 
there are a few rules (enumerated in Dr. Aslaksen's article).
Rule 1+2: days start at midnight, Bejing time (UTC+0800)
Rule 3: Months start on the day (as defined above) of the New Moon

So calculating the day of the month for any given day is straightforward if we can calculate new
moons. The hard part is deciding what month it is.

There are 12 or 13 months in a year, which is adjusted to match the solar year. In a non-leap year,
the months are named 1 through 12. In a leap year, one of the months is doubled, with the second
month being named with the same number plus "rùnyuè". The hard part is deciding which month to
intercalate.

Chinese New Years is always in January or February, so we can label Chinese years 
with the corresponding Gregorian year, realizing that the last few weeks of the
year actually are in the next Gregorian year.

To name the months of year n, determine the solar year ("suì") from the day after the
winter solstice of year n-1 to the day of the winter solstice of year n, inclusive.

Determine the days of the new moons in that suì. There will be 12 or 13. If there are 12,
then it is not a leap suì and the first new moon is the start of month 12 of year n-1,
Chinese New Year is the second new moon, and number the months in order from there until 
month 11 of year n. Determining the start of month 12 or possible rùnyuè 11th and 12th
months requires running the algorithm for year n+1.
The lunar year from New Year to New Year is called "nián".

If there are 13 new moons, the rùnyuè month is the first one of the suì that does not 
correspond to a "solar month", meaning that it does not contain a 
"solar month start" or zhongqì. The other months are number sequentially.

Zhongqì are calculated as 1/12 of the solar orbit, starting from the winter solstice 
(the sun longitude is at 0 degrees). The next is when the sun is at 30 degrees, then at 60
degrees, etc. to 330 degrees (next would be the upcoming winter solstice). They are
approximately on the 20th of each Gregorian month.

Note that if the winter solstice is on the same day as the new moon, then that new moon
is the start of month 11. Month 11 always contains the winter solstice. 

Years are numbered in cycles of 60 years; 1984 was year 1 of the cycle, so the year number 
ought to be (date.getFullYear() - 1984) % 60 + 1. Javascript's % operator doesn't handle
negative numbers correctly, so the actual algorithm is
((date.getFullYear() - 1984) % 60 + 61) % 60.

Exactly when this cycle started (which cycle the year is in, here called the era by analogy to
the Gregorian BCE/CE) is a matter of some controversy. ICU uses 2637 BCE, so the era is
Math.floor((date.getFullYear() + 2696) / 60 ). 2
This is right because 2637 BCE means getFullYear -2636 (there is no 0 BCE), and we want the 
first cycle to be era 1 not era 0, so we go back another 60 years.

*/
define([
	"./Gdate"
//	"./astronomy.js" // this creates errors in testing, but it is clearly required.
], function( Gdate ) {
	// caches
	var solstices = {}; // chinese day of the winter solstice, indexed by Gregorian year
	var nains = {}; // chinese lunar years, indexed by the Gregorian year of New Years Day
});
