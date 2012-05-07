using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Globalization;

namespace Generator.GlobalizationInfoAdjustments
{
    public class PlGlobalizationInfoAdjustment : IGlobalizationInfoAdjustment
    {
        private static string[] _globalizationInfoNames = new string[] { "pl", "pl-PL" };

        public string[] GlobalizationInfoNames
        {
            get { return _globalizationInfoNames; }
        }

        public GlobalizationInfo Adjust(GlobalizationInfo info)
        {
            info.calendars["standard"].dateSeparator = ".";
            info.calendars["standard"].days.namesAbbr = new string[] { "niedz.", "pon.", "wt.", "śr.", "czw.", "pt.", "sob." };
            info.calendars["standard"].eras = new Globalization.GlobalizationInfo.DateFormatInfo.EraInfo[] { new Globalization.GlobalizationInfo.DateFormatInfo.EraInfo() { name = "n.e.", offset = 0, start = null } };
            info.calendars["standard"].patterns["d"] = "dd.MM.yyyy";
            info.calendars["standard"].patterns["D"] = "dddd, d MMMM yyyy";
            info.calendars["standard"].patterns["f"] = "dddd, d MMMM yyyy HH:mm";
            info.calendars["standard"].patterns["F"] = "dddd, d MMMM yyyy HH:mm:ss";

            return info;
        }
    }
}
