## Globalize.load( cldrJSONData, ... )

This method allows you to load CLDR JSON locale data. `Globalize.load()` is a
proxy to `Cldr.load()`.

This method can be called as many time as needed. All passed JSON objects are
deeply merged internally.

For more information, see https://github.com/rxaviers/cldrjs#readme.

### Parameters

**cldrJSONData**

A JSON object with CLDR data. See [Getting Started](#../../../README.md#2-cldr-content)
for more information.

### Example

```javascript
Globalize.load({
  "main": {
    "en": {
      "identity": {
        "version": {
          "_cldrVersion": "25",
          "_number": "$Revision: 91 $"
        },
        "generation": {
          "_date": "$Date: 2014-03-13 22:27:12 -0500 (Thu, 13 Mar 2014) $"
        },
        "language": "en"
      },
      "dates": {
        "calendars": {
          "gregorian": {
            "months": {
              "format": {
                "abbreviated": {
                  "1": "Jan",
                  "2": "Feb",
                  "3": "Mar",
                  "4": "Apr",
                  "5": "May",
                  "6": "Jun",
                  "7": "Jul",
                  "8": "Aug",
                  "9": "Sep",
                  "10": "Oct",
                  "11": "Nov",
                  "12": "Dec"
                }
              }
            },
            "dayPeriods": {
              "format": {
                "wide": {
                  "am": "AM",
                  "am-alt-variant": "am",
                  "noon": "noon",
                  "pm": "PM",
                  "pm-alt-variant": "pm"
                }
              }
            },
            "dateFormats": {
              "medium": "MMM d, y"
            },
            "timeFormats": {
              "medium": "h:mm:ss a",
            },
            "dateTimeFormats": {
              "medium": "{1}, {0}"
            }
          }
        }
      },
      "numbers": {
        "defaultNumberingSystem": "latn",
        "symbols-numberSystem-latn": {
          "group": ","
        },
        "decimalFormats-numberSystem-latn": {
          "standard": "#,##0.###"
        }
      }
    }
  },
  "supplemental": {
    "version": {
      "_cldrVersion": "25",
      "_number": "$Revision: 91 $"
    },
    "likelySubtags": {
      "en": "en-Latn-US",
    }
  }
});
```
