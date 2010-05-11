(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["hr-HR"] = $.extend(true, {}, invariant, {
        name: "hr-HR",
        englishName: "Croatian (Croatia)",
        nativeName: "hrvatski (Hrvatska)",
        numberFormat: {
            pattern: ["- n"],
            ',': ".",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': ".",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                ',': ".",
                '.': ",",
                symbol: "kn"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                days: [["nedjelja","ponedjeljak","utorak","srijeda","četvrtak","petak","subota"],["ned","pon","uto","sri","čet","pet","sub"]],
                months: [["siječanj","veljača","ožujak","travanj","svibanj","lipanj","srpanj","kolovoz","rujan","listopad","studeni","prosinac",""],["sij","vlj","ožu","tra","svi","lip","srp","kol","ruj","lis","stu","pro",""]],
                monthsGenitive: [["siječnja","veljače","ožujka","travnja","svibnja","lipnja","srpnja","kolovoza","rujna","listopada","studenog","prosinca",""],["sij","vlj","ožu","tra","svi","lip","srp","kol","ruj","lis","stu","pro",""]],
                AM: "",
                PM: "",
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
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);