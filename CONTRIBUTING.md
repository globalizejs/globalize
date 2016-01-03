# Contributing to Globalize

Globalize is a community project, and would not be here today if it were not for the support of the community of [contributors](https://github.com/globalize/globalize/graphs/contributors) that have kept it alive and running. Thank you for your support!

## Bugs

If you find a bug or something is not working as expected, please search through the [github issues](https://github.com/globalize/globalize/issues) and on [stackoverflow](http://stackoverflow.com/questions/tagged/globalize) first. If you cannot find any answers related to your issue, post a new one and we will try to address it as soon as we can. Note that we prioritize Rails 4 issues (`master` branch) over Rails 3 issues (`3-0-stable` branch).

If you also have some idea how to fix the bug, then by all means post a pull request (see below).

## Features

Have an idea for a new feature? Great! Keep in mind though that we are trying to cut down on non-core functionality in the Globalize core and push it to separate extensions, such as [globalize-accessors](https://github.com/globalize/globalize-accessors). If you are proposing something like this, we would prefer you to create a separate repository and gem for it.

If however your feature would improve the core functionality of Globalize, please do submit a PR, preferably to the `master` branch.

## Refactoring

Have some free time? Help us improve our [code climate score](https://codeclimate.com/github/globalize/globalize) by refactoring the codebase. If the tests still pass and the changes seem reasonable, we will happily merge them. As elsewhere, priority always goes to the Rails/AR 4 series (`master` branch).

## Documentation

Globalize needs better documentation. That includes more inline comments explaining clearly what code is doing, as well as reference documentation beyond the [readme](readme.md) -- possibly in the github wiki. Please contact us if you would like to help with documentation.

## Pull Requests

Have a bug fix, code improvement or proposed feature? Do the following:

1. Fork the repository.
2. Create your feature branch: `git checkout -b my_new_feature`
3. Commit your changes: `git commit -am 'Add some new feature'`
4. Push to the branch: `git push origin my_new_feature`
5. Submit a pull request.

For pull requests to Rails/ActiveRecord 4 version of Globalize (v3.x), post to the `master` branch. For pull requests to the Rails/ActiveRecord 3.x version of Globalize (3.x), post to the `3-0-stable` branch.

When you submit the pull request, Travis CI will run the [test suite](https://travis-ci.org/globalize/globalize) against your branch and will highlight any failures. Unless there is a good reason for it, we do not generally accept pull requests that take Globalize from green to red.
