BreakRoom.register({
  id: 'set-matcher',
  name: 'Set Matcher',
  icon: '\u{1F3B4}',
  description: 'Find valid Sets in 60 seconds. Three cards, four properties.',
  play(container) {
    const SHAPES = ['diamond', 'oval', 'squiggle'];
    const COLORS = ['#e94560', '#2ecc71', '#85c0f9'];
    const FILLS = ['solid', 'striped', 'empty'];
    const COUNTS = [1, 2, 3];
    const TIME = 60;

    let board = [];
    let selected = [];
    let setsFound = 0;
    let timer = TIME;
    let interval = null;

    function makeCard(shape, color, fill, count) {
      return { shape, color, fill, count };
    }

    function allSameOrAllDiff(a, b, c) {
      return (a === b && b === c) || (a !== b && b !== c && a !== c);
    }

    function isValidSet(c1, c2, c3) {
      return allSameOrAllDiff(c1.shape, c2.shape, c3.shape) &&
             allSameOrAllDiff(c1.color, c2.color, c3.color) &&
             allSameOrAllDiff(c1.fill, c2.fill, c3.fill) &&
             allSameOrAllDiff(c1.count, c2.count, c3.count);
    }

    let svgIdCounter = 0;

    function drawShape(shape, color, fill, size) {
      const s = size;
      const uid = 'sp' + (svgIdCounter++);
      let path;
      if (shape === 'diamond') {
        path = `M${s/2} 2 L${s-2} ${s/2} L${s/2} ${s-2} L2 ${s/2}Z`;
      } else if (shape === 'oval') {
        path = `M${s*0.3} 2 Q2 2 2 ${s/2} Q2 ${s-2} ${s*0.3} ${s-2} L${s*0.7} ${s-2} Q${s-2} ${s-2} ${s-2} ${s/2} Q${s-2} 2 ${s*0.7} 2Z`;
      } else {
        path = `M2 ${s*0.8} Q${s*0.15} ${s*0.2} ${s*0.4} 2 Q${s*0.5} ${s*0.4} ${s*0.65} ${s*0.25} Q${s*0.9} ${s*0.1} ${s-2} ${s*0.3} Q${s*0.85} ${s*0.8} ${s*0.6} ${s-2} Q${s*0.5} ${s*0.6} ${s*0.35} ${s*0.75} Q${s*0.1} ${s*0.9} 2 ${s*0.8}Z`;
      }

      let fillAttr;
      if (fill === 'solid') fillAttr = `fill="${color}"`;
      else if (fill === 'empty') fillAttr = `fill="none"`;
      else fillAttr = `fill="url(#${uid})"`;

      return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
        <defs><pattern id="${uid}" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke="${color}" stroke-width="1.5"/>
        </pattern></defs>
        <path d="${path}" ${fillAttr} stroke="${color}" stroke-width="2"/>
      </svg>`;
    }

    function generateBoard() {
      // Generate all possible cards, pick 12 that have at least one valid set
      const allCards = [];
      for (const s of SHAPES)
        for (const c of COLORS)
          for (const f of FILLS)
            for (const n of COUNTS)
              allCards.push(makeCard(s, c, f, n));

      for (let attempt = 0; attempt < 100; attempt++) {
        const shuffled = BreakRoom.shuffle(allCards).slice(0, 12);
        if (countSets(shuffled) >= 3) return shuffled;
      }
      return BreakRoom.shuffle(allCards).slice(0, 12);
    }

    function countSets(cards) {
      let count = 0;
      for (let i = 0; i < cards.length; i++)
        for (let j = i+1; j < cards.length; j++)
          for (let k = j+1; k < cards.length; k++)
            if (isValidSet(cards[i], cards[j], cards[k])) count++;
      return count;
    }

    function render() {
      const setsOnBoard = countSets(board);
      container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <div class="score-display" style="margin:0;">Sets found: <span>${setsFound}</span></div>
          <div class="score-display" style="margin:0;">Sets available: <span>${setsOnBoard}</span></div>
          <div class="score-display" style="margin:0;">Time: <span>${timer}s</span></div>
        </div>
        <div class="timer-bar"><div class="fill" style="width:${(timer/TIME)*100}%"></div></div>
        <div class="set-board" id="set-board"></div>
        <div style="text-align:center; color:var(--text-dim); font-size:0.9rem;">
          Select 3 cards. A valid Set: each property is all-same or all-different across the 3 cards.
        </div>
      `;

      const boardEl = document.getElementById('set-board');
      board.forEach((card, idx) => {
        const el = document.createElement('div');
        el.className = 'set-card' + (selected.includes(idx) ? ' selected' : '');
        let shapes = '';
        for (let i = 0; i < card.count; i++) {
          shapes += drawShape(card.shape, card.color, card.fill, 32);
        }
        el.innerHTML = shapes;
        el.onclick = () => toggleCard(idx);
        boardEl.appendChild(el);
      });
    }

    function toggleCard(idx) {
      if (timer <= 0) return;
      const i = selected.indexOf(idx);
      if (i >= 0) { selected.splice(i, 1); }
      else {
        selected.push(idx);
        if (selected.length === 3) {
          checkSet();
          return;
        }
      }
      render();
    }

    function checkSet() {
      const [a, b, c] = selected;
      if (isValidSet(board[a], board[b], board[c])) {
        setsFound++;
        // Flash correct
        container.querySelectorAll('.set-card').forEach((el, i) => {
          if (selected.includes(i)) el.classList.add('correct-flash');
        });
        setTimeout(() => {
          // Replace found cards with new ones or remove
          const allCards = [];
          for (const s of SHAPES)
            for (const c of COLORS)
              for (const f of FILLS)
                for (const n of COUNTS)
                  allCards.push(makeCard(s, c, f, n));
          const usedKeys = board.map(c => `${c.shape}-${c.color}-${c.fill}-${c.count}`);
          const available = allCards.filter(c => !usedKeys.includes(`${c.shape}-${c.color}-${c.fill}-${c.count}`));
          const replacements = BreakRoom.shuffle(available);
          selected.sort((a,b) => b-a).forEach((idx, i) => {
            if (replacements[i]) board[idx] = replacements[i];
            else board.splice(idx, 1);
          });
          selected = [];
          // If no valid sets remain, reshuffle the board
          if (board.length >= 3 && countSets(board) === 0) {
            board = generateBoard();
          }
          render();
        }, 400);
      } else {
        container.querySelectorAll('.set-card').forEach((el, i) => {
          if (selected.includes(i)) el.classList.add('wrong-flash');
        });
        setTimeout(() => { selected = []; render(); }, 500);
      }
    }

    board = generateBoard();
    render();

    interval = setInterval(() => {
      timer--;
      const timerBar = container.querySelector('.timer-bar .fill');
      const timerText = container.querySelectorAll('.score-display span')[2];
      if (timerBar) timerBar.style.width = (timer/TIME)*100 + '%';
      if (timerText) timerText.textContent = timer + 's';
      if (timer <= 0) {
        clearInterval(interval);
        BreakRoom.showResult(container, {
          score: setsFound, max: Math.max(setsFound, 8), game: 'set-matcher',
          verdicts: [
            "Pattern recognition machine. Your brain is warmed up.",
            "Solid set-spotting. Visual cortex engaged.",
            "Decent eye. Keep practicing those patterns.",
            "Sets are sneaky. You'll get faster."
          ]
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }
});
