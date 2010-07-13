(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["fi-FI"] = $.extend(true, {}, en, {
        name: "fi-FI",
        englishName: "Finnish (Finland)",
        nativeName: "suomi (Suomi)",
        language: "fi",
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
                    names: ["sunnuntai","maanantai","tiistai","keskiviikko","torstai","perjantai","lauantai"],
                    namesAbbr: ["su","ma","ti","ke","to","pe","la"],
                    namesShort: ["su","ma","ti","ke","to","pe","la"]
                },
                months: {
                    names: ["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kesäkuu","heinäkuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu",""],
                    namesAbbr: ["tammi","helmi","maalis","huhti","touko","kesä","heinä","elo","syys","loka","marras","joulu",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "d.M.yyyy",
                    D: "d. MMMM'ta 'yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d. MMMM'ta 'yyyy H:mm",
                    F: "d. MMMM'ta 'yyyy H:mm:ss",
                    M: "d. MMMM'ta'",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["fi-FI"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);