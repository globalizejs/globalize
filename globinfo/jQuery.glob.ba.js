(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["ba"] = $.extend(true, {}, en, {
        name: "ba",
        englishName: "Bashkir",
        nativeName: "Башҡорт",
        language: "ba",
        numberFormat: {
            ',': " ",
            '.': ",",
            groupSizes: [3,0],
            percent: {
                pattern: ["-n%","n%"],
                groupSizes: [3,0],
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                groupSizes: [3,0],
                ',': " ",
                '.': ",",
                symbol: "һ."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["Йәкшәмбе","Дүшәмбе","Шишәмбе","Шаршамбы","Кесаҙна","Йома","Шәмбе"],
                    namesAbbr: ["Йш","Дш","Шш","Шр","Кс","Йм","Шб"],
                    namesShort: ["Йш","Дш","Шш","Шр","Кс","Йм","Шб"]
                },
                months: {
                    names: ["ғинуар","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь",""],
                    namesAbbr: ["ғин","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yy",
                    D: "d MMMM yyyy 'й'",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d MMMM yyyy 'й' H:mm",
                    F: "d MMMM yyyy 'й' H:mm:ss",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["ba"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);