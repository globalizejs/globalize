#!/bin/bash

grunt test

if [ "${TEST_CI}" = "true" ]; then
	grunt test:ci
fi
