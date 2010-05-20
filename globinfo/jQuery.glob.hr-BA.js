(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["hr-BA"] = $.extend(true, {}, invariant, {
        name: "hr-BA",
        englishName: "Croatian (Latin, Bosnia and Herzegovina)",
        nativeName: "hrvatski (Bosna i Hercegovina)",
        language: "hr",
        numberFormat: {
            pattern: ["- n"],
            ',': ".",
            '.': ",",
            percent: {
                ',': ".",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                ',': ".",
                '.': ",",
                symbol: "KM"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: [["nedjelja","ponedjeljak","utorak","srijeda","četvrtak","petak","subota"],["ned","pon","uto","sri","čet","pet","sub"],["ne","po","ut","sr","če","pe","su"]],
                months: [["siječanj","veljača","ožujak","travanj","svibanj","lipanj","srpanj","kolovoz","rujan","listopad","studeni","prosinac",""],["sij","vlj","ožu","tra","svi","lip","srp","kol","ruj","lis","stu","pro",""]],
                monthsGenitive: [["siječnja","veljače","ožujka","travnja","svibnja","lipnja","srpnja","kolovoza","rujna","listopada","studenog","prosinca",""],["sij","vlj","ožu","tra","svi","lip","srp","kol","ruj","lis","stu","pro",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "d.M.yyyy.",
                    D: "d. MMMM yyyy.",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d. MMMM yyyy. H:mm",
                    F: "d. MMMM yyyy. H:mm:ss",
                    M: "d. MMMM",
                    Y: "MMMM, yyyy"
                }
            })
        }
    }, cultures["hr-BA"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);