BreakRoom.register({
  id: 'connections',
  name: 'Connection Wall',
  icon: '\u{1F9E9}',
  description: '16 words, 4 hidden groups. Find the connections.',
  play(container) {
    const puzzles = [
      {
        groups: [
          { name: "Statistical Tests", words: ["ANOVA", "CHI-SQUARE", "WILCOXON", "KRUSKAL"], color: 0 },
          { name: "Greek Letters in Math", words: ["SIGMA", "DELTA", "LAMBDA", "OMEGA"], color: 1 },
          { name: "Types of Bias", words: ["SELECTION", "CONFIRMATION", "SURVIVORSHIP", "ANCHORING"], color: 2 },
          { name: "___ Effect", words: ["HALO", "PLACEBO", "BUTTERFLY", "DUNNING-KRUGER"], color: 3 }
        ]
      },
      {
        groups: [
          { name: "Supply Chain Risks", words: ["BULLWHIP", "STOCKOUT", "BOTTLENECK", "DISRUPTION"], color: 0 },
          { name: "Research Methods", words: ["SURVEY", "EXPERIMENT", "CASE STUDY", "ETHNOGRAPHY"], color: 1 },
          { name: "Logical Fallacies", words: ["STRAWMAN", "SLIPPERY SLOPE", "RED HERRING", "AD HOMINEM"], color: 2 },
          { name: "Famous Experiments", words: ["MILGRAM", "STANFORD", "HAWTHORNE", "MARSHMALLOW"], color: 3 }
        ]
      },
      {
        groups: [
          { name: "Measures of Center", words: ["MEAN", "MEDIAN", "MODE", "MIDRANGE"], color: 0 },
          { name: "___ Theory", words: ["GAME", "CHAOS", "STRING", "GRAPH"], color: 1 },
          { name: "Nobel Prize Fields", words: ["PHYSICS", "CHEMISTRY", "PEACE", "LITERATURE"], color: 2 },
          { name: "Data Structures", words: ["STACK", "QUEUE", "TREE", "HEAP"], color: 3 }
        ]
      },
      {
        groups: [
          { name: "Epidemiology Terms", words: ["PREVALENCE", "INCIDENCE", "MORBIDITY", "VECTOR"], color: 0 },
          { name: "Types of Variables", words: ["DEPENDENT", "INDEPENDENT", "CONFOUNDING", "MODERATING"], color: 1 },
          { name: "Famous Paradoxes", words: ["SIMPSON", "FERMI", "BIRTHDAY", "MONTY HALL"], color: 2 },
          { name: "Research Journal Parts", words: ["ABSTRACT", "METHODS", "RESULTS", "DISCUSSION"], color: 3 }
        ]
      },
      {
        groups: [
          { name: "Sampling Methods", words: ["SNOWBALL", "STRATIFIED", "CLUSTER", "CONVENIENCE"], color: 0 },
          { name: "Economic Indicators", words: ["GDP", "CPI", "UNEMPLOYMENT", "INFLATION"], color: 1 },
          { name: "Chart Types", words: ["SCATTER", "HISTOGRAM", "BOXPLOT", "HEATMAP"], color: 2 },
          { name: "Machine Learning Models", words: ["RANDOM FOREST", "NEURAL NET", "SVM", "NAIVE BAYES"], color: 3 }
        ]
      },
      {
        groups: [
          { name: "Port Types (Shipping)", words: ["CONTAINER", "BULK", "TANKER", "ROLL-ON"], color: 0 },
          { name: "Quality Management", words: ["SIX SIGMA", "KAIZEN", "LEAN", "TQM"], color: 1 },
          { name: "Cognitive Biases", words: ["FRAMING", "SUNK COST", "BANDWAGON", "HINDSIGHT"], color: 2 },
          { name: "P-value Thresholds", words: ["0.05", "0.01", "0.001", "0.10"], color: 3 }
        ]
      },
      {
        groups: [
          { name: "Parts of a Regression", words: ["INTERCEPT", "SLOPE", "RESIDUAL", "COEFFICIENT"], color: 0 },
          { name: "Inventory Systems", words: ["FIFO", "LIFO", "JIT", "EOQ"], color: 1 },
          { name: "Psychology Schools", words: ["BEHAVIORIST", "COGNITIVE", "HUMANIST", "PSYCHOANALYTIC"], color: 2 },
          { name: "Ancient Libraries", words: ["ALEXANDRIA", "PERGAMUM", "NALANDA", "TIMBUKTU"], color: 3 }
        ]
      },
      {
        groups: [
          { name: "Risk Assessment", words: ["LIKELIHOOD", "IMPACT", "EXPOSURE", "MITIGATION"], color: 0 },
          { name: "Network Metrics", words: ["CENTRALITY", "DENSITY", "CLUSTERING", "DIAMETER"], color: 1 },
          { name: "Philosophy of Science", words: ["FALSIFIABLE", "PARADIGM", "REPLICABLE", "EMPIRICAL"], color: 2 },
          { name: "Thinkers Named after Food", words: ["BACON", "BERRY", "RICE", "LAMB"], color: 3 }
        ]
      },
      {
        groups: [
          { name: "Fraud Types", words: ["PONZI", "PHISHING", "COUNTERFEIT", "EMBEZZLEMENT"], color: 0 },
          { name: "Reliability Measures", words: ["CRONBACH", "TEST-RETEST", "INTER-RATER", "SPLIT-HALF"], color: 1 },
          { name: "Distribution Shapes", words: ["NORMAL", "SKEWED", "BIMODAL", "UNIFORM"], color: 2 },
          { name: "Latin Research Terms", words: ["ET AL", "IBID", "STET", "SIC"], color: 3 }
        ]
      },
      {
        groups: [
          { name: "Contract Types", words: ["FIXED-PRICE", "COST-PLUS", "TIME-MATERIAL", "INCENTIVE"], color: 0 },
          { name: "Effect Sizes", words: ["COHENS D", "HEDGES G", "ETA SQUARED", "ODDS RATIO"], color: 1 },
          { name: "Thinking Systems (Kahneman)", words: ["FAST", "SLOW", "AUTOMATIC", "DELIBERATE"], color: 2 },
          { name: "Things with Tails", words: ["DISTRIBUTION", "COMET", "PEACOCK", "REGRESSION"], color: 3 }
        ]
      },
      {
        groups: [
          { name: "Blockchain Terms", words: ["LEDGER", "HASH", "CONSENSUS", "TOKEN"], color: 0 },
          { name: "Study Designs", words: ["CROSS-SECTIONAL", "LONGITUDINAL", "COHORT", "RCT"], color: 1 },
          { name: "Ancient Philosophers", words: ["ARISTOTLE", "PLATO", "EPICURUS", "ZENO"], color: 2 },
          { name: "___ Chain", words: ["SUPPLY", "MARKOV", "FOOD", "VALUE"], color: 3 }
        ]
      },
      {
        groups: [
          { name: "Validity Types", words: ["CONSTRUCT", "INTERNAL", "EXTERNAL", "FACE"], color: 0 },
          { name: "Operations Metrics", words: ["THROUGHPUT", "CYCLE TIME", "UTILIZATION", "YIELD"], color: 1 },
          { name: "Game Theory Concepts", words: ["NASH", "PRISONERS", "ZERO-SUM", "DOMINANT"], color: 2 },
          { name: "Famous Datasets", words: ["IRIS", "TITANIC", "MNIST", "BOSTON"], color: 3 }
        ]
      }
    ];

    const puzzle = BreakRoom.shuffle(puzzles)[0];
    const allWords = BreakRoom.shuffle(puzzle.groups.flatMap(g => g.words.map(w => ({ word: w, group: g }))));

    let selected = [];
    let solved = [];
    let mistakes = 0;
    const MAX_MISTAKES = 4;
    let remaining = [...allWords];

    function render() {
      container.innerHTML = '';

      // Show solved groups
      solved.forEach(g => {
        const div = document.createElement('div');
        div.className = `conn-solved-group group-${g.color}`;
        div.innerHTML = `
          <div class="group-name">${g.name}</div>
          <div class="group-words">${g.words.join(' \u2022 ')}</div>
        `;
        container.appendChild(div);
      });

      // Board
      if (remaining.length > 0) {
        const board = document.createElement('div');
        board.className = 'conn-board';
        remaining.forEach((item, idx) => {
          const tile = document.createElement('div');
          tile.className = 'conn-tile' + (selected.includes(idx) ? ' selected' : '');
          tile.textContent = item.word;
          tile.onclick = () => toggleTile(idx);
          board.appendChild(tile);
        });
        container.appendChild(board);

        // Mistakes
        const mistakeDiv = document.createElement('div');
        mistakeDiv.className = 'conn-mistakes';
        mistakeDiv.innerHTML = 'Mistakes remaining: ' +
          Array.from({length: MAX_MISTAKES}, (_, i) =>
            `<span class="conn-dot${i < mistakes ? ' used' : ''}"></span>`
          ).join('');
        container.appendChild(mistakeDiv);

        // Actions
        const actions = document.createElement('div');
        actions.className = 'conn-actions';
        actions.innerHTML = `
          <button class="btn btn-secondary btn-small" id="conn-deselect">Deselect All</button>
          <button class="btn btn-secondary btn-small" id="conn-shuffle">Shuffle</button>
          <button class="btn btn-primary btn-small" id="conn-submit" ${selected.length !== 4 ? 'disabled' : ''}>Submit</button>
        `;
        container.appendChild(actions);

        document.getElementById('conn-deselect').onclick = () => { selected = []; render(); };
        document.getElementById('conn-shuffle').onclick = () => {
          remaining = BreakRoom.shuffle(remaining);
          selected = [];
          render();
        };
        document.getElementById('conn-submit').onclick = submitGuess;
      }
    }

    function toggleTile(idx) {
      const i = selected.indexOf(idx);
      if (i >= 0) selected.splice(i, 1);
      else if (selected.length < 4) selected.push(idx);
      render();
    }

    function submitGuess() {
      if (selected.length !== 4) return;
      const selectedItems = selected.map(i => remaining[i]);
      const group = selectedItems[0].group;
      const allSameGroup = selectedItems.every(item => item.group === group);

      if (allSameGroup) {
        solved.push(group);
        remaining = remaining.filter((_, i) => !selected.includes(i));
        selected = [];
        if (solved.length === 4) {
          render();
          setTimeout(showFinalResult, 600);
        } else {
          render();
        }
      } else {
        // Check for "one away"
        const groupCounts = {};
        selectedItems.forEach(item => {
          const gn = item.group.name;
          groupCounts[gn] = (groupCounts[gn] || 0) + 1;
        });
        const maxInGroup = Math.max(...Object.values(groupCounts));

        mistakes++;
        // Flash wrong
        const tiles = container.querySelectorAll('.conn-tile');
        selected.forEach(i => { if (tiles[i]) tiles[i].style.background = 'rgba(231,76,60,0.3)'; });

        setTimeout(() => {
          selected = [];
          if (mistakes >= MAX_MISTAKES) {
            // Reveal all
            puzzle.groups.forEach(g => { if (!solved.includes(g)) solved.push(g); });
            remaining = [];
            render();
            setTimeout(showFinalResult, 600);
          } else {
            render();
            if (maxInGroup === 3) {
              const note = document.createElement('div');
              note.style.cssText = 'text-align:center; color:var(--warning); margin-top:8px; font-weight:600;';
              note.textContent = 'So close! One away...';
              container.appendChild(note);
            }
          }
        }, 600);
      }
    }

    function showFinalResult() {
      const score = Math.max(0, 4 - mistakes);
      BreakRoom.showResult(container, {
        score, max: 4, game: 'connections',
        verdicts: [
          "Perfect wall. You see patterns others miss.",
          "Strong connections. One stumble, no big deal.",
          "Got there eventually. The tricky groups got you.",
          "The wall won this round. Try another puzzle."
        ]
      });
    }

    render();
  }
});
