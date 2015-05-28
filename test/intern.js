
define({
  proxyPort: 9000,
  proxyUrl: "http://localhost:9000/",
  capabilities: {},
  environments: [
    { browserName: "chrome" },
    { browserName: "internet explorer", version: [ "11", "10" ] },
    { browserName: "firefox", version: "34" }
  ],
  maxConcurrency: 2,
  tunnel: "BrowserStackTunnel",
  useLoader: {
    "host-node": "requirejs",
    "host-browser": "../../external/requirejs/require.js"
  },
  loader: {
    paths: {
      qunit: "../external/qunit/qunit/qunit",
      cldr: "../external/cldrjs/dist/cldr",
      "cldr-data": "../external/cldr-data",
      globalize: "../dist/globalize",
      json: "../external/requirejs-plugins/src/json",
      src: "../src",
      text: "../external/requirejs-text/text"
    }
  },
  suites: [
    "test/unit/all",
    "test/functional/all"
  ],
  functionalSuites: [
  ],
  excludeInstrumentation: /^(?:node_modules|test)\//
});
