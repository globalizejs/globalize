## Globalize.loadTimeZone( ianaTzData )

This method allows you to load IANA time zone data to enable `options.timeZone` feature on date formatters and parsers.

### Parameters

#### ianaTzData

A JSON object with zdumped IANA timezone data. Get the data via [`iana-tz-data`](https://github.com/rxaviers/iana-tz-data).

### Example

```javascript
Globalize.loadTimeZone({
  "zoneData": {
    ...
    "America": {
      ...
      "New_York": {
        abbrs: [],
        untils: [],
        offsets: [],
        isdsts: []
      }
      ...
    }
  }
});
```
