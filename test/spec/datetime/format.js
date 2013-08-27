define([
	"globalize/datetime",
], function( datetime ) {

	var year0 = new Date( -62167190400000 ),
		date1 = new Date( 1982, 0, 2, 9, 5, 59 );
		date2 = new Date( 2010, 8, 15, 17, 35, 7, 369 );

	describe("Datetime", function() {

		/**
		 *  Era
		 */

		// TODO G (all)

		/**
		 *  Year
		 */

		it( "should format year (y) with no padding", function() {
			expect( datetime.format( date2, "y" ) ).to.equal( "2010" );
			expect( datetime.format( date1, "y" ) ).to.equal( "1982" );
			expect( datetime.format( year0, "y" ) ).to.equal( "0" );
		});

		it( "should format year (yy) with padding, and limit 2 digits", function() {
			expect( datetime.format( date2, "yy" ) ).to.equal( "10" );
			expect( datetime.format( date1, "yy" ) ).to.equal( "82" );
			expect( datetime.format( year0, "yy" ) ).to.equal( "00" );
		});

		it( "should format year (yyy+) with padding", function() {
			expect( datetime.format( date2, "yyyyy" ) ).to.equal( "02010" );
			expect( datetime.format( year0, "yyyy" ) ).to.equal( "0000" );
		});

		/**
		 *  Quarter
		 */

		it( "should format quarter (Q|q) with no padding", function() {
			expect( datetime.format( date1, "Q" ) ).to.equal( "1" );
			expect( datetime.format( date2, "Q" ) ).to.equal( "3" );
			expect( datetime.format( date1, "q" ) ).to.equal( "1" );
			expect( datetime.format( date2, "q" ) ).to.equal( "3" );
		});

		it( "should format quarter (QQ|qq) with padding", function() {
			expect( datetime.format( date1, "QQ" ) ).to.equal( "01" );
			expect( datetime.format( date2, "QQ" ) ).to.equal( "03" );
			expect( datetime.format( date1, "qq" ) ).to.equal( "01" );
			expect( datetime.format( date2, "qq" ) ).to.equal( "03" );
		});

		// TODO QQQ+ qqq+

		/**
		 *  Month
		 */

		it( "should format month (M|L) with no padding", function() {
			expect( datetime.format( date1, "M" ) ).to.equal( "1" );
			expect( datetime.format( date2, "M" ) ).to.equal( "9" );
			expect( datetime.format( date1, "L" ) ).to.equal( "1" );
			expect( datetime.format( date2, "L" ) ).to.equal( "9" );
		});

		it( "should format month (MM|LL) with padding", function() {
			expect( datetime.format( date1, "MM" ) ).to.equal( "01" );
			expect( datetime.format( date2, "MM" ) ).to.equal( "09" );
			expect( datetime.format( date1, "LL" ) ).to.equal( "01" );
			expect( datetime.format( date2, "LL" ) ).to.equal( "09" );
		});

		// TODO MMM+ LLL+

		/**
		 *  Week
		 */

		// TODO w (all), and W (all)

		/**
		 *  Day
		 */

		it( "should format day (d) with no padding", function() {
			expect( datetime.format( date1, "d" ) ).to.equal( "2" );
			expect( datetime.format( date2, "d" ) ).to.equal( "15" );
		});

		it( "should format day (dd) with padding", function() {
			expect( datetime.format( date1, "dd" ) ).to.equal( "02" );
			expect( datetime.format( date2, "dd" ) ).to.equal( "15" );
		});

		// TODO D, F, g (all)

		/**
		 *  Week day
		 */

		// TODO all

		/**
		 *  Period
		 */

		// TODO all

		/**
		 *  Hour
		 */

		it( "should format hour (h) using 12-hour-cycle [1-12] with no padding", function() {
			expect( datetime.format( date1, "h" ) ).to.equal( "9" );
			expect( datetime.format( date2, "h" ) ).to.equal( "5" );
			expect( datetime.format( new Date( 0, 0, 0, 0 ), "h" ) ).to.equal( "12" );
		});

		it( "should format hour (hh) using 12-hour-cycle [1-12] with padding", function() {
			expect( datetime.format( date1, "hh" ) ).to.equal( "09" );
			expect( datetime.format( date2, "hh" ) ).to.equal( "05" );
			expect( datetime.format( new Date( 0, 0, 0, 0 ), "hh" ) ).to.equal( "12" );
		});

		it( "should format hour (H) using 24-hour-cycle [0-23] with no padding", function() {
			expect( datetime.format( date1, "H" ) ).to.equal( "9" );
			expect( datetime.format( date2, "H" ) ).to.equal( "17" );
			expect( datetime.format( new Date( 0, 0, 0, 0 ), "H" ) ).to.equal( "0" );
		});

		it( "should format hour (HH) using 24-hour-cycle [0-23] with padding", function() {
			expect( datetime.format( date1, "HH" ) ).to.equal( "09" );
			expect( datetime.format( date2, "HH" ) ).to.equal( "17" );
			expect( datetime.format( new Date( 0, 0, 0, 0 ), "HH" ) ).to.equal( "00" );
		});

		it( "should format hour (K) using 12-hour-cycle [0-11] with no padding", function() {
			expect( datetime.format( date1, "K" ) ).to.equal( "9" );
			expect( datetime.format( date2, "K" ) ).to.equal( "5" );
			expect( datetime.format( new Date( 0, 0, 0, 0 ), "K" ) ).to.equal( "0" );
		});

		it( "should format hour (KK) using 12-hour-cycle [0-11] with padding", function() {
			expect( datetime.format( date1, "KK" ) ).to.equal( "09" );
			expect( datetime.format( date2, "KK" ) ).to.equal( "05" );
			expect( datetime.format( new Date( 0, 0, 0, 0 ), "KK" ) ).to.equal( "00" );
		});

		it( "should format hour (k) using 24-hour-cycle [1-24] with no padding", function() {
			expect( datetime.format( date1, "k" ) ).to.equal( "9" );
			expect( datetime.format( date2, "k" ) ).to.equal( "17" );
			expect( datetime.format( new Date( 0, 0, 0, 0 ), "k" ) ).to.equal( "24" );
		});

		it( "should format hour (kk) using 24-hour-cycle [1-24] with padding", function() {
			expect( datetime.format( date1, "kk" ) ).to.equal( "09" );
			expect( datetime.format( date2, "kk" ) ).to.equal( "17" );
			expect( datetime.format( new Date( 0, 0, 0, 0 ), "kk" ) ).to.equal( "24" );
		});

		// TODO ([HhKk)]\1{2}, j (all)

		/**
		 *  Minute
		 */

		it( "should format minute (m) with no padding", function() {
			expect( datetime.format( date1, "m" ) ).to.equal( "5" );
			expect( datetime.format( date2, "m" ) ).to.equal( "35" );
		});

		it( "should format minute (mm) with padding", function() {
			expect( datetime.format( date1, "mm" ) ).to.equal( "05" );
			expect( datetime.format( date2, "mm" ) ).to.equal( "35" );
		});

		/**
		 *  Second
		 */

		it( "should format second (s) with no padding", function() {
			expect( datetime.format( date1, "s" ) ).to.equal( "59" );
			expect( datetime.format( date2, "s" ) ).to.equal( "7" );
		});

		it( "should format second (ss) with padding", function() {
			expect( datetime.format( date1, "ss" ) ).to.equal( "59" );
			expect( datetime.format( date2, "ss" ) ).to.equal( "07" );
		});

		it( "should format various milliseconds (S+)", function() {
			expect( datetime.format( date2, "S" ) ).to.equal( "4" );
			expect( datetime.format( date2, "SS" ) ).to.equal( "37" );
			expect( datetime.format( date2, "SSS" ) ).to.equal( "369" );
			expect( datetime.format( date2, "SSSS" ) ).to.equal( "3690" );
			expect( datetime.format( date2, "SSSSS" ) ).to.equal( "36900" );
		});

		/**
		 *  Zone
		 */

		// TODO all

	});

});
