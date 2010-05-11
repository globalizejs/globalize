(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["kk-KZ"] = $.extend(true, {}, invariant, {
        name: "kk-KZ",
        englishName: "Kazakh (Kazakhstan)",
        nativeName: "Қазақ (Қазақстан)",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["-$n","$n"],
                ',': " ",
                '.': "-",
                symbol: "Т"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                days: [["Жексенбі","Дүйсенбі","Сейсенбі","Сәрсенбі","Бейсенбі","Жұма","Сенбі"],["Жк","Дс","Сс","Ср","Бс","Жм","Сн"]],
                months: [["қаңтар","ақпан","наурыз","сәуір","мамыр","маусым","шілде","тамыз","қыркүйек","қазан","қараша","желтоқсан",""],["Қаң","Ақп","Нау","Сәу","Мам","Мау","Шіл","Там","Қыр","Қаз","Қар","Жел",""]],
                AM: "",
                PM: "",
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "d MMMM yyyy \u0027ж.\u0027",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d MMMM yyyy \u0027ж.\u0027 H:mm",
                    F: "d MMMM yyyy \u0027ж.\u0027 H:mm:ss",
                    M: "d MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);