/*  site-nav.js  —  Shared navigation and footer for frauddyscotty.com
 *
 *  Usage:  <script src="js/site-nav.js" data-base="."></script>
 *
 *  data-base tells the script how to reach the site root:
 *    "."     — page is at root          (index.html, about.html …)
 *    ".."    — one level deep           (projects/assembly-line.html)
 *    "../.." — two levels deep          (projects/break-room/index.html)
 *
 *  The script injects:
 *    1. <site-nav>  — header + nav bar     (into the element with id="site-nav")
 *    2. <site-foot> — footer + disclosure  (into the element with id="site-footer")
 *
 *  It also loads projects.json on projects.html and renders cards into
 *  the element with id="project-grid".
 */

(function () {
  'use strict';

  /* ── Resolve base path ── */
  var scriptEl = document.currentScript;
  var base = (scriptEl && scriptEl.getAttribute('data-base')) || '.';

  function p(path) { return base + '/' + path; }

  /* ── Nav items (single source of truth) ── */
  var navItems = [
    { label: 'Home',        href: 'index.html' },
    { label: 'Projects',    href: 'projects.html' },
    { label: 'Research',    href: 'research.html' },
    { label: 'About',       href: 'about.html' },
    { label: 'Field Notes', href: 'field-notes.html' }
  ];

  /* ── Detect current page for active state ── */
  var loc = window.location.pathname.replace(/\\/g, '/');

  function isActive(href) {
    var full = p(href);
    // Normalize: strip leading ./ or ../
    var hrefFile = href.replace(/.*\//, '');
    if (loc.endsWith('/' + hrefFile)) return true;
    if (loc.endsWith('/' + href)) return true;
    // projects subpages → Projects is active
    if (loc.indexOf('/projects/') !== -1 && href === 'projects.html') return true;
    return false;
  }

  /* ── Build nav HTML ── */
  function buildNav() {
    var el = document.getElementById('site-nav');
    if (!el) return;

    var links = navItems.map(function (item) {
      var cls = isActive(item.href) ? ' class="sn-active"' : '';
      return '<a href="' + p(item.href) + '"' + cls + '>' + item.label + '</a>';
    }).join('\n        ');

    el.innerHTML =
      '<header class="sn-header">' +
      '  <div class="sn-title"><a href="' + p('index.html') + '">scott.</a></div>' +
      '  <div class="sn-subtitle">Academic. Researcher. Skeptical Technologist. Chicken Whisperer.</div>' +
      '  <nav class="sn-nav" aria-label="Main navigation">' +
      '    ' + links +
      '  </nav>' +
      '</header>';
  }

  /* ── Build footer HTML ── */
  function buildFooter() {
    var el = document.getElementById('site-footer');
    if (!el) return;

    el.innerHTML =
      '<footer class="sn-footer">' +
      '  <span>&copy; 2026 Scott</span>' +
      '  <span>Made as a personal project by Scott DuHadway using a bunch of Chickens named Opus and Haiku in Claude Code</span>' +
      '  <span>Hosted via <a href="https://pages.github.com/" target="_blank" rel="noopener noreferrer">GitHub Pages</a></span>' +
      '</footer>';
  }

  /* ── Build project cards from projects.json ── */
  function buildProjectGrid() {
    var grid = document.getElementById('project-grid');
    if (!grid) return;

    fetch(p('projects.json'))
      .then(function (r) { return r.json(); })
      .then(function (projects) {
        // Sort newest first
        projects.sort(function (a, b) {
          return (b.date || '').localeCompare(a.date || '');
        });

        grid.innerHTML = projects.map(function (proj) {
          var tags = (proj.tags || []).map(function (t) {
            return '<span class="tag">' + t + '</span>';
          }).join(' ');

          var desc = proj.ai
            ? '<span class="written-by-chickens">*' + proj.description + '*</span>'
            : '<p>' + proj.description + '</p>';

          return (
            '<div class="project-card">' +
            '  <h3>' + proj.title + '</h3>' +
            '  <div>' + tags + '</div>' +
            '  ' + desc +
            '  <a class="project-link" href="' + p(proj.path) + '">View Project &rarr;</a>' +
            '</div>'
          );
        }).join('\n');
      })
      .catch(function () {
        grid.innerHTML = '<p>Could not load projects.</p>';
      });
  }

  /* ── Inject scoped styles ── */
  function injectStyles() {
    if (document.getElementById('sn-styles')) return;
    var style = document.createElement('style');
    style.id = 'sn-styles';
    style.textContent =
      /* Header */
      '.sn-header {' +
      '  font-family: Georgia, serif;' +
      '  max-width: 760px;' +
      '  margin: 0 auto;' +
      '  padding: 2rem 1.5rem 1rem;' +
      '  border-bottom: 2px solid #1a1a1a;' +
      '  margin-bottom: 2.5rem;' +
      '}' +
      '.sn-title {' +
      '  font-family: Consolas, monospace;' +
      '  font-size: 1.4rem;' +
      '  font-weight: 700;' +
      '  letter-spacing: -0.02em;' +
      '  margin-bottom: 0.25rem;' +
      '}' +
      '.sn-title a {' +
      '  color: #1a1a1a; text-decoration: none;' +
      '}' +
      '.sn-subtitle {' +
      '  font-size: 0.85rem;' +
      '  color: #555;' +
      '  font-style: italic;' +
      '}' +
      '.sn-nav {' +
      '  margin-top: 0.75rem;' +
      '  display: flex;' +
      '  gap: 1.5rem;' +
      '  flex-wrap: wrap;' +
      '}' +
      '.sn-nav a {' +
      '  font-family: Consolas, monospace;' +
      '  font-size: 0.8rem;' +
      '  text-transform: uppercase;' +
      '  letter-spacing: 0.06em;' +
      '  color: #1a6b5a;' +
      '  text-decoration: none;' +
      '  padding-bottom: 2px;' +
      '  border-bottom: 1px solid transparent;' +
      '  transition: border-color 0.2s;' +
      '}' +
      '.sn-nav a:hover,' +
      '.sn-nav a.sn-active {' +
      '  border-bottom-color: #1a6b5a;' +
      '}' +
      '.sn-nav a:focus-visible {' +
      '  outline: 2px solid #1a6b5a;' +
      '  outline-offset: 2px;' +
      '}' +

      /* Footer */
      '.sn-footer {' +
      '  font-family: Consolas, monospace;' +
      '  max-width: 760px;' +
      '  margin: 0 auto;' +
      '  margin-top: 4rem;' +
      '  padding: 1.5rem 1.5rem 2rem;' +
      '  border-top: 1px solid #ccc5b9;' +
      '  font-size: 0.8rem;' +
      '  color: #555;' +
      '  display: flex;' +
      '  justify-content: space-between;' +
      '  flex-wrap: wrap;' +
      '  gap: 0.5rem;' +
      '}' +
      '.sn-footer a {' +
      '  color: #1a6b5a;' +
      '  text-decoration-thickness: 1px;' +
      '  text-underline-offset: 2px;' +
      '}' +
      '.sn-footer a:hover { color: #13503f; }' +

      /* Inside .page-wrapper: defer to wrapper layout */
      '.page-wrapper .sn-header {' +
      '  max-width: none;' +
      '  padding: 0 0 1rem;' +
      '}' +
      '.page-wrapper .sn-footer {' +
      '  max-width: none;' +
      '  padding: 1.5rem 0 0;' +
      '}' +

      /* Responsive */
      '@media (max-width: 600px) {' +
      '  .sn-nav { gap: 1rem; }' +
      '  .sn-footer { flex-direction: column; }' +
      '}';

    document.head.appendChild(style);
  }

  /* ── Init ── */
  function init() {
    injectStyles();
    buildNav();
    buildFooter();
    buildProjectGrid();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
