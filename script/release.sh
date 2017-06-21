#! /bin/bash

SCRIPT_ROOT=`dirname $0`

function abort {
	echo Quiting...
	exit 1
}

function process_args {
	while [[ $# -gt 0 ]]; do
		key="$1"
		case $key in
			major|minor|patch|premajor|preminor|prepatch|prerelease)
			NEXT=$key
			;;
			--prerelease-identifier=*)
			PRERELEASE_IDENTIFIER="${key#*=}"
			;;
			-h|--help)
			HELP=true
			;;
			*)
			UNKNOWN="$1"
			;;
		esac
		shift
	done
	if [ :$NEXT = : -a :$HELP = : ]; then
		echo 'You must choose a version bump type.'
		HELP=true
	fi
	if [ ! -z "$UNKNOWN" ]; then
		echo 'Illegal option: '$UNKNOWN
		HELP=true
	fi
	if [ :$HELP = :true ]; then
		echo 'Usage:'
		echo '   version major | minor | patch | premajor | preminor | prepatch | prerelease'
		echo '           [--prerelease-identifier=<identifier>]'
		echo ''
		echo '   major, minor, patch, premajor, preminor, prepatch, prerelease'
		echo '      Type of bump, see semver for more details'
		echo ''
		echo '   --prerelease-identifier=<identifier>'
		echo '      String argument that will append the value of the string as a prerelease'
		echo '      identifier, e.g., beta. The default is alpha.'
		echo ''
		echo '   -h, --help'
		echo '      Show this help.'
		exit 1
	fi
	VERSION=$(node $SCRIPT_ROOT/lib/version_inc.js $NEXT $PRERELEASE_IDENTIFIER)
	TARGET_BRANCH=b$VERSION
	PRERELEASE_IDENTIFIER=alpha
}

function assertions {
	if ! git diff-index --quiet HEAD; then
		echo Current branch "isn't" clean. Use '`git status` for more details.'
		abort
	fi

	if git rev-parse --verify --quiet refs/tags/$VERSION > /dev/null; then
		echo 'Target tag `'$VERSION'` already exists.'
		abort
	fi

	assert_git_origin

	if git ls-remote --exit-code origin refs/tags/$VERSION > /dev/null; then
		echo 'Target tag `'$VERSION'` already exists in *origin*.'
		abort
	fi

	if npm show globalize versions | grep "'"$VERSION"'" >/dev/null; then
		echo 'Target npm version `'$VERSION'` already exists.'
		abort
	fi

	if [ ! -z `git branch --list $TARGET_BRANCH` ]; then
		echo 'Target branch `'$TARGET_BRANCH'` already exists.'
		abort
	fi

	CURRENT_BRANCH=`git name-rev --name-only HEAD`
	if [ :$CURRENT_BRANCH != :master ]; then
		echo 'Current branch `'$CURRENT_BRANCH'`' "isn't" '`master`.'
		abort
	fi

	echo Preparing release for '`'$VERSION'`'
	echo -n Proceed? "[Y|n] "
	read input
	test :$input = :N -o :$input = :n && exit 1

	h1 Test
	grunt
}

function assert_git_origin {
	# Abort unless origin points to git@github.com:globalizejs/globalize.git.
	if [ :`git config remote.origin.url` != :git@github.com:globalizejs/globalize.git ]; then
		echo 'remote.origin.url should be `git@github.com:globalizejs/globalize.git`.'
		abort
	fi

	echo 'Fetching origin ('`git config remote.origin.url`')'
	if ! git fetch origin; then
		echo "Couldn't"' fetch origin.'
		abort
	fi
}

function h1 {
	echo
	echo '## '$*
}

function error {
	echo 'ERROR: '$*
	exit 2
}

function update_authors {
	h1 Update AUTHORS file
	grunt update-authors > /dev/null
	if [ -z "$(git diff)" ]; then
		echo No updates for AUTHORS file needed...
	else
		git commit -a -m 'AUTHORS: Update' > /dev/null &&
			git show --stat
	fi
}

function update_version {
	h1 Update package.json '`versions`' attribute
	node $SCRIPT_ROOT/lib/version_update.js $VERSION &&
		git commit -a -m $VERSION &&
		git show
}

function build {
	h1 Include distribution files

	# Yeap, again. Now including the new version in the dist files.
	grunt > /dev/null || error Build failed

	git add dist/* > /dev/null &&
		git commit -a -m "Build: Include distribution files" > /dev/null &&
		git show --stat ||
		error Failed including distribution files
}

function tag {
	h1 'Tag `'$VERSION'` (detached)'
	git tag -a -m $VERSION $VERSION > /dev/null
}

function checkout_back_to_master {
	git checkout master > /dev/null
}

function final_message {
	h1 Done
	echo
	echo Now you need to:
	echo git push --tags origin
	echo npm publish
	echo git checkout master
	echo git branch -D $TARGET_BRANCH
}

process_args "$@" &&
	assertions &&
	update_authors &&
	update_version &&
	git checkout -b $TARGET_BRANCH &&
	build &&
	tag &&
	final_message
