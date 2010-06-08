(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["sl-SI"] = $.extend(true, {}, en, {
        name: "sl-SI",
        englishName: "Slovenian (Slovenia)",
        nativeName: "slovenski (Slovenija)",
        language: "sl",
        numberFormat: {
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
                symbol: "€"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["nedelja","ponedeljek","torek","sreda","četrtek","petek","sobota"],
                    namesAbbr: ["ned","pon","tor","sre","čet","pet","sob"],
                    namesShort: ["ne","po","to","sr","če","pe","so"]
                },
                months: {
                    names: ["januar","februar","marec","april","maj","junij","julij","avgust","september","oktober","november","december",""],
                    namesAbbr: ["jan","feb","mar","apr","maj","jun","jul","avg","sep","okt","nov","dec",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "d.M.yyyy",
                    D: "d. MMMM yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d. MMMM yyyy H:mm",
                    F: "d. MMMM yyyy H:mm:ss",
                    M: "d. MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["sl-SI"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);