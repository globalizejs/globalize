(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["no"] = $.extend(true, {}, en, {
        name: "no",
        englishName: "Norwegian",
        nativeName: "norsk",
        language: "no",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["$ -n","$ n"],
                ',': " ",
                '.': ",",
                symbol: "kr"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["søndag","mandag","tirsdag","onsdag","torsdag","fredag","lørdag"],
                    namesAbbr: ["sø","ma","ti","on","to","fr","lø"],
                    namesShort: ["sø","ma","ti","on","to","fr","lø"]
                },
                months: {
                    names: ["januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember",""],
                    namesAbbr: ["jan","feb","mar","apr","mai","jun","jul","aug","sep","okt","nov","des",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "d. MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "d. MMMM yyyy HH:mm",
                    F: "d. MMMM yyyy HH:mm:ss",
                    M: "d. MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["no"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);