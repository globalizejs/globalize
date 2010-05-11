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
using Microsoft.Ajax.Utilities;

namespace Globalization {
    public class GlobalizationInfo {
        public string name = "";
        public string englishName;
        public string nativeName;
        public NumberFormatInfo numberFormat;
        public Dictionary<String, DateFormatInfo> calendars;
        public static Dictionary<String, Object> InvariantGlobInfo;


        private static string[] _numberNegativePatterns = "(n)|-n|- n|n-|n -".Split('|');
        private static string[] _currencyNegativePatterns = "($n)|-$n|$-n|$n-|(n$)|-n$|n-$|n$-|-n $|-$ n|n $-|$ n-|$ -n|n- $|($ n)|(n $)".Split('|');
        private static string[] _percentNegativePatterns = "-n %|-n%|-%n|%-n|%n-|n-%|n%-|-% n|n %-|% n-|% -n|n- %".Split('|');
        private static string[] _currencyPositivePatterns = "$n|n$|$ n|n $".Split('|');
        private static string[] _percentPositivePatterns = "n %|n%|%n|% n".Split('|');

        public static GlobalizationInfo GetGlobInfo(CultureInfo culture) {
            var info = new GlobalizationInfo {
                name = String.IsNullOrEmpty(culture.Name) ? "invariant" : culture.Name,
                englishName = String.IsNullOrEmpty(culture.Name) ? "invariant" : culture.EnglishName,
                nativeName = String.IsNullOrEmpty(culture.Name) ? "invariant" : culture.NativeName,
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
                        // we include the Gregorian_USEnglish culture as part of the Invariant culture
                        // because it is so common -- it is an optional calendar of every single english
                        // speaking culture. So, skip it when found for any other culture.
                        continue;
                    }
                    else if (culture == CultureInfo.InvariantCulture) {
                        // invariant has one calendar, Gregorian_Localized, which is identical
                        // to Gregorian_USEnglish. This one will take the place of any _USEnglish
                        // calendards found in other cultures.
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
                negative = nf.NegativeSign,
                positive = nf.PositiveSign,
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

        public static GlobalizationInfo.DateFormatInfo GetDateTimeFormatInfo(CultureInfo culture, string calendarName) {
            var df = culture.DateTimeFormat;
            var info = new GlobalizationInfo.DateFormatInfo {
                name = calendarName,
                months = new string[][] {
                    df.MonthNames,
                    df.AbbreviatedMonthNames
                },
                monthsGenitive = new string[][] {
                    df.MonthGenitiveNames,
                    df.AbbreviatedMonthGenitiveNames
                },
                AM = df.AMDesignator,
                dateSeparator = df.DateSeparator,
                days = new string[][] { df.DayNames, df.AbbreviatedDayNames },
                eras = GetEraInfo(culture),
                PM = df.PMDesignator,
                twoDigitYearMax = df.Calendar.TwoDigitYearMax,
                patterns = GetPatterns(df)
            };
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

        public Dictionary<String, Object> ToDictionary(bool isInvariant) {
            var jss = new JavaScriptSerializer();
            var str = jss.Serialize(this);
            var dictionary = jss.Deserialize<Dictionary<String, Object>>(str);
            var cals = (Dictionary<String, Object>) dictionary["calendars"];
            Dictionary<String, Object> invariantStandardCal = null;
            if (!isInvariant) {
                invariantStandardCal = (Dictionary<String, Object>)((Dictionary<String, Object>)GlobalizationInfo.InvariantGlobInfo["calendars"])["standard"];
                foreach (var pair in this.calendars) {
                    var cal = (Dictionary<String, Object>)cals[pair.Key];
                    // make each calendar a diff from the standard invariant calendar
                    cals[pair.Key] = cal = DiffGlobInfos(invariantStandardCal, cal);
                    // apply convert script if it exists
                    if (!String.IsNullOrEmpty(pair.Value.convertScriptBlock)) {
                        cal["convert"] = pair.Value.convertScriptBlock;
                    }
                    // remove redundant monthsGenitive array if it is equivilent to months
                    ArrayList months = cal.ContainsKey("months") ? (ArrayList)cal["months"] : null;
                    ArrayList monthsGenitive = cal.ContainsKey("monthsGenitive") ? (ArrayList)cal["monthsGenitive"] : null;
                    if (months != null && monthsGenitive != null && ListEquality((ArrayList)monthsGenitive[0], (ArrayList)months[0]) && ListEquality((ArrayList)monthsGenitive[1], (ArrayList)months[1])) {
                        // the genitive months are the same as months, so remove it since it's optional
                        cal.Remove("monthsGenitive");
                    }
                }
            }
            return dictionary;
        }

        public static string GenerateJavaScript(CultureInfo culture, string name, Dictionary<String, Object> dictionary, StringBuilder aggregateScript) {
            string cultureFragment = ToJavaScript(dictionary, 2, culture == CultureInfo.InvariantCulture, false);

            if (aggregateScript != null) {
                aggregateScript.AppendFormat(CultureInfo.InvariantCulture, @"    culture = cultures[""{0}""] = $.extend(true, {{}}, invariant, {{
{1}
    }});
    culture.calendar = culture.calendars.standard;
", name, cultureFragment);
            }

            return string.Format(CultureInfo.InvariantCulture, @"(function($) {{
    var invariant = $.cultures.invariant,
        standard = invariant.calendars.standard,
        culture = $.cultures[""{0}""] = $.extend(true, {{}}, invariant, {{
{1}
    }});
    culture.calendar = culture.calendars.standard;
}})(jQuery);", name, cultureFragment);
        }

        private static string ToJavaScript(Dictionary<String, Object> dictionary, int level, bool isInvariant, bool isCalendars) {
            StringBuilder sb = new StringBuilder();
            string padding = _padding.Substring(0, level * 4);
            bool first = true;
            foreach (var pair in dictionary) {
                if (!first) {
                    sb.Append(",\n");
                }
                first = false;
                if (pair.Value is Dictionary<String, Object>) {
                    if (!isInvariant && isCalendars) {
                        sb.AppendFormat("{0}{1}: $.extend(true, {{}}, standard, {{\n{2}\n{0}}})", padding, pair.Key, ToJavaScript((Dictionary<String, Object>)pair.Value, level + 1, false, false));
                    }
                    else {
                        sb.AppendFormat("{0}{1}: {{\n{2}\n{0}}}", padding, pair.Key, ToJavaScript((Dictionary<String, Object>)pair.Value, level + 1, isInvariant, pair.Key.Equals("calendars")));
                    }
                }
                else if (pair.Key.Equals("convert")) {
                    sb.AppendFormat("{0}convert: {{\n{1}\n{0}}}", padding, pair.Value);
                }
                else if (pair.Key.Equals("groupSeparator")) {
                    sb.AppendFormat("{0}',': {1}", padding, _jss.Serialize(pair.Value));
                }
                else if (pair.Key.Equals("decimalSeparator")) {
                    sb.AppendFormat("{0}'.': {1}", padding, _jss.Serialize(pair.Value));
                }
                else if (pair.Key.Equals("positive")) {
                    sb.AppendFormat("{0}'+': {1}", padding, _jss.Serialize(pair.Value));
                }
                else if (pair.Key.Equals("negative")) {
                    sb.AppendFormat("{0}'-': {1}", padding, _jss.Serialize(pair.Value));
                }
                else if (pair.Key.Equals("dateSeparator")) {
                    sb.AppendFormat("{0}'/': {1}", padding, _jss.Serialize(pair.Value));
                }
                else {
                    sb.AppendFormat("{0}{1}: {2}", padding, pair.Key, _jss.Serialize(pair.Value));
                }
            }
            return sb.ToString();
        }

        private static JavaScriptSerializer _jss = new JavaScriptSerializer();
        private static string _padding = "                                                                ";

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
            public string positive;
            public string negative;
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
            public string[][] days;
            public string[][] months;
            public string[][] monthsGenitive;
            public string AM;
            public string PM;
            public EraInfo[] eras;
            public int twoDigitYearMax;
            public Dictionary<String, String> patterns;
            internal string convertScriptBlock;

            public class EraInfo {
                public string name;
                public long? start;
                public long offset;
            }
        }
    }

    public class Program {
        //private static Regex _date = new Regex("\"\\\\/Date\\((-?[0-9]+)\\)\\\\/\"", RegexOptions.Compiled);
        private static Minifier minifier = new Minifier();
        private static CodeSettings codeSettings = new CodeSettings {
            CombineDuplicateLiterals = true
        };


        private static void WriteCulture(string outputdir, CultureInfo culture, StringBuilder aggregateScript) {
            var globInfo = GlobalizationInfo.GetGlobInfo(culture);
            var diff = culture == CultureInfo.InvariantCulture ? globInfo.ToDictionary(true) : GlobalizationInfo.DiffGlobInfos(GlobalizationInfo.InvariantGlobInfo, globInfo.ToDictionary(false));
            var script = GlobalizationInfo.GenerateJavaScript(culture, culture.Name, diff, aggregateScript);
            var filePath = Path.Combine(outputdir, "jQuery.glob." + (String.IsNullOrEmpty(culture.Name) ? "invariant" : culture.Name) + ".js");

            // fix dates into javascript
            //script = _date.Replace(script, "new Date($1)");
            File.WriteAllText(filePath, script);
            Console.WriteLine(filePath);
            // minimize
            var minScript = minifier.MinifyJavaScript(script, codeSettings);
            string minPath = Path.ChangeExtension(filePath, "min.js");
            File.WriteAllText(minPath, minScript);
            Console.WriteLine(minPath);
        }

        [STAThread]
        static void Main(string[] args) {
            string outputdir = args.Length > 0 ? args[0] : "output";
            Directory.CreateDirectory(outputdir);
            GlobalizationInfo.InvariantGlobInfo = GlobalizationInfo.GetGlobInfo(CultureInfo.InvariantCulture).ToDictionary(true);

            StringBuilder aggregateScript = new StringBuilder();
            aggregateScript.Append("(function($) {\n    var culture, cultures = $.cultures,\n        invariant = cultures.invariant,\n        standard = invariant.calendars.standard;\n\n");

            WriteCulture(outputdir, CultureInfo.InvariantCulture, null);

            int count = 0;
            foreach (var culture in CultureInfo.GetCultures(CultureTypes.AllCultures)) {
                if (!culture.IsNeutralCulture && !String.IsNullOrEmpty(culture.Name) && culture != CultureInfo.InvariantCulture) {
                    WriteCulture(outputdir, culture, aggregateScript);
                    count++;
                }
            }


            aggregateScript.Append("\n\n})(jQuery);");
            string aggregateScriptString = aggregateScript.ToString();
            string aggregatePath = Path.Combine(outputdir, "jQuery.glob.all.js");
            File.WriteAllText(aggregatePath, aggregateScriptString);
            Console.WriteLine(aggregatePath);
            // minimize
            var minScript = minifier.MinifyJavaScript(aggregateScriptString, codeSettings);
            string minPath = Path.ChangeExtension(aggregatePath, "min.js");
            File.WriteAllText(minPath, minScript);
            Console.WriteLine(minPath);

            Console.WriteLine("Done! Generated scripts for a total of {0} cultures, and 1 aggregate script.", count);
        }
    }
}
