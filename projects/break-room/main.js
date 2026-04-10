const BreakRoom = (() => {
  const games = [];
  let currentCleanup = null;

  function register(game) {
    games.push(game);
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function showMenu() {
    if (currentCleanup) { currentCleanup(); currentCleanup = null; }
    document.getElementById('menu').style.display = 'block';
    document.getElementById('game-screen').style.display = 'none';
    // Return focus to the menu heading
    const heading = document.querySelector('#menu h1');
    if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus(); }
  }

  function launchGame(id) {
    const game = games.find(g => g.id === id);
    if (!game) return;

    if (currentCleanup) { currentCleanup(); currentCleanup = null; }

    document.getElementById('menu').style.display = 'none';
    const screen = document.getElementById('game-screen');
    screen.style.display = 'block';
    screen.querySelector('.game-title').textContent = game.icon + ' ' + game.name;

    const container = screen.querySelector('.game-container');
    container.innerHTML = '';

    currentCleanup = game.play(container) || null;

    // Move focus to the game area
    container.setAttribute('tabindex', '-1');
    container.focus();
  }

  function handleCardKey(e, id) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      launchGame(id);
    }
  }

  function renderMenu() {
    const featured = shuffle(games).slice(0, 4);
    const grid = document.getElementById('featured-grid');
    grid.innerHTML = '';
    featured.forEach(g => {
      const card = document.createElement('div');
      card.className = 'game-card';
      card.setAttribute('role', 'listitem');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', g.name + ': ' + g.description);
      card.onclick = () => launchGame(g.id);
      card.onkeydown = (e) => handleCardKey(e, g.id);
      card.innerHTML = `
        <div class="icon" aria-hidden="true">${g.icon}</div>
        <div class="name">${g.name}</div>
        <div class="desc">${g.description}</div>
      `;
      grid.appendChild(card);
    });

    const list = document.getElementById('all-games-list');
    list.innerHTML = '';
    games.forEach(g => {
      const item = document.createElement('div');
      item.className = 'game-list-item';
      item.setAttribute('role', 'listitem');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-label', g.name + ': ' + g.description);
      item.onclick = () => launchGame(g.id);
      item.onkeydown = (e) => handleCardKey(e, g.id);
      item.innerHTML = `
        <div class="icon" aria-hidden="true">${g.icon}</div>
        <div class="name">${g.name}</div>
        <div class="desc">${g.description}</div>
        <div class="arrow" aria-hidden="true">&#8250;</div>
      `;
      list.appendChild(item);
    });
  }

  function start() {
    document.querySelector('.back-btn').onclick = showMenu;
    renderMenu();
  }

  // Shared utility: show result screen
  function showResult(container, { score, max, verdicts, game }) {
    const pct = max > 0 ? score / max : 0;
    let verdict;
    if (verdicts) {
      if (pct >= 0.9) verdict = verdicts[0];
      else if (pct >= 0.7) verdict = verdicts[1];
      else if (pct >= 0.4) verdict = verdicts[2];
      else verdict = verdicts[3];
    } else {
      if (pct >= 0.9) verdict = "Brilliant. Now get back to work.";
      else if (pct >= 0.7) verdict = "Not bad. Your brain still works.";
      else if (pct >= 0.4) verdict = "Room for improvement. Try again or get back to it.";
      else verdict = "Rough round. Shake it off.";
    }

    container.innerHTML = `
      <div class="result-screen" role="status" aria-live="polite">
        <div class="score" aria-label="Score: ${score} out of ${max}">${score} / ${max}</div>
        <div class="verdict">${verdict}</div>
        <button class="btn btn-primary" id="result-back">Back to Work</button>
        <button class="btn btn-secondary" id="result-retry">Play Again</button>
      </div>
    `;
    document.getElementById('result-back').onclick = showMenu;
    document.getElementById('result-retry').onclick = () => launchGame(game);
    // Focus the score announcement
    container.querySelector('.result-screen').focus();
  }

  return { register, start, showMenu, launchGame, showResult, shuffle };
})();

window.BreakRoom = BreakRoom;
document.addEventListener('DOMContentLoaded', () => BreakRoom.start());
