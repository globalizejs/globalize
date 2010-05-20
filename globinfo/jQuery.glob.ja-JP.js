(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["ja-JP"] = $.extend(true, {}, invariant, {
        name: "ja-JP",
        englishName: "Japanese (Japan)",
        nativeName: "日本語 (日本)",
        language: "ja",
        numberFormat: {
            percent: {
                pattern: ["-n%","n%"]
            },
            currency: {
                pattern: ["-$n","$n"],
                decimals: 0,
                symbol: "¥"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                days: [["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],["日","月","火","水","木","金","土"],["日","月","火","水","木","金","土"]],
                months: [["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月",""],["1","2","3","4","5","6","7","8","9","10","11","12",""]],
                AM: ["午前","午前","午前"],
                PM: ["午後","午後","午後"],
                eras: [{"name":"西暦","start":null,"offset":0}],
                patterns: {
                    d: "yyyy/MM/dd",
                    D: "yyyy\u0027年\u0027M\u0027月\u0027d\u0027日\u0027",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "yyyy\u0027年\u0027M\u0027月\u0027d\u0027日\u0027 H:mm",
                    F: "yyyy\u0027年\u0027M\u0027月\u0027d\u0027日\u0027 H:mm:ss",
                    M: "M\u0027月\u0027d\u0027日\u0027",
                    Y: "yyyy\u0027年\u0027M\u0027月\u0027"
                }
            }),
            Japanese: $.extend(true, {}, standard, {
                name: "Japanese",
                days: [["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],["日","月","火","水","木","金","土"],["日","月","火","水","木","金","土"]],
                months: [["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月",""],["1","2","3","4","5","6","7","8","9","10","11","12",""]],
                AM: ["午前","午前","午前"],
                PM: ["午後","午後","午後"],
                eras: [{"name":"平成","start":null,"offset":1867},{"name":"昭和","start":-1812153600000,"offset":1911},{"name":"大正","start":-1357603200000,"offset":1925},{"name":"明治","start":60022080000,"offset":1988}],
                twoDigitYearMax: 99,
                patterns: {
                    d: "gg y/M/d",
                    D: "gg y\u0027年\u0027M\u0027月\u0027d\u0027日\u0027",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "gg y\u0027年\u0027M\u0027月\u0027d\u0027日\u0027 H:mm",
                    F: "gg y\u0027年\u0027M\u0027月\u0027d\u0027日\u0027 H:mm:ss",
                    M: "M\u0027月\u0027d\u0027日\u0027",
                    Y: "gg y\u0027年\u0027M\u0027月\u0027"
                }
            })
        }
    }, cultures["ja-JP"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);