(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["sv"] = $.extend(true, {}, en, {
        name: "sv",
        englishName: "Swedish",
        nativeName: "svenska",
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
                ',': ".",
                '.': ",",
                symbol: "kr"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': "-",
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
                    d: "yyyy-MM-dd",
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
    }, cultures["sv"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);