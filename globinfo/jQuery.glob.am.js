(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["am"] = $.extend(true, {}, invariant, {
        name: "am",
        englishName: "Amharic",
        nativeName: "አማርኛ",
        language: "am",
        numberFormat: {
            decimals: 1,
            groupSizes: [3,0],
            percent: {
                pattern: ["-n%","n%"],
                decimals: 1,
                groupSizes: [3,0]
            },
            currency: {
                pattern: ["-$n","$n"],
                groupSizes: [3,0],
                symbol: "ETB"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                days: [["እሑድ","ሰኞ","ማክሰኞ","ረቡዕ","ሐሙስ","ዓርብ","ቅዳሜ"],["እሑድ","ሰኞ","ማክሰ","ረቡዕ","ሐሙስ","ዓርብ","ቅዳሜ"],["እ","ሰ","ማ","ረ","ሐ","ዓ","ቅ"]],
                months: [["ጃንዩወሪ","ፌብሩወሪ","ማርች","ኤፕረል","ሜይ","ጁን","ጁላይ","ኦገስት","ሴፕቴምበር","ኦክተውበር","ኖቬምበር","ዲሴምበር",""],["ጃንዩ","ፌብሩ","ማርች","ኤፕረ","ሜይ","ጁን","ጁላይ","ኦገስ","ሴፕቴ","ኦክተ","ኖቬም","ዲሴም",""]],
                AM: ["ጡዋት","ጡዋት","ጡዋት"],
                PM: ["ከሰዓት","ከሰዓት","ከሰዓት"],
                eras: [{"name":"ዓመተ  ምሕረት","start":null,"offset":0}],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd \u0027፣\u0027 MMMM d \u0027ቀን\u0027 yyyy",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    f: "dddd \u0027፣\u0027 MMMM d \u0027ቀን\u0027 yyyy h:mm tt",
                    F: "dddd \u0027፣\u0027 MMMM d \u0027ቀን\u0027 yyyy h:mm:ss tt",
                    M: "MMMM d ቀን",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["am"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);