BreakRoom.register({
  id: 'p-hacker',
  name: 'P-Hacker',
  icon: '\u{1F52C}',
  description: 'Manufacture a significant result. For science.',
  play(container) {

    const DVS = ['Satisfaction', 'Performance', 'Intent to Purchase', 'Loyalty'];
    const SUBS = ['All Participants', 'Male Only', 'Female Only', 'Age < 30', 'Age ≥ 30'];
    const OUTS = ['None', 'Remove Top/Bottom 5%', 'Remove > 2 SD'];
    const COVS = ['None', 'Control for Income', 'Control for Education'];

    const JOURNALS = [
      'Journal of Motivated Findings',
      'International Review of Confirmatory Results',
      'Annals of Flexible Analysis'
    ];

    /* ── Statistical primitives ── */

    function randn() {
      let u, v, s;
      do {
        u = Math.random() * 2 - 1;
        v = Math.random() * 2 - 1;
        s = u * u + v * v;
      } while (s >= 1 || s === 0);
      return u * Math.sqrt(-2 * Math.log(s) / s);
    }

    function lnGamma(z) {
      const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
        771.32342877765313, -176.61502916214059, 12.507343278686905,
        -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
      if (z < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * z)) - lnGamma(1 - z);
      z -= 1;
      let a = c[0];
      const t = z + 7.5;
      for (let i = 1; i <= 8; i++) a += c[i] / (z + i);
      return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(a);
    }

    function betaCF(x, a, b) {
      const qab = a + b, qap = a + 1, qam = a - 1;
      let c = 1, d = 1 - qab * x / qap;
      if (Math.abs(d) < 1e-30) d = 1e-30;
      d = 1 / d;
      let h = d;
      for (let m = 1; m <= 200; m++) {
        const m2 = 2 * m;
        let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
        d = 1 + aa * d; if (Math.abs(d) < 1e-30) d = 1e-30;
        c = 1 + aa / c; if (Math.abs(c) < 1e-30) c = 1e-30;
        d = 1 / d; h *= d * c;
        aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
        d = 1 + aa * d; if (Math.abs(d) < 1e-30) d = 1e-30;
        c = 1 + aa / c; if (Math.abs(c) < 1e-30) c = 1e-30;
        d = 1 / d;
        const del = d * c;
        h *= del;
        if (Math.abs(del - 1) < 1e-14) break;
      }
      return h;
    }

    function betaInc(x, a, b) {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      const bt = Math.exp(a * Math.log(x) + b * Math.log(1 - x)
        - lnGamma(a) - lnGamma(b) + lnGamma(a + b));
      if (x < (a + 1) / (a + b + 2)) return bt * betaCF(x, a, b) / a;
      return 1 - bt * betaCF(1 - x, b, a) / b;
    }

    function pFromT(t, df) {
      if (df <= 0 || !isFinite(t)) return 1;
      const x = df / (df + t * t);
      const p = betaInc(x, df / 2, 0.5);
      return isFinite(p) ? p : 1;
    }

    function welchT(a, b) {
      const nA = a.length, nB = b.length;
      if (nA < 2 || nB < 2) return null;
      const mA = a.reduce((s, v) => s + v, 0) / nA;
      const mB = b.reduce((s, v) => s + v, 0) / nB;
      const vA = a.reduce((s, v) => s + (v - mA) ** 2, 0) / (nA - 1);
      const vB = b.reduce((s, v) => s + (v - mB) ** 2, 0) / (nB - 1);
      const seA = vA / nA, seB = vB / nB;
      const se = Math.sqrt(seA + seB);
      if (se === 0) return { p: 1, d: 0, n: nA + nB };
      const t = (mA - mB) / se;
      const df = (seA + seB) ** 2 / (seA ** 2 / (nA - 1) + seB ** 2 / (nB - 1));
      const p = pFromT(t, df);
      const sp = Math.sqrt(((nA - 1) * vA + (nB - 1) * vB) / (nA + nB - 2));
      const d = sp > 0 ? (mA - mB) / sp : 0;
      return { p, d, n: nA + nB };
    }

    /* ── Data generation (no true treatment effect) ── */

    function generateData() {
      const rows = [];
      for (let i = 0; i < 200; i++) {
        const group = i < 100 ? 0 : 1;
        const gender = Math.random() < 0.5 ? 0 : 1;
        const age = Math.max(22, Math.min(65, Math.round(40 + randn() * 10)));
        const incRaw = (age - 22) / 43 + randn() * 0.3;
        const income = incRaw < 0.33 ? 0 : incRaw < 0.67 ? 1 : 2;
        const eduRaw = Math.random() + income * 0.15;
        const education = eduRaw < 0.4 ? 0 : eduRaw < 0.75 ? 1 : 2;
        rows.push({
          group, gender, age, income, education,
          scores: [
            50 + (age - 40) * 0.15 + gender * 2 + randn() * 10,
            50 + education * 3 + randn() * 10,
            50 + income * 2.5 + randn() * 10,
            50 + (age - 40) * 0.15 + income * 2 + randn() * 10
          ]
        });
      }
      return rows;
    }

    /* ── Run one analysis (filter → outliers → covariate adjustment → t-test) ── */

    function analyze(allData, dvIdx, subIdx, outIdx, covIdx) {
      let rows = allData;
      if (subIdx === 1) rows = rows.filter(r => r.gender === 0);
      else if (subIdx === 2) rows = rows.filter(r => r.gender === 1);
      else if (subIdx === 3) rows = rows.filter(r => r.age < 30);
      else if (subIdx === 4) rows = rows.filter(r => r.age >= 30);

      let items = rows.map(r => ({
        group: r.group, score: r.scores[dvIdx],
        income: r.income, education: r.education
      }));

      if (outIdx === 1 && items.length > 4) {
        const sorted = items.map(x => x.score).sort((a, b) => a - b);
        const lo = sorted[Math.floor(sorted.length * 0.05)];
        const hi = sorted[Math.ceil(sorted.length * 0.95) - 1];
        items = items.filter(x => x.score >= lo && x.score <= hi);
      } else if (outIdx === 2 && items.length > 4) {
        const mean = items.reduce((s, x) => s + x.score, 0) / items.length;
        const sd = Math.sqrt(items.reduce((s, x) => s + (x.score - mean) ** 2, 0) / (items.length - 1));
        if (sd > 0) items = items.filter(x => Math.abs(x.score - mean) <= 2 * sd);
      }

      let scores = items.map(x => x.score);
      if (covIdx > 0 && items.length > 2) {
        const cv = items.map(x => covIdx === 1 ? x.income : x.education);
        const n = scores.length;
        const mx = cv.reduce((s, v) => s + v, 0) / n;
        const my = scores.reduce((s, v) => s + v, 0) / n;
        let sxx = 0, sxy = 0;
        for (let i = 0; i < n; i++) {
          sxx += (cv[i] - mx) ** 2;
          sxy += (cv[i] - mx) * (scores[i] - my);
        }
        if (sxx > 0) {
          const b = sxy / sxx;
          scores = scores.map((y, i) => y - b * (cv[i] - mx));
        }
      }

      const ga = [], gb = [];
      for (let i = 0; i < items.length; i++) {
        (items[i].group === 0 ? ga : gb).push(scores[i]);
      }
      const result = welchT(ga, gb);
      if (!result) return { p: 1, d: 0, n: items.length };
      return result;
    }

    function countSig(allData) {
      let c = 0;
      for (let d = 0; d < 4; d++)
        for (let s = 0; s < 5; s++)
          for (let o = 0; o < 3; o++)
            for (let v = 0; v < 3; v++)
              if (analyze(allData, d, s, o, v).p < 0.05) c++;
      return c;
    }

    /* ── Game helpers ── */

    function genTitle(dvIdx, subIdx) {
      const names = ['Employee Satisfaction', 'Work Performance', 'Purchase Intent', 'Brand Loyalty'];
      const suffix = ['', ' Among Male Employees', ' Among Female Employees', ' in Younger Workers', ' in Senior Employees'];
      return `Workplace Wellness Programs and ${names[dvIdx]}${suffix[subIdx]}: A Controlled Study`;
    }

    function getQRPs(pub) {
      const qrps = [];
      const triedDVs = new Set();
      tried.forEach(key => triedDVs.add(key.split('-')[0]));
      if (triedDVs.size > 1) qrps.push('Outcome switching — you tested multiple dependent variables');
      if (pub.sub !== 0) qrps.push('Subgroup fishing — you analyzed a specific subgroup instead of the full sample');
      if (pub.out !== 0) qrps.push('Flexible outlier exclusion — you removed data points to change the result');
      if (pub.cov !== 0) qrps.push('Selective covariate inclusion — you added controls to shift the p-value');
      return qrps;
    }

    function repProb(p) {
      if (p < 0.01) return 25;
      if (p < 0.02) return 18;
      if (p < 0.03) return 14;
      if (p < 0.04) return 11;
      return 8;
    }

    function fmtP(p) {
      return p < 0.001 ? '< .001' : p.toFixed(3);
    }

    function getDisplayData(allData, dvIdx, subIdx, outIdx, covIdx) {
      let rows = allData;
      if (subIdx === 1) rows = rows.filter(r => r.gender === 0);
      else if (subIdx === 2) rows = rows.filter(r => r.gender === 1);
      else if (subIdx === 3) rows = rows.filter(r => r.age < 30);
      else if (subIdx === 4) rows = rows.filter(r => r.age >= 30);

      let items = rows.map(r => ({
        group: r.group, score: r.scores[dvIdx],
        gender: r.gender, age: r.age
      }));

      let removedCount = 0;
      if (outIdx === 1 && items.length > 4) {
        const before = items.length;
        const sorted = items.map(x => x.score).sort((a, b) => a - b);
        const lo = sorted[Math.floor(sorted.length * 0.05)];
        const hi = sorted[Math.ceil(sorted.length * 0.95) - 1];
        items = items.filter(x => x.score >= lo && x.score <= hi);
        removedCount = before - items.length;
      } else if (outIdx === 2 && items.length > 4) {
        const before = items.length;
        const mean = items.reduce((s, x) => s + x.score, 0) / items.length;
        const sd = Math.sqrt(items.reduce((s, x) => s + (x.score - mean) ** 2, 0) / (items.length - 1));
        if (sd > 0) items = items.filter(x => Math.abs(x.score - mean) <= 2 * sd);
        removedCount = before - items.length;
      }

      const ctrl = items.filter(x => x.group === 0);
      const treat = items.filter(x => x.group === 1);
      const mean = arr => arr.reduce((s, x) => s + x.score, 0) / arr.length;
      const sd = (arr, m) => Math.sqrt(arr.reduce((s, x) => s + (x.score - m) ** 2, 0) / (arr.length - 1));
      const mC = mean(ctrl), mT = mean(treat);

      return {
        items, removedCount,
        ctrl: { n: ctrl.length, mean: mC, sd: sd(ctrl, mC) },
        treat: { n: treat.length, mean: mT, sd: sd(treat, mT) },
        covLabel: covIdx === 1 ? 'Income' : covIdx === 2 ? 'Education' : null
      };
    }

    function buildDataPanel() {
      const dd = getDisplayData(data, dv, sub, out, cov);
      const diff = dd.treat.mean - dd.ctrl.mean;
      const notes = [];
      if (dd.removedCount > 0) notes.push(`${dd.removedCount} outliers removed`);
      if (dd.covLabel) notes.push(`p-value adjusted for ${dd.covLabel}`);

      return `
        <div class="ph-data-panel">
          <table class="ph-data-summary">
            <tr><th>Group</th><th>N</th><th>Mean</th><th>SD</th></tr>
            <tr><td>Control</td><td>${dd.ctrl.n}</td><td>${dd.ctrl.mean.toFixed(1)}</td><td>${dd.ctrl.sd.toFixed(1)}</td></tr>
            <tr><td>Treatment</td><td>${dd.treat.n}</td><td>${dd.treat.mean.toFixed(1)}</td><td>${dd.treat.sd.toFixed(1)}</td></tr>
          </table>
          <div class="ph-data-diff">
            Difference: ${diff >= 0 ? '+' : ''}${diff.toFixed(2)}${notes.length ? ' | ' + notes.join(' | ') : ''}
          </div>
          <div class="ph-data-table-wrap">
            <table class="ph-data-table">
              <tr><th>#</th><th>Group</th><th>${DVS[dv]}</th></tr>
              ${dd.items.map((item, i) =>
                `<tr><td>${i + 1}</td><td>${item.group === 0 ? 'Ctrl' : 'Treat'}</td><td>${item.score.toFixed(1)}</td></tr>`
              ).join('')}
            </table>
          </div>
        </div>`;
    }

    /* ── Game state ── */

    let data = [], totalSig = 0;
    let dv = 0, sub = 0, out = 0, cov = 0;
    let publications = [];
    let tried = new Set();
    let showData = false;
    const burnStart = Date.now();

    function makeSelect(id, options, selected) {
      return options.map((opt, i) =>
        `<option value="${i}"${i === selected ? ' selected' : ''}>${opt}</option>`
      ).join('');
    }

    function render() {
      tried.add(`${dv}-${sub}-${out}-${cov}`);
      const result = analyze(data, dv, sub, out, cov);
      const n = result.n;
      const isSig = result.p < 0.05;
      const pubCount = publications.length;

      const pubDots = Array.from({length: 3}, (_, i) =>
        `<span class="ph-pub-dot${i < pubCount ? ' filled' : ''}">${i < pubCount ? '\u{1F4C4}' : '○'}</span>`
      ).join('');

      const elapsed = (Date.now() - burnStart) / 1000;

      container.innerHTML = `
        <div class="ph-game">
          <div class="ph-context">
            <div class="ph-context-label">THE STUDY</div>
            BrightPath Corp ran a randomized trial of their new wellness app.
            200 employees used the app or a dummy app for 8 weeks.
            The CEO wants "significant results" for the board meeting.
            <strong>You have the data. Find the effect.</strong>
          </div>

          <div class="ph-dashboard">
            <div class="ph-scroll"><div class="ph-scroll-body" style="animation-delay: -${elapsed}s"></div></div>
            <div class="ph-controls">
              <div class="ph-control">
                <label>Outcome Measure</label>
                <select id="ph-dv">${makeSelect('ph-dv', DVS, dv)}</select>
              </div>
              <div class="ph-control">
                <label>Sample</label>
                <select id="ph-sub">${makeSelect('ph-sub', SUBS, sub)}</select>
              </div>
              <div class="ph-control">
                <label>Outlier Handling</label>
                <select id="ph-out">${makeSelect('ph-out', OUTS, out)}</select>
              </div>
              <div class="ph-control">
                <label>Covariates</label>
                <select id="ph-cov">${makeSelect('ph-cov', COVS, cov)}</select>
              </div>
            </div>

            <div class="ph-results">
              <div class="ph-pvalue${isSig ? ' sig' : ''}">
                <div class="ph-pvalue-label">p-value</div>
                <div class="ph-pvalue-num">${fmtP(result.p)}</div>
              </div>
              <div class="ph-stats">
                <span>d = ${result.d.toFixed(2)}</span>
                <span>N = ${n}</span>
              </div>
              <div class="ph-status${isSig ? ' sig' : ''}">
                ${isSig ? '✨ SIGNIFICANT! ✨' : 'Not significant'}
              </div>
            </div>
          </div>

          <div class="ph-data-toggle">
            <button class="ph-data-btn" id="ph-toggle-data">
              ${showData ? 'Hide data ▲' : 'Show me the data ▼'}
            </button>
          </div>

          ${showData ? buildDataPanel() : ''}

          <div class="ph-footer">
            <div>Analyses tried: <strong>${tried.size}</strong></div>
            <div class="ph-tenure-bar">
              <span>Publications: </span>${pubDots}
              ${pubCount >= 3 ? ' <strong>\u{1F393} TENURE!</strong>' : ''}
            </div>
          </div>

          <div class="ph-actions">
            <button class="btn btn-primary${isSig ? '' : ' ph-disabled'}" id="ph-publish"${isSig ? '' : ' disabled'}>
              \u{1F4C4} Publish This Result
            </button>
            <button class="btn btn-secondary" id="ph-quit">
              ${pubCount > 0 ? "See What You've Done" : 'I Refuse to P-Hack'}
            </button>
          </div>
        </div>
      `;

      container.querySelector('#ph-dv').onchange = (e) => { dv = +e.target.value; render(); };
      container.querySelector('#ph-sub').onchange = (e) => { sub = +e.target.value; render(); };
      container.querySelector('#ph-out').onchange = (e) => { out = +e.target.value; render(); };
      container.querySelector('#ph-cov').onchange = (e) => { cov = +e.target.value; render(); };
      container.querySelector('#ph-toggle-data').onclick = () => { showData = !showData; render(); };
      if (isSig) container.querySelector('#ph-publish').onclick = publish;
      container.querySelector('#ph-quit').onclick = showEndgame;
    }

    function publish() {
      showData = false;
      const result = analyze(data, dv, sub, out, cov);
      publications.push({
        dv, sub, out, cov,
        p: result.p,
        d: result.d,
        title: genTitle(dv, sub),
        journal: JOURNALS[publications.length % JOURNALS.length]
      });

      if (publications.length >= 3) {
        showTenure();
      } else {
        dv = 0; sub = 0; out = 0; cov = 0;
        render();
      }
    }

    function showTenure() {
      container.innerHTML = `
        <div class="ph-tenure-screen">
          <div class="ph-big-emoji">\u{1F393}</div>
          <div class="ph-tenure-title">CONGRATULATIONS, PROFESSOR!</div>
          <div class="ph-tenure-sub">Three publications from one dataset. Tenure secured.</div>
          <div style="margin-top:24px;">
            <button class="btn btn-primary" id="ph-reveal">See What You've Done</button>
          </div>
        </div>
      `;
      container.querySelector('#ph-reveal').onclick = showEndgame;
    }

    function showEndgame() {
      const hadPubs = publications.length > 0;
      const sigPct = Math.round(totalSig / 180 * 100);

      let pubsHTML = '';
      if (hadPubs) {
        pubsHTML = '<div class="ph-papers-title">Your Published Papers</div>' +
          publications.map((pub, i) => {
            const qrps = getQRPs(pub);
            const rp = repProb(pub.p);
            return `
              <div class="ph-paper">
                <div class="ph-paper-num">Paper ${i + 1}</div>
                <div class="ph-paper-title">"${pub.title}"</div>
                <div class="ph-paper-journal">${pub.journal}</div>
                <div class="ph-paper-stats">p = ${fmtP(pub.p)}, d = ${pub.d.toFixed(2)}</div>
                <div class="ph-qrps">
                  <div class="ph-qrp-label">Questionable Research Practices:</div>
                  ${qrps.length > 0
                    ? qrps.map(q => `<div class="ph-qrp-item">⚠️ ${q}</div>`).join('')
                    : '<div class="ph-qrp-item">✓ No QRPs detected — but the finding is still noise</div>'}
                </div>
                <div class="ph-paper-rep">Estimated replication probability: <strong>~${rp}%</strong></div>
              </div>
            `;
          }).join('');
      }

      let verdict;
      if (!hadPubs) {
        verdict = 'You refused to p-hack. Integrity wins.';
      } else if (tried.size <= 3) {
        verdict = "You're a natural p-hacker. That should worry you.";
      } else if (tried.size <= 10) {
        verdict = 'Some fishing required. Peer review would like a word.';
      } else {
        verdict = "That took work. At least you know it's garbage.";
      }

      container.innerHTML = `
        <div class="ph-endgame">
          <div class="ph-verdict">${verdict}</div>

          ${pubsHTML}

          <div class="ph-summary">
            <div class="ph-summary-row">
              <span>Unique analyses tried</span>
              <strong>${tried.size} of 180</strong>
            </div>
            <div class="ph-summary-row">
              <span>Significant results in the full matrix</span>
              <strong>${totalSig} of 180 (${sigPct}%)</strong>
            </div>
          </div>

          <div class="ph-lesson">
            <div class="ph-lesson-title">The Lesson</div>
            <p>This game generated 200 synthetic participants with <strong>no real
            treatment effect</strong> — both groups were drawn from identical distributions.
            Every p-value came from a real Welch’s t-test on that data.</p>
            <p>With 4 outcome measures × 5 subgroups × 3 outlier rules × 3 covariate
            options, you had <strong>180 possible analyses</strong> of the same dataset.
            ${totalSig} of them (${sigPct}%) produced p &lt; 0.05 — entirely from noise.</p>
            <p>Every choice you made was individually defensible. Together, they manufactured a lie.</p>
            <p class="ph-lesson-remedy">This is why <strong>pre-registration</strong> matters. Declare your
            analysis plan before seeing the data.</p>
            <p class="ph-lesson-cite">[Simmons, Nelson & Simonsohn (2011), “False-Positive Psychology”,
            Psychological Science 22(11)]</p>
          </div>

          <div class="ph-end-actions">
            <button class="btn btn-primary" id="ph-back">Back to Work</button>
            <button class="btn btn-secondary" id="ph-retry">Play Again</button>
          </div>
        </div>
      `;

      container.querySelector('#ph-back').onclick = BreakRoom.showMenu;
      container.querySelector('#ph-retry').onclick = () => BreakRoom.launchGame('p-hacker');
    }

    let attempts = 0;
    do {
      data = generateData();
      totalSig = countSig(data);
      attempts++;
    } while (totalSig === 0 && attempts < 10);
    render();
  }
});
