(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["moh-CA"] = $.extend(true, {}, invariant, {
        name: "moh-CA",
        englishName: "Mohawk (Mohawk)",
        nativeName: "Kanien'kéha",
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
                days: {
                    names: ["Awentatokentì:ke","Awentataón'ke","Ratironhia'kehronòn:ke","Soséhne","Okaristiiáhne","Ronwaia'tanentaktonhne","Entákta"],
                    namesShort: ["S","M","T","W","T","F","S"]
                },
                months: {
                    names: ["Tsothohrkó:Wa","Enniska","Enniskó:Wa","Onerahtókha","Onerahtohkó:Wa","Ohiari:Ha","Ohiarihkó:Wa","Seskéha","Seskehkó:Wa","Kenténha","Kentenhkó:Wa","Tsothóhrha",""]
                },
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