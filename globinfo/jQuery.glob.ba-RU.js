(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["ba-RU"] = $.extend(true, {}, invariant, {
        name: "ba-RU",
        englishName: "Bashkir (Russia)",
        nativeName: "Башҡорт (Россия)",
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
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: [["Йәкшәмбе","Дүшәмбе","Шишәмбе","Шаршамбы","Кесаҙна","Йома","Шәмбе"],["Йш","Дш","Шш","Шр","Кс","Йм","Шб"],["Йш","Дш","Шш","Шр","Кс","Йм","Шб"]],
                months: [["ғинуар","февраль","март","апрель","май","июнь","июль","август","сентябрь","октябрь","ноябрь","декабрь",""],["ғин","фев","мар","апр","май","июн","июл","авг","сен","окт","ноя","дек",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yy",
                    D: "d MMMM yyyy \u0027й\u0027",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d MMMM yyyy \u0027й\u0027 H:mm",
                    F: "d MMMM yyyy \u0027й\u0027 H:mm:ss",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);