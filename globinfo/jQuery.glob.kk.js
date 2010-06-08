(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["kk"] = $.extend(true, {}, en, {
        name: "kk",
        englishName: "Kazakh",
        nativeName: "Қазақ",
        language: "kk",
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
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["Жексенбі","Дүйсенбі","Сейсенбі","Сәрсенбі","Бейсенбі","Жұма","Сенбі"],
                    namesAbbr: ["Жк","Дс","Сс","Ср","Бс","Жм","Сн"],
                    namesShort: ["Жк","Дс","Сс","Ср","Бс","Жм","Сн"]
                },
                months: {
                    names: ["қаңтар","ақпан","наурыз","сәуір","мамыр","маусым","шілде","тамыз","қыркүйек","қазан","қараша","желтоқсан",""],
                    namesAbbr: ["Қаң","Ақп","Нау","Сәу","Мам","Мау","Шіл","Там","Қыр","Қаз","Қар","Жел",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "d MMMM yyyy 'ж.'",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d MMMM yyyy 'ж.' H:mm",
                    F: "d MMMM yyyy 'ж.' H:mm:ss",
                    M: "d MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["kk"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);