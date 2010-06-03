(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["smj"] = $.extend(true, {}, invariant, {
        name: "smj",
        englishName: "Sami (Lule)",
        nativeName: "julevusámegiella",
        language: "smj",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["-n $","n $"],
                ',': ".",
                '.': ",",
                symbol: "kr"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                '/': "-",
                firstDay: 1,
                days: {
                    names: ["ájllek","mánnodahka","dijstahka","gasskavahkko","duorastahka","bierjjedahka","lávvodahka"],
                    namesAbbr: ["ájl","mán","dis","gas","duor","bier","láv"],
                    namesShort: ["á","m","d","g","d","b","l"]
                },
                months: {
                    names: ["ådåjakmánno","guovvamánno","sjnjuktjamánno","vuoratjismánno","moarmesmánno","biehtsemánno","sjnjilltjamánno","bårggemánno","ragátmánno","gålgådismánno","basádismánno","javllamánno",""],
                    namesAbbr: ["ådåj","guov","snju","vuor","moar","bieh","snji","bårg","ragá","gålg","basá","javl",""]
                },
                monthsGenitive: {
                    names: ["ådåjakmáno","guovvamáno","sjnjuktjamáno","vuoratjismáno","moarmesmáno","biehtsemáno","sjnjilltjamáno","bårggemáno","ragátmáno","gålgådismáno","basádismáno","javllamáno",""],
                    namesAbbr: ["ådåj","guov","snju","vuor","moar","bieh","snji","bårg","ragá","gålg","basá","javl",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "yyyy-MM-dd",
                    D: "MMMM d'. b. 'yyyy",
                    f: "MMMM d'. b. 'yyyy HH:mm",
                    F: "MMMM d'. b. 'yyyy HH:mm:ss",
                    M: "MMMM d'. b. '",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["smj"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);