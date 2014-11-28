define([
	"src/currency/name-format"
], function( format ) {

QUnit.module( "Currency Name Foramt" );

QUnit.test( "should return appropriate properties", function( assert ) {
	assert.deepEqual( format( "1", "one", {
		"currency": "USD",
		"displayNames": {
			"displayName": "US Dollar",
			"displayName-count-one": "US dollar",
			"displayName-count-other": "US dollars"
		},
		"unitPatterns": {
			"unitPattern-count-one": "{0} {1}",
			"unitPattern-count-other": "{0} {1}"
		}
	}), "1 US dollar" );

	assert.deepEqual( format( "2", "other", {
		"currency": "USD",
		"displayNames": {
			"displayName": "US Dollar",
			"displayName-count-one": "US dollar",
			"displayName-count-other": "US dollars"
		},
		"unitPatterns": {
			"unitPattern-count-one": "{0} {1}",
			"unitPattern-count-other": "{0} {1}"
		}
	}), "2 US dollars" );

	assert.deepEqual( format( "1", "anything", {
		"displayNames": {
			"displayName": "US Dollar",
		},
		"unitPatterns": {
			"unitPattern-count-other": "{0} {1}"
		}
	}), "1 US Dollar" );

	assert.deepEqual( format( "1", "anything", {
		"currency": "USD",
		"unitPatterns": {
			"unitPattern-count-other": "{0} {1}"
		}
	}), "1 USD" );

	assert.deepEqual( format( "10", "other", {
		"currency": "CNY",
		"displayNames": {
			"displayName": "人民币",
			"displayName-count-other": "人民币"
		},
		"pattern": "#,##0.###",
		"unitPatterns": {
			"unitPattern-count-other": "{0}{1}"
		}
	}), "10人民币" );

	assert.deepEqual( format( "1", "other", {
		"currency": "TZS",
		"unitPatterns": {
			"unitPattern-count-other": "{1} {0}"
		}
	}), "TZS 1" );

});

});
