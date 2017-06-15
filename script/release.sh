#! /bin/bash

function assertions {
	if [ -z "$1" ]; then
		echo Usage: $0 "<version>"
		exit 1
	fi

	if ! git diff --quiet --exit-code; then
		echo Current branch "isn't" clean. Use '`git status` for more details.'
		echo Quiting...
		exit 1
	fi

	if git rev-parse --verify --quiet $1 > /dev/null; then
		echo 'Target tag `'$1'` already exists.'
		echo Quiting...
		exit 1
	fi

	if [ ! -z `git branch --list $TARGET_BRANCH` ]; then
		echo 'Target branch `'$TARGET_BRANCH'` already exists.'
		echo Quiting...
		exit 1
	fi

	CURRENT_BRANCH=`git name-rev --name-only HEAD`
	if [ :$CURRENT_BRANCH != :master ]; then
		echo 'Current branch `'$CURRENT_BRANCH'`' "isn't" '`master`.'
		echo Quiting...
		exit 1
	fi

	echo Preparing release for '`'$1'`'
	echo -n Proceed? "[Y|n] "
	read input
	test :$input = :N -o :$input = :n && exit 1

	h1 Test
	grunt
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
	sed -i.orig 's/"version": "[^"]\+"/"version": "'$1'"/' package.json &&
		git commit -a -m $1 &&
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
	h1 'Tag `'$1'` (detached)'
	git tag -a -m $1 $1 > /dev/null
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

TARGET_BRANCH=b$1

assertions $1 &&
	update_authors &&
	update_version $1 &&
	git checkout -b $TARGET_BRANCH &&
	build &&
	tag $1 &&
	final_message
