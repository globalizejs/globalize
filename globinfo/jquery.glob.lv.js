(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["lv"] = $.extend(true, {}, en, {
        name: "lv",
        englishName: "Latvian",
        nativeName: "latviešu",
        language: "lv",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["-$ n","$ n"],
                ',': " ",
                '.': ",",
                symbol: "Ls"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["svētdiena","pirmdiena","otrdiena","trešdiena","ceturtdiena","piektdiena","sestdiena"],
                    namesAbbr: ["sv","pr","ot","tr","ce","pk","se"],
                    namesShort: ["sv","pr","ot","tr","ce","pk","se"]
                },
                months: {
                    names: ["janvāris","februāris","marts","aprīlis","maijs","jūnijs","jūlijs","augusts","septembris","oktobris","novembris","decembris",""],
                    namesAbbr: ["jan","feb","mar","apr","mai","jūn","jūl","aug","sep","okt","nov","dec",""]
                },
                monthsGenitive: {
                    names: ["janvārī","februārī","martā","aprīlī","maijā","jūnijā","jūlijā","augustā","septembrī","oktobrī","novembrī","decembrī",""],
                    namesAbbr: ["jan","feb","mar","apr","mai","jūn","jūl","aug","sep","okt","nov","dec",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "yyyy.MM.dd.",
                    D: "dddd, yyyy'. gada 'd. MMMM",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "dddd, yyyy'. gada 'd. MMMM H:mm",
                    F: "dddd, yyyy'. gada 'd. MMMM H:mm:ss",
                    M: "d. MMMM",
                    Y: "yyyy. MMMM"
                }
            })
        }
    }, cultures["lv"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);