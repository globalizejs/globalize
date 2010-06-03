(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["iu-Cans"] = $.extend(true, {}, invariant, {
        name: "iu-Cans",
        englishName: "Inuktitut (Syllabics)",
        nativeName: "ᐃᓄᒃᑎᑐᑦ",
        language: "iu-Cans",
        numberFormat: {
            groupSizes: [3,0],
            percent: {
                pattern: ["-n%","n%"],
                groupSizes: [3,0]
            },
            currency: {
                groupSizes: [3,0],
                symbol: "$"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                days: {
                    names: ["ᓈᑦᑏᖑᔭ","ᓇᒡᒐᔾᔭᐅ","ᐊᐃᑉᐱᖅ","ᐱᖓᑦᓯᖅ","ᓯᑕᒻᒥᖅ","ᑕᓪᓕᕐᒥᖅ","ᓯᕙᑖᕐᕕᒃ"],
                    namesAbbr: ["ᓈᑦᑏ","ᓇᒡᒐ","ᐊᐃᑉᐱ","ᐱᖓᑦᓯ","ᓯᑕ","ᑕᓪᓕ","ᓯᕙᑖᕐᕕᒃ"],
                    namesShort: ["ᓈ","ᓇ","ᐊ","ᐱ","ᓯ","ᑕ","ᓯ"]
                },
                months: {
                    names: ["ᔮᓐᓄᐊᕆ","ᕖᕝᕗᐊᕆ","ᒫᑦᓯ","ᐄᐳᕆ","ᒪᐃ","ᔫᓂ","ᔪᓚᐃ","ᐋᒡᒌᓯ","ᓯᑎᐱᕆ","ᐅᑐᐱᕆ","ᓄᕕᐱᕆ","ᑎᓯᐱᕆ",""],
                    namesAbbr: ["ᔮᓐᓄ","ᕖᕝᕗ","ᒫᑦᓯ","ᐄᐳᕆ","ᒪᐃ","ᔫᓂ","ᔪᓚᐃ","ᐋᒡᒌ","ᓯᑎᐱ","ᐅᑐᐱ","ᓄᕕᐱ","ᑎᓯᐱ",""]
                },
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd,MMMM dd,yyyy",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    f: "dddd,MMMM dd,yyyy h:mm tt",
                    F: "dddd,MMMM dd,yyyy h:mm:ss tt",
                    Y: "MMMM,yyyy"
                }
            })
        }
    }, cultures["iu-Cans"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);