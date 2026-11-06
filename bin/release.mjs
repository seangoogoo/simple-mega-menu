#!/usr/bin/env node
//* Release helper, called by the npm version lifecycle (see package.json) and by the release workflow.
//*   check          → fail if CHANGELOG.md has no entry under [Unreleased]                 (preversion)
//*   sync           → copy the package.json version to the plugin header and block.json files,
//*                    turn [Unreleased] into [x.y.z] - date                                  (version)
//*   notes <x.y.z>  → print the CHANGELOG.md section of a version                          (workflow)
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'

const [ mode, arg ] = process.argv.slice( 2 )
const CHANGELOG = 'CHANGELOG.md'

const fail = ( message ) => {
	console.error( `release: ${ message }` )
	process.exit( 1 )
}

//* Body of a "## [name]" section, up to the next "## [" heading or the end of the file
const section = ( text, name ) => {
	const start = text.indexOf( `## [${ name }]` )
	if ( start === -1 ) return null
	const bodyStart = text.indexOf( '\n', start ) + 1
	const next = text.indexOf( '\n## [', bodyStart )
	return text.slice( bodyStart, next === -1 ? undefined : next ).trim()
}

const replaceOrFail = ( file, pattern, replacer ) => {
	const content = readFileSync( file, 'utf8' )
	if ( ! pattern.test( content ) ) fail( `${ file }: ${ pattern } not found` )
	writeFileSync( file, content.replace( pattern, replacer ) )
}

const changelog = readFileSync( CHANGELOG, 'utf8' )

if ( mode === 'check' ) {
	if ( ! /^- /m.test( section( changelog, 'Unreleased' ) ?? '' ) ) {
		fail( `${ CHANGELOG }: add at least one entry under "## [Unreleased]" before releasing` )
	}
} else if ( mode === 'sync' ) {
	const { version } = JSON.parse( readFileSync( 'package.json', 'utf8' ) )
	replaceOrFail( 'simple-mega-menu.php', /^( \* Version:\s+).+$/m, ( _, prefix ) => prefix + version )
	for ( const entry of readdirSync( 'src', { withFileTypes: true } ) ) {
		const file = `src/${ entry.name }/block.json`
		if ( entry.isDirectory() && existsSync( file ) ) {
			replaceOrFail( file, /("version":\s*")[^"]*"/, ( _, prefix ) => `${ prefix }${ version }"` )
		}
	}
	const today = new Date().toLocaleDateString( 'en-CA' )
	writeFileSync( CHANGELOG, changelog.replace( '## [Unreleased]', `## [Unreleased]\n\n## [${ version }] - ${ today }` ) )
} else if ( mode === 'notes' ) {
	const notes = section( changelog, arg )
	if ( ! notes ) fail( `${ CHANGELOG }: no section for ${ arg }` )
	console.log( notes )
} else {
	fail( 'usage: release.mjs check | sync | notes <version>' )
}
