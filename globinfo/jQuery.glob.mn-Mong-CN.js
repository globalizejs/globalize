(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["mn-Mong-CN"] = $.extend(true, {}, invariant, {
        name: "mn-Mong-CN",
        englishName: "Mongolian (Traditional Mongolian, PRC)",
        nativeName: "ᠮᠤᠨᠭᠭᠤᠯ ᠬᠡᠯᠡ (ᠪᠦᠭᠦᠳᠡ ᠨᠠᠢᠷᠠᠮᠳᠠᠬᠤ ᠳᠤᠮᠳᠠᠳᠤ ᠠᠷᠠᠳ ᠣᠯᠣᠰ)",
        language: "mn-Mong",
        numberFormat: {
            groupSizes: [3,0],
            percent: {
                pattern: ["-n%","n%"],
                groupSizes: [3,0]
            },
            currency: {
                pattern: ["$-n","$n"],
                groupSizes: [3,0],
                symbol: "¥"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                firstDay: 1,
                days: [["ᠭᠠᠷᠠᠭ ᠤᠨ ᠡᠳᠦᠷ","ᠭᠠᠷᠠᠭ ᠤᠨ ᠨᠢᠭᠡᠨ","ᠭᠠᠷᠠᠭ ᠤᠨ ᠬᠣᠶᠠᠷ","ᠭᠠᠷᠠᠭ ᠤᠨ ᠭᠤᠷᠪᠠᠨ","ᠭᠠᠷᠠᠭ ᠤᠨ ᠳᠥᠷᠪᠡᠨ","ᠭᠠᠷᠠᠭ ᠤᠨ ᠲᠠᠪᠤᠨ","ᠭᠠᠷᠠᠭ ᠤᠨ ᠵᠢᠷᠭᠤᠭᠠᠨ"],["ᠭᠠᠷᠠᠭ ᠤᠨ ᠡᠳᠦᠷ","ᠭᠠᠷᠠᠭ ᠤᠨ ᠨᠢᠭᠡᠨ","ᠭᠠᠷᠠᠭ ᠤᠨ ᠬᠣᠶᠠᠷ","ᠭᠠᠷᠠᠭ ᠤᠨ ᠭᠤᠷᠪᠠᠨ","ᠭᠠᠷᠠᠭ ᠤᠨ ᠳᠥᠷᠪᠡᠨ","ᠭᠠᠷᠠᠭ ᠤᠨ ᠲᠠᠪᠤᠨ","ᠭᠠᠷᠠᠭ ᠤᠨ ᠵᠢᠷᠭᠤᠭᠠᠨ"],["ᠡ‍","ᠨᠢ‍","ᠬᠣ‍","ᠭᠤ‍","ᠳᠥ‍","ᠲᠠ‍","ᠵᠢ‍"]],
                months: [["ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠬᠤᠶ᠋ᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠭᠤᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠦᠷᠪᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠠᠪᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠵᠢᠷᠭᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠤᠯᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠨᠠᠢᠮᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠶᠢᠰᠦᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠨ ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠨ ᠬᠤᠶ᠋ᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",""],["ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠬᠤᠶ᠋ᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠭᠤᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠦᠷᠪᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠠᠪᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠵᠢᠷᠭᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠤᠯᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠨᠠᠢᠮᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠶᠢᠰᠦᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠨ ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠨ ᠬᠤᠶ᠋ᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ",""]],
                AM: null,
                PM: null,
                eras: [{"name":"ᠣᠨ ᠲᠣᠭᠠᠯᠠᠯ ᠤᠨ","start":null,"offset":0}],
                patterns: {
                    d: "yyyy/M/d",
                    D: "yyyy\u0027ᠣᠨ ᠤ᠋\u0027 M\u0027ᠰᠠᠷ᠎ᠠ  ᠢᠢᠨ \u0027d\u0027 ᠤ᠋ ᠡᠳᠦᠷ\u0027",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "yyyy\u0027ᠣᠨ ᠤ᠋\u0027 M\u0027ᠰᠠᠷ᠎ᠠ  ᠢᠢᠨ \u0027d\u0027 ᠤ᠋ ᠡᠳᠦᠷ\u0027 H:mm",
                    F: "yyyy\u0027ᠣᠨ ᠤ᠋\u0027 M\u0027ᠰᠠᠷ᠎ᠠ  ᠢᠢᠨ \u0027d\u0027 ᠤ᠋ ᠡᠳᠦᠷ\u0027 H:mm:ss",
                    M: "M\u0027ᠰᠠᠷ᠎ᠠ\u0027 d\u0027ᠡᠳᠦᠷ\u0027",
                    Y: "yyyy\u0027ᠣᠨ\u0027 M\u0027ᠰᠠᠷ᠎ᠠ\u0027"
                }
            })
        }
    }, cultures["mn-Mong-CN"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);