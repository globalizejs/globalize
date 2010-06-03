(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["am-ET"] = $.extend(true, {}, invariant, {
        name: "am-ET",
        englishName: "Amharic (Ethiopia)",
        nativeName: "አማርኛ (ኢትዮጵያ)",
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
                days: {
                    names: ["እሑድ","ሰኞ","ማክሰኞ","ረቡዕ","ሐሙስ","ዓርብ","ቅዳሜ"],
                    namesAbbr: ["እሑድ","ሰኞ","ማክሰ","ረቡዕ","ሐሙስ","ዓርብ","ቅዳሜ"],
                    namesShort: ["እ","ሰ","ማ","ረ","ሐ","ዓ","ቅ"]
                },
                months: {
                    names: ["ጃንዩወሪ","ፌብሩወሪ","ማርች","ኤፕረል","ሜይ","ጁን","ጁላይ","ኦገስት","ሴፕቴምበር","ኦክተውበር","ኖቬምበር","ዲሴምበር",""],
                    namesAbbr: ["ጃንዩ","ፌብሩ","ማርች","ኤፕረ","ሜይ","ጁን","ጁላይ","ኦገስ","ሴፕቴ","ኦክተ","ኖቬም","ዲሴም",""]
                },
                AM: ["ጡዋት","ጡዋት","ጡዋት"],
                PM: ["ከሰዓት","ከሰዓት","ከሰዓት"],
                eras: [{"name":"ዓመተ  ምሕረት","start":null,"offset":0}],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd '፣' MMMM d 'ቀን' yyyy",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    f: "dddd '፣' MMMM d 'ቀን' yyyy h:mm tt",
                    F: "dddd '፣' MMMM d 'ቀን' yyyy h:mm:ss tt",
                    M: "MMMM d ቀን",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["am-ET"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);