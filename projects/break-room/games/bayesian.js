BreakRoom.register({
  id: 'bayesian',
  name: 'Bayesian Bullpen',
  icon: '\u{1F3AF}',
  description: 'How good is your gut? Estimate the real odds from test results.',
  play(container) {

    const SCENARIOS = [
      {
        title: 'The Mammogram',
        story: 'You get a positive mammogram. The test catches 87% of real cancers but falsely flags 9% of healthy women. About 1 in 125 women your age actually have breast cancer.',
        prev: 0.008, sens: 0.87, spec: 0.91,
        source: 'USPSTF 2016 screening guidelines'
      },
      {
        title: 'Airport Security',
        story: 'The airport explosive trace detector flags your laptop bag. The machine catches 95% of actual explosives but gives false alarms on 0.5% of clean bags. About 1 in 1,000,000 passengers actually carries explosives.',
        prev: 0.000001, sens: 0.95, spec: 0.995,
        source: 'TSA operational parameters (approximate)'
      },
      {
        title: 'Factory Floor',
        story: 'An automated inspector flags a batch of widgets as defective. The system catches 98% of real defects but incorrectly rejects 5% of good batches. About 2% of batches coming off the line are actually defective.',
        prev: 0.02, sens: 0.98, spec: 0.95,
        source: 'Industrial quality control benchmarks'
      },
      {
        title: 'COVID Rapid Test',
        story: 'Your rapid antigen test shows a pink line. The test catches 85% of actual infections but gives false positives 0.5% of the time. Community prevalence is currently around 1%.',
        prev: 0.01, sens: 0.85, spec: 0.995,
        source: 'Cochrane systematic review of rapid antigen tests'
      },
      {
        title: 'Doping Control',
        story: 'An Olympic athlete\'s urine sample tests positive for a banned substance. The test catches 99% of actual dopers but falsely flags 5% of clean athletes. Roughly 5% of athletes at this level are actually doping.',
        prev: 0.05, sens: 0.99, spec: 0.95,
        source: 'WADA testing parameters; prevalence estimate contested'
      },
      {
        title: 'Spam Filter',
        story: 'Your email filter flags an incoming message as spam. The filter catches 98% of real spam but accidentally flags 3% of legitimate email. About 45% of all email you receive is actually spam.',
        prev: 0.45, sens: 0.98, spec: 0.97,
        source: 'Industry email filtering benchmarks'
      },
      {
        title: 'Fraud Alert',
        story: 'Your bank\'s fraud detection system flags a transaction on your card. The system catches 95% of actual fraud but flags 1% of legitimate transactions. Only about 0.1% of all transactions are actually fraudulent.',
        prev: 0.001, sens: 0.95, spec: 0.99,
        source: 'Federal Reserve Payments Study, 2022'
      },
      {
        title: 'Checkpoint Breathalyzer',
        story: 'A driver blows positive at a routine sobriety checkpoint. The breathalyzer correctly identifies 97% of drunk drivers but gives false positives on 6% of sober drivers. About 3% of drivers at this hour are actually over the limit.',
        prev: 0.03, sens: 0.97, spec: 0.94,
        source: 'NHTSA checkpoint data'
      },
      {
        title: 'Rare Disease Screening',
        story: 'A newborn screens positive for a rare genetic disorder. The test catches 99% of real cases and has a 0.1% false positive rate. The disorder affects about 1 in 10,000 newborns.',
        prev: 0.0001, sens: 0.99, spec: 0.999,
        source: 'Newborn screening program parameters'
      },
      {
        title: 'Supplier Audit',
        story: 'An automated audit flags a supplier\'s shipment as containing counterfeit parts. The system catches 80% of actual counterfeits but falsely flags 5% of legitimate shipments. About 0.2% of shipments in this supply chain actually contain counterfeits.',
        prev: 0.002, sens: 0.80, spec: 0.95,
        source: 'ERAI counterfeit parts database estimates'
      },
      {
        title: 'The Polygraph',
        story: 'A job applicant fails a pre-employment polygraph. The machine correctly detects 88% of liars but incorrectly flags 44% of truthful people. Assume a coin-flip: about 50% of applicants are actually being deceptive.',
        prev: 0.50, sens: 0.88, spec: 0.56,
        source: 'National Academy of Sciences (2003), The Polygraph and Lie Detection'
      },
      {
        title: 'Credit Card Alert',
        story: 'Your credit card company texts you about a suspicious charge. Their system catches 99.5% of fraudulent transactions and has a 0.1% false alarm rate on legit ones. Only 0.05% of transactions are actually fraudulent.',
        prev: 0.0005, sens: 0.995, spec: 0.999,
        source: 'Card network fraud detection benchmarks'
      },
      {
        title: 'Warehouse Inspection',
        story: 'A quality inspector at a warehouse flags a pallet as defective. The inspector catches 90% of genuinely defective pallets but incorrectly flags 15% of good ones. About 8% of pallets arriving at this warehouse are actually defective.',
        prev: 0.08, sens: 0.90, spec: 0.85,
        source: 'Supply chain quality audit benchmarks'
      }
    ];

    const GRID_N = 1000;
    let round = 0;
    let score = 0;
    let scenarios = [];
    let wager = 1;
    let guess = 50;
    let phase = 'guess';

    function calcPPV(prev, sens, spec) {
      return (prev * sens) / (prev * sens + (1 - prev) * (1 - spec));
    }

    function getFreqs(prev, sens, spec) {
      const diseased = Math.round(prev * GRID_N);
      const healthy = GRID_N - diseased;
      const tp = Math.round(diseased * sens);
      const fn = diseased - tp;
      const fp = Math.round(healthy * (1 - spec));
      const tn = healthy - fp;
      return { tp, fn, fp, tn, diseased, healthy };
    }

    function basePoints(dist) {
      if (dist <= 5) return 10;
      if (dist <= 15) return 7;
      if (dist <= 30) return 4;
      if (dist <= 50) return 2;
      return 0;
    }

    function start() {
      scenarios = BreakRoom.shuffle([...SCENARIOS]).slice(0, 5);
      round = 0;
      score = 0;
      wager = 1;
      guess = 50;
      phase = 'guess';
      renderRound();
    }

    function renderRound() {
      const s = scenarios[round];
      const ppv = calcPPV(s.prev, s.sens, s.spec) * 100;

      if (phase === 'guess') {
        container.innerHTML = `
          <div class="by-game">
            <div class="by-header">
              <span>Round ${round + 1} of 5</span>
              <span>Score: <strong>${score}</strong></span>
            </div>
            <div class="progress-bar"><div class="fill" style="width:${(round / 5) * 100}%"></div></div>

            <div class="by-scenario">
              <div class="by-title">${s.title}</div>
              <div class="by-story">${s.story}</div>
              <div class="by-question">What's the probability the result is a <strong>true positive</strong>?</div>
            </div>

            <div class="by-wager">
              <div class="by-wager-label">Confidence Wager</div>
              <div class="by-wager-opts">
                <button class="by-wager-btn${wager === 1 ? ' active' : ''}" data-w="1">1×<span>Safe</span></button>
                <button class="by-wager-btn${wager === 2 ? ' active' : ''}" data-w="2">2×<span>Bold</span></button>
                <button class="by-wager-btn${wager === 3 ? ' active' : ''}" data-w="3">3×<span>All in</span></button>
              </div>
            </div>

            <div class="by-slider-wrap">
              <input type="range" min="0" max="100" value="${guess}" class="by-slider" id="by-slider">
              <div class="by-slider-val" id="by-slider-val">${guess}%</div>
            </div>

            <div class="by-actions">
              <button class="btn btn-primary" id="by-submit">Lock It In</button>
            </div>
          </div>
        `;

        container.querySelectorAll('.by-wager-btn').forEach(btn => {
          btn.onclick = () => {
            wager = parseInt(btn.dataset.w);
            container.querySelectorAll('.by-wager-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
          };
        });

        const slider = container.querySelector('#by-slider');
        const valEl = container.querySelector('#by-slider-val');
        slider.oninput = () => {
          guess = parseInt(slider.value);
          valEl.textContent = guess + '%';
        };

        container.querySelector('#by-submit').onclick = submitGuess;

      } else {
        renderReveal(s, ppv);
      }
    }

    function submitGuess() {
      const s = scenarios[round];
      const ppv = calcPPV(s.prev, s.sens, s.spec) * 100;
      const dist = Math.abs(guess - ppv);
      const base = basePoints(dist);
      const pts = base * wager;
      score += pts;
      phase = 'reveal';
      renderReveal(s, ppv, dist, base, pts);
    }

    function renderReveal(s, ppv, dist, base, pts) {
      const f = getFreqs(s.prev, s.sens, s.spec);
      const totalPositive = f.tp + f.fp;
      const ppvRounded = ppv < 1 ? (Math.round(ppv * 100) / 100) : (Math.round(ppv * 10) / 10);

      dist = dist !== undefined ? dist : Math.abs(guess - ppv);
      base = base !== undefined ? base : basePoints(dist);
      pts = pts !== undefined ? pts : base * wager;

      let accuracy;
      if (dist <= 5) accuracy = 'Excellent';
      else if (dist <= 15) accuracy = 'Close';
      else if (dist <= 30) accuracy = 'In the ballpark';
      else if (dist <= 50) accuracy = 'Way off';
      else accuracy = 'Not even close';

      const accClass = dist <= 5 ? 'excellent' : dist <= 15 ? 'close' : dist <= 30 ? 'ok' : 'miss';

      const grid = buildGrid(f);

      container.innerHTML = `
        <div class="by-game">
          <div class="by-header">
            <span>Round ${round + 1} of 5</span>
            <span>Score: <strong>${score}</strong></span>
          </div>

          <div class="by-reveal-compare">
            <div class="by-reveal-guess">
              <div class="by-reveal-label">Your guess</div>
              <div class="by-reveal-num">${guess}%</div>
            </div>
            <div class="by-reveal-arrow">→</div>
            <div class="by-reveal-actual">
              <div class="by-reveal-label">Actual PPV</div>
              <div class="by-reveal-num">${ppvRounded}%</div>
            </div>
          </div>

          <div class="by-reveal-score ${accClass}">
            ${accuracy} — ${base} base × ${wager} wager = <strong>+${pts}</strong>
          </div>

          ${f.diseased > 0 ? `<div class="by-grid-section">
            <div class="by-grid-title">1,000 people tested</div>
            <div class="by-grid" id="by-grid">${grid}</div>
            <div class="by-grid-legend">
              <span class="by-leg-tp">■ True Positive (${f.tp})</span>
              <span class="by-leg-fp">■ False Positive (${f.fp})</span>
              <span class="by-leg-fn">■ Missed (${f.fn})</span>
              <span class="by-leg-tn">■ Negative (${f.tn})</span>
            </div>
          </div>

          <div class="by-math">
            <div class="by-math-title">Bayes' Theorem Step-by-Step</div>
            <div class="by-math-step">Out of <strong>1,000</strong> people:</div>
            <div class="by-math-step">• <strong>${f.diseased}</strong> actually have the condition</div>
            <div class="by-math-step">• Of those, <strong>${f.tp}</strong> test positive (true positives)</div>
            <div class="by-math-step">• Of the <strong>${f.healthy}</strong> without it, <strong>${f.fp}</strong> test positive (false positives)</div>
            <div class="by-math-step">• Total positive results: <strong>${f.tp} + ${f.fp} = ${totalPositive}</strong></div>
            <div class="by-math-step by-math-result">PPV = ${f.tp} / ${totalPositive} = <strong>${ppvRounded}%</strong></div>
            <div class="by-math-source">[${s.source}]</div>
          </div>` : `<div class="by-math">
            <div class="by-math-title">Bayes' Theorem</div>
            <div class="by-math-step">The base rate is so low (${(s.prev * 100).toFixed(4)}%) that in 1,000 people, fewer than one would have the condition — the icon grid can't represent this.</div>
            <div class="by-math-step">Using the formula directly:</div>
            <div class="by-math-step">PPV = (prev × sens) ÷ (prev × sens + (1−prev) × (1−spec))</div>
            <div class="by-math-step by-math-result">PPV = <strong>${ppvRounded}%</strong></div>
            <div class="by-math-source">[${s.source}]</div>
          </div>`}

          <div class="by-actions">
            <button class="btn btn-primary" id="by-next">${round < 4 ? 'Next Round →' : 'See Results'}</button>
          </div>
        </div>
      `;

      container.querySelector('#by-next').onclick = () => {
        round++;
        if (round >= 5) {
          showResults();
        } else {
          phase = 'guess';
          wager = 1;
          guess = 50;
          renderRound();
        }
      };
    }

    function buildGrid(f) {
      const cells = [];
      let idx = 0;
      for (let i = 0; i < f.tp && idx < GRID_N; i++, idx++) cells.push('tp');
      for (let i = 0; i < f.fn && idx < GRID_N; i++, idx++) cells.push('fn');
      for (let i = 0; i < f.fp && idx < GRID_N; i++, idx++) cells.push('fp');
      while (idx < GRID_N) { cells.push('tn'); idx++; }
      return cells.map(c => `<span class="by-dot ${c}"></span>`).join('');
    }

    function showResults() {
      BreakRoom.showResult(container, {
        score, max: 100, game: 'bayesian',
        verdicts: [
          'Bayesian brain. You see through the base rate fallacy.',
          'Strong intuition. Most people do much worse.',
          'Base rates tripped you up. You\'re not alone — most doctors get these wrong too.',
          'Your priors need updating. Read Gigerenzer.'
        ]
      });
    }

    start();
  }
});
