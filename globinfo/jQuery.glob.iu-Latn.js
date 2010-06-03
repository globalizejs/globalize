(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["iu-Latn"] = $.extend(true, {}, invariant, {
        name: "iu-Latn",
        englishName: "Inuktitut (Latin)",
        nativeName: "Inuktitut",
        language: "iu-Latn",
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
                    names: ["Naattiinguja","Naggajjau","Aippiq","Pingatsiq","Sitammiq","Tallirmiq","Sivataarvik"],
                    namesAbbr: ["Nat","Nag","Aip","Pi","Sit","Tal","Siv"],
                    namesShort: ["N","N","A","P","S","T","S"]
                },
                months: {
                    names: ["Jaannuari","Viivvuari","Maatsi","Iipuri","Mai","Juuni","Julai","Aaggiisi","Sitipiri","Utupiri","Nuvipiri","Tisipiri",""],
                    namesAbbr: ["Jan","Viv","Mas","Ipu","Mai","Jun","Jul","Agi","Sii","Uut","Nuv","Tis",""]
                },
                patterns: {
                    d: "d/MM/yyyy",
                    D: "ddd, MMMM dd,yyyy",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    f: "ddd, MMMM dd,yyyy h:mm tt",
                    F: "ddd, MMMM dd,yyyy h:mm:ss tt",
                    Y: "MMMM, yyyy"
                }
            })
        }
    }, cultures["iu-Latn"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);