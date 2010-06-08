(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["sv-FI"] = $.extend(true, {}, en, {
        name: "sv-FI",
        englishName: "Swedish (Finland)",
        nativeName: "svenska (Finland)",
        language: "sv",
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
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["söndag","måndag","tisdag","onsdag","torsdag","fredag","lördag"],
                    namesAbbr: ["sö","må","ti","on","to","fr","lö"],
                    namesShort: ["sö","må","ti","on","to","fr","lö"]
                },
                months: {
                    names: ["januari","februari","mars","april","maj","juni","juli","augusti","september","oktober","november","december",""],
                    namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","aug","sep","okt","nov","dec",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "d.M.yyyy",
                    D: "'den 'd MMMM yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "'den 'd MMMM yyyy HH:mm",
                    F: "'den 'd MMMM yyyy HH:mm:ss",
                    M: "'den 'd MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["sv-FI"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);