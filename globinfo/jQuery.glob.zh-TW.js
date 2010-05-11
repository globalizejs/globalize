(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["zh-TW"] = $.extend(true, {}, invariant, {
        name: "zh-TW",
        englishName: "Chinese (Traditional, Taiwan)",
        nativeName: "中文(台灣)",
        numberFormat: {
            percent: {
                pattern: ["-n%","n%"]
            },
            currency: {
                pattern: ["-$n","$n"],
                symbol: "NT$"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                days: [["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],["週日","週一","週二","週三","週四","週五","週六"]],
                months: [["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""],["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""]],
                AM: "上午",
                PM: "下午",
                eras: [{"name":"西元","start":null,"offset":0}],
                patterns: {
                    d: "yyyy/M/d",
                    D: "yyyy\u0027年\u0027M\u0027月\u0027d\u0027日\u0027",
                    t: "tt hh:mm",
                    T: "tt hh:mm:ss",
                    f: "yyyy\u0027年\u0027M\u0027月\u0027d\u0027日\u0027 tt hh:mm",
                    F: "yyyy\u0027年\u0027M\u0027月\u0027d\u0027日\u0027 tt hh:mm:ss",
                    M: "M\u0027月\u0027d\u0027日\u0027",
                    Y: "yyyy\u0027年\u0027M\u0027月\u0027"
                }
            }),
            Taiwan: $.extend(true, {}, standard, {
                name: "Taiwan",
                days: [["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],["週日","週一","週二","週三","週四","週五","週六"]],
                months: [["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""],["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""]],
                AM: "上午",
                PM: "下午",
                eras: [{"name":"","start":null,"offset":1911}],
                twoDigitYearMax: 99,
                patterns: {
                    d: "yyyy/M/d",
                    D: "yyyy\u0027年\u0027M\u0027月\u0027d\u0027日\u0027",
                    t: "tt hh:mm",
                    T: "tt hh:mm:ss",
                    f: "yyyy\u0027年\u0027M\u0027月\u0027d\u0027日\u0027 tt hh:mm",
                    F: "yyyy\u0027年\u0027M\u0027月\u0027d\u0027日\u0027 tt hh:mm:ss",
                    M: "M\u0027月\u0027d\u0027日\u0027",
                    Y: "yyyy\u0027年\u0027M\u0027月\u0027"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);