(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["lv-LV"] = $.extend(true, {}, invariant, {
        name: "lv-LV",
        englishName: "Latvian (Latvia)",
        nativeName: "latviešu (Latvija)",
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
                name: "Gregorian_Localized",
                '/': ".",
                days: [["svētdiena","pirmdiena","otrdiena","trešdiena","ceturtdiena","piektdiena","sestdiena"],["sv","pr","ot","tr","ce","pk","se"]],
                months: [["janvāris","februāris","marts","aprīlis","maijs","jūnijs","jūlijs","augusts","septembris","oktobris","novembris","decembris",""],["jan","feb","mar","apr","mai","jūn","jūl","aug","sep","okt","nov","dec",""]],
                monthsGenitive: [["janvārī","februārī","martā","aprīlī","maijā","jūnijā","jūlijā","augustā","septembrī","oktobrī","novembrī","decembrī",""],["jan","feb","mar","apr","mai","jūn","jūl","aug","sep","okt","nov","dec",""]],
                AM: "",
                PM: "",
                patterns: {
                    d: "yyyy.MM.dd.",
                    D: "dddd, yyyy\u0027. gada \u0027d. MMMM",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "dddd, yyyy\u0027. gada \u0027d. MMMM H:mm",
                    F: "dddd, yyyy\u0027. gada \u0027d. MMMM H:mm:ss",
                    M: "d. MMMM",
                    Y: "yyyy. MMMM"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);