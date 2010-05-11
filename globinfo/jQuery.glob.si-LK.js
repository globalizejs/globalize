(function($) {
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures["si-LK"] = $.extend(true, {}, invariant, {
        name: "si-LK",
        englishName: "Sinhala (Sri Lanka)",
        nativeName: "සිංහල (ශ්‍රී ලංකා)",
        numberFormat: {
            groupSizes: [3,2],
            percent: {
                groupSizes: [3,2]
            },
            currency: {
                pattern: ["($ n)","$ n"],
                symbol: "රු."
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                days: [["ඉරිදා","සඳුදා","අඟහරුවාදා","බදාදා","බ්‍රහස්පතින්දා","සිකුරාදා","සෙනසුරාදා"],["ඉරිදා","සඳුදා","කුජදා","බුදදා","ගුරුදා","කිවිදා","ශනිදා"]],
                months: [["ජනවාරි","පෙබරවාරි","මාර්තු","අ‌ප්‍රේල්","මැයි","ජූනි","ජූලි","අ‌ගෝස්තු","සැප්තැම්බර්","ඔක්තෝබර්","නොවැම්බර්","දෙසැම්බර්",""],["ජන.","පෙබ.","මාර්තු.","අප්‍රේල්.","මැයි.","ජූනි.","ජූලි.","අගෝ.","සැප්.","ඔක්.","නොවැ.","දෙසැ.",""]],
                AM: "පෙ.ව.",
                PM: "ප.ව.",
                eras: [{"name":"ක්‍රි.ව.","start":null,"offset":0}],
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "yyyy MMMM\u0027 මස \u0027dd\u0027 වැනිදා \u0027dddd",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    f: "yyyy MMMM\u0027 මස \u0027dd\u0027 වැනිදා \u0027dddd h:mm tt",
                    F: "yyyy MMMM\u0027 මස \u0027dd\u0027 වැනිදා \u0027dddd h:mm:ss tt"
                }
            })
        }
    });
    culture.calendar = culture.calendars.standard;
})(jQuery);