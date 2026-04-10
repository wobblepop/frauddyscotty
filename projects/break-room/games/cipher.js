BreakRoom.register({
  id: 'cipher',
  name: 'Cipher Cracker',
  icon: '\u{1F510}',
  description: 'Decode the substitution cipher. Hints cost points.',
  play(container) {
    const phrases = [
      { text: "THE ONLY TRUE WISDOM IS IN KNOWING YOU KNOW NOTHING", author: "Socrates" },
      { text: "NOT EVERYTHING THAT COUNTS CAN BE COUNTED", author: "William Bruce Cameron" },
      { text: "IN THE MIDDLE OF DIFFICULTY LIES OPPORTUNITY", author: "Albert Einstein" },
      { text: "CORRELATION DOES NOT IMPLY CAUSATION", author: "Statistics proverb" },
      { text: "THE MAP IS NOT THE TERRITORY", author: "Alfred Korzybski" },
      { text: "ALL MODELS ARE WRONG BUT SOME ARE USEFUL", author: "George Box" },
      { text: "EXTRAORDINARY CLAIMS REQUIRE EXTRAORDINARY EVIDENCE", author: "Carl Sagan" },
      { text: "SCIENCE IS ORGANIZED KNOWLEDGE WISDOM IS ORGANIZED LIFE", author: "Immanuel Kant" },
      { text: "THE MEASURE OF INTELLIGENCE IS THE ABILITY TO CHANGE", author: "Albert Einstein" },
      { text: "DOUBT IS NOT A PLEASANT CONDITION BUT CERTAINTY IS ABSURD", author: "Voltaire" },
      { text: "PREDICTION IS VERY DIFFICULT ESPECIALLY ABOUT THE FUTURE", author: "Niels Bohr" },
      { text: "IF YOU CANNOT EXPLAIN IT SIMPLY YOU DO NOT UNDERSTAND IT", author: "Attributed to Feynman" },
      { text: "WHAT GETS MEASURED GETS MANAGED", author: "Peter Drucker" },
      { text: "THE BEST TIME TO PLANT A TREE WAS TWENTY YEARS AGO", author: "Chinese proverb" },
      { text: "ABSENCE OF EVIDENCE IS NOT EVIDENCE OF ABSENCE", author: "Carl Sagan" },
      { text: "THERE ARE NO FACTS ONLY INTERPRETATIONS", author: "Friedrich Nietzsche" },
      { text: "NATURE DOES NOT HURRY YET EVERYTHING IS ACCOMPLISHED", author: "Lao Tzu" },
      { text: "THE DOSE MAKES THE POISON", author: "Paracelsus" },
      { text: "WE DO NOT SEE THINGS AS THEY ARE WE SEE THEM AS WE ARE", author: "Anais Nin" },
      { text: "ESSENTIALLY ALL MODELS ARE WRONG BUT SOME ARE USEFUL", author: "George Box" },
      { text: "THE IMPORTANT THING IS NOT TO STOP QUESTIONING", author: "Albert Einstein" },
      { text: "CHANCE FAVORS THE PREPARED MIND", author: "Louis Pasteur" },
      { text: "TO INVENT YOU NEED A GOOD IMAGINATION AND A PILE OF JUNK", author: "Thomas Edison" },
      { text: "IF I HAVE SEEN FURTHER IT IS BY STANDING ON THE SHOULDERS OF GIANTS", author: "Isaac Newton" },
      { text: "THE GOOD THING ABOUT SCIENCE IS THAT IT IS TRUE WHETHER OR NOT YOU BELIEVE IN IT", author: "Neil deGrasse Tyson" },
      { text: "NOTHING IN LIFE IS TO BE FEARED IT IS ONLY TO BE UNDERSTOOD", author: "Marie Curie" },
      { text: "SIMPLICITY IS THE ULTIMATE SOPHISTICATION", author: "Leonardo da Vinci" },
      { text: "THE WHOLE OF SCIENCE IS NOTHING MORE THAN A REFINEMENT OF EVERYDAY THINKING", author: "Albert Einstein" },
      { text: "TORTURE THE DATA AND IT WILL CONFESS TO ANYTHING", author: "Ronald Coase" },
      { text: "AN EXPERT IS A PERSON WHO HAS MADE ALL THE MISTAKES THAT CAN BE MADE", author: "Niels Bohr" },
      { text: "IN GOD WE TRUST ALL OTHERS MUST BRING DATA", author: "W. Edwards Deming" },
      { text: "THERE IS NOTHING SO PRACTICAL AS A GOOD THEORY", author: "Kurt Lewin" },
      { text: "THE ONLY WAY TO DO GREAT WORK IS TO LOVE WHAT YOU DO", author: "Steve Jobs" },
      { text: "MEASURE WHAT IS MEASURABLE AND MAKE MEASURABLE WHAT IS NOT SO", author: "Galileo Galilei" }
    ];

    const phrase = BreakRoom.shuffle(phrases)[0];
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    // Generate a derangement (no letter maps to itself)
    function derange(arr) {
      for (let attempt = 0; attempt < 200; attempt++) {
        const s = BreakRoom.shuffle([...arr]);
        if (s.every((c, i) => c !== arr[i])) return s;
      }
      // Fallback: swap any fixed points with neighbors
      const s = BreakRoom.shuffle([...arr]);
      for (let i = 0; i < s.length; i++) {
        if (s[i] === arr[i]) {
          const j = (i + 1) % s.length;
          [s[i], s[j]] = [s[j], s[i]];
        }
      }
      return s;
    }
    const shuffled = derange(letters);
    const cipherMap = {}; // plain -> cipher
    const decipherMap = {}; // cipher -> plain
    letters.forEach((l, i) => {
      cipherMap[l] = shuffled[i];
      decipherMap[shuffled[i]] = l;
    });

    const encrypted = phrase.text.split('').map(c => cipherMap[c] || c).join('');
    const uniqueLetters = [...new Set(phrase.text.replace(/[^A-Z]/g, '').split(''))];

    // Player's guesses: cipher letter -> guessed plain letter
    let guesses = {};
    let activeCipher = null;
    let hints = 0;
    let maxHints = Math.floor(uniqueLetters.length * 0.4);
    let startTime = Date.now();
    const MAX_POINTS = 100;

    function render() {
      const solved = checkSolved();

      container.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:16px;">
          <div class="score-display" style="margin:0;">Hints: <span>${hints}/${maxHints}</span></div>
          <div class="score-display" style="margin:0;">Letters: <span>${Object.keys(guesses).length}/${uniqueLetters.length}</span></div>
        </div>
        <div class="cipher-display" id="cipher-display"></div>
        <div style="text-align:center; margin-bottom:16px;">
          <button class="btn btn-secondary btn-small" id="cipher-hint">\u{1F4A1} Hint (-10 pts)</button>
          <button class="btn btn-secondary btn-small" id="cipher-clear">\u{1F5D1} Clear All</button>
        </div>
        <div class="cipher-keyboard" id="cipher-kb"></div>
        <div style="text-align:center; margin-top:16px; color:var(--text-dim); font-size:0.85rem;">
          Click an encrypted letter above, then press a key below to assign it.
        </div>
      `;

      // Build cipher display
      const display = document.getElementById('cipher-display');
      encrypted.split('').forEach((ch, i) => {
        if (ch === ' ') {
          const sp = document.createElement('span');
          sp.className = 'cipher-space';
          display.appendChild(sp);
          return;
        }
        if (!/[A-Z]/.test(ch)) {
          const sp = document.createElement('span');
          sp.textContent = ch;
          display.appendChild(sp);
          return;
        }

        const el = document.createElement('span');
        el.className = 'cipher-letter' + (activeCipher === ch ? ' active' : '');
        const plain = decipherMap[ch];
        const guess = guesses[ch] || '';
        const isCorrect = guess && guess === plain;

        el.innerHTML = `
          <span class="decoded ${guess ? 'filled' : ''} ${isCorrect ? 'correct' : ''}">${guess || '\u00A0'}</span>
          <span class="encrypted">${ch}</span>
        `;
        el.onclick = () => { activeCipher = ch; render(); };
        display.appendChild(el);
      });

      // Keyboard
      const kb = document.getElementById('cipher-kb');
      const usedPlain = Object.values(guesses);
      letters.forEach(l => {
        const key = document.createElement('button');
        key.className = 'cipher-key' + (usedPlain.includes(l) ? ' used' : '');
        key.textContent = l;
        key.onclick = () => {
          if (activeCipher) {
            // Remove any existing mapping to this plain letter
            Object.keys(guesses).forEach(k => { if (guesses[k] === l) delete guesses[k]; });
            guesses[activeCipher] = l;
            // Move to next unguessed cipher letter
            const cipherLetters = [...new Set(encrypted.replace(/[^A-Z]/g, '').split(''))];
            const currentIdx = cipherLetters.indexOf(activeCipher);
            const next = cipherLetters.find((c, i) => i > currentIdx && !guesses[c]);
            activeCipher = next || null;
            if (checkSolved()) showWin();
            else render();
          }
        };
        kb.appendChild(key);
      });

      document.getElementById('cipher-hint').onclick = giveHint;
      document.getElementById('cipher-clear').onclick = () => { guesses = {}; activeCipher = null; render(); };
    }

    function giveHint() {
      if (hints >= maxHints) return;
      const unguessed = uniqueLetters.filter(plain => {
        const cipher = cipherMap[plain];
        return guesses[cipher] !== plain;
      });
      if (unguessed.length === 0) return;
      const pick = BreakRoom.shuffle(unguessed)[0];
      const cipher = cipherMap[pick];
      // Remove conflicting guesses
      Object.keys(guesses).forEach(k => { if (guesses[k] === pick) delete guesses[k]; });
      guesses[cipher] = pick;
      hints++;
      if (checkSolved()) showWin();
      else render();
    }

    function checkSolved() {
      return uniqueLetters.every(plain => {
        const cipher = cipherMap[plain];
        return guesses[cipher] === plain;
      });
    }

    function showWin() {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const hintPenalty = hints * 10;
      const timePenalty = Math.max(0, elapsed - 30); // no penalty under 30s
      const score = Math.max(0, MAX_POINTS - hintPenalty - timePenalty);

      container.innerHTML = `
        <div class="result-screen">
          <div class="score">${score} / ${MAX_POINTS}</div>
          <div style="margin-bottom:8px; font-size:1.1rem; font-style:italic;">"${phrase.text}"</div>
          <div style="margin-bottom:16px; color:var(--text-dim);">\u2014 ${phrase.author}</div>
          <div style="margin-bottom:24px; color:var(--text-dim); font-size:0.9rem;">
            Solved in ${elapsed}s with ${hints} hint${hints !== 1 ? 's' : ''}
          </div>
          <div class="verdict">${score >= 80 ? "Codebreaker. Bletchley Park wants you." : score >= 50 ? "Decent decrypt. Took some hints but got there." : "The cipher fought back. Try another?"}</div>
          <div style="margin-top:24px;">
            <button class="btn btn-primary" id="res-back">Back to Work</button>
            <button class="btn btn-secondary" id="res-retry">Play Again</button>
          </div>
        </div>
      `;
      document.getElementById('res-back').onclick = BreakRoom.showMenu;
      document.getElementById('res-retry').onclick = () => BreakRoom.launchGame('cipher');
    }

    // Also handle physical keyboard
    function keyHandler(e) {
      if (!activeCipher) return;
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        Object.keys(guesses).forEach(k => { if (guesses[k] === key) delete guesses[k]; });
        guesses[activeCipher] = key;
        const cipherLetters = [...new Set(encrypted.replace(/[^A-Z]/g, '').split(''))];
        const currentIdx = cipherLetters.indexOf(activeCipher);
        const next = cipherLetters.find((c, i) => i > currentIdx && !guesses[c]);
        activeCipher = next || null;
        if (checkSolved()) showWin();
        else render();
      } else if (e.key === 'Backspace') {
        delete guesses[activeCipher];
        render();
      }
    }
    document.addEventListener('keydown', keyHandler);

    render();

    return () => document.removeEventListener('keydown', keyHandler);
  }
});
