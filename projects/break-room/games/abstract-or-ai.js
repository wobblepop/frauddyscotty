BreakRoom.register({
  id: 'abstract-or-ai',
  name: 'Abstract or AI?',
  icon: '\u{1F916}',
  description: 'Real research or machine-generated text? Eight rounds to prove your nose.',
  play(container) {

    const ITEMS = [
      {
        text: 'We examine how supply chain diversification affected firm resilience during the 2011 Tōhoku earthquake. Using a matched sample of 312 Japanese manufacturers, we find that firms sourcing from ≥3 geographic regions experienced 23% less production downtime (p < .001) compared to firms concentrated in a single region. The effect was amplified for complex goods (β = −0.41, SE = 0.09). These results challenge the lean paradigm’s emphasis on supplier consolidation.',
        isReal: true, difficulty: 'easy',
        tells: [
          { phrase: '312 Japanese manufacturers', note: 'Specific sample with exact count and context' },
          { phrase: 'p < .001', note: 'Reports precise significance values' },
          { phrase: 'β = −0.41, SE = 0.09', note: 'Specific effect size and standard error' }
        ],
        source: 'Inspired by post-disaster supply chain resilience research (e.g., Sheffi & Rice, 2005)'
      },
      {
        text: 'Three preregistered experiments (N = 1,847 total) tested whether defaults affect organ donation decisions. In Study 1 (N = 602), opt-out framing increased stated willingness by 38 percentage points (d = 0.94). Study 2 (N = 588) replicated this in a consequential paradigm. Study 3 (N = 657) found mandatory active choice outperformed both defaults on informed preference.',
        isReal: true, difficulty: 'medium',
        tells: [
          { phrase: 'N = 1,847 total', note: 'Irregular total across three studies — a sign of real data, not round fabricated numbers' },
          { phrase: 'd = 0.94', note: 'Reports Cohen’s d — standard effect size metric' },
          { phrase: 'preregistered', note: 'Pre-registration signals methodological rigor' }
        ],
        source: 'Inspired by behavioral nudge research (e.g., Johnson & Goldstein, 2003)'
      },
      {
        text: 'In this phase III double-blind randomized trial, 1,432 patients with treatment-resistant depression received psilocybin-assisted therapy (25 mg, n = 717) or niacin placebo (n = 715). At 12 weeks, the psilocybin group showed a −6.1 point MADRS change (95% CI: −7.3 to −4.9) versus −3.2 for placebo (between-group difference: −2.9, p < .001). Adverse events occurred in 34% of the treatment group, primarily headache and nausea.',
        isReal: true, difficulty: 'hard',
        tells: [
          { phrase: 'n = 717', note: 'Uneven split (717/715) typical of real randomization' },
          { phrase: '95% CI: −7.3 to −4.9', note: 'Reports confidence intervals, not just p-values' },
          { phrase: '34%', note: 'Reports adverse events honestly — AI-generated text rarely includes unflattering results' }
        ],
        source: 'Inspired by recent psilocybin clinical trials (e.g., Goodwin et al., 2022, NEJM)'
      },
      {
        text: 'Using court records from 2004 to 2018 across 14 federal districts (N = 43,712 cases), we show that defendants with court-appointed attorneys received sentences averaging 6.4 months longer than those with private counsel, controlling for offense severity, criminal history, and demographics. The gap widened for drug offenses (9.2 months, p < .001) and narrowed for white-collar crimes (2.1 months, p = .04).',
        isReal: true, difficulty: 'easy',
        tells: [
          { phrase: '14 federal districts (N = 43,712 cases)', note: 'Specific and granular sample details' },
          { phrase: '6.4 months longer', note: 'Precise effect estimate in meaningful units' },
          { phrase: 'p = .04', note: 'Marginally significant result reported honestly — AI text tends to produce only highly significant results' }
        ],
        source: 'Inspired by right-to-counsel and sentencing disparity research'
      },
      {
        text: 'We reanalyzed 14 published priming studies (total N = 4,203) using multiverse analysis, specifying 288 analytic choices per study. The original effects were significant under a median of only 23% of specifications. Five studies crossed the threshold under fewer than 5% of alternatives. These findings suggest published priming effects are substantially less robust than their p-values imply.',
        isReal: true, difficulty: 'hard',
        tells: [
          { phrase: '288 analytic choices', note: 'Specific and irregular number — calculated from the actual decision tree, not invented' },
          { phrase: '23% of specifications', note: 'Reports a precise, unflattering replication metric' },
          { phrase: 'fewer than 5%', note: 'Acknowledges that some findings essentially fail replication entirely' }
        ],
        source: 'Inspired by multiverse analysis work (e.g., Steegen et al., 2016)'
      },
      {
        text: 'This paper documents how a single contaminated ingredient from a Tier 3 supplier in Jiangsu province cascaded through four intermediaries before triggering a voluntary recall of 14 million units of infant formula across 23 countries. We trace the failure through audit records, showing that each intermediary passed inspection by relying on upstream certificates of analysis without independent testing.',
        isReal: true, difficulty: 'medium',
        tells: [
          { phrase: 'Tier 3 supplier in Jiangsu province', note: 'Names the specific supply tier and region' },
          { phrase: '14 million units', note: 'Concrete scale of the recall' },
          { phrase: 'without independent testing', note: 'Identifies the specific systemic failure — not a vague "need for improvement"' }
        ],
        source: 'Inspired by infant formula contamination incidents (e.g., Abbott 2022 recall)'
      },
      {
        text: 'Analysis of Landsat 8 imagery (2013–2023) reveals that 31% of mangrove cover in the Sundarbans has been lost, with the highest rates adjacent to aquaculture expansion. Spatial regression (n = 2,847 grid cells) estimates each additional hectare of shrimp farming is associated with 0.73 hectares of mangrove loss (95% CI: 0.61–0.85).',
        isReal: true, difficulty: 'easy',
        tells: [
          { phrase: 'Landsat 8', note: 'Names the specific satellite platform and date range' },
          { phrase: '2,847 grid cells', note: 'Irregular, precise sample size from real gridded analysis' },
          { phrase: '0.73 hectares', note: 'Reports effect with confidence interval in interpretable units' }
        ],
        source: 'Inspired by remote sensing studies of Sundarbans deforestation'
      },
      {
        text: 'In a longitudinal study of 189 newly hired employees at a Fortune 500 tech company, we tracked socialization over 18 months using passive email metadata. Network centrality at month 3 predicted voluntary turnover at month 18 (HR = 0.67, 95% CI: 0.52–0.86), controlling for performance, salary, and job satisfaction. The effect was mediated by informal advice-seeking ties but not formal mentoring.',
        isReal: true, difficulty: 'hard',
        tells: [
          { phrase: '189 newly hired', note: 'Small, specific N from a single organization — realistic for longitudinal field research' },
          { phrase: 'HR = 0.67', note: 'Reports a hazard ratio with CI — appropriate for survival/turnover analysis' },
          { phrase: 'not formal mentoring', note: 'Reports null findings alongside significant ones' }
        ],
        source: 'Inspired by organizational network research (e.g., Burt, 2004)'
      },
      {
        text: 'Using hand-collected data on 847 earnings calls (2019–2022), we trained a BERT classifier to detect verbal hedging by CFOs. Firms whose CFOs increased hedging ≥1 SD above their own baseline subsequently missed consensus estimates 72% of the time within two quarters (vs. 31% baseline; χ² = 89.4, p < .001).',
        isReal: true, difficulty: 'medium',
        tells: [
          { phrase: '847 earnings calls', note: 'Odd number from hand-collected data — not a round fabricated count' },
          { phrase: '≥1 SD above their own baseline', note: 'Within-subject deviation, not an arbitrary threshold' },
          { phrase: 'χ² = 89.4', note: 'Specific test statistic, not just "significant"' }
        ],
        source: 'Inspired by linguistic analysis of earnings calls (e.g., Loughran & McDonald, 2011)'
      },
      {
        text: 'We exploit a 2016 regulatory change in Brazil mandating XBRL disclosures for listed firms. Using staggered difference-in-differences (n = 326), we find XBRL reduced information asymmetry (bid-ask spread down 14%, p = .007) but also reduced analyst coverage by 9% (p = .02), consistent with structured data substituting for intermediary analysis.',
        isReal: true, difficulty: 'hard',
        tells: [
          { phrase: 'staggered difference-in-differences', note: 'Names a specific causal identification strategy' },
          { phrase: 'n = 326', note: 'Precise N from the universe of Brazilian listed firms' },
          { phrase: 'reduced analyst coverage by 9%', note: 'Reports an unexpected counter-finding that complicates the narrative' }
        ],
        source: 'Inspired by mandatory disclosure and XBRL adoption research'
      },
      {
        text: 'We analyzed 2.3 million emergency department visits across 412 U.S. hospitals (March 2020–December 2021). Non-COVID ED visits declined 42% during the first wave but recovered to only 89% of baseline by Q4 2021. Heart attack presentations fell 38% during lockdowns, suggesting significant undiagnosed cardiac events.',
        isReal: true, difficulty: 'easy',
        tells: [
          { phrase: '2.3 million', note: 'Large, precise sample from real hospital data' },
          { phrase: '412 U.S. hospitals', note: 'Specific institutional count' },
          { phrase: '89% of baseline', note: 'Reports incomplete recovery honestly rather than rounding to a neat conclusion' }
        ],
        source: 'Inspired by pandemic healthcare utilization studies (e.g., Lange et al., 2020, MMWR)'
      },
      {
        text: 'A cluster-randomized trial in 62 schools across three districts evaluated structured inquiry-based science instruction. After one year, treatment students (n = 3,421) scored 0.18 SD higher than controls (n = 3,108; p = .003). Effects concentrated among free/reduced lunch students (0.27 SD, p < .001), with no effect for higher-income students.',
        isReal: true, difficulty: 'medium',
        tells: [
          { phrase: '62 schools across three districts', note: 'Specific cluster-level details' },
          { phrase: 'n = 3,421', note: 'Irregular count from actual enrollment data' },
          { phrase: 'no effect for higher-income students', note: 'Reports heterogeneous effects honestly, including null subgroup findings' }
        ],
        source: 'Inspired by education RCTs (e.g., NCER-funded evaluations)'
      },
      {
        text: 'In the contemporary era of globalization, it is increasingly imperative that organizations develop robust strategies for navigating the complexities of the business landscape. This study employs a comprehensive methodological framework to investigate the multifaceted dimensions of organizational resilience. Our findings suggest that a holistic approach, encompassing both quantitative and qualitative paradigms, may potentially yield significant insights into the mechanisms through which firms achieve sustainable competitive advantages in an ever-changing marketplace.',
        isReal: false, difficulty: 'easy',
        tells: [
          { phrase: 'increasingly imperative', note: 'Empty intensifier — "important" would suffice' },
          { phrase: 'multifaceted dimensions', note: 'Buzzword padding with no specific content' },
          { phrase: 'may potentially yield significant insights', note: 'Triple-hedged conclusion: "may" + "potentially" + "insights" (not findings)' },
          { phrase: 'ever-changing marketplace', note: 'Cliché filler with no analytical purpose' }
        ],
        source: 'AI-generated (GPT-style prompted abstract)'
      },
      {
        text: 'In this research, we explore the profound mastering technique and its application to sentiment classification. A total of participants were recruited from a large university. Results demonstrate that the proposed approach significantly outperforms baseline methods. The implications of these findings are discussed in relation to the broader theoretical landscape.',
        isReal: false, difficulty: 'easy',
        tells: [
          { phrase: 'profound mastering', note: 'Tortured phrase — paper mill synonym for "deep learning"' },
          { phrase: 'A total of participants', note: 'Sample size literally missing — template was never filled in' },
          { phrase: 'large university', note: 'No institution named or described' },
          { phrase: 'broader theoretical landscape', note: 'Generic filler conclusion' }
        ],
        source: 'Paper mill style (tortured phrase pattern)'
      },
      {
        text: 'This study investigates the relationship between remote work adoption and employee productivity in the post-pandemic workplace. Drawing on data from several organizations across multiple industries, we employ regression analysis to examine the potential effects of flexible work arrangements on various performance metrics. Our results indicate that remote work may be associated with modest improvements in certain productivity indicators, though the relationship appears to be moderated by several contextual factors that warrant further investigation.',
        isReal: false, difficulty: 'medium',
        tells: [
          { phrase: 'several organizations', note: 'How many? Vague where a real paper would specify' },
          { phrase: 'multiple industries', note: 'Which industries? Real papers name them' },
          { phrase: 'various performance metrics', note: 'What metrics? Completely unspecified' },
          { phrase: 'may be associated with modest improvements in certain', note: 'Quadruple hedge in a single clause' }
        ],
        source: 'AI-generated (hedging-heavy style)'
      },
      {
        text: 'The current study aims to address the pressing need for innovative solutions in the domain of supply chain sustainability. Building upon the seminal works in this field, we develop a novel theoretical framework that integrates environmental, social, and economic dimensions. Through a rigorous analysis, our model demonstrates excellent fit to the data. These results have important implications for both academics and practitioners engaged in sustainable operations management.',
        isReal: false, difficulty: 'medium',
        tells: [
          { phrase: 'pressing need for innovative solutions', note: 'Urgency claim without evidence of the need' },
          { phrase: 'seminal works in this field', note: 'Claims to build on foundational research without naming any of it' },
          { phrase: 'excellent fit to the data', note: 'No fit indices reported (no CFI, RMSEA, R², nothing)' },
          { phrase: 'important implications for both academics and practitioners', note: 'Template conclusion found in paper mill output' }
        ],
        source: 'AI-generated (template academic style)'
      },
      {
        text: 'We examine whether algorithmic hiring tools reproduce or mitigate demographic disparities in resume screening. Using a field experiment at a mid-size technology company, we submitted 500 pairs of matched resumes through human and algorithmic channels. The algorithmic channel produced less variance in callback rates across demographic groups, though overall callback rates were lower. We discuss implications for regulatory approaches to automated employment decisions.',
        isReal: false, difficulty: 'hard',
        tells: [
          { phrase: 'a mid-size technology company', note: 'Real field experiments name or describe the organization more specifically' },
          { phrase: '500 pairs', note: 'Suspiciously round number for real experimental data' },
          { phrase: 'less variance', note: 'No effect size, no significance test, no confidence interval — just a directional claim' }
        ],
        source: 'AI-generated (convincing but underspecified)'
      },
      {
        text: 'Leveraging the synergistic potential of blockchain technology and artificial intelligence, this paper presents a paradigm-shifting framework for revolutionizing global supply chain transparency. Our cutting-edge methodology harnesses the power of distributed ledger systems to unlock unprecedented visibility into multi-tier supplier networks. The results unequivocally demonstrate transformative potential across diverse industry verticals.',
        isReal: false, difficulty: 'easy',
        tells: [
          { phrase: 'synergistic potential', note: 'Marketing language, not academic' },
          { phrase: 'paradigm-shifting framework', note: 'Extraordinary claim with no evidence' },
          { phrase: 'cutting-edge methodology', note: 'Self-promotional adjective — peer reviewers judge that, not authors' },
          { phrase: 'diverse industry verticals', note: 'Business jargon, not academic terminology' }
        ],
        source: 'AI-generated (promotional/marketing tone)'
      },
      {
        text: 'This research contributes to the growing literature on organizational deception by examining both its antecedents and consequences across multiple levels of analysis. On the one hand, we find evidence supporting the role of competitive pressure in driving deceptive behavior. On the other hand, our results also highlight the mitigating influence of ethical leadership. Furthermore, we note both theoretical and practical implications. These findings advance our understanding while simultaneously opening new avenues for future research.',
        isReal: false, difficulty: 'medium',
        tells: [
          { phrase: 'On the one hand', note: 'Template balance structure — "on the one hand... on the other hand" creates false symmetry' },
          { phrase: 'both theoretical and practical implications', note: 'Claims implications without specifying any' },
          { phrase: 'advance our understanding while simultaneously opening new avenues', note: 'Every paper "advances understanding" — this says nothing specific' }
        ],
        source: 'AI-generated (balanced-structure template)'
      },
      {
        text: 'Using a dataset of 12,000 customer reviews from an online retail platform, we apply natural language processing to detect fraudulent reviews. Our classifier achieves 91% accuracy on held-out test data. Fraudulent reviews showed lower linguistic diversity, higher first-person pronoun rates, and temporal clustering around product launches. The model generalizes to a second platform with accuracy declining to 84%.',
        isReal: false, difficulty: 'hard',
        tells: [
          { phrase: '12,000 customer reviews', note: 'Round number — real scraped datasets rarely land on exact thousands' },
          { phrase: 'an online retail platform', note: 'Which platform? Real papers name data sources' },
          { phrase: '91% accuracy', note: 'Reports only accuracy — no precision, recall, F1, or AUC, which are standard for classification tasks' }
        ],
        source: 'AI-generated (technical-sounding but underspecified)'
      },
      {
        text: 'In recent years, the digital transformation has profoundly reshaped the landscape of the scholarly publishing ecosystem. This study utilizes an exploratory sequential mixed-methods design to comprehensively investigate the intersection of bibliometric indicators and manuscript quality assessment. We analyze the relationship between citation frequency and the perceived impact factor of articles across a range of disciplinary domains.',
        isReal: false, difficulty: 'medium',
        tells: [
          { phrase: 'profoundly reshaped the landscape', note: 'Cliché opening with no analytical content' },
          { phrase: 'scholarly publishing ecosystem', note: 'Unnecessarily ornate — "academic publishing" is the standard term' },
          { phrase: 'perceived impact factor', note: 'Impact factor is a journal metric, not a paper metric — this reveals conceptual confusion' }
        ],
        source: 'AI-generated (conceptual error masked by formal language)'
      },
      {
        text: 'We hypothesize that firms announcing share buybacks during periods of insider selling face greater market skepticism. Analyzing 1,200 buyback announcements from 2015–2023, we find cumulative abnormal returns in the [−1, +3] window are 1.8 percentage points lower when accompanied by concurrent insider sales (p = .009). The effect is concentrated among firms with lower institutional ownership and weaker governance scores.',
        isReal: false, difficulty: 'hard',
        tells: [
          { phrase: '1,200 buyback announcements', note: 'Round number — real hand-collected datasets rarely land exactly on round thousands' },
          { phrase: 'weaker governance scores', note: 'Which governance index? Real finance papers specify (e.g., ISS, G-Index, E-Index)' },
          { phrase: '1.8 percentage points lower', note: 'No standard errors or confidence intervals alongside the estimate' }
        ],
        source: 'AI-generated (mimics finance empirical style)'
      },
      {
        text: 'The study of breast cancer detection has garnered significant attention in recent decades. We propose a comprehensive approach utilizing random forest algorithms for early tumor classification. Our experimental results on a publicly available dataset show that the proposed method achieves 97.8% accuracy, which is superior to existing methods. The proposed method can serve as a valuable tool for clinical practitioners in the healthcare domain.',
        isReal: false, difficulty: 'easy',
        tells: [
          { phrase: 'garnered significant attention', note: 'Template opening found across thousands of paper mill submissions' },
          { phrase: 'a publicly available dataset', note: 'Which dataset? Real papers name it (e.g., Wisconsin Breast Cancer Dataset)' },
          { phrase: 'proposed method', note: 'Appears three times — repetitive template language' },
          { phrase: 'healthcare domain', note: '"Domain" as a suffix is a paper mill marker' }
        ],
        source: 'Paper mill style (medical ML template)'
      },
      {
        text: 'Employee burnout represents a critical challenge facing contemporary organizations. Through a cross-sectional survey of knowledge workers (n = 450), we examine the dual role of workload intensity and organizational support. Results from structural equation modeling suggest that both factors contribute meaningfully to burnout outcomes (standardized path coefficients of 0.42 and −0.38). Mediation analysis reveals that perceived autonomy partially accounts for the support-burnout relationship. We conclude that organizations should pursue balanced approaches to workload management.',
        isReal: false, difficulty: 'medium',
        tells: [
          { phrase: 'contemporary organizations', note: 'Generic qualifier — real papers specify the organizational context' },
          { phrase: 'n = 450', note: 'Suspiciously round sample size' },
          { phrase: '0.42 and −0.38', note: 'Path coefficients reported without model fit indices (no CFI, TLI, RMSEA, SRMR)' },
          { phrase: 'balanced approaches', note: 'Non-actionable recommendation — real papers suggest specific interventions' }
        ],
        source: 'AI-generated (SEM-mimicking style)'
      }
    ];

    let round = 0;
    let score = 0;
    let items = [];

    function start() {
      items = BreakRoom.shuffle([...ITEMS]).slice(0, 8);
      round = 0;
      score = 0;
      renderRound();
    }

    function highlightTells(text, tells) {
      let result = text;
      tells.forEach(t => {
        const escaped = t.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        result = result.replace(new RegExp(escaped, 'g'), `<mark class="aa-tell">${t.phrase}</mark>`);
      });
      return result;
    }

    function renderRound() {
      const item = items[round];
      container.innerHTML = `
        <div class="aa-game">
          <div class="aa-header">
            <span>Round ${round + 1} of 8</span>
            <span>Score: <strong>${score}</strong> / ${round}</span>
          </div>
          <div class="progress-bar"><div class="fill" style="width:${(round / 8) * 100}%"></div></div>

          <div class="aa-text-box">
            <div class="aa-text" id="aa-text">${item.text}</div>
          </div>

          <div class="aa-choices">
            <button class="aa-choice aa-real" id="aa-real">\u{1F4D6} Real Paper</button>
            <button class="aa-choice aa-ai" id="aa-ai">\u{1F916} AI / Paper Mill</button>
          </div>
        </div>
      `;

      container.querySelector('#aa-real').onclick = () => answer(true);
      container.querySelector('#aa-ai').onclick = () => answer(false);
    }

    function answer(guessedReal) {
      const item = items[round];
      const correct = guessedReal === item.isReal;
      if (correct) score++;

      const textEl = container.querySelector('#aa-text');
      textEl.innerHTML = highlightTells(item.text, item.tells);

      const btns = container.querySelectorAll('.aa-choice');
      btns.forEach(btn => { btn.disabled = true; btn.classList.add('disabled'); });

      const correctBtn = item.isReal ? container.querySelector('#aa-real') : container.querySelector('#aa-ai');
      const wrongBtn = item.isReal ? container.querySelector('#aa-ai') : container.querySelector('#aa-real');
      correctBtn.classList.add('correct');
      if (!correct) wrongBtn.classList.add('wrong');

      const reveal = document.createElement('div');
      reveal.className = 'aa-reveal';
      reveal.innerHTML = `
        <div class="aa-verdict ${correct ? 'right' : 'miss'}">${correct ? 'Correct! +1' : 'Wrong. +0'}</div>
        <div class="aa-answer-label">${item.isReal ? '\u{1F4D6} REAL PAPER' : '\u{1F916} AI / PAPER MILL'}</div>
        <div class="aa-tells-title">Key indicators:</div>
        <div class="aa-tells">
          ${item.tells.map(t => `
            <div class="aa-tell-item">
              <span class="aa-tell-phrase">"${t.phrase}"</span>
              <span class="aa-tell-note">${t.note}</span>
            </div>
          `).join('')}
        </div>
        <div class="aa-source">[${item.source}]</div>
        <div class="aa-actions">
          <button class="btn btn-primary" id="aa-next">${round < 7 ? 'Next Round →' : 'See Results'}</button>
        </div>
      `;
      container.querySelector('.aa-game').appendChild(reveal);

      container.querySelector('#aa-next').onclick = () => {
        round++;
        if (round >= 8) showResults();
        else renderRound();
      };
    }

    function showResults() {
      BreakRoom.showResult(container, {
        score, max: 8, game: 'abstract-or-ai',
        verdicts: [
          'AI detector. You can smell the silicon.',
          'Good nose for fakes. Most fooled you not.',
          'The machines got past you. Check for hedging.',
          'Are you sure YOU weren\'t written by AI?'
        ]
      });

      const note = document.createElement('div');
      note.style.cssText = 'text-align:center;font-size:0.75rem;color:var(--text-dim);margin-top:12px;opacity:0.6;';
      note.textContent = 'Content curated May 2026. AI detection heuristics evolve rapidly.';
      container.appendChild(note);
    }

    start();
  }
});
