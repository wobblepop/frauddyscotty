BreakRoom.register({
  id: 'methodology-roast',
  name: 'Methodology Roast',
  icon: '\u{1F525}',
  description: 'Spot the flaw in the research methods. Peer review as sport.',
  play(container) {
    const items = [
      {
        methods: "We surveyed 12 undergraduate students from our Introduction to Psychology class about their attitudes toward climate change. Based on these results, we conclude that Americans broadly support carbon taxation.",
        options: [
          "Sample size is too small and not representative — convenience sampling from one class cannot generalize to the US population",
          "The survey should have been conducted online instead of in person",
          "Climate change attitudes should be measured with physiological data, not surveys",
          "The study needed a control group"
        ],
        correct: 0,
        explain: "N=12 from a single psychology class is a textbook convenience sample. It lacks external validity — college students in one course are not representative of the American population. This violates basic sampling requirements for generalization. [Shadish, Cook & Campbell, 2002]"
      },
      {
        methods: "To test whether our new drug reduces headache pain, we gave the drug to 200 patients with headaches and found that 70% reported feeling better within 2 hours. We conclude the drug is effective.",
        options: [
          "The study should have used a larger sample size",
          "No control group or placebo condition — the improvement could be natural remission or placebo effect",
          "The researchers should have used a double-blind design",
          "2 hours is too short to measure effectiveness"
        ],
        correct: 1,
        explain: "Without a control/placebo group, there's no way to attribute improvement to the drug vs. natural headache resolution (most headaches improve on their own within 2 hours) or placebo effect. This is the most fundamental design flaw. [Randomized Controlled Trial methodology, Cochrane Handbook]"
      },
      {
        methods: "We collected data on ice cream sales and drowning rates across 50 US cities and found a strong positive correlation (r=0.89). Our results suggest that ice cream consumption leads to increased drowning risk.",
        options: [
          "The correlation coefficient should have been higher to draw conclusions",
          "The study needed more than 50 cities",
          "Confounding variable: both are driven by temperature/season — correlation is not causation",
          "The researchers should have used a regression instead of correlation"
        ],
        correct: 2,
        explain: "Classic confounding. Both ice cream sales and drowning rates increase in summer due to warm weather. The study commits the correlation-implies-causation fallacy. Temperature is the lurking variable. Regression alone wouldn't fix this without controlling for the confounder. [Pearl, 2009; Causal inference textbooks]"
      },
      {
        methods: "We ran 20 different statistical tests on our dataset examining the relationship between birth month and intelligence. One test (March births vs. September births) showed a significant result at p<0.05. We report this significant finding.",
        options: [
          "The sample was probably too small for 20 tests",
          "Multiple comparisons problem — running 20 tests at \u03B1=0.05 means ~1 false positive is expected by chance. No correction was applied",
          "They should have used a non-parametric test",
          "Birth month data is unreliable"
        ],
        correct: 1,
        explain: "With 20 tests at \u03B1=0.05, you'd expect 1 significant result by chance alone (20 \u00D7 0.05 = 1). This is p-hacking / the multiple comparisons problem. A Bonferroni or FDR correction should be applied, making the threshold ~0.0025. The 'finding' is almost certainly a Type I error. [Ioannidis, 2005; Benjamini & Hochberg, 1995]"
      },
      {
        methods: "Our longitudinal study tracked employee satisfaction over 5 years. Of the original 500 participants, 150 remained at the final measurement. We found that long-tenure employees are increasingly satisfied over time.",
        options: [
          "5 years is too short for a longitudinal study",
          "Attrition bias — the 350 who left may have been the dissatisfied ones, making remaining participants artificially satisfied",
          "Employee satisfaction should be measured quarterly, not annually",
          "The study should have controlled for salary increases"
        ],
        correct: 1,
        explain: "70% attrition is a massive threat to internal validity. Dissatisfied employees are more likely to leave (survival bias). The remaining 150 are a biased subsample. The apparent increase in satisfaction may entirely reflect who stayed, not actual attitude change. [Shadish, Cook & Campbell, 2002]"
      },
      {
        methods: "We asked participants to recall how many hours of television they watched per week as children, then correlated this with their current GPA. We found that childhood TV watching predicts lower academic performance.",
        options: [
          "GPA is not a valid measure of academic performance",
          "The study should have controlled for parent education level",
          "Recall bias — adults cannot accurately remember childhood TV habits, making the IV unreliable",
          "The study needs a larger sample size"
        ],
        correct: 2,
        explain: "Retrospective self-report of childhood behavior is notoriously unreliable. Adults reconstruct memories based on current beliefs and social desirability. The independent variable (childhood TV hours) has poor measurement validity due to recall bias. Any correlation is built on unreliable data. [Bradburn, Rips & Shevell, 1987]"
      },
      {
        methods: "Our RCT tested a new teaching method. Teachers who volunteered to use the new method showed better student outcomes than those using traditional methods. We conclude the new method is superior.",
        options: [
          "The sample of teachers was too small",
          "Student outcomes should be measured differently",
          "Self-selection bias — teachers who volunteer are likely more motivated/innovative, confounding the treatment effect with teacher quality",
          "The study should have lasted more than one semester"
        ],
        correct: 2,
        explain: "Calling it an 'RCT' is misleading when teachers self-selected into conditions. Motivated teachers who volunteer for innovation may produce better outcomes regardless of method. True randomization requires assigning teachers to conditions, not letting them choose. This is selection bias masquerading as an experiment. [What Works Clearinghouse standards]"
      },
      {
        methods: "We measured the effectiveness of a workplace wellness program by comparing employees who enrolled (n=200) with those who did not (n=800). Enrolled employees had 30% fewer sick days. The program clearly works.",
        options: [
          "The sample sizes should be equal across groups",
          "Self-selection bias — employees who choose to enroll in wellness programs are likely already healthier and more health-conscious",
          "Sick days is not a valid outcome measure",
          "The study should have used a longitudinal design"
        ],
        correct: 1,
        explain: "The healthy user bias: people who voluntarily join wellness programs tend to be healthier to begin with. Without randomization, you can't distinguish 'the program made them healthier' from 'healthier people chose to enroll.' This is a major issue in wellness program evaluation literature. [Jones et al., 2019, NBER]"
      },
      {
        methods: "We conducted semi-structured interviews with 8 CEOs about their decision-making processes. Using thematic analysis, we identified 4 themes. We conclude that these represent the universal cognitive processes of executive leadership.",
        options: [
          "Thematic analysis was the wrong qualitative method",
          "8 interviews can identify themes but cannot claim 'universal' processes — the generalization far exceeds what qualitative data supports",
          "The interviews should have been structured, not semi-structured",
          "The researchers should have also observed the CEOs in meetings"
        ],
        correct: 1,
        explain: "Qualitative research excels at depth, not breadth. 8 CEOs can reveal rich themes, but claiming 'universal cognitive processes' is an overgeneralization that violates qualitative epistemology. The findings are transferable, not generalizable in the statistical sense. [Lincoln & Guba, 1985; Creswell, 2013]"
      },
      {
        methods: "We developed a new anxiety scale and validated it by showing it correlates r=0.92 with our previously developed anxiety scale. We conclude the new scale has strong construct validity.",
        options: [
          "The correlation should be even higher for validation",
          "This only demonstrates convergent validity with their own measure — it could reflect shared method bias, not construct validity. They need to validate against independent measures and show discriminant validity",
          "They should have used factor analysis instead",
          "The new scale should have more items"
        ],
        correct: 1,
        explain: "Correlating your new scale with your own old scale mainly shows you measure things similarly to yourself. True construct validity requires: convergent validity with independent measures, discriminant validity (showing it doesn't correlate too highly with different constructs), and ideally a multitrait-multimethod matrix. [Campbell & Fiske, 1959]"
      },
      {
        methods: "Our structural equation model showed good fit indices (CFI=0.96, RMSEA=0.04) for our hypothesized model of organizational trust. We did not test alternative models. We conclude our theoretical model is confirmed.",
        options: [
          "The fit indices should be even higher",
          "Good fit does not confirm a model — many different models can fit the same data. Without testing competing models, you cannot claim yours is 'the' explanation",
          "SEM requires larger sample sizes to be valid",
          "The researchers should have used regression instead"
        ],
        correct: 1,
        explain: "SEM fit indices show consistency with data, not truth. Many structurally different models can achieve equivalent fit (the 'equivalent models' problem). Without testing alternative models, good fit is necessary but not sufficient for confirmation. This is a common overclaim in SEM research. [MacCallum et al., 1993; Tomarken & Waller, 2005]"
      },
      {
        methods: "We surveyed 2,000 managers in the US and China about leadership preferences. We found significant cultural differences. Our survey was developed in English and translated to Mandarin by a bilingual graduate student.",
        options: [
          "2,000 is not enough for cross-cultural research",
          "The survey should have been online, not paper-based",
          "Translation by one person without back-translation or cultural adaptation risks measurement non-equivalence — participants may interpret items differently across cultures",
          "The researchers should have matched samples on demographics"
        ],
        correct: 2,
        explain: "Cross-cultural measurement requires rigorous translation procedures (back-translation, committee approach), cognitive pretesting in each culture, and measurement invariance testing. A single person's translation may introduce systematic bias. Items that make sense in English may carry different connotations in Mandarin. [Brislin, 1970; Van de Vijver & Leung, 1997]"
      },
      {
        methods: "Our experiment tested whether background music improves test performance. Participants took a math test in silence, then took an equivalent test with classical music playing. Scores improved 15% with music.",
        options: [
          "Classical music is too specific — they should test multiple genres",
          "Order/practice effect — taking the second test after practicing the first could explain the improvement, independent of music. No counterbalancing was used",
          "The tests should have been harder",
          "15% improvement is not meaningful"
        ],
        correct: 1,
        explain: "This is a within-subjects design without counterbalancing. Every participant got silence first, music second. The 15% improvement could entirely reflect practice effects, familiarity with the test format, or reduced test anxiety on the second attempt. Half the participants should have gotten music first. [Within-subjects design requirements; Greenwald, 1976]"
      },
      {
        methods: "We measured job satisfaction at Time 1 and job performance at Time 2 (6 months later). We found that satisfaction predicts future performance (beta=0.34, p<0.01). We conclude that satisfaction causes better performance.",
        options: [
          "6 months is too short between measurements",
          "Beta of 0.34 is too low to draw conclusions",
          "Temporal precedence alone does not establish causation — third variables (personality, ability, job fit) could drive both satisfaction and performance, and reverse causation is not ruled out",
          "Performance should be measured with objective data, not self-report"
        ],
        correct: 2,
        explain: "Time-lagged correlations are better than cross-sectional data but still don't establish causation. Without controlling for Time 1 performance, autoregressive effects, and potential common causes, the causal claim is unsupported. Both variables could be driven by stable individual differences. [Spector, 2019; Podsakoff et al., 2012]"
      },
      {
        methods: "We used Amazon Mechanical Turk to collect responses from 500 participants for our study on workplace bullying. Participants who failed an attention check were excluded (n=47). We report results from the remaining 453.",
        options: [
          "500 is too small a sample for MTurk studies",
          "MTurk workers are not representative — they may not have workplace experience, and the context of anonymous online completion differs fundamentally from actual workplace dynamics",
          "Attention checks are unnecessary if the survey is short",
          "They should have used a different platform"
        ],
        correct: 1,
        explain: "MTurk samples skew younger, more tech-savvy, and may include many participants without relevant workplace experience. Studying 'workplace bullying' requires participants embedded in workplace contexts. Additionally, social desirability and context effects differ online vs. in organizational settings. The convenience is a threat to ecological validity. [Chandler & Shapiro, 2016]"
      },
      {
        methods: "We measured the impact of a new city policy on crime rates. Crime dropped 12% in the year after implementation. We controlled for population and economic indicators. We conclude the policy reduced crime.",
        options: [
          "12% is within normal variation",
          "Regression to the mean — if the policy was implemented during or after a crime spike, a natural decline would be expected regardless. Without a control city or interrupted time series analysis, the policy effect is confounded with temporal trends",
          "They should have measured different types of crime separately",
          "Economic indicators are not good controls"
        ],
        correct: 1,
        explain: "Policies are often enacted in response to crime spikes (political pressure). Natural regression to the mean would produce a decline anyway. Without a comparison city, a longer time series, or an interrupted time series design, the 12% decline cannot be attributed to the policy. [Campbell & Stanley, 1963; Shadish, Cook & Campbell, 2002]"
      },
      {
        methods: "Our machine learning model achieves 99.2% accuracy in predicting loan defaults on our training dataset of 10,000 loans. We recommend immediate deployment to production.",
        options: [
          "The model needs more than 10,000 training examples",
          "Training accuracy is meaningless without testing on held-out data — the model may be overfit and perform poorly on new loans. No cross-validation or test set evaluation was reported",
          "99.2% is suspicious and suggests a data error",
          "Machine learning shouldn't be used for financial decisions"
        ],
        correct: 1,
        explain: "Reporting only training accuracy is a cardinal sin of ML. A model can memorize training data (overfitting) and achieve near-perfect training accuracy while failing on new data. Standard practice requires train/test splits, cross-validation, and evaluation on held-out data before any deployment claim. [Hastie, Tibshirani & Friedman, 2009]"
      },
      {
        methods: "We conducted a meta-analysis of 8 studies on mindfulness and stress reduction. We included only published studies found through Google Scholar. Our overall effect size was d=0.72, indicating a strong effect.",
        options: [
          "8 studies is too few for a meta-analysis",
          "Publication bias — including only published studies (and only from one database) likely inflates the effect size. Unpublished null results are missing. No funnel plot or file-drawer analysis was conducted",
          "Google Scholar is a reliable academic database",
          "d=0.72 is not actually a strong effect"
        ],
        correct: 1,
        explain: "The file drawer problem: studies with significant positive results are far more likely to be published. A meta-analysis of only published studies from one source will overestimate the true effect. Proper meta-analyses search multiple databases, include grey literature, and assess publication bias via funnel plots and Egger's test. [Rothstein et al., 2005]"
      },
      {
        methods: "We compared test scores of students who chose to attend tutoring sessions (n=80) versus those who did not (n=320). Tutored students scored 15% higher. We recommend mandatory tutoring for all students.",
        options: [
          "80 students is too few for the tutoring group",
          "Self-selection bias — students who choose tutoring are likely more motivated and conscientious, which independently predicts higher scores",
          "The test was probably too easy",
          "They should have used a qualitative approach instead"
        ],
        correct: 1,
        explain: "Students who voluntarily seek tutoring are systematically different from those who don't — they are likely more motivated, more organized, and more grade-conscious. These traits predict higher scores regardless of tutoring. Without random assignment, the 15% difference cannot be attributed to the intervention. [Holland, 1986, 'Statistics and Causal Inference', JASA]"
      },
      {
        methods: "Our study on workplace productivity found that teams using standing desks produced 23% more output. We measured productivity for one week after installing the desks.",
        options: [
          "One week is too short — this is likely a novelty/Hawthorne effect, not a sustained productivity gain from the desks themselves",
          "23% is an unrealistically large effect",
          "They should have measured individual productivity, not team productivity",
          "Standing desks have health risks that should have been measured"
        ],
        correct: 0,
        explain: "The Hawthorne effect: any change in working conditions can temporarily boost productivity simply because workers know they're being observed or experience novelty. One week is far too short to distinguish genuine ergonomic benefits from attention effects. Studies need months-long follow-up to assess sustained impact. [Adair, 1984; McCarney et al. (2007), BMC Medical Research Methodology 7]"
      },
      {
        methods: "We tested our hypothesis that social media use causes depression by surveying 1,000 teenagers about their daily screen time and depressive symptoms at a single time point. The correlation was r=0.31, p<0.001.",
        options: [
          "1,000 teenagers is not enough for this kind of study",
          "Cross-sectional design cannot establish causation — depression might cause increased social media use (reverse causation), or a third variable might drive both",
          "They should have used a clinical measure of depression instead of self-report",
          "r=0.31 is too weak to be meaningful"
        ],
        correct: 1,
        explain: "Cross-sectional data captures a single snapshot and cannot determine temporal ordering or causal direction. Depressed teens may use social media more as a coping mechanism (reverse causation), or shared factors like loneliness, family conflict, or socioeconomic stress may drive both. Longitudinal or experimental designs are needed for causal claims. [Orben & Przybylski (2019), Nature Human Behaviour 3(2)]"
      },
      {
        methods: "Participants were randomly assigned to drink either caffeinated coffee (n=50) or decaf (n=50) before a memory test. The caffeinated group scored significantly higher. However, participants could taste the difference and many guessed their condition correctly.",
        options: [
          "50 per group is too small a sample",
          "The memory test may not be valid",
          "Broken blinding — participants who knew they had caffeine may have expected better performance, introducing expectancy effects that confound the pharmacological effect",
          "They should have included a no-coffee control group"
        ],
        correct: 2,
        explain: "When participants can identify their condition, the double-blind is compromised. Those who know they received caffeine may try harder or feel more confident (expectancy effect), while those on decaf may expect worse performance (nocebo). The observed difference could be partly or entirely psychological rather than pharmacological. [Kirsch & Weixel (1988), 'Double-blind versus deceptive administration', Annals of Behavioral Medicine]"
      },
      {
        methods: "We developed a new measure of 'organizational resilience' using 45 survey items. Factor analysis revealed 3 clean factors. We validated the measure by administering it to 120 managers and found high Cronbach's alpha values (all > 0.90).",
        options: [
          "45 items is too many for a survey measure",
          "Very high Cronbach's alphas (>0.90) may indicate item redundancy rather than good reliability — the items may be asking the same thing in slightly different ways, inflating alpha artificially",
          "Factor analysis was the wrong technique",
          "120 managers is not enough for validation"
        ],
        correct: 1,
        explain: "Cronbach's alpha above 0.90 is actually a red flag in scale development — it often means items are too similar (redundant). Alpha increases with the number of items and with inter-item correlation, so 45 highly correlated items will produce inflated alphas even if the measure is poor. Good scales aim for 0.70-0.90. [Streiner (2003), 'Starting at the beginning: an introduction to coefficient alpha', Journal of Personality Assessment 80(1); Clark & Watson, 1995]"
      },
      {
        methods: "We investigated whether a new teaching app improves math skills by giving it to a class of 4th graders. After 8 weeks, their math scores improved by 12 points compared to the start of the intervention.",
        options: [
          "They should have used a different measure of math skills",
          "No control group — the 12-point improvement could reflect natural learning progression over 8 weeks (maturation threat), not the app",
          "8 weeks is too short to see meaningful improvement",
          "The study should have been double-blinded"
        ],
        correct: 1,
        explain: "Without a control group, you cannot separate the effect of the app from maturation (children naturally improve in math over 8 weeks of normal schooling), testing effects (familiarity with the test), or other concurrent instruction. This is a classic one-group pretest-posttest design, the weakest quasi-experimental design. [Campbell & Stanley (1963), Experimental and Quasi-Experimental Designs for Research]"
      },
      {
        methods: "Our survey on academic dishonesty asked students directly: 'Have you ever cheated on an exam?' Only 3% reported cheating. We conclude that cheating is rare at our university.",
        options: [
          "Social desirability bias — students will underreport cheating on a direct question about stigmatized behavior, making the 3% figure unreliable",
          "The survey should have been longer",
          "They should have asked professors instead of students",
          "The question was poorly worded"
        ],
        correct: 0,
        explain: "Asking directly about socially undesirable behavior produces massive underreporting. Studies using indirect methods (randomized response technique, list experiments) consistently find cheating rates of 30-70%. Social desirability bias makes the 3% figure essentially meaningless. [McCabe, Trevino & Butterfield (2001), 'Cheating in Academic Institutions', Ethics & Behavior 11(3)]"
      },
      {
        methods: "Our experiment tested the effect of room temperature on aggression. We had participants in a hot room (95°F) and a cool room (72°F) play a competitive game. The hot room group was more aggressive. We concluded heat causes aggression.",
        options: [
          "The competitive game is not a valid measure of aggression",
          "Physical discomfort in the hot room creates demand characteristics — participants may behave more irritably because they feel generally unpleasant, not because heat specifically triggers aggression mechanisms",
          "The temperature difference was too large to be ecologically valid",
          "They needed more than two conditions"
        ],
        correct: 1,
        explain: "The hot room creates general negative affect (discomfort, irritation, fatigue) that could manifest as apparent aggression without heat specifically activating aggression mechanisms. This is the affect-aggression confound. Additionally, without controlling for awareness of the manipulation, demand characteristics may influence behavior. [Anderson (2001), 'Heat and Violence', Current Directions in Psychological Science 10(1); Berkowitz, 1989]"
      },
      {
        methods: "We analyzed Twitter posts (n=50,000) using sentiment analysis to measure public opinion on a proposed tax policy. 62% of tweets were negative. We conclude that the majority of Americans oppose the policy.",
        options: [
          "50,000 tweets is not enough data",
          "Twitter users are not representative of Americans — they skew younger, more urban, more politically engaged, and more extreme in their views. Also, sentiment analysis has significant error rates on political text",
          "Sentiment analysis is not a valid method",
          "They should have analyzed other social media platforms too"
        ],
        correct: 1,
        explain: "Twitter/X users are not a representative sample of any national population. They skew younger, more educated, more urban, and more politically extreme than the general public. Additionally, politically active users tweet disproportionately, amplifying extreme views. Sentiment analysis also has ~20-30% error rates on political text. [Mellon & Prosser (2017), 'Twitter and Facebook are not representative', Research & Politics; Pew Research Center digital demographics]"
      },
      {
        methods: "We performed a regression analysis predicting job performance from 47 predictor variables using a sample of 60 employees. Our model explained 89% of the variance (R\u00B2 = 0.89).",
        options: [
          "R\u00B2 of 0.89 suggests an excellent model",
          "47 predictors with only 60 observations is severe overfitting — the model is fitting noise, not signal. The high R\u00B2 is an artifact of having nearly as many predictors as observations",
          "They should have used a different regression technique",
          "Job performance is hard to measure objectively"
        ],
        correct: 1,
        explain: "With p=47 predictors and n=60 observations, the ratio is dangerously close to 1:1. R\u00B2 mechanically increases as predictors are added, and with nearly as many variables as observations, you can fit almost any data perfectly. The adjusted R\u00B2 and cross-validated R\u00B2 would be dramatically lower. A common rule of thumb is at least 10-20 observations per predictor. [Babyak (2004), 'What you see may not be what you get', Psychosomatic Medicine 66(3)]"
      },
      {
        methods: "Our clinical trial of a new antidepressant initially enrolled 400 patients. The first interim analysis at 6 months showed no significant effect (p=0.23). We continued the trial and conducted another analysis at 12 months (p=0.08), and a final analysis at 18 months (p=0.04). We report the 18-month finding as significant.",
        options: [
          "400 patients is too small for a clinical trial",
          "Repeated interim analyses without alpha-spending correction inflate Type I error — peeking at the data multiple times and stopping when p<0.05 is a form of optional stopping",
          "18 months is too long for an antidepressant trial",
          "The effect at 18 months may be due to the passage of time, not the drug"
        ],
        correct: 1,
        explain: "Each interim analysis is a separate chance to cross the significance threshold by chance. Three analyses at alpha=0.05 give an overall Type I error rate closer to 0.14, not 0.05. Proper sequential trials use alpha-spending functions (O'Brien-Fleming, Pocock) that adjust the threshold at each look. Without this, the p=0.04 at 18 months does not control the family-wise error rate. [O'Brien & Fleming (1979), Biometrics 35(3); Pocock (1977), Biometrika 64(2)]"
      }
    ];

    const ROUNDS = 5;
    const picked = BreakRoom.shuffle(items).slice(0, ROUNDS);
    let current = 0;
    let score = 0;

    function renderItem() {
      const item = picked[current];
      container.innerHTML = `
        <div class="score-display">Question ${current + 1}/${ROUNDS} &middot; Score: <span>${score}</span></div>
        <div class="progress-bar"><div class="fill" style="width:${(current/ROUNDS)*100}%"></div></div>
        <div style="font-size:0.85rem; color:var(--text-dim); text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;">
          Spot the flaw in these methods:
        </div>
        <div class="question-text" style="font-size:1rem; font-style:italic; background:var(--surface); padding:20px; border-radius:8px; border-left:3px solid var(--accent);">
          ${item.methods}
        </div>
        <div class="choice-grid" id="mr-choices"></div>
      `;

      const grid = document.getElementById('mr-choices');
      item.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = opt;
        btn.onclick = () => judge(idx, item, grid);
        grid.appendChild(btn);
      });
    }

    function judge(chosen, item, grid) {
      const correct = chosen === item.correct;
      if (correct) score++;

      const btns = grid.querySelectorAll('.choice-btn');
      btns.forEach((btn, i) => {
        btn.disabled = true;
        if (i === item.correct) btn.classList.add('correct');
        else if (i === chosen && !correct) btn.classList.add('wrong');
      });

      const feedback = document.createElement('div');
      feedback.className = 'feedback-text';
      feedback.innerHTML = `<strong>${correct ? '\u2705 Correct!' : '\u274C Nope.'}</strong><br>${item.explain}`;
      container.appendChild(feedback);

      const next = document.createElement('div');
      next.style.marginTop = '20px';
      next.innerHTML = `<button class="btn btn-primary" id="mr-next">${current < ROUNDS - 1 ? 'Next' : 'See Results'}</button>`;
      container.appendChild(next);

      document.getElementById('mr-next').onclick = () => {
        current++;
        if (current < ROUNDS) renderItem();
        else BreakRoom.showResult(container, { score, max: ROUNDS, game: 'methodology-roast',
          verdicts: [
            "Reviewer 2 energy. Every flaw spotted instantly.",
            "Solid methodological eye. You'd catch most bad papers.",
            "Some flaws slipped by. Read the explanations carefully.",
            "The bad methods fooled you. Time to brush up on research design."
          ]
        });
      };
    }

    renderItem();
  }
});
