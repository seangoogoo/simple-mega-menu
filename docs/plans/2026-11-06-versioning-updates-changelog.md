# Versionnement, historique et mises à jour depuis le tableau de bord — plan de réalisation

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**But :** publier chaque version de l'extension de façon automatisée (une commande, synchronisée avec le push), avec un historique des modifications tenu à jour, et proposer les mises à jour dans la page Extensions de WordPress sans passer par WordPress.org.

**Architecture :** le tag git `vX.Y.Z` est la source de vérité. `npm version` synchronise la version dans l'en-tête PHP et les `block.json`, date la section `[Unreleased]` de `CHANGELOG.md`, commite, tague et pousse. Un workflow GitHub déclenché par le tag construit `simple-mega-menu.zip` et publie la Release. L'extension interroge `releases/latest` via le mécanisme natif `Update URI` (WP ≥ 5.8) et propose la mise à jour.

**Tech Stack :** npm lifecycle scripts, Node (script ESM sans dépendance), GitHub Actions + `gh`, `@wordpress/scripts` (`build`, `plugin-zip`), PHP 7.2+ / WordPress ≥ 6.6 (`update_plugins_{$hostname}`, `plugins_api`).

---

## Décisions validées (2026-11-06)

| Sujet | Décision |
|---|---|
| Versionnement | `npm version` + scripts de cycle de vie + workflow GitHub sur tag `v*` (pas de release-please) |
| Mises à jour | Code maison sur le mécanisme natif `Update URI` (pas de Plugin Update Checker) |
| Versions des blocs | Les `block.json` suivent la version de l'extension (sert de `?ver=` aux styles de bloc) |
| Historique | `CHANGELOG.md` au format Keep a Changelog, en anglais, rédigé à la main sous `[Unreleased]` |
| Copies git | Vérification des mises à jour désactivée si le dossier de l'extension contient `.git` |
| Première version publiée | `0.2.0` (nouvelle fonctionnalité : mises à jour depuis le tableau de bord) |

## Emplacement et diffusion de ce plan

- Rangé dans le dépôt de l'extension, `docs/plans/`, à côté du code qu'il décrit.
- **Poussé sur GitHub** avec la première publication : il documente des choix de conception utiles plus tard. Il ne contient ni chemin local, ni nom de client, ni secret.
- **Exclu du zip** : `wp-scripts plugin-zip` n'embarque que `build/`, `includes/`, `simple-mega-menu.php`, `readme.*`, `changelog.*` (liste par défaut, vérifiée dans `node_modules/@wordpress/scripts/scripts/plugin-zip.js`, racine du zip `simple-mega-menu/`).

## Points d'arrêt (accord du propriétaire requis)

- **G1** — avant tout `git push` (Task 6) : la première publication pousse les commits locaux en attente, le plan et le tag `v0.2.0`.
- **G2** — avant de pousser des tags historiques (Task 8, facultative).

## Structure des fichiers

| Fichier | Action | Responsabilité |
|---|---|---|
| `CHANGELOG.md` | Créer | Historique des versions (source des notes de Release et de « Voir les détails ») |
| `readme.md` | Modifier | Remplacer la section Changelog par un lien ; ajouter la procédure de publication |
| `bin/release.mjs` | Créer | `check` (préversion), `sync` (version), `notes <x.y.z>` (workflow) |
| `.npmrc` | Créer | Message du commit de version |
| `package.json` | Modifier | Scripts `preversion`, `version`, `postversion` |
| `src/*/block.json` | Modifier | Version alignée (faite par `release.mjs sync`) |
| `.github/workflows/release.yml` | Créer | Build, zip, Release GitHub sur tag `v*` |
| `includes/class-simple-mega-menu-updater.php` | Créer | Vérification `releases/latest`, cache, fenêtre « Voir les détails » |
| `simple-mega-menu.php` | Modifier | En-tête `Update URI`, chargement conditionnel de l'updater |

Tous les chemins sont relatifs à la racine du dépôt (`simple-mega-menu/`). Pas de suite de tests automatisés dans ce dépôt : les vérifications sont des commandes ponctuelles décrites à chaque tâche.

---

## Phase A — Historique

### Task 1 : `CHANGELOG.md` et readme

**Files :**
- Create : `CHANGELOG.md`
- Modify : `readme.md` (section `## Changelog` jusqu'à `## To Do` exclu)

- [ ] **Step 1 : créer `CHANGELOG.md`** (dates reprises de `git log` : commit qui porte chaque version dans l'en-tête PHP)

```markdown
# Changelog

All notable changes to this plugin are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Updates from GitHub releases in the WordPress dashboard (Plugins page, "View details" with the changelog)
- Automated release process: `npm version` syncs the version in the plugin header and `block.json` files, a GitHub workflow publishes the plugin zip
- This changelog (moved from the readme)

### Changed
- Block versions (`block.json`) now follow the plugin version

## [0.1.7] - 2026-11-05

### Added
- `--smm-below` CSS variable: `0px` above the mobile breakpoint, `1px` at or below it, readable from any block inside the nav with `@container style()`

### Changed
- Mobile breakpoint is pixels only (unit control); legacy values are normalized when read (`1046` → `1046px`, other units → `780px`)
- Default background of the mega menu item columns is opaque white

### Fixed
- Mega Menu Nav block can be inserted when editing a template part in focus mode (removed the `core/template-part` ancestor restriction); without a `<header>` ancestor, scripts fall back to the nav / viewport instead of failing

## [0.1.6] - 2025-11-29

### Added
- Conditional custom padding for `mega-menu-item` (`enableCustomPadding` attribute)

### Changed
- `mega-menu-link` styles use flexbox for better alignment; default padding and hover effects removed
- Removed `!important` from the `position: static` rule in `mega-menu-nav` styles

### Fixed
- Deprecated `useSetting` hook replaced by `useSettings`
- Deprecation warnings: opt-in for future default props on `TextControl`, `ToggleControl`, `RangeControl`, `BaseControl`, `BoxControl`, `SelectControl`, `FontSizePicker` and `ToggleGroupControl`

## [0.1.5] - 2025-10-12

### Changed
- Arrow icon color picker displays the theme preset color palette

## [0.1.4] - 2025-10-12

### Added
- `mega-menu-link` block for custom navigation links within mega menu items: compact inline editor UI, WordPress `LinkControl` for page/post selection, Inspector Controls for URL, text, target, rel and title
- Support for `core/paragraph` and `core/html` blocks within `mega-menu-nav`

## [0.1.3] - 2024-12-03

### Fixed
- Block not loading in the editor when the plugin is used with a theme that is not a child theme
- Deprecated use of `mb_convert_encoding()`

## [0.1.2] - 2024-11-25

### Added
- 100% width mega menu items relative to a parent element using the `relative` property

## [0.1.1] - 2024-11-14

### Added
- Right arrow icon for Mega Menu buttons
- Support for `core/shortcode`
- Option to auto-close other mega menu items when one is opened in the mobile menu
- Auto-close of the burger menu and mega menu items when switching from mobile to desktop
```

- [ ] **Step 2 : remplacer dans `readme.md` tout le bloc `## Changelog` (les sections `### Release 0.1.7` à `### Release 0.1.1`) par :**

```markdown
## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## Releasing

1. While working, add entries under `## [Unreleased]` in `CHANGELOG.md` (Added / Changed / Fixed / Removed) and commit them with the code.
2. On a clean `main`, run `npm version patch` (fixes) or `npm version minor` (features):
   - `preversion` refuses to release when `[Unreleased]` has no entry;
   - `version` copies the version to the plugin header and every `block.json`, dates the changelog section, rebuilds, and adds the files to the release commit;
   - `postversion` pushes the commit and the `vX.Y.Z` tag.
3. The GitHub workflow `.github/workflows/release.yml` builds `simple-mega-menu.zip` and publishes the GitHub release, with the changelog section as release notes.

Sites running the plugin see the update in the Plugins page (Dashboard → Updates → Check again shows it immediately). Update checks are disabled in git working copies (a `.git` folder in the plugin directory), so a dashboard update never overwrites a development clone.
```

- [ ] **Step 3 : vérifier** — `grep -c '### Release' readme.md` → `0` ; `grep -c '^## \[' CHANGELOG.md` → `9`.

- [ ] **Step 4 : commit**

```bash
git add CHANGELOG.md readme.md
git commit -m "Move changelog to CHANGELOG.md (Keep a Changelog) and document the release process"
```

---

## Phase B — Versionnement

### Task 2 : script `bin/release.mjs`

**Files :**
- Create : `bin/release.mjs`

- [ ] **Step 1 : créer le script**

```js
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
	const today = new Date().toISOString().slice( 0, 10 )
	writeFileSync( CHANGELOG, changelog.replace( '## [Unreleased]', `## [Unreleased]\n\n## [${ version }] - ${ today }` ) )
} else if ( mode === 'notes' ) {
	const notes = section( changelog, arg )
	if ( ! notes ) fail( `${ CHANGELOG }: no section for ${ arg }` )
	console.log( notes )
} else {
	fail( 'usage: release.mjs check | sync | notes <version>' )
}
```

- [ ] **Step 2 : essai dans une copie jetable** (ne touche pas au dépôt)

```bash
rm -rf /tmp/smm-release-test && rsync -a --exclude node_modules --exclude .git ./ /tmp/smm-release-test/ && cd /tmp/smm-release-test
node bin/release.mjs check; echo "exit=$?"                       # attendu : exit=0
npm pkg set version=9.9.9 && node bin/release.mjs sync
grep 'Version:' simple-mega-menu.php                              # attendu : * Version:           9.9.9
grep '"version"' src/*/block.json                                 # attendu : 3 lignes "9.9.9"
grep -n '^## \[' CHANGELOG.md | sed -n 1,3p                       # attendu : [Unreleased], [9.9.9] - <date du jour>, [0.1.7] - 2026-11-05
node bin/release.mjs check; echo "exit=$?"                        # attendu : message "add at least one entry", exit=1
node bin/release.mjs notes 9.9.9 | sed -n 1,3p                    # attendu : "### Added" puis la 1re entrée
node bin/release.mjs notes 0.1.1 | tail -1                        # attendu : "- Auto-close of the burger menu…"
cd - && rm -rf /tmp/smm-release-test
```

- [ ] **Step 3 : commit**

```bash
git add bin/release.mjs
git commit -m "Add release helper: changelog check, version sync, release notes"
```

### Task 3 : scripts npm et alignement des `block.json`

**Files :**
- Create : `.npmrc`
- Modify : `package.json` (`scripts`)
- Modify : `src/mega-menu-item/block.json`, `src/mega-menu-link/block.json`, `src/mega-menu-nav/block.json` (`version` → `0.1.7`)

- [ ] **Step 1 : `.npmrc`**

```ini
message="Release v%s"
```

- [ ] **Step 2 : ajouter dans `package.json` → `scripts`**

```json
"preversion": "node bin/release.mjs check",
"version": "node bin/release.mjs sync && npm run build && git add simple-mega-menu.php CHANGELOG.md src build",
"postversion": "git push --follow-tags"
```

- [ ] **Step 3 : aligner les blocs sur la version courante** (une seule fois ; ensuite `sync` s'en charge)

```bash
node -e 'const fs=require("fs");for(const f of ["src/mega-menu-item/block.json","src/mega-menu-link/block.json","src/mega-menu-nav/block.json"]){fs.writeFileSync(f,fs.readFileSync(f,"utf8").replace(/("version":\s*")[^"]*"/,(_, p)=>p+"0.1.7\""))}'
npm run build
grep '"version"' src/*/block.json build/*/block.json                # attendu : 6 lignes "0.1.7"
```

- [ ] **Step 4 : commit**

```bash
git add .npmrc package.json src build
git commit -m "Release scripts: npm version lifecycle; block versions follow the plugin version"
```

### Task 4 : workflow GitHub de publication

**Files :**
- Create : `.github/workflows/release.yml`

- [ ] **Step 1 : créer le workflow**

```yaml
name: Release

on:
  push:
    tags: [ 'v*' ]

permissions:
  contents: write

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Check that the tag matches the plugin header
        run: |
          header=$(grep -m1 -E '^ \* Version:' simple-mega-menu.php | awk '{print $NF}')
          if [ "v$header" != "$GITHUB_REF_NAME" ]; then
            echo "::error::Tag $GITHUB_REF_NAME does not match plugin header version $header"
            exit 1
          fi

      - run: npm ci
      - run: npm run build
      - run: npm run plugin-zip

      - name: Extract release notes from CHANGELOG.md
        run: node bin/release.mjs notes "${GITHUB_REF_NAME#v}" > release-notes.md

      - name: Publish the GitHub release
        env:
          GH_TOKEN: ${{ github.token }}
        run: gh release create "$GITHUB_REF_NAME" simple-mega-menu.zip --title "$GITHUB_REF_NAME" --notes-file release-notes.md
```

- [ ] **Step 2 : vérifier localement ce que le workflow produira**

```bash
npm run plugin-zip && unzip -l simple-mega-menu.zip | awk '{print $4}' | grep -v '/$' | sed 's#/[^/]*$##' | sort -u
# attendu : simple-mega-menu, simple-mega-menu/build/..., (simple-mega-menu/includes après la Task 5)
unzip -l simple-mega-menu.zip | grep -E 'CHANGELOG.md|readme.md|simple-mega-menu.php'   # attendu : 3 lignes
unzip -l simple-mega-menu.zip | grep -c -E 'docs/|bin/|src/|node_modules'                 # attendu : 0
rm simple-mega-menu.zip
```

- [ ] **Step 3 : commit**

```bash
git add .github/workflows/release.yml
git commit -m "Add GitHub release workflow: build, plugin zip, release notes from CHANGELOG.md"
```

---

## Phase C — Mises à jour depuis le tableau de bord

### Task 5 : updater `Update URI`

**Files :**
- Create : `includes/class-simple-mega-menu-updater.php`
- Modify : `simple-mega-menu.php` (en-tête lignes 2-14 ; chargement après la garde `ABSPATH`)

Contrat WordPress vérifié dans `wp-includes/update.php` (`wp_update_plugins()`) : le filtre `update_plugins_{$hostname}` reçoit `( false, $plugin_data, $plugin_file, $locales )` ; la valeur rendue doit au moins contenir `version` ; WordPress complète `id`, `plugin`, `new_version` et compare à la version installée.

- [ ] **Step 1 : créer la classe**

```php
<?php
/**
 * Updates from GitHub releases through the native "Update URI" mechanism (WordPress 5.8+).
 *
 * @package SimpleMegaMenu
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Simple_Mega_Menu_Updater {

	const REPO      = 'seangoogoo/simple-mega-menu';
	const SLUG      = 'simple-mega-menu';
	const ASSET     = 'simple-mega-menu.zip';
	const CACHE_KEY = 'simple_mega_menu_latest_release';

	/** @var string Plugin basename, e.g. "simple-mega-menu/simple-mega-menu.php". */
	private $plugin_file;

	public function __construct( $plugin_file ) {
		$this->plugin_file = plugin_basename( $plugin_file );
		add_filter( 'update_plugins_github.com', array( $this, 'check_update' ), 10, 3 );
		add_filter( 'plugins_api', array( $this, 'plugin_info' ), 10, 3 );
	}

	//* Latest GitHub release with a plugin zip, cached 12 h (1 h after a failure).
	//* "Check again" on Dashboard → Updates (force-check) bypasses the cache.
	private function get_release() {
		$cached = get_site_transient( self::CACHE_KEY );
		if ( false !== $cached && empty( $_GET['force-check'] ) ) {
			return $cached ? $cached : null;
		}

		$response = wp_remote_get(
			'https://api.github.com/repos/' . self::REPO . '/releases/latest',
			array(
				'timeout' => 10,
				'headers' => array( 'Accept' => 'application/vnd.github.html+json' ),
			)
		);
		$data    = json_decode( wp_remote_retrieve_body( $response ), true );
		$release = null;

		if ( 200 === wp_remote_retrieve_response_code( $response ) && ! empty( $data['assets'] ) ) {
			foreach ( $data['assets'] as $asset ) {
				if ( self::ASSET === $asset['name'] ) {
					$release = array(
						'version'   => ltrim( $data['tag_name'], 'v' ),
						'package'   => $asset['browser_download_url'],
						'url'       => $data['html_url'],
						'changelog' => isset( $data['body_html'] ) ? $data['body_html'] : '',
						'date'      => $data['published_at'],
					);
					break;
				}
			}
		}

		set_site_transient( self::CACHE_KEY, $release ? $release : 0, $release ? 12 * HOUR_IN_SECONDS : HOUR_IN_SECONDS );
		return $release;
	}

	public function check_update( $update, $plugin_data, $plugin_file ) {
		if ( $plugin_file !== $this->plugin_file ) {
			return $update;
		}
		$release = $this->get_release();
		if ( ! $release ) {
			return $update;
		}
		return array(
			'slug'    => self::SLUG,
			'version' => $release['version'],
			'url'     => $release['url'],
			'package' => $release['package'],
		);
	}

	//* "View details" modal on the Plugins page.
	public function plugin_info( $result, $action, $args ) {
		if ( 'plugin_information' !== $action || empty( $args->slug ) || self::SLUG !== $args->slug ) {
			return $result;
		}
		$release = $this->get_release();
		if ( ! $release ) {
			return $result;
		}
		$plugin = get_plugin_data( WP_PLUGIN_DIR . '/' . $this->plugin_file, false, false );
		return (object) array(
			'name'          => $plugin['Name'],
			'slug'          => self::SLUG,
			'version'       => $release['version'],
			'author'        => $plugin['Author'],
			'homepage'      => 'https://github.com/' . self::REPO,
			'requires'      => $plugin['RequiresWP'],
			'requires_php'  => $plugin['RequiresPHP'],
			'last_updated'  => $release['date'],
			'download_link' => $release['package'],
			'sections'      => array(
				'description' => esc_html( $plugin['Description'] ),
				'changelog'   => $release['changelog']
					. '<p><a href="' . esc_url( 'https://github.com/' . self::REPO . '/blob/main/CHANGELOG.md' ) . '">Full changelog</a></p>',
			),
		);
	}
}
```

- [ ] **Step 2 : en-tête de `simple-mega-menu.php`** — ajouter après la ligne `* License URI:` :

```php
 * Update URI:        https://github.com/seangoogoo/simple-mega-menu
```

- [ ] **Step 3 : charger l'updater** — dans `simple-mega-menu.php`, juste après la garde `ABSPATH` :

```php
//* Updates from GitHub releases; disabled in git working copies so a dashboard update never overwrites a clone
if ( ! is_dir( __DIR__ . '/.git' ) ) {
	require_once __DIR__ . '/includes/class-simple-mega-menu-updater.php';
	new Simple_Mega_Menu_Updater( __FILE__ );
}
```

- [ ] **Step 4 : vérifier**

```bash
php -l includes/class-simple-mega-menu-updater.php && php -l simple-mega-menu.php    # attendu : No syntax errors (x2)
curl -sk -o /dev/null -w '%{http_code}\n' https://wp-multi.local/                      # attendu : 200 (le clone a .git : updater non chargé)
```

- [ ] **Step 5 : commit**

```bash
git add includes/class-simple-mega-menu-updater.php simple-mega-menu.php
git commit -m "Dashboard updates from GitHub releases (Update URI)"
```

---

## Phase D — Publication et recette

### Task 6 : première publication `v0.2.0` — **G1 : accord du propriétaire avant de lancer**

- [ ] **Step 1 : état propre** — `git status --short` → vide ; `git log origin/main..main --oneline` → liste des commits qui seront poussés (à montrer au propriétaire avec le plan).
- [ ] **Step 2 : publier**

```bash
npm version minor
# attendu : préversion OK, en-tête et block.json → 0.2.0, CHANGELOG [0.2.0] - <date>, build, commit "Release v0.2.0", tag v0.2.0, push
```

- [ ] **Step 3 : suivre le workflow** — `gh run watch --exit-status $(gh run list --workflow release.yml --limit 1 --json databaseId -q '.[0].databaseId')` → succès.
- [ ] **Step 4 : contrôler la Release** — `gh release view v0.2.0 --json assets,body -q '.assets[].name, .body'` → `simple-mega-menu.zip` et les notes de la section `[0.2.0]`.

**Si le workflow échoue** (après accord du propriétaire pour chaque opération distante) :

```bash
gh release delete v0.2.0 --yes 2>/dev/null; git push --delete origin v0.2.0; git tag -d v0.2.0
# corriger, commiter, puis re-taguer le commit corrigé (l'en-tête est déjà en 0.2.0) :
git tag v0.2.0 && git push --follow-tags
```

### Task 7 : recette de la mise à jour sur wp-multi

But : voir la mise à jour proposée puis appliquée depuis la page Extensions, sans toucher au clone de développement.

- [ ] **Step 1 : mettre le clone de côté et installer une copie « ancienne »**

```bash
npm run plugin-zip                       # depuis le clone (racine du dépôt), version 0.2.0
cd .. && mv simple-mega-menu /tmp/smm-dev-clone   # dossier wp-content/plugins
unzip -q /tmp/smm-dev-clone/simple-mega-menu.zip -d .
sed -i '' 's/^\( \* Version:[[:space:]]*\).*/\10.1.0/' simple-mega-menu/simple-mega-menu.php   # copie sans .git : l'updater est actif
```

- [ ] **Step 2 : dans le navigateur (administration réseau)** — Tableau de bord → Mises à jour → « Vérifier à nouveau ». Attendu : *Simple Mega Menu* proposé de 0.1.0 vers 0.2.0. Page Extensions : lien « Voir les détails de la version 0.2.0 » → fenêtre avec l'onglet Changelog (notes de la Release + lien « Full changelog »).
- [ ] **Step 3 : lancer la mise à jour** depuis la page Extensions. Attendu : succès, version affichée 0.2.0, extension toujours active, menu rendu sur le site (`curl -sk https://wp-multi.local/ | grep -c 'simple-mega-menu__list'` ≥ 1).
- [ ] **Step 4 : restaurer le clone**

```bash
rm -rf simple-mega-menu && mv /tmp/smm-dev-clone simple-mega-menu
cd simple-mega-menu && git status --short && rm -f simple-mega-menu.zip   # attendu : rien d'autre que le zip éventuel
```

### Task 8 (facultative) : tags historiques — **G2 : accord du propriétaire avant le push**

Commits portant chaque version dans l'en-tête PHP (relevé `git log`) :

```bash
git tag v0.1.1 16a2ce2 && git tag v0.1.2 655d262 && git tag v0.1.3 974a2ec && git tag v0.1.4 dcb32b9 \
 && git tag v0.1.5 85bcf40 && git tag v0.1.6 4ab5c29 && git tag v0.1.7 a9f5acc
git push origin v0.1.1 v0.1.2 v0.1.3 v0.1.4 v0.1.5 v0.1.6 v0.1.7
```

Ces commits ne contiennent pas le workflow : le push de ces tags ne crée aucune Release.

---

## Hors périmètre

- Déploiement sur les autres installations de l'extension : décision séparée du propriétaire. Une installation ne reçoit les mises à jour qu'à partir d'une version qui contient l'updater (≥ 0.2.0), installée une première fois à la main.
- Dépôt privé (jeton d'accès) : non nécessaire tant que le dépôt est public.

## Estimation

| Phase | Estimation |
|---|---|
| A — Historique | 20 à 30 min |
| B — Versionnement | 45 min à 1 h |
| C — Mises à jour | 45 min à 1 h |
| D — Publication et recette | 30 min à 1 h (selon les allers-retours du premier workflow) |
| **Total** | **environ 2 h 30 à 3 h 30**, hors temps de validation du propriétaire |
