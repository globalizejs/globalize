(function($) {
    var cultures = $.cultures,
        en = cultures.en,
        standard = en.calendars.standard,
        culture = cultures["rw-RW"] = $.extend(true, {}, en, {
        name: "rw-RW",
        englishName: "Kinyarwanda (Rwanda)",
        nativeName: "Kinyarwanda (Rwanda)",
        language: "rw",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                ',': " ",
                '.': ","
            },
            currency: {
                pattern: ["$-n","$ n"],
                ',': " ",
                '.': ",",
                symbol: "RWF"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    names: ["Ku wa mbere","Ku wa kabiri","Ku wa gatatu","Ku wa kane","Ku wa gatanu","Ku wa gatandatu","Ku cyumweru"],
                    namesAbbr: ["mbe.","kab.","gat.","kan.","gat.","gat.","cyu."],
                    namesShort: ["mb","ka","ga","ka","ga","ga","cy"]
                },
                months: {
                    names: ["Mutarama","Gashyantare","Werurwe","Mata","Gicurasi","Kamena","Nyakanga","Kanama","Nzeli","Ukwakira","Ugushyingo","Ukuboza",""],
                    namesAbbr: ["Mut","Gas","Wer","Mat","Gic","Kam","Nya","Kan","Nze","Ukwa","Ugu","Uku",""]
                },
                AM: ["saa moya z.m.","saa moya z.m.","SAA MOYA Z.M."],
                PM: ["saa moya z.n.","saa moya z.n.","SAA MOYA Z.N."],
                eras: [{"name":"AD","start":null,"offset":0}]
            })
        }
    }, cultures["rw-RW"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);