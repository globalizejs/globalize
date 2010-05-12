(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["az-Latn-AZ"] = $.extend(true, {}, invariant, {
        name: "az-Latn-AZ",
        englishName: "Azeri (Latin, Azerbaijan)",
        nativeName: "Azərbaycan­ılı (Azərbaycan)",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                ',': " ",
                '.': ",",
                symbol: "man."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': ".",
                firstDay: 1,
                days: [["Bazar","Bazar ertəsi","Çərşənbə axşamı","Çərşənbə","Cümə axşamı","Cümə","Şənbə"],["B","Be","Ça","Ç","Ca","C","Ş"],["B","Be","Ça","Ç","Ca","C","Ş"]],
                months: [["Yanvar","Fevral","Mart","Aprel","May","İyun","İyul","Avgust","Sentyabr","Oktyabr","Noyabr","Dekabr",""],["Yan","Fev","Mar","Apr","May","İyun","İyul","Avg","Sen","Okt","Noy","Dek",""]],
                monthsGenitive: [["yanvar","fevral","mart","aprel","may","iyun","iyul","avgust","sentyabr","oktyabr","noyabr","dekabr",""],["Yan","Fev","Mar","Apr","May","İyun","İyul","Avg","Sen","Okt","Noy","Dek",""]],
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "d MMMM yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d MMMM yyyy H:mm",
                    F: "d MMMM yyyy H:mm:ss",
                    M: "d MMMM",
                    Y: "MMMM yyyy"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);