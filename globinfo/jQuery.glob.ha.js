(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["ha"] = $.extend(true, {}, invariant, {
        name: "ha",
        englishName: "Hausa",
        nativeName: "Hausa",
        language: "ha",
        numberFormat: {
            currency: {
                pattern: ["$-n","$ n"],
                symbol: "N"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                days: {
                    names: ["Lahadi","Litinin","Talata","Laraba","Alhamis","Juma'a","Asabar"],
                    namesAbbr: ["Lah","Lit","Tal","Lar","Alh","Jum","Asa"],
                    namesShort: ["L","L","T","L","A","J","A"]
                },
                months: {
                    names: ["Januwaru","Febreru","Maris","Afrilu","Mayu","Yuni","Yuli","Agusta","Satumba","Oktocba","Nuwamba","Disamba",""],
                    namesAbbr: ["Jan","Feb","Mar","Afr","May","Yun","Yul","Agu","Sat","Okt","Nuw","Dis",""]
                },
                AM: ["Safe","safe","SAFE"],
                PM: ["Yamma","yamma","YAMMA"],
                eras: [{"name":"AD","start":null,"offset":0}],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd, MMMM dd, yyyy",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    f: "dddd, MMMM dd, yyyy h:mm tt",
                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                    Y: "MMMM, yyyy"
                }
            })
        }
    }, cultures["ha"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);