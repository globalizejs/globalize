(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["sr-Cyrl-RS"] = $.extend(true, {}, en, {
        name: "sr-Cyrl-RS",
        englishName: "Serbian (Cyrillic, Serbia)",
        nativeName: "српски (Србија)",
        language: "sr-Cyrl",
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
                symbol: "Дин."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["недеља","понедељак","уторак","среда","четвртак","петак","субота"],
                    namesAbbr: ["нед","пон","уто","сре","чет","пет","суб"],
                    namesShort: ["не","по","ут","ср","че","пе","су"]
                },
                months: {
                    names: ["јануар","фебруар","март","април","мај","јун","јул","август","септембар","октобар","новембар","децембар",""],
                    namesAbbr: ["јан","феб","мар","апр","мај","јун","јул","авг","сеп","окт","нов","дец",""]
                },
                AM: null,
                PM: null,
                eras: [{"name":"н.е.","start":null,"offset":0}],
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
    }, cultures["sr-Cyrl-RS"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);