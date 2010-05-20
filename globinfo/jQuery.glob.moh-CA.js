(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["moh-CA"] = $.extend(true, {}, invariant, {
        name: "moh-CA",
        englishName: "Mohawk (Mohawk)",
        nativeName: "Kanien\u0027kéha",
        language: "moh",
        numberFormat: {
            groupSizes: [3,0],
            percent: {
                groupSizes: [3,0]
            },
            currency: {
                symbol: "$"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                days: [["Awentatokentì:ke","Awentataón\u0027ke","Ratironhia\u0027kehronòn:ke","Soséhne","Okaristiiáhne","Ronwaia\u0027tanentaktonhne","Entákta"],["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],["S","M","T","W","T","F","S"]],
                months: [["Tsothohrkó:Wa","Enniska","Enniskó:Wa","Onerahtókha","Onerahtohkó:Wa","Ohiari:Ha","Ohiarihkó:Wa","Seskéha","Seskehkó:Wa","Kenténha","Kentenhkó:Wa","Tsothóhrha",""],["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec",""]],
                patterns: {
                    d: "M/d/yyyy",
                    D: "dddd, MMMM dd, yyyy",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    f: "dddd, MMMM dd, yyyy h:mm tt",
                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                    Y: "MMMM, yyyy"
                }
            })
        }
    }, cultures["moh-CA"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);