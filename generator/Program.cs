using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Globalization;
using System.Web.Script.Serialization;
using System.Collections.Specialized;
using System.Collections;
using System.Text.RegularExpressions;
using System.Reflection;
using System.Diagnostics;
using Globalization;

namespace Globalization {
    public class GlobalizationInfo {
        public string name = "";
        public string englishName;
        public string nativeName;
        public string language;
        public bool isRTL;
        public NumberFormatInfo numberFormat;
        public Dictionary<String, DateFormatInfo> calendars;
        private CultureInfo culture;
        public static Dictionary<String, Object> BasisGlobInfo;


        private static string[] _numberNegativePatterns = "(n)|-n|- n|n-|n -".Split('|');
        private static string[] _currencyNegativePatterns = "($n)|-$n|$-n|$n-|(n$)|-n$|n-$|n$-|-n $|-$ n|n $-|$ n-|$ -n|n- $|($ n)|(n $)".Split('|');
        private static string[] _percentNegativePatterns = "-n %|-n%|-%n|%-n|%n-|n-%|n%-|-% n|n %-|% n-|% -n|n- %".Split('|');
        private static string[] _currencyPositivePatterns = "$n|n$|$ n|n $".Split('|');
        private static string[] _percentPositivePatterns = "n %|n%|%n|% n".Split('|');

        public static GlobalizationInfo GetGlobInfo(CultureInfo culture) {
            var info = new GlobalizationInfo {
                culture = culture,
                language = (culture == CultureInfo.InvariantCulture || culture.IsNeutralCulture) ? culture.Name : culture.Parent.Name,
                name = String.IsNullOrEmpty(culture.Name) ? "invariant" : culture.Name,
                englishName = String.IsNullOrEmpty(culture.Name) ? "invariant" : culture.EnglishName,
                nativeName = String.IsNullOrEmpty(culture.Name) ? "invariant" : culture.NativeName,
                isRTL = culture.TextInfo.IsRightToLeft,
                numberFormat = GetNumberFormatInfo(culture),
                calendars = GetCalendars(culture)
            };
            return info;
        }

        public static Dictionary<String, DateFormatInfo> GetCalendars(CultureInfo culture) {
            var calendars = new Dictionary<String, DateFormatInfo>();
            bool foundStandard = false;
            var gregorianType = typeof(GregorianCalendar);
            var defaultCalendar = culture.DateTimeFormat.Calendar;
            var defaultCalendarType = defaultCalendar.GetType();
            GregorianCalendarTypes? gregorianCalendarType = null;
            if (defaultCalendarType == gregorianType) {
                gregorianCalendarType = ((GregorianCalendar)defaultCalendar).CalendarType;
            }
            var optionalCalendars = culture.OptionalCalendars;
            foreach (var calendar in optionalCalendars) {
                var type = calendar.GetType();
                string name;
                bool isStandard = false;
                if (type == gregorianType) {
                    var calendarType = ((GregorianCalendar)calendar).CalendarType;
                    if (calendarType == GregorianCalendarTypes.USEnglish) {
                        // we include the Gregorian_USEnglish culture as part of the built-in 'en' culture
                        // because it is so common -- it is an optional calendar of every single english
                        // speaking culture. So, skip it when found for any other culture.
                        continue;
                    }
                    else if (culture == CultureInfo.InvariantCulture) {
                        // invariant has one calendar, Gregorian_Localized, which is identical
                        // to Gregorian_USEnglish.
                        name = " Gregorian_USEnglish";
                    }
                    else {
                        name = "Gregorian_" + calendarType.ToString();
                    }
                    if (!foundStandard && gregorianCalendarType.HasValue && gregorianCalendarType == gregorianCalendarType.Value) {
                        isStandard = true;
                        foundStandard = true;
                    }
                }
                else {
                    name = type.Name.Replace("Calendar", "");
                    if (!foundStandard) {
                        isStandard = true;
                        foundStandard = true;
                    }
                }
                string key = name;
                if (isStandard) {
                    key = "standard";
                }
                if (culture != CultureInfo.InvariantCulture) {
                    culture.DateTimeFormat.Calendar = calendar;
                }
                var calendarInfo = GetDateTimeFormatInfo(culture, name);
                calendars.Add(key, calendarInfo);
            }
            if (!foundStandard) {
                throw new ApplicationException("Could not locate the standard calendar type for culture '" + culture.Name + "'.");
            }
            return calendars;
        }

        public static GlobalizationInfo.NumberFormatInfo GetNumberFormatInfo(CultureInfo culture) {
            var nf = culture.NumberFormat;
            return new GlobalizationInfo.NumberFormatInfo {
                decimals = nf.NumberDecimalDigits,
                decimalSeparator = nf.NumberDecimalSeparator,
                groupSeparator = nf.NumberGroupSeparator,
                groupSizes = nf.NumberGroupSizes,
                NaN = nf.NaNSymbol,
                negative = nf.NegativeSign,
                negativeInfinity = nf.NegativeInfinitySymbol,
                positive = nf.PositiveSign,
                positiveInfinity = nf.PositiveInfinitySymbol,
                pattern = new string[] { GetFromStringList(_numberNegativePatterns, nf.NumberNegativePattern) },
                currency = new GlobalizationInfo.NumberFormatInfo.NumberClassFormatInfo {
                    decimals = nf.CurrencyDecimalDigits,
                    decimalSeparator = nf.CurrencyDecimalSeparator,
                    groupSeparator = nf.CurrencyGroupSeparator,
                    groupSizes = nf.CurrencyGroupSizes,
                    pattern = new string[] {
                        GetFromStringList(_currencyNegativePatterns, nf.CurrencyNegativePattern),
                        GetFromStringList(_currencyPositivePatterns, nf.CurrencyPositivePattern)
                    },
                    symbol = nf.CurrencySymbol
                },
                percent = new GlobalizationInfo.NumberFormatInfo.NumberClassFormatInfo {
                    decimals = nf.PercentDecimalDigits,
                    decimalSeparator = nf.PercentDecimalSeparator,
                    groupSeparator = nf.PercentGroupSeparator,
                    groupSizes = nf.PercentGroupSizes,
                    pattern = new string[] {
                        GetFromStringList(_percentNegativePatterns, nf.PercentNegativePattern),
                        GetFromStringList(_percentPositivePatterns, nf.PercentPositivePattern)
                    },
                    symbol = nf.PercentSymbol
                }
            };
        }

        public static string[] GetAMPMDesignators(CultureInfo culture, string ampm) {
            return String.IsNullOrEmpty(ampm) ? null : new string[] { ampm, culture.TextInfo.ToLower(ampm), culture.TextInfo.ToUpper(ampm) };
        }

        public static GlobalizationInfo.DateFormatInfo GetDateTimeFormatInfo(CultureInfo culture, string calendarName) {
            var df = culture.DateTimeFormat;
            var info = new GlobalizationInfo.DateFormatInfo {
                name = calendarName,
                months = new DateFormatInfo.MonthInfo { names = df.MonthNames, namesAbbr = df.AbbreviatedMonthNames },
                monthsGenitive = new DateFormatInfo.MonthInfo { names = df.MonthGenitiveNames, namesAbbr = df.AbbreviatedMonthGenitiveNames },
                firstDay = (int) df.FirstDayOfWeek,
                dateSeparator = df.DateSeparator,
                timeSeparator = df.TimeSeparator,
                days = new DateFormatInfo.DayInfo { names = df.DayNames, namesAbbr = df.AbbreviatedDayNames, namesShort = df.ShortestDayNames },
                eras = GetEraInfo(culture),
                twoDigitYearMax = df.Calendar.TwoDigitYearMax,
                patterns = GetPatterns(df)
            };
            info.AM = GetAMPMDesignators(culture, df.AMDesignator);
            info.PM = GetAMPMDesignators(culture, df.PMDesignator);
            if (df.Calendar != null) {
                var type = df.Calendar.GetType();
                if (type == typeof(HijriCalendar)) {
                    string convert;
                    using (var sr = new StreamReader(Assembly.GetExecutingAssembly().GetManifestResourceStream("Generator.HijriCalendar.js"))) {
                        convert = sr.ReadToEnd();
                    }
                    int adjustment = ((HijriCalendar)df.Calendar).HijriAdjustment;
                    convert = convert.Replace("%HIJRIADJUSTMENT%", adjustment.ToString(CultureInfo.InvariantCulture));
                    info.convertScriptBlock = convert;
                }
                else if (type == typeof(UmAlQuraCalendar)) {
                    using (var sr = new StreamReader(Assembly.GetExecutingAssembly().GetManifestResourceStream("Generator.UmAlQuraCalendar.js"))) {
                        info.convertScriptBlock = sr.ReadToEnd();
                    }
                }
            }
            return info;
        }

        private static GlobalizationInfo.DateFormatInfo.EraInfo[] GetEraInfo(CultureInfo culture) {
            Calendar cal = culture.DateTimeFormat.Calendar;
            List<GlobalizationInfo.DateFormatInfo.EraInfo> eras = null;
            if (cal != null) {
                eras = new List<GlobalizationInfo.DateFormatInfo.EraInfo>();
                foreach (var eraNum in cal.Eras) {
                    eras.Add(GetEraInfo(culture, eraNum));
                }
            }
            return eras == null ? null : eras.ToArray();
        }

        private static GlobalizationInfo.DateFormatInfo.EraInfo GetEraInfo(CultureInfo culture, int eraNum) {
            var era = new GlobalizationInfo.DateFormatInfo.EraInfo {
                name = culture.DateTimeFormat.GetEraName(eraNum),
                offset = 0,
                start = null
            };
            var calendar = culture.DateTimeFormat.Calendar;

            Type type = calendar.GetType();
            if (type != typeof(GregorianCalendar)) {
                if (type == typeof(TaiwanCalendar)) {
                    era.offset = 0x777;
                }
                else if (type == typeof(KoreanCalendar)) {
                    era.offset = -2333;
                }
                else if (type == typeof(ThaiBuddhistCalendar)) {
                    era.offset = -543;
                }
                else if (type == typeof(JapaneseCalendar)) {
                    switch (eraNum) {
                        case 1:
                            era.start = 0xdf9984200L;
                            era.offset = 0x7c4;
                            break;
                        case 2:
                            era.start = -1357603200000L;
                            era.offset = 0x785;
                            break;
                        case 3:
                            era.start = -1812153600000L;
                            era.offset = 0x777;
                            break;
                        case 4:
                            era.start = null;
                            era.offset = 0x74b;
                            break;
                        default:
                            throw new InvalidOperationException("Invalid era number for JapaneseCalendar: " + eraNum.ToString());
                    }
                }
            }
            return era;
        }

        private static Dictionary<String, String> GetPatterns(DateTimeFormatInfo df) {
            var patterns = new Dictionary<String, String> {
                { "d", df.ShortDatePattern },
                { "D", df.LongDatePattern },
                { "t", df.ShortTimePattern },
                { "T", df.LongTimePattern },
                { "f", df.LongDatePattern + " " + df.ShortTimePattern },
                { "F", df.FullDateTimePattern },
                { "M", df.MonthDayPattern },
                { "S", df.SortableDateTimePattern },
                { "Y", df.YearMonthPattern }
            };
            return patterns;
        }

        private static bool ArrayEquality(Array arr1, Array arr2) {
            if (arr1.Length == arr2.Length) {
                for (int i = 0; i < arr1.Length; i++) {
                    if (!arr1.GetValue(i).Equals(arr2.GetValue(i))) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }

        private static bool ListEquality(IList arr1, IList arr2) {
            if (arr1.Count == arr2.Count) {
                for (int i = 0; i < arr1.Count; i++) {
                    var val1 = arr1[i];
                    var val2 = arr2[i];
                    if (val1 == null || !val1.Equals(val2)) {
                        if (val1 is IList && val2 is IList) {
                            if (!ListEquality(val1 as IList, val2 as IList)) {
                                return false;
                            }
                        }
                        else if (val1 is Dictionary<String, Object> && val2 is Dictionary<String, Object>) {
                            var diff = DiffGlobInfos((Dictionary<String, Object>)val1, (Dictionary<String, Object>)val2);
                            if (diff.Count > 0) {
                                return false;
                            }
                        }
                        else {
                            return false;
                        }
                    }
                }
                return true;
            }
            return false;
        }

        private static string GetFromStringList(string[] list, int value) {
            return value < list.Length ? list[value] : null;
        }

        public Dictionary<String, Object> ToDictionary(bool diffCalendars) {
            var jss = new JavaScriptSerializer();
            var str = jss.Serialize(this);
            var dictionary = jss.Deserialize<Dictionary<String, Object>>(str);
            var cals = (Dictionary<String, Object>) dictionary["calendars"];
            Dictionary<String, Object> basisStandardCal = null;
            if (GlobalizationInfo.BasisGlobInfo != null) {
                basisStandardCal = (Dictionary<String, Object>)((Dictionary<String, Object>)GlobalizationInfo.BasisGlobInfo["calendars"])["standard"];
                foreach (var pair in this.calendars) {
                    var cal = (Dictionary<String, Object>)cals[pair.Key];
                    if (diffCalendars) {
                        // make each calendar a diff from the standard basis calendar
                        cals[pair.Key] = cal = DiffGlobInfos(basisStandardCal, cal);
                    }
                    // apply convert script if it exists
                    if (!String.IsNullOrEmpty(pair.Value.convertScriptBlock)) {
                        cal["convert"] = pair.Value.convertScriptBlock;
                    }
                    // remove redundant monthsGenitive array if it is equivilent to months
                    Dictionary<String, Object> months = cal.ContainsKey("months") ? (Dictionary<String, Object>)cal["months"] : null;
                    Dictionary<String, Object> monthsGenitive = cal.ContainsKey("monthsGenitive") ? (Dictionary<String, Object>)cal["monthsGenitive"] : null;
                    Dictionary<String, Object> diff = (months != null && monthsGenitive != null) ? DiffGlobInfos(months, monthsGenitive) : null;
                    if (diff != null && diff.Count == 0) {
                        // the genitive months are the same as months, so remove it since it's optional
                        cal.Remove("monthsGenitive");
                    }
                }
            }
            return dictionary;
        }

        public static string GenerateJavaScript(string extend, string global, CultureInfo culture, string name, Dictionary<String, Object> dictionary, StringBuilder aggregateScript) {
            string cultureFragment = ToJavaScript(extend, culture, dictionary, 1, false);

            if (aggregateScript != null) {
                aggregateScript.AppendFormat(CultureInfo.InvariantCulture, @"
Globalize.addCultureInfo( ""{0}"", ""default"", {{
{1}
}});
", name, cultureFragment, extend);
            }

                return string.Format(CultureInfo.InvariantCulture, @"/*
 * Globalize Culture {0}
 *
 * http://github.com/jquery/globalize
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * This file was generated by the Globalize Culture Generator
 * Translation: bugs found in this file need to be fixed in the generator
 */

(function( window, undefined ) {{

var Globalize;

if ( typeof require !== ""undefined"" &&
	typeof exports !== ""undefined"" &&
	typeof module !== ""undefined"" ) {{
	// Assume CommonJS
	Globalize = require( ""globalize"" );
}} else {{
	// Global variable
	Globalize = window.Globalize;
}}

Globalize.addCultureInfo( ""{0}"", ""default"", {{
{1}
}});

}}( this ));
", name, cultureFragment);
        }

        private static string Serialize(object value) {
            // no need to escape single quotes
            return _jss.Serialize(value).Replace("\\u0027", "'")
                // Unsafe Characters
                // There are characters that are handled inconsistently in browsers, and so must be escaped when placed in strings.
                // http://www.jslint.com/lint.html#unsafe
                .Replace("\xad", "\\xad")
                .Replace("\u070f", "\\u070f")
                .Replace("\u200c", "\\u200c")
                .Replace("\u200d", "\\u200d")
                .Replace("\u200f", "\\u200f")
                .Replace("\u202f", "\\u202f");
        }

        private static string ToJavaScript(string extend, CultureInfo culture, Dictionary<String, Object> dictionary, int level, bool isCalendars) {
            StringBuilder sb = new StringBuilder();
            string padding = _padding.Substring(0, level);
            bool first = true;
            foreach (var pair in dictionary) {
                if (!first) {
                    sb.Append(",\n");
                }
                first = false;
                if (pair.Value is Dictionary<String, Object>) {
                    sb.AppendFormat("{0}{1}: {{\n{2}\n{0}}}", padding, pair.Key, ToJavaScript(extend, culture, (Dictionary<String, Object>)pair.Value, level + 1, pair.Key.Equals("calendars")));
                }
                else if (pair.Key.Equals("convert")) {
                    sb.AppendFormat("{0}convert: {{\n{1}\n{0}}}", padding, pair.Value);
                }
                else if (pair.Key.Equals("groupSeparator")) {
                    sb.AppendFormat("{0}\",\": {1}", padding, Serialize(pair.Value));
                }
                else if (pair.Key.Equals("decimalSeparator")) {
                    sb.AppendFormat("{0}\".\": {1}", padding, Serialize(pair.Value));
                }
                else if (pair.Key.Equals("positive")) {
                    sb.AppendFormat("{0}\"+\": {1}", padding, Serialize(pair.Value));
                }
                else if (pair.Key.Equals("negative")) {
                    sb.AppendFormat("{0}\"-\": {1}", padding, Serialize(pair.Value));
                }
                else if (pair.Key.Equals("dateSeparator")) {
                    sb.AppendFormat("{0}\"/\": {1}", padding, Serialize(pair.Value));
                }
                else if (pair.Key.Equals("timeSeparator")) {
                    sb.AppendFormat("{0}\":\": {1}", padding, Serialize(pair.Value));
                }
                else if (pair.Key.Equals("NaN")) {
                    sb.AppendFormat("{0}\"NaN\": {1}", padding, Serialize(pair.Value));
                }
                else {
                    sb.AppendFormat("{0}{1}: {2}", padding, pair.Key, Serialize(pair.Value));
                }
            }
            return sb.ToString();
        }

        private static JavaScriptSerializer _jss = new JavaScriptSerializer();
        private static string _padding = "																	";

        private static Dictionary<String, Object> ToDictionary(IEnumerable<KeyValuePair<String, Object>> pairs) {
            var d = new Dictionary<String, Object>();
            foreach (var pair in pairs) {
                d.Add(pair.Key, pair.Value);
            }
            return d;
        }

        public static Dictionary<String, Object> DiffGlobInfos(Dictionary<String, Object> glob1, Dictionary<String, Object> glob2) {
            var unique = new Dictionary<String, Object>();
            var comparer = new KeyValueComparer();

            var diff = ToDictionary(glob2.Except(glob1, comparer));
            foreach (var pair in glob2) {
                if (diff.ContainsKey(pair.Key) && pair.Value != null) {
                    if (pair.Value is Dictionary<String, Object>) {
                        var subdiff = glob1.ContainsKey(pair.Key) ? DiffGlobInfos((Dictionary<String, Object>)glob1[pair.Key], (Dictionary<String, Object>)pair.Value) : (Dictionary<String, Object>)pair.Value;
                        if (subdiff.Count > 0) {
                            //Debug.WriteLine("Replacing\n    {0}\nwith\n    {1}", _jss.Serialize(diff[pair.Key]), _jss.Serialize(subdiff));
                            diff[pair.Key] = subdiff;
                        }
                        else {
                            //Debug.WriteLine("\nRemoving {0}\n", _jss.Serialize(pair.Key));
                            diff.Remove(pair.Key);
                        }
                    }
                    else if (pair.Value is IList) {
                        if (glob1.ContainsKey(pair.Key) && ListEquality((IList)pair.Value, (IList)glob1[pair.Key])) {
                            diff.Remove(pair.Key);
                        }
                    }
                }
            }

            return diff;
        }

        public class KeyValueComparer : IEqualityComparer<KeyValuePair<String, Object>> {
            public bool Equals(KeyValuePair<String, Object> x, KeyValuePair<String, Object> y) {
                if (x.Key.Equals(y.Key)) {
                    if ((x.Value == null && y.Value == null) || (x.Value != null && x.Value.Equals(y.Value))) {
                        return true;
                    }
                    else if (x.Value is ArrayList && y.Value is ArrayList) {
                        return ListEquality((IList)x.Value, (IList)y.Value);
                    }
                    else if (x.Value is Array && y.Value is Array) {
                        return ArrayEquality(x.Value as Array, y.Value as Array);
                    }
                    else if (x.Value is Dictionary<String, Object> && y.Value is Dictionary<String, Object>) {
                        var diff = DiffGlobInfos((Dictionary<String, Object>)x.Value, (Dictionary<String, Object>)y.Value);
                        if (diff.Count == 0) {
                            return true;
                        }
                        //else {
                        //    Debug.WriteLine("    Dictionaries diff:\n        {0}\n        {1}", _jss.Serialize(x.Value), _jss.Serialize(y.Value));
                        //}
                    }
                }
                //Debug.WriteLine("    Diff found: {0}={1}, {2}={3}", x.Key, x.Value, y.Key, y.Value);
                return false;
            }

            public int GetHashCode(KeyValuePair<String, Object> obj) {
                return obj.GetHashCode();
            }
        }

        public class NumberFormatInfo {
            public string[] pattern;
            public int decimals;
            public string groupSeparator;
            public string decimalSeparator;
            public int[] groupSizes;
            public string NaN;
            public string negative;
            public string negativeInfinity;
            public string positive;
            public string positiveInfinity;
            public NumberClassFormatInfo percent;
            public NumberClassFormatInfo currency;

            public class NumberClassFormatInfo {
                public string[] pattern;
                public int decimals;
                public int[] groupSizes;
                public string groupSeparator;
                public string decimalSeparator;
                public string symbol;
            }
        }

        public class DateFormatInfo {
            public string name;
            public string dateSeparator;
            public string timeSeparator;
            public int firstDay;
            public DayInfo days;
            public MonthInfo months;
            public MonthInfo monthsGenitive;
            public string[] AM;
            public string[] PM;
            public EraInfo[] eras;
            public int twoDigitYearMax;
            public Dictionary<String, String> patterns;
            internal string convertScriptBlock;

            public class EraInfo {
                public string name;
                public long? start;
                public long offset;
            }

            public class MonthInfo {
                public string[] names;
                public string[] namesAbbr;
            }

            public class DayInfo {
                public string[] names;
                public string[] namesAbbr;
                public string[] namesShort;
            }
        }

    }

    public class Program {

        private static void WriteCulture(string outputdir, string fileName, string extend, string global, CultureInfo culture, StringBuilder aggregateScript) {
            var globInfo = GlobalizationInfo.GetGlobInfo(culture);
            var diff = (String.IsNullOrEmpty(extend) || culture == CultureInfo.InvariantCulture || culture.Name.Equals("en")) ? globInfo.ToDictionary(false) : GlobalizationInfo.DiffGlobInfos(GlobalizationInfo.BasisGlobInfo, globInfo.ToDictionary(true));

            // Fix for Issue #31 - en-US 'englishName' is wrong
            // Special case diff of englishName for en-US. The generator diff seemingly finds both "en" and "en-US" to
            // have englishName "English (United States)" but globalize.js (correctly) has the neutral "English" for "en"/"default"
            if (culture.Name.Equals("en-US")) {
                diff.Add("name", globInfo.name);
                diff.Add("englishName", globInfo.englishName);
            }

            var script = GlobalizationInfo.GenerateJavaScript(extend, global, culture, culture.Name, diff, aggregateScript);
            var filePath = Path.Combine(outputdir, String.Format(fileName, (String.IsNullOrEmpty(culture.Name) ? "invariant" : culture.Name)));

            File.WriteAllText(filePath, script);
            Console.WriteLine(filePath);
        }

        [STAThread]
        static void Main(string[] args) {
            string outputdir = "lib\\cultures";
            string extend = "extend";
            string global = "Globalization";
            string fileName = "globalize.culture.{0}.js";
            string aggregateFileName = "globalize.cultures.js";
            foreach (string param in string.Join(" ", args).SplitCommandLine()) {
                if (param.StartsWith("/o:")) {
                    outputdir = param.Substring("/o:".Length);
                }
                else if (param == "/?") {
                    Console.Write(@"
Usage:glob-generator [<options>]

options:

    /o: The directory to put the culture scripts into. The directory will be
        created if it does not exist. Existing scripts there will be
        overwritten if necessary.
        default: ""lib\cultures""

");
                    return;
                }
            }
            Directory.CreateDirectory(outputdir);
            GlobalizationInfo.BasisGlobInfo = GlobalizationInfo.GetGlobInfo(CultureInfo.CreateSpecificCulture("en")).ToDictionary(false);

            StringBuilder aggregateScript = new StringBuilder();

/*

Globalize.addCultureInfo( ""{0}"", ""default"", {{
{1}
}});

}}( this ));
"
*/

            aggregateScript.Append(
    @"/*
 * Globalize Cultures
 *
 * http://github.com/jquery/globalize
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * This file was generated by the Globalize Culture Generator
 * Translation: bugs found in this file need to be fixed in the generator
 */

(function( window, undefined ) {

var Globalize;

if ( typeof require !== ""undefined"" &&
	typeof exports !== ""undefined"" &&
	typeof module !== ""undefined"" ) {
	// Assume CommonJS
	Globalize = require( ""globalize"" );
} else {
	// Global variable
	Globalize = window.Globalize;
}
");

            int count = 0;
            foreach (var culture in CultureInfo.GetCultures(CultureTypes.AllCultures)) {
                if (!String.IsNullOrEmpty(culture.Name) && culture != CultureInfo.InvariantCulture && culture.Name != "en") {
                    WriteCulture(outputdir, fileName, extend, global, culture, aggregateScript);
                    count++;
                }
            }

            aggregateScript.Append("\r\n}( this ));\r\n");
            string aggregateScriptString = aggregateScript.ToString();
            string aggregatePath = Path.Combine(outputdir, aggregateFileName);
            File.WriteAllText(aggregatePath, aggregateScriptString);
            Console.WriteLine(aggregatePath);

            Console.WriteLine("Done! Generated scripts for a total of {0} cultures, and 1 aggregate script.", count);
        }
    }
}
