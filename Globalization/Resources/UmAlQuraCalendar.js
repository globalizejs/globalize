                    _yearInfo: [
                        // MonthLengthFlags, Gregorian Date
                        [746, -2198707200000],
                        [1769, -2168121600000],
                        [3794, -2137449600000],
                        [3748, -2106777600000],
                        [3402, -2076192000000],
                        [2710, -2045606400000],
                        [1334, -2015020800000],
                        [2741, -1984435200000],
                        [3498, -1953763200000],
                        [2980, -1923091200000],
                        [2889, -1892505600000],
                        [2707, -1861920000000],
                        [1323, -1831334400000],
                        [2647, -1800748800000],
                        [1206, -1770076800000],
                        [2741, -1739491200000],
                        [1450, -1708819200000],
                        [3413, -1678233600000],
                        [3370, -1647561600000],
                        [2646, -1616976000000],
                        [1198, -1586390400000],
                        [2397, -1555804800000],
                        [748, -1525132800000],
                        [1749, -1494547200000],
                        [1706, -1463875200000],
                        [1365, -1433289600000],
                        [1195, -1402704000000],
                        [2395, -1372118400000],
                        [698, -1341446400000],
                        [1397, -1310860800000],
                        [2994, -1280188800000],
                        [1892, -1249516800000],
                        [1865, -1218931200000],
                        [1621, -1188345600000],
                        [683, -1157760000000],
                        [1371, -1127174400000],
                        [2778, -1096502400000],
                        [1748, -1065830400000],
                        [3785, -1035244800000],
                        [3474, -1004572800000],
                        [3365, -973987200000],
                        [2637, -943401600000],
                        [685, -912816000000],
                        [1389, -882230400000],
                        [2922, -851558400000],
                        [2898, -820886400000],
                        [2725, -790300800000],
                        [2635, -759715200000],
                        [1175, -729129600000],
                        [2359, -698544000000],
                        [694, -667872000000],
                        [1397, -637286400000],
                        [3434, -606614400000],
                        [3410, -575942400000],
                        [2710, -545356800000],
                        [2349, -514771200000],
                        [605, -484185600000],
                        [1245, -453600000000],
                        [2778, -422928000000],
                        [1492, -392256000000],
                        [3497, -361670400000],
                        [3410, -330998400000],
                        [2730, -300412800000],
                        [1238, -269827200000],
                        [2486, -239241600000],
                        [884, -208569600000],
                        [1897, -177984000000],
                        [1874, -147312000000],
                        [1701, -116726400000],
                        [1355, -86140800000],
                        [2731, -55555200000],
                        [1370, -24883200000],
                        [2773, 5702400000],
                        [3538, 36374400000],
                        [3492, 67046400000],
                        [3401, 97632000000],
                        [2709, 128217600000],
                        [1325, 158803200000],
                        [2653, 189388800000],
                        [1370, 220060800000],
                        [2773, 250646400000],
                        [1706, 281318400000],
                        [1685, 311904000000],
                        [1323, 342489600000],
                        [2647, 373075200000],
                        [1198, 403747200000],
                        [2422, 434332800000],
                        [1388, 465004800000],
                        [2901, 495590400000],
                        [2730, 526262400000],
                        [2645, 556848000000],
                        [1197, 587433600000],
                        [2397, 618019200000],
                        [730, 648691200000],
                        [1497, 679276800000],
                        [3506, 709948800000],
                        [2980, 740620800000],
                        [2890, 771206400000],
                        [2645, 801792000000],
                        [693, 832377600000],
                        [1397, 862963200000],
                        [2922, 893635200000],
                        [3026, 924307200000],
                        [3012, 954979200000],
                        [2953, 985564800000],
                        [2709, 1016150400000],
                        [1325, 1046736000000],
                        [1453, 1077321600000],
                        [2922, 1107993600000],
                        [1748, 1138665600000],
                        [3529, 1169251200000],
                        [3474, 1199923200000],
                        [2726, 1230508800000],
                        [2390, 1261094400000],
                        [686, 1291680000000],
                        [1389, 1322265600000],
                        [874, 1352937600000],
                        [2901, 1383523200000],
                        [2730, 1414195200000],
                        [2381, 1444780800000],
                        [1181, 1475366400000],
                        [2397, 1505952000000],
                        [698, 1536624000000],
                        [1461, 1567209600000],
                        [1450, 1597881600000],
                        [3413, 1628467200000],
                        [2714, 1659139200000],
                        [2350, 1689724800000],
                        [622, 1720310400000],
                        [1373, 1750896000000],
                        [2778, 1781568000000],
                        [1748, 1812240000000],
                        [1701, 1842825600000],
                        [0, 1873411200000]
                    ],
                    minDate: -2198707200000,
                    maxDate: 1873411199999,
                    toGregorian: function(hyear, hmonth, hday) {
                        var days = hday - 1,
                            gyear = hyear - 1318;
                        if (gyear < 0 || gyear >= this._yearInfo.length) return null;
                        var info = this._yearInfo[gyear],
                            gdate = new Date(info[1]),
                            monthLength = info[0];
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the gregorian date in the same timezone,
                        // not what the gregorian date was at GMT time, so we adjust for the offset.
                        gdate.setMinutes(gdate.getMinutes() + gdate.getTimezoneOffset());
                        for (var i = 0; i < hmonth; i++) {
                            days += 29 + (monthLength & 1);
                            monthLength = monthLength >> 1;
                        }
                        gdate.setDate(gdate.getDate() + days);
                        return gdate;
                    },
                    fromGregorian: function(gdate) {
                        // Date's ticks in javascript are always from the GMT time,
                        // but we are interested in the hijri date in the same timezone,
                        // not what the hijri date was at GMT time, so we adjust for the offset.
                        var ticks = gdate - gdate.getTimezoneOffset() * 60000;
                        if (ticks < this.minDate || ticks > this.maxDate) return null;
                        var hyear = 0,
                            hmonth = 1;
                        // find the earliest gregorian date in the array that is greater than or equal to the given date
                        while (ticks > this._yearInfo[++hyear][1]) { }
                        if (ticks !== this._yearInfo[hyear][1]) {
                            hyear--;
                        }
                        var info = this._yearInfo[hyear],
                            // how many days has it been since the date we found in the array?
                            // 86400000 = ticks per day
                            days = Math.floor((ticks - info[1]) / 86400000),
                            monthLength = info[0];
                        hyear += 1318; // the Nth array entry corresponds to hijri year 1318+N
                        // now increment day/month based on the total days, considering
                        // how many days are in each month. We cannot run past the year
                        // mark since we would have found a different array entry in that case.
                        var daysInMonth = 29 + (monthLength & 1);
                        while (days >= daysInMonth) {
                            days -= daysInMonth;
                            monthLength = monthLength >> 1;
                            daysInMonth = 29 + (monthLength & 1);
                            hmonth++;
                        }
                        // remaining days is less than is in one month, thus is the day of the month we landed on
                        // hmonth-1 because in javascript months are zero based, stay consistent with that.
                        return [hyear, hmonth - 1, days + 1];
                    }