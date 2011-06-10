(function($) {
    var cultures = $.global.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["ja-JP"] = $.extend(true, {}, en, {
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
                symbol: "\"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    names: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
                    namesAbbr: ["日","月","火","水","木","金","土"],
                    namesShort: ["日","月","火","水","木","金","土"]
                },
                months: {
                    names: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月",""],
                    namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12",""]
                },
                AM: ["午前","午前","午前"],
                PM: ["午後","午後","午後"],
                eras: [{"name":"西暦","start":null,"offset":0}],
                patterns: {
                    d: "yyyy/MM/dd",
                    D: "yyyy'年'M'月'd'日'",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "yyyy'年'M'月'd'日' H:mm",
                    F: "yyyy'年'M'月'd'日' H:mm:ss",
                    M: "M'月'd'日'",
                    Y: "yyyy'年'M'月'"
                }
            }),
            Japanese: $.extend(true, {}, standard, {
                name: "Japanese",
                days: {
                    names: ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],
                    namesAbbr: ["日","月","火","水","木","金","土"],
                    namesShort: ["日","月","火","水","木","金","土"]
                },
                months: {
                    names: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月",""],
                    namesAbbr: ["1","2","3","4","5","6","7","8","9","10","11","12",""]
                },
                AM: ["午前","午前","午前"],
                PM: ["午後","午後","午後"],
                eras: [
                    { "name": "平成", "start": new Date("1989/1/8").getTime(), "offset": 1988 },
                    { "name": "昭和", "start": new Date("1926/12/25").getTime(), "offset": 1925 },
                    { "name": "大正", "start": new Date("1912/7/30").getTime(), "offset": 1911 },
                    { "name": "明治", "start": new Date("1968/9/8").getTime(), "offset": 1867 }
                ],
                twoDigitYearMax: 99,
                patterns: {
                    d: "gg y/M/d",
                    D: "gg y'年'M'月'd'日'",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "gg y'年'M'月'd'日' H:mm",
                    F: "gg y'年'M'月'd'日' H:mm:ss",
                    M: "M'月'd'日'",
                    Y: "gg y'年'M'月'"
                }
            })
        }
    }, cultures["ja-JP"]);
    culture.calendar = culture.calendars.standard;
})(Globalization);