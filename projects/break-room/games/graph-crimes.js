BreakRoom.register({
  id: 'graph-crimes',
  name: 'Graph Crimes',
  icon: '\u{1F4CA}',
  description: 'Spot the deception in misleading charts. Five rounds of visual forensics.',
  play(container) {

    const W = 380, H = 240;
    const P = { t: 28, r: 16, b: 36, l: 52 };
    const PW = W - P.l - P.r;
    const PH = H - P.t - P.b;
    const C = { accent: '#e94560', text: '#eee', dim: '#aab', grid: 'rgba(255,255,255,0.08)', bg: '#16213e' };

    function fmt(v) {
      if (Math.abs(v) >= 1e9) return (v / 1e9).toFixed(1) + 'B';
      if (Math.abs(v) >= 1e6) return (v / 1e6).toFixed(1) + 'M';
      if (Math.abs(v) >= 1e3) return (v / 1e3).toFixed(1) + 'K';
      return Number.isInteger(v) ? v.toString() : v.toFixed(1);
    }

    function svgWrap(inner) {
      return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" style="width:100%;background:${C.bg};border-radius:8px;">${inner}</svg>`;
    }

    function yGrid(yMin, yMax, steps) {
      let s = '';
      for (let i = 0; i <= steps; i++) {
        const val = yMin + (yMax - yMin) * (i / steps);
        const y = P.t + PH - (PH * i / steps);
        s += `<line x1="${P.l}" y1="${y}" x2="${W - P.r}" y2="${y}" stroke="${C.grid}"/>`;
        s += `<text x="${P.l - 6}" y="${y + 3}" text-anchor="end" font-size="9" fill="${C.dim}">${fmt(val)}</text>`;
      }
      return s;
    }

    function barChart(data, labels, opts = {}) {
      const { yMin = 0, yMax, colors, title, widths } = opts;
      const mx = yMax || Math.ceil(Math.max(...data) * 1.15);
      const range = mx - yMin;
      const n = data.length;
      const gap = PW / (n * 1.4 + 0.4);
      let s = yGrid(yMin, mx, 5);

      data.forEach((v, i) => {
        const bw = widths ? widths[i] : gap;
        const x = P.l + gap * 0.4 + i * (PW / n) + (PW / n - bw) / 2;
        const bh = Math.max(1, ((v - yMin) / range) * PH);
        const y = P.t + PH - bh;
        const col = colors ? colors[i] : C.accent;
        s += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" fill="${col}" rx="2"/>`;
        s += `<text x="${x + bw / 2}" y="${P.t + PH + 14}" text-anchor="middle" font-size="8" fill="${C.dim}">${labels[i]}</text>`;
        s += `<text x="${x + bw / 2}" y="${y - 4}" text-anchor="middle" font-size="8" fill="${C.text}">${fmt(v)}</text>`;
      });
      if (title) s += `<text x="${W / 2}" y="16" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.text}">${title}</text>`;
      return svgWrap(s);
    }

    function lineChart(xs, ys, opts = {}) {
      const { yMin = 0, yMax, title, color = C.accent, fillBelow = false, squash = false } = opts;
      const mx = yMax || Math.ceil(Math.max(...ys) * 1.1);
      const range = mx - yMin;
      const localH = squash ? PH * 0.3 : PH;
      const localT = squash ? P.t + (PH - localH) / 2 : P.t;
      let s = '';

      for (let i = 0; i <= 5; i++) {
        const val = yMin + range * (i / 5);
        const y = localT + localH - (localH * i / 5);
        s += `<line x1="${P.l}" y1="${y}" x2="${W - P.r}" y2="${y}" stroke="${C.grid}"/>`;
        s += `<text x="${P.l - 6}" y="${y + 3}" text-anchor="end" font-size="9" fill="${C.dim}">${fmt(val)}</text>`;
      }

      const pts = ys.map((v, i) => {
        const x = P.l + (i / (ys.length - 1)) * PW;
        const y = localT + localH - ((v - yMin) / range) * localH;
        return [x, y];
      });

      if (fillBelow) {
        const areaPath = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
        s += `<path d="${areaPath} L${pts[pts.length - 1][0]},${localT + localH} L${pts[0][0]},${localT + localH}Z" fill="${color}" opacity="0.2"/>`;
      }

      s += `<polyline points="${pts.map(p => p.join(',')).join(' ')}" fill="none" stroke="${color}" stroke-width="2.5"/>`;
      pts.forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="3" fill="${color}"/>`; });
      xs.forEach((label, i) => {
        const x = P.l + (i / (xs.length - 1)) * PW;
        s += `<text x="${x}" y="${localT + localH + 14}" text-anchor="middle" font-size="8" fill="${C.dim}">${label}</text>`;
      });

      if (title) s += `<text x="${W / 2}" y="16" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.text}">${title}</text>`;
      return svgWrap(s);
    }

    function pieChart(slices, opts = {}) {
      const { title, tilt = false, hideLabels = [], startOffset = 0 } = opts;
      const cx = W / 2, cy = tilt ? H / 2 + 10 : H / 2;
      const rx = 90, ry = opts.ry || (tilt ? 50 : 90);
      const colors = ['#e94560', '#2ecc71', '#85c0f9', '#f39c12', '#9b59b6'];
      let s = '';

      if (tilt) {
        const depth = opts.depth || 12;
        slices.forEach((sl, i) => {
          const a1 = -Math.PI / 2 + startOffset + slices.slice(0, i).reduce((sum, x) => sum + x.pct / 100 * Math.PI * 2, 0);
          const a2 = a1 + sl.pct / 100 * Math.PI * 2;
          if (Math.sin(a1) > 0 || Math.sin(a2) > 0) {
            const x1 = cx + rx * Math.cos(a1);
            const y1 = cy + ry * Math.sin(a1);
            const x2 = cx + rx * Math.cos(a2);
            const y2 = cy + ry * Math.sin(a2);
            const large = (a2 - a1) > Math.PI ? 1 : 0;
            s += `<path d="M${x1},${y1} L${x1},${y1 + depth} A${rx},${ry} 0 ${large} 1 ${x2},${y2 + depth} L${x2},${y2}" fill="${colors[i % colors.length]}" opacity="0.5" stroke="${C.bg}" stroke-width="0.5"/>`;
          }
        });
      }

      let startAngle = -Math.PI / 2 + startOffset;
      slices.forEach((sl, i) => {
        const angle = sl.pct / 100 * Math.PI * 2;
        const endAngle = startAngle + angle;
        const x1 = cx + rx * Math.cos(startAngle);
        const y1 = cy + ry * Math.sin(startAngle);
        const x2 = cx + rx * Math.cos(endAngle);
        const y2 = cy + ry * Math.sin(endAngle);
        const large = angle > Math.PI ? 1 : 0;
        s += `<path d="M${cx},${cy} L${x1},${y1} A${rx},${ry} 0 ${large} 1 ${x2},${y2}Z" fill="${colors[i % colors.length]}" stroke="${C.bg}" stroke-width="1.5"/>`;

        if (!hideLabels.includes(i)) {
          const midA = startAngle + angle / 2;
          const lx = cx + (rx + 20) * Math.cos(midA);
          const ly = cy + (ry + 20) * Math.sin(midA);
          s += `<text x="${lx}" y="${ly + 3}" text-anchor="middle" font-size="8" fill="${C.text}">${sl.label} ${sl.pct}%</text>`;
        }
        startAngle = endAngle;
      });

      if (title) s += `<text x="${W / 2}" y="16" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.text}">${title}</text>`;
      return svgWrap(s);
    }

    function scatterChart(groups, opts = {}) {
      const { title, showGroups = false, xLabel = '', yLabel = '' } = opts;
      const allX = groups.flatMap(g => g.pts.map(p => p[0]));
      const allY = groups.flatMap(g => g.pts.map(p => p[1]));
      const xMin = Math.min(...allX) - 5, xMax = Math.max(...allX) + 5;
      const yMin = Math.min(...allY) - 5, yMax = Math.max(...allY) + 5;
      let s = yGrid(yMin, yMax, 4);

      const groupColors = ['#e94560', '#2ecc71', '#85c0f9'];
      groups.forEach((g, gi) => {
        const col = showGroups ? groupColors[gi] : 'rgba(233,69,96,0.6)';
        g.pts.forEach(([vx, vy]) => {
          const x = P.l + ((vx - xMin) / (xMax - xMin)) * PW;
          const y = P.t + PH - ((vy - yMin) / (yMax - yMin)) * PH;
          s += `<circle cx="${x}" cy="${y}" r="4" fill="${col}" opacity="0.7"/>`;
        });
        if (showGroups) {
          s += `<text x="${W - P.r - 5}" y="${P.t + 14 + gi * 14}" text-anchor="end" font-size="8" fill="${groupColors[gi]}">● ${g.label}</text>`;
        }
      });

      if (title) s += `<text x="${W / 2}" y="16" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.text}">${title}</text>`;
      if (xLabel) s += `<text x="${W / 2}" y="${H - 4}" text-anchor="middle" font-size="9" fill="${C.dim}">${xLabel}</text>`;
      return svgWrap(s);
    }

    function dualAxisChart(xs, y1s, y2s, opts = {}) {
      const { title, lab1, lab2, col1 = '#e94560', col2 = '#2ecc71' } = opts;
      const y1Max = Math.ceil(Math.max(...y1s) * 1.15);
      const y2Max = Math.ceil(Math.max(...y2s) * 1.15);
      let s = '';

      for (let i = 0; i <= 4; i++) {
        const y = P.t + PH - (PH * i / 4);
        s += `<line x1="${P.l}" y1="${y}" x2="${W - P.r}" y2="${y}" stroke="${C.grid}"/>`;
        s += `<text x="${P.l - 6}" y="${y + 3}" text-anchor="end" font-size="9" fill="${col1}">${fmt(y1Max * i / 4)}</text>`;
        s += `<text x="${W - P.r + 6}" y="${y + 3}" text-anchor="start" font-size="9" fill="${col2}">${fmt(y2Max * i / 4)}</text>`;
      }

      const pts1 = y1s.map((v, i) => [P.l + (i / (y1s.length - 1)) * PW, P.t + PH - (v / y1Max) * PH]);
      const pts2 = y2s.map((v, i) => [P.l + (i / (y2s.length - 1)) * PW, P.t + PH - (v / y2Max) * PH]);

      s += `<polyline points="${pts1.map(p => p.join(',')).join(' ')}" fill="none" stroke="${col1}" stroke-width="2.5"/>`;
      s += `<polyline points="${pts2.map(p => p.join(',')).join(' ')}" fill="none" stroke="${col2}" stroke-width="2.5" stroke-dasharray="6,3"/>`;

      xs.forEach((label, i) => {
        const x = P.l + (i / (xs.length - 1)) * PW;
        s += `<text x="${x}" y="${P.t + PH + 14}" text-anchor="middle" font-size="8" fill="${C.dim}">${label}</text>`;
      });

      s += `<text x="${P.l}" y="${P.t - 8}" font-size="8" fill="${col1}">${lab1 || ''}</text>`;
      s += `<text x="${W - P.r}" y="${P.t - 8}" text-anchor="end" font-size="8" fill="${col2}">${lab2 || ''}</text>`;
      if (title) s += `<text x="${W / 2}" y="16" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.text}">${title}</text>`;
      return svgWrap(s);
    }

    const SCENARIOS = [
      {
        headline: '"Company X Reports Record Quarterly Growth!"',
        deceptive: () => barChart([4.2, 4.3, 4.5, 4.6], ['Q1', 'Q2', 'Q3', 'Q4'], { yMin: 4.0, yMax: 4.8, title: 'Revenue ($M)' }),
        honest: () => barChart([4.2, 4.3, 4.5, 4.6], ['Q1', 'Q2', 'Q3', 'Q4'], { yMin: 0, yMax: 5, title: 'Revenue ($M)' }),
        answers: [
          'The Y-axis doesn\'t start at zero, exaggerating small differences',
          'The bars are different widths',
          'The data points are fabricated',
          'The time periods are unequal'
        ],
        correct: 0,
        explanation: 'The Y-axis starts at $4.0M instead of $0, making a 9.5% increase look like the bars triple in height. Always check where the axis starts.',
        crimeType: 'Truncated Y-axis',
        cite: 'Cairo (2019), How Charts Lie, ch. 2'
      },
      {
        headline: '"Market in Freefall — Down 40% This Quarter!"',
        deceptive: () => {
          const labels = ['Apr', 'May', 'Jun', 'Jul', 'Aug'];
          const vals = [160, 150, 130, 95, 90];
          return lineChart(labels, vals, { yMin: 80, yMax: 180, title: 'Index Value (Apr–Aug)', color: C.accent });
        },
        honest: () => {
          const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
          const vals = [100, 95, 140, 160, 150, 130, 95, 90];
          return lineChart(labels, vals, { yMin: 0, yMax: 180, title: 'Index Value (Full Year)', color: '#2ecc71' });
        },
        answers: [
          'The chart cherry-picks a date range that exaggerates the decline',
          'The Y-axis is logarithmic',
          'The data should be shown weekly, not monthly',
          'The line is smoothed to hide volatility'
        ],
        correct: 0,
        explanation: 'The chart only shows April–August, the steepest decline. The full year reveals the index peaked mid-year and ended roughly where it started — a very different story.',
        crimeType: 'Cherry-picked date range',
        cite: 'Huff (1954), How to Lie with Statistics'
      },
      {
        headline: '"Our Product Leads the Market!"',
        deceptive: () => pieChart(
          [{ label: 'Ours', pct: 28 }, { label: 'Brand B', pct: 25 }, { label: 'Brand C', pct: 24 }, { label: 'Brand D', pct: 23 }],
          { title: 'Market Share', tilt: true, startOffset: -(28 / 100) * Math.PI, ry: 35, depth: 22 }
        ),
        honest: () => pieChart(
          [{ label: 'Ours', pct: 28 }, { label: 'Brand B', pct: 25 }, { label: 'Brand C', pct: 24 }, { label: 'Brand D', pct: 23 }],
          { title: 'Market Share', tilt: false }
        ),
        answers: [
          '3D perspective makes the front slice look disproportionately large',
          'The percentages don\'t add up to 100%',
          'The color choices create an unfair visual advantage',
          'Pie charts shouldn\'t be used for market share data'
        ],
        correct: 0,
        explanation: 'The extreme 3D tilt stretches "Ours" across the top of the chart, making a 28% share look dominant. In the flat version, all four slices are nearly the same size — 28% barely leads 23%.',
        crimeType: '3D perspective distortion',
        cite: 'Few (2012), Show Me the Numbers'
      },
      {
        headline: '"Ice Cream Sales Linked to Drowning Deaths!"',
        deceptive: () => dualAxisChart(
          ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
          [20, 35, 70, 95, 60, 15],
          [8, 12, 30, 45, 25, 5],
          { title: 'A Suspicious Correlation', lab1: 'Ice Cream ($K)', lab2: 'Drownings' }
        ),
        honest: () => {
          let s = '';
          s += `<text x="${W/2}" y="20" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.text}">Same Data, Proper Context</text>`;
          s += `<text x="${W/2}" y="${H/2 - 10}" text-anchor="middle" font-size="10" fill="${C.dim}">Both variables correlate with a third factor:</text>`;
          s += `<text x="${W/2}" y="${H/2 + 10}" text-anchor="middle" font-size="14" font-weight="bold" fill="${C.accent}">Summer temperatures</text>`;
          s += `<text x="${W/2}" y="${H/2 + 35}" text-anchor="middle" font-size="10" fill="${C.dim}">Hot weather → more swimming → more drownings</text>`;
          s += `<text x="${W/2}" y="${H/2 + 50}" text-anchor="middle" font-size="10" fill="${C.dim}">Hot weather → more ice cream sales</text>`;
          s += `<text x="${W/2}" y="${H/2 + 75}" text-anchor="middle" font-size="9" fill="#f39c12">Dual-axis charts can make any two seasonal trends</text>`;
          s += `<text x="${W/2}" y="${H/2 + 90}" text-anchor="middle" font-size="9" fill="#f39c12">look causally linked by tuning the Y-scales.</text>`;
          return svgWrap(s);
        },
        answers: [
          'Two Y-axes with different scales are tuned to imply a false causal link',
          'The drowning data is fabricated',
          'Monthly data should be aggregated quarterly',
          'The X-axis should use exact dates'
        ],
        correct: 0,
        explanation: 'Dual-axis charts let you scale two Y-axes independently to make any two trends look correlated. Here, both variables are driven by summer heat — no causal link exists between ice cream and drowning.',
        crimeType: 'Dual-axis false correlation',
        cite: 'Cairo (2019), How Charts Lie, ch. 3'
      },
      {
        headline: '"Subscriptions Skyrocket — 50,000 and Counting!"',
        deceptive: () => {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
          const cumulative = [5, 9, 12, 14, 16, 17.5, 18.5, 19];
          return lineChart(months, cumulative.map(v => v * 1000), { title: 'Total Subscribers', fillBelow: true, color: '#2ecc71' });
        },
        honest: () => barChart(
          [5000, 4000, 3000, 2000, 2000, 1500, 1000, 500],
          ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
          { title: 'New Subscribers Per Month', colors: Array(8).fill('#e94560') }
        ),
        answers: [
          'Cumulative chart hides that monthly growth is actually declining sharply',
          'The area shading inflates the perceived value',
          'The Y-axis is logarithmic',
          'Eight months is too short a window'
        ],
        correct: 0,
        explanation: 'Cumulative charts always go up (unless there are cancellations). The honest per-month view shows new subscriptions dropped from 5,000 to 500 — the product is losing momentum, not gaining it.',
        crimeType: 'Cumulative vs. per-period trick',
        cite: 'Bergstrom & West (2020), Calling Bullshit, ch. 7'
      },
      {
        headline: '"Candidate A: Commanding Lead in the Polls"',
        deceptive: () => barChart(
          [42, 38, 12, 8],
          ['Candidate A', 'Candidate B', 'Candidate C', 'Undecided'],
          { yMin: 0, yMax: 50, title: 'Voter Preference (%)', widths: [55, 30, 30, 30] }
        ),
        honest: () => barChart(
          [42, 38, 12, 8],
          ['Candidate A', 'Candidate B', 'Candidate C', 'Undecided'],
          { yMin: 0, yMax: 50, title: 'Voter Preference (%)' }
        ),
        answers: [
          'One bar is wider than the others, making it look disproportionately large',
          'The percentages don\'t add up to 100%',
          'Undecided voters should be excluded',
          'The Y-axis should go to 100%'
        ],
        correct: 0,
        explanation: 'Candidate A\'s bar is nearly twice as wide as the others. Since our brains perceive area (width × height), not just height, the wider bar makes 42% look much larger than 38% — a 4-point lead looks like a landslide.',
        crimeType: 'Inconsistent bar widths',
        cite: 'Tufte (1983), The Visual Display of Quantitative Information'
      },
      {
        headline: '"Crime Rate Drops Under New Mayor"',
        deceptive: () => {
          const labels = ['2020', '2021', '2022', '2023'];
          const vals = [450, 480, 510, 540];
          const yMin = 440, yMax = 550;
          const range = yMax - yMin;
          let s = '';
          for (let i = 0; i <= 4; i++) {
            const val = yMax - (yMax - yMin) * (i / 4);
            const y = P.t + PH * i / 4;
            s += `<line x1="${P.l}" y1="${y}" x2="${W - P.r}" y2="${y}" stroke="${C.grid}"/>`;
            s += `<text x="${P.l - 6}" y="${y + 3}" text-anchor="end" font-size="9" fill="${C.dim}">${val}</text>`;
          }
          const gap = PW / (labels.length * 1.4 + 0.4);
          vals.forEach((v, i) => {
            const bw = gap;
            const x = P.l + gap * 0.4 + i * (PW / labels.length) + (PW / labels.length - bw) / 2;
            const bh = ((yMax - v) / range) * PH;
            const y = P.t;
            s += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" fill="#2ecc71" rx="2"/>`;
            s += `<text x="${x + bw / 2}" y="${P.t + PH + 14}" text-anchor="middle" font-size="8" fill="${C.dim}">${labels[i]}</text>`;
            s += `<text x="${x + bw / 2}" y="${y + bh + 14}" text-anchor="middle" font-size="8" fill="${C.text}">${v}</text>`;
          });
          s += `<text x="${W / 2}" y="16" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.text}">Crimes Reported (Inverted)</text>`;
          return svgWrap(s);
        },
        honest: () => barChart([450, 480, 510, 540], ['2020', '2021', '2022', '2023'], { yMin: 0, yMax: 600, title: 'Crimes Reported' }),
        answers: [
          'The Y-axis is inverted — higher crime numbers appear lower on the chart',
          'The bars use green to create a positive association',
          'The data is not population-adjusted',
          'Four years is too short a trend'
        ],
        correct: 0,
        explanation: 'The Y-axis is flipped: high numbers are at the bottom, low at the top. This makes rising crime (450→540) look like falling bars. A famous real-world example: Reuters\' 2014 Florida "Stand Your Ground" gun deaths chart.',
        crimeType: 'Inverted Y-axis',
        cite: 'Cairo (2019), How Charts Lie, ch. 2'
      },
      {
        headline: '"Steady as She Goes — Unemployment Barely Budges"',
        deceptive: () => lineChart(
          ['Jan', 'Mar', 'May', 'Jul', 'Sep'],
          [5.2, 5.8, 6.5, 7.1, 7.8],
          { yMin: 4, yMax: 9, title: 'Unemployment Rate (%)', squash: true }
        ),
        honest: () => lineChart(
          ['Jan', 'Mar', 'May', 'Jul', 'Sep'],
          [5.2, 5.8, 6.5, 7.1, 7.8],
          { yMin: 4, yMax: 9, title: 'Unemployment Rate (%)' }
        ),
        answers: [
          'The chart is compressed vertically to flatten the upward trend',
          'Unemployment data should be seasonally adjusted',
          'Bi-monthly data hides the monthly variations',
          'The percentage range is too narrow'
        ],
        correct: 0,
        explanation: 'Squashing the vertical axis makes a 50% increase (5.2%→7.8%) look like a flat line. The honest version shows the same data at a proper aspect ratio, revealing a steep and worrying upward trend.',
        crimeType: 'Aspect ratio manipulation',
        cite: 'Cleveland (1985), The Elements of Graphing Data'
      },
      {
        headline: '"Customer Satisfaction at All-Time High!"',
        deceptive: () => pieChart(
          [{ label: 'Very Satisfied', pct: 31 }, { label: 'Satisfied', pct: 28 }, { label: '', pct: 22 }, { label: '', pct: 12 }, { label: '', pct: 7 }],
          { title: 'Customer Survey Results', hideLabels: [2, 3, 4] }
        ),
        honest: () => pieChart(
          [{ label: 'V. Satisfied', pct: 31 }, { label: 'Satisfied', pct: 28 }, { label: 'Neutral', pct: 22 }, { label: 'Dissatisfied', pct: 12 }, { label: 'V. Dissatisfied', pct: 7 }],
          { title: 'Customer Survey Results' }
        ),
        answers: [
          'Three slices are unlabeled — hiding the 41% who are neutral or dissatisfied',
          'A pie chart is the wrong chart type for survey data',
          'The colors are too similar to distinguish',
          'The sample size isn\'t disclosed'
        ],
        correct: 0,
        explanation: 'Only the favorable categories are labeled. The 41% who are neutral, dissatisfied, or very dissatisfied are hidden in unlabeled slices. The "all-time high" headline only holds if you ignore nearly half your customers.',
        crimeType: 'Missing labels / selective annotation',
        cite: 'Few (2012), Show Me the Numbers'
      },
      {
        headline: '"Study Finds No Link Between Exercise and Weight Loss"',
        deceptive: () => {
          const g1 = { label: 'Diet+Exercise', pts: [[2,12],[3,10],[4,8],[5,7],[6,5],[7,4]] };
          const g2 = { label: 'Exercise Only', pts: [[4,22],[5,20],[6,18],[7,16],[8,15],[9,13]] };
          return scatterChart([g1, g2], { title: 'Exercise hrs/wk vs. Weight Change', xLabel: 'Exercise (hrs/week)', showGroups: false });
        },
        honest: () => {
          const g1 = { label: 'Diet + Exercise', pts: [[2,12],[3,10],[4,8],[5,7],[6,5],[7,4]] };
          const g2 = { label: 'Exercise Only', pts: [[4,22],[5,20],[6,18],[7,16],[8,15],[9,13]] };
          return scatterChart([g1, g2], { title: 'By Group: Both Show Benefit', xLabel: 'Exercise (hrs/week)', showGroups: true });
        },
        answers: [
          'Hidden subgroups — within each group exercise helps, but pooling hides this (Simpson\'s paradox)',
          'The sample size is too small to draw conclusions',
          'Weight loss should be measured in percentages',
          'The outliers are skewing the results'
        ],
        correct: 0,
        explanation: 'Pooling two groups (diet+exercise and exercise-only) creates a cloud with no apparent trend. But within each group, more exercise clearly reduces weight. This is Simpson\'s paradox: a trend that reverses when subgroups are combined.',
        crimeType: 'Simpson\'s paradox / hidden groups',
        cite: 'Pearl (2018), The Book of Why, ch. 6'
      },
      {
        headline: '"MegaCorp: Five Consecutive Years of Revenue Growth"',
        deceptive: () => barChart(
          [12.1, 12.3, 12.4, 12.5],
          ['2019', '2020', '2022', '2023'],
          { yMin: 11.8, yMax: 12.8, title: 'Revenue ($B)' }
        ),
        honest: () => barChart(
          [12.1, 12.3, 12.0, 12.4, 12.5],
          ['2019', '2020', '2021', '2022', '2023'],
          { yMin: 0, yMax: 14, title: 'Revenue ($B)' }
        ),
        answers: [
          'A year of declining revenue (2021) is omitted to create a false growth streak',
          'The bars should be inflation-adjusted',
          'Revenue should be broken down by division',
          'Quarterly data would be more revealing'
        ],
        correct: 0,
        explanation: 'The chart jumps from 2020 to 2022, omitting the 2021 dip ($12.0B). This turns a flat, volatile revenue line into a "growth" narrative. Skipping data points is one of the most common corporate earnings deceptions.',
        crimeType: 'Omitted data point',
        cite: 'Inspired by SEC enforcement precedents on non-GAAP earnings presentations'
      },
      {
        headline: '"Widget Sales Up 200%!"',
        deceptive: () => {
          let s = '';
          s += `<text x="${W/2}" y="20" text-anchor="middle" font-size="11" font-weight="bold" fill="${C.text}">Widget Sales Growth</text>`;
          s += `<rect x="${P.l + 20}" y="${H/2 - 10}" width="30" height="30" fill="${C.dim}" rx="4"/>`;
          s += `<text x="${P.l + 35}" y="${H/2 + 28}" text-anchor="middle" font-size="9" fill="${C.dim}">Last Year</text>`;
          s += `<text x="${P.l + 35}" y="${H/2 + 40}" text-anchor="middle" font-size="9" fill="${C.dim}">$50K</text>`;
          s += `<rect x="${W/2 - 30}" y="${H/2 - 55}" width="90" height="90" fill="${C.accent}" rx="4"/>`;
          s += `<text x="${W/2 + 15}" y="${H/2 + 44}" text-anchor="middle" font-size="9" fill="${C.accent}">This Year</text>`;
          s += `<text x="${W/2 + 15}" y="${H/2 + 56}" text-anchor="middle" font-size="9" fill="${C.accent}">$150K</text>`;
          s += `<text x="${W/2}" y="${H - 10}" text-anchor="middle" font-size="8" fill="${C.dim}">Icons scaled proportionally to represent growth</text>`;
          return svgWrap(s);
        },
        honest: () => barChart([50, 150], ['Last Year', 'This Year'], { yMin: 0, yMax: 180, title: 'Widget Sales ($K)' }),
        answers: [
          'The icon is scaled in 2D — tripling width AND height creates 9× the visual area for a 3× increase',
          'The sales figures are not inflation-adjusted',
          'The comparison periods are different lengths',
          '$150K is not actually three times $50K'
        ],
        correct: 0,
        explanation: 'Sales tripled ($50K→$150K), but the icon\'s width AND height are tripled, making the area 9× larger. Our brains perceive area, not just height — so a 200% increase looks like an 800% increase.',
        crimeType: 'Pictogram area scaling',
        cite: 'Tufte (1983), The Visual Display of Quantitative Information, "The Lie Factor"'
      }
    ];

    let round = 0;
    let score = 0;
    let scenarios = [];
    let phase = 'question';

    function start() {
      scenarios = BreakRoom.shuffle([...SCENARIOS]).slice(0, 5);
      scenarios.forEach(sc => {
        const order = BreakRoom.shuffle([0, 1, 2, 3]);
        sc.shuffledAnswers = order.map(i => sc.answers[i]);
        sc.shuffledCorrect = order.indexOf(sc.correct);
      });
      round = 0;
      score = 0;
      phase = 'question';
      renderRound();
    }

    function renderRound() {
      const s = scenarios[round];

      if (phase === 'question') {
        container.innerHTML = `
          <div class="gc-game">
            <div class="gc-header">
              <span>Round ${round + 1} of 5</span>
              <span>Score: <strong>${score}</strong> / 5</span>
            </div>
            <div class="progress-bar"><div class="fill" style="width:${(round / 5) * 100}%"></div></div>

            <div class="gc-headline">${s.headline}</div>
            <div class="gc-chart" id="gc-chart">${s.deceptive()}</div>
            <div class="gc-prompt">What's wrong with this chart?</div>
            <div class="gc-answers">
              ${s.shuffledAnswers.map((a, i) => `<button class="gc-answer" data-idx="${i}">${a}</button>`).join('')}
            </div>
          </div>
        `;

        container.querySelectorAll('.gc-answer').forEach(btn => {
          btn.onclick = () => pickAnswer(parseInt(btn.dataset.idx));
        });
      }
    }

    function pickAnswer(idx) {
      if (phase !== 'question') return;
      phase = 'reveal';
      const s = scenarios[round];
      const correct = idx === s.shuffledCorrect;
      if (correct) score++;

      container.querySelectorAll('.gc-answer').forEach((btn, i) => {
        btn.disabled = true;
        if (i === s.shuffledCorrect) btn.classList.add('correct');
        if (i === idx && !correct) btn.classList.add('wrong');
      });

      const reveal = document.createElement('div');
      reveal.className = 'gc-reveal';
      reveal.innerHTML = `
        <div class="gc-reveal-score ${correct ? 'right' : 'miss'}">${correct ? 'Correct! +1' : 'Wrong. +0'}</div>
        <div class="gc-comparison">
          <div class="gc-comp-panel">
            <div class="gc-comp-label">Deceptive</div>
            ${s.deceptive()}
          </div>
          <div class="gc-comp-panel">
            <div class="gc-comp-label gc-honest-label">Honest</div>
            ${s.honest()}
          </div>
        </div>
        <div class="gc-explanation">
          <div class="gc-crime-type">${s.crimeType}</div>
          <p>${s.explanation}</p>
          <p class="gc-cite">[${s.cite}]</p>
        </div>
        <div class="gc-actions">
          <button class="btn btn-primary" id="gc-next">${round < 4 ? 'Next Round →' : 'See Results'}</button>
        </div>
      `;

      container.querySelector('.gc-game').appendChild(reveal);
      container.querySelector('#gc-next').onclick = () => {
        round++;
        if (round >= 5) {
          showResults();
        } else {
          phase = 'question';
          renderRound();
        }
      };
    }

    function showResults() {
      BreakRoom.showResult(container, {
        score, max: 5, game: 'graph-crimes',
        verdicts: [
          'Data visualization vigilante. No chart can fool you.',
          'Solid chart instincts. Most tricks didn\'t fool you.',
          'Some charts got past you. Always check the axes.',
          'You\'d retweet anything. Check those axes!'
        ]
      });
    }

    start();
  }
});
