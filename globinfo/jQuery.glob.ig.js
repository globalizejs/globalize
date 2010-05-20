(function($) {
    var cultures = $.cultures,
        invariant = cultures.invariant,
        standard = invariant.calendars.standard,
        culture = cultures["ig"] = $.extend(true, {}, invariant, {
        name: "ig",
        englishName: "Igbo",
        nativeName: "Igbo",
        language: "ig",
        numberFormat: {
            currency: {
                pattern: ["$-n","$ n"],
                symbol: "N"
            }
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                name: "Gregorian_Localized",
                days: [["Aiku","Aje","Isegun","Ojo\u0027ru","Ojo\u0027bo","Eti","Abameta"],["Aik","Aje","Ise","Ojo","Ojo","Eti","Aba"],["A","A","I","O","O","E","A"]],
                months: [["Onwa mbu","Onwa ibua","Onwa ato","Onwa ano","Onwa ise","Onwa isi","Onwa asa","Onwa asato","Onwa itolu","Onwa iri","Onwa iri n\u0027ofu","Onwa iri n\u0027ibua",""],["mbu.","ibu.","ato.","ano.","ise","isi","asa","asa.","ito.","iri.","n\u0027of.","n\u0027ib.",""]],
                AM: ["Ututu","ututu","UTUTU"],
                PM: ["Efifie","efifie","EFIFIE"],
                eras: [{"name":"AD","start":null,"offset":0}],
                patterns: {
                    d: "d/M/yyyy",
                    D: "dddd, MMMM dd, yyyy",
                    t: "h:mm tt",
                    T: "h:mm:ss tt",
                    f: "dddd, MMMM dd, yyyy h:mm tt",
                    F: "dddd, MMMM dd, yyyy h:mm:ss tt",
                    Y: "MMMM, yyyy"
                }
            })
        }
    }, cultures["ig"]);
    culture.calendar = culture.calendars.standard;
})(jQuery);