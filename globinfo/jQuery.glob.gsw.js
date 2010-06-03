(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["gsw"] = $.extend(true, {}, invariant, {
        name: "gsw",
        englishName: "Alsatian",
        nativeName: "Elsässisch",
        language: "gsw",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                ',': " ",
                '.': ",",
                symbol: "€"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                firstDay: 1,
                days: {
                    names: ["Sundàà","Mondàà","Dienschdàà","Mittwuch","Dunnerschdàà","Fridàà","Sàmschdàà"],
                    namesAbbr: ["Su.","Mo.","Di.","Mi.","Du.","Fr.","Sà."],
                    namesShort: ["Su","Mo","Di","Mi","Du","Fr","Sà"]
                },
                months: {
                    names: ["Jänner","Feverje","März","Àpril","Mai","Jüni","Jüli","Augscht","September","Oktower","Nowember","Dezember",""],
                    namesAbbr: ["Jän.","Fev.","März","Apr.","Mai","Jüni","Jüli","Aug.","Sept.","Okt.","Now.","Dez.",""]
                },
                AM: null,
                PM: null,
                eras: [{"name":"Vor J.-C.","start":null,"offset":0}],
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dddd d MMMM yyyy",
                    f: "dddd d MMMM yyyy HH:mm",
                    F: "dddd d MMMM yyyy HH:mm:ss",
                    M: "d MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["gsw"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);