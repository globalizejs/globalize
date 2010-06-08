(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["ms-BN"] = $.extend(true, {}, en, {
        name: "ms-BN",
        englishName: "Malay (Brunei Darussalam)",
        nativeName: "Bahasa Melayu (Brunei Darussalam)",
        language: "ms",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                ',': ".",
                '.': ","
            },
            currency: {
                decimals: 0,
                ',': ".",
                '.': ","
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                firstDay: 1,
                days: {
                    names: ["Ahad","Isnin","Selasa","Rabu","Khamis","Jumaat","Sabtu"],
                    namesAbbr: ["Ahad","Isnin","Sel","Rabu","Khamis","Jumaat","Sabtu"],
                    namesShort: ["A","I","S","R","K","J","S"]
                },
                months: {
                    names: ["Januari","Februari","Mac","April","Mei","Jun","Julai","Ogos","September","Oktober","November","Disember",""],
                    namesAbbr: ["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ogos","Sept","Okt","Nov","Dis",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "dd/MM/yyyy",
                    D: "dd MMMM yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "dd MMMM yyyy H:mm",
                    F: "dd MMMM yyyy H:mm:ss",
                    M: "dd MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["ms-BN"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);