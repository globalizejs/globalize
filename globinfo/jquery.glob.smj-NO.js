(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["smj-NO"] = $.extend(true, {}, en, {
        name: "smj-NO",
        englishName: "Sami, Lule (Norway)",
        nativeName: "julevusámegiella (Vuodna)",
        language: "smj",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                pattern: ["-%n","%n"],
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["$ -n","$ n"],
                ',': " ",
                '.': ",",
                symbol: "kr"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["sådnåbiejvve","mánnodahka","dijstahka","gasskavahkko","duorastahka","bierjjedahka","lávvodahka"],
                    namesAbbr: ["såd","mán","dis","gas","duor","bier","láv"],
                    namesShort: ["s","m","d","g","d","b","l"]
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
                    d: "dd.MM.yyyy",
                    D: "MMMM d'. b. 'yyyy",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "MMMM d'. b. 'yyyy HH:mm",
                    F: "MMMM d'. b. 'yyyy HH:mm:ss",
                    M: "MMMM d'. b. '",
                    Y: "MMMM yyyy"
                }
            })
        }
    }, cultures["smj-NO"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);