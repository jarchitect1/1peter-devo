// Bilingual drift checker.
//
// Verifies that every Chinese (root locale) content file in src/content/docs/
// has a structurally parallel English twin in src/content/docs/en/, and vice
// versa. Catches the maintenance hazards of two-file bilingual authoring:
//   1. a file added to one locale but not the other,
//   2. a section/quiz/scripture added in one locale only (structural drift),
//   3. prev/next navigation links that desync (the /en/ prefix breaks),
//   4. endpoint invariants (prev:false on lesson 1, next:false on lesson 31).
//
// Exit code 1 if any problem is found, 0 otherwise. No dependencies.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = join(root, 'src', 'content', 'docs');
const EN = join(DOCS, 'en');

const problems = [];
const warn = (msg) => problems.push(msg);

// --- gather files ---------------------------------------------------------
/** @param {string} dir @returns {string[]} mdx basenames */
function listMdx(dir) {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .sort();
}

const zhFiles = listMdx(DOCS);
const enFiles = existsSync(EN) ? listMdx(EN) : [];

// --- 1. twin existence ----------------------------------------------------
for (const f of zhFiles) {
  if (!enFiles.includes(f)) warn(`zh "${f}" has no en twin`);
}
for (const f of enFiles) {
  if (!zhFiles.includes(f)) warn(`en "${f}" has no zh twin`);
}

// --- helpers --------------------------------------------------------------
/** Normalize CRLF/cr to lf so regexes can anchor on \n. */
const lf = (s) => s.replace(/\r\n?/g, '\n');

/** Count occurrences of a tag/block in source. `##` matches headings. */
function count(src, token) {
  if (token === '##') return (src.match(/^#{2}\s/gm) || []).length;
  // match <Tag …> or <Tag/> openings (case-insensitive), ignoring </Tag> closings
  const re = new RegExp(`<${token}(?:\\s[^>]*?)?\\s*/?>`, 'gi');
  return (src.match(re) || []).length;
}

/** Extract prev/next link targets from frontmatter (the `link:` values). */
function navLinks(src) {
  const fm = (lf(src).match(/^---\n([\s\S]*?)\n---/m) || [, ''])[1];
  const links = [];
  for (const m of fm.matchAll(/^\s*link:\s*(\/\S+)/gm)) links.push(m[1]);
  return links;
}

/** Whether the file declares prev: false / next: false. */
function hasFalse(src, key) {
  const fm = (lf(src).match(/^---\n([\s\S]*?)\n---/m) || [, ''])[1];
  return new RegExp(`^\\s*${key}:\\s*false\\s*$`, 'm').test(fm);
}

const SHAPES = ['##', 'Scripture', 'Quiz', 'KeyIdea', 'Aside'];

// --- 2,3,4. per-pair checks (only for pairs that exist) -------------------
for (const f of zhFiles) {
  const enPath = join(EN, f);
  if (!existsSync(enPath)) continue; // already reported as missing twin
  const zhSrc = readFileSync(join(DOCS, f), 'utf8');
  const enSrc = readFileSync(enPath, 'utf8');
  const label = f.replace(/\.mdx$/, '');

  // 2. structural drift
  for (const token of SHAPES) {
    const z = count(zhSrc, token);
    const e = count(enSrc, token);
    if (z !== e) warn(`"${label}" ${token} count mismatch: zh=${z}, en=${e}`);
  }

  // 3. prev/next link desync: each en link should be /en/ + zh link
  const zhLinks = navLinks(zhSrc);
  const enLinks = navLinks(enSrc);
  if (zhLinks.length !== enLinks.length) {
    warn(`"${label}" prev/next link count mismatch: zh=${zhLinks.length}, en=${enLinks.length}`);
  } else {
    for (let i = 0; i < zhLinks.length; i++) {
      const expected = '/en' + zhLinks[i];
      if (enLinks[i] !== expected) {
        warn(`"${label}" prev/next link[${i}] desync: en="${enLinks[i]}" expected="${expected}"`);
      }
    }
  }
}

// --- 4. endpoint invariants (series boundaries) ---------------------------
const FIRST = '0001-a-living-hope-for-sojourners.mdx';
const LAST = '0031-from-suffering-to-glory.mdx';
for (const [name, file] of [['first', FIRST], ['last', LAST]]) {
  const zh = join(DOCS, file);
  const en = join(EN, file);
  if (existsSync(zh)) {
    const s = readFileSync(zh, 'utf8');
    if (name === 'first' && !hasFalse(s, 'prev')) warn(`zh ${file}: expected prev: false`);
    if (name === 'last' && !hasFalse(s, 'next')) warn(`zh ${file}: expected next: false`);
  }
  if (existsSync(en)) {
    const s = readFileSync(en, 'utf8');
    if (name === 'first' && !hasFalse(s, 'prev')) warn(`en ${file}: expected prev: false`);
    if (name === 'last' && !hasFalse(s, 'next')) warn(`en ${file}: expected next: false`);
  }
}

// --- report ---------------------------------------------------------------
const pairs = zhFiles.filter((f) => enFiles.includes(f)).length;
if (problems.length === 0) {
  console.log(`✓ i18n in sync: ${pairs} zh/en pair(s) parallel, endpoints valid.`);
  process.exit(0);
} else {
  console.log(`✗ i18n drift detected (${problems.length} problem(s)):\n`);
  for (const p of problems) console.log(`  - ${p}`);
  process.exit(1);
}
