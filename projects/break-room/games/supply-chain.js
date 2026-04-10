BreakRoom.register({
  id: 'supply-chain',
  name: 'SC Disaster Roulette',
  icon: '\u{1F6A2}',
  description: 'Supply chain crisis hits. Pick the best response.',
  play(container) {
    const scenarios = [
      {
        scenario: "A key Tier-2 supplier in Shenzhen just went bankrupt overnight. They supply a critical microcontroller for your flagship product. Production stops in 72 hours.",
        options: [
          { text: "Immediately source from the next cheapest supplier on Alibaba", correct: false },
          { text: "Activate your pre-qualified alternate supplier list and expedite qualification of the top candidate while negotiating bridge stock from a broker", correct: true },
          { text: "Redesign the product to use a different microcontroller", correct: false }
        ],
        explain: "Panic-buying from unvetted suppliers introduces quality and counterfeit risk. Redesign takes months. The correct approach is maintaining a pre-qualified AVL (Approved Vendor List) and having broker relationships for bridge supply. [Supply chain resilience best practice, Christopher 2016]"
      },
      {
        scenario: "Your freight forwarder reports that the container ship carrying 40% of your Q4 inventory is stuck in the Suez Canal. Estimated delay: 2-4 weeks. Black Friday is in 3 weeks.",
        options: [
          { text: "Wait it out — the canal will clear eventually", correct: false },
          { text: "Air-freight the most critical SKUs while re-routing remaining containers around the Cape of Good Hope, and communicate proactively with retailers about potential delays", correct: true },
          { text: "Cancel all Q4 promotional commitments immediately", correct: false }
        ],
        explain: "Waiting is passive and risky. Cancelling everything is an overreaction that damages retailer relationships. The balanced approach segments inventory by criticality: air-freight high-margin items, re-route the rest, and manage stakeholder expectations. [Lessons from Suez Canal blockage, 2021]"
      },
      {
        scenario: "Quality audit reveals that a supplier has been substituting a cheaper alloy in a safety-critical automotive component for the past 6 months. 50,000 units are in the field.",
        options: [
          { text: "Quietly replace the supplier and use the correct alloy going forward — no need to alarm customers", correct: false },
          { text: "Issue an immediate stop-ship, initiate a recall investigation, notify regulatory bodies, and begin forensic supply chain analysis to determine scope of the substitution", correct: true },
          { text: "Demand the supplier pay for a recall and continue the relationship with stricter audits", correct: false }
        ],
        explain: "This is material fraud with safety implications. Concealing it is illegal and unethical. Continuing with the same supplier signals tolerance. Regulatory notification, stop-ship, and forensic investigation are mandatory. [NHTSA recall requirements; Roth et al., 2008 on supply chain fraud]"
      },
      {
        scenario: "Your sole-source supplier of a pharmaceutical API just received an FDA warning letter. They have 30 days to respond. Your drug product has no approved alternate source.",
        options: [
          { text: "File a Drug Master File amendment immediately to qualify a backup supplier, engage your regulatory team to assess impact, and build safety stock from current compliant batches", correct: true },
          { text: "Wait for the supplier's FDA response before taking any action", correct: false },
          { text: "Switch to an unapproved offshore supplier to avoid any production gap", correct: false }
        ],
        explain: "Sole-sourcing a critical API is already a risk. Using unapproved sources violates FDA regulations. Waiting is passive. The correct response is parallel-pathing: build compliant safety stock now, start the lengthy alternate qualification process, and stay in close contact with the supplier about their remediation. [FDA guidance on drug shortages]"
      },
      {
        scenario: "A ransomware attack has encrypted your ERP system. You can't see inventory levels, pending orders, or supplier commitments. Operations are blind.",
        options: [
          { text: "Pay the ransom immediately to restore operations", correct: false },
          { text: "Activate your business continuity plan: switch to manual order tracking, contact key suppliers directly to confirm open POs, engage your cyber response team, and restore from backups", correct: true },
          { text: "Shut everything down until IT fixes it — it's not a supply chain problem", correct: false }
        ],
        explain: "Paying ransoms funds criminal enterprises and doesn't guarantee data recovery. Ignoring it as 'an IT problem' halts operations. BCP activation with manual fallback processes keeps the supply chain moving while systems are restored. [NIST Cybersecurity Framework; Boyson, 2014]"
      },
      {
        scenario: "You discover that your Chinese Tier-1 supplier is actually subcontracting 80% of production to an unknown facility in a different province with no quality certifications.",
        options: [
          { text: "Accept it as long as quality test results are still passing", correct: false },
          { text: "Demand full supply chain transparency, audit the subcontractor immediately, and update your contract to require disclosure and pre-approval of all subcontracting", correct: true },
          { text: "Drop the supplier immediately and find a new one", correct: false }
        ],
        explain: "Passing quality tests today doesn't mean there isn't systemic risk. Dropping without a backup causes disruption. The right move is gaining visibility: audit, require contractual disclosure, and build the relationship on transparency rather than trust alone. [Choi & Linton, 2011 on supply chain transparency]"
      },
      {
        scenario: "A major port strike begins at Long Beach and LA. Your next three container shipments are stuck at anchor. These ports handle 40% of US inbound container traffic.",
        options: [
          { text: "Divert shipments to alternate ports (Oakland, Savannah, Houston), arrange intermodal transport to final destinations, and notify customers of revised ETAs", correct: true },
          { text: "Wait for the strike to end — they never last more than a week", correct: false },
          { text: "Switch all future shipments to air freight permanently", correct: false }
        ],
        explain: "Port strikes can last weeks or months (2002 lockout lasted 10 days and took months to clear the backlog). Permanent air freight is cost-prohibitive. Diversifying port entry points and having flexible intermodal logistics is the resilient approach. [Wilson, 2007 on port disruption]"
      },
      {
        scenario: "Incoming inspection finds counterfeit electronic components in a shipment from a long-trusted distributor. The lot numbers don't match the manufacturer's records.",
        options: [
          { text: "Reject the lot, quarantine all inventory from this distributor, request full traceability documentation, and notify ERAI/GIDEP of the suspect parts", correct: true },
          { text: "Return the batch and ask for a replacement from the same distributor", correct: false },
          { text: "Test the components — if they work, use them", correct: false }
        ],
        explain: "Counterfeit components can pass initial testing but fail in the field with catastrophic results (especially in aerospace/defense). Industry reporting (ERAI/GIDEP) protects others. Full quarantine and traceability investigation is required. [SAE AS6171 counterfeit detection standard]"
      },
      {
        scenario: "Your forecasting model predicted 100K units demand for Q1. Actual demand is 250K. You're out of stock everywhere and competitors are picking up your customers.",
        options: [
          { text: "Fire the demand planning team and buy a better AI forecasting tool", correct: false },
          { text: "Expedite production, allocate existing inventory to highest-value channels, conduct a post-mortem on the forecast miss, and implement demand sensing with shorter planning cycles", correct: true },
          { text: "Accept the lost sales — you'll catch up in Q2", correct: false }
        ],
        explain: "Blaming tools or people doesn't solve the problem. Accepting losses is passive. The correct response addresses both the immediate shortage (expedite + allocate) and the systemic issue (forecast methodology). 150% forecast error suggests missing market signals. [Chopra & Meindl on demand planning]"
      },
      {
        scenario: "A new tariff of 25% is announced on all goods from your primary manufacturing country, effective in 90 days. Your margins are 18%.",
        options: [
          { text: "Absorb the cost and hope the tariff gets reversed", correct: false },
          { text: "Immediately raise prices 25% across the board", correct: false },
          { text: "Model the margin impact by product line, accelerate pre-tariff inventory builds, begin qualifying alternate country sources for highest-impact SKUs, and negotiate cost-sharing with suppliers", correct: true }
        ],
        explain: "Absorbing wipes out profitability. Blanket price increases risk demand destruction. The analytical approach segments the problem: some products can absorb partial cost, some need price adjustment, some need supply base diversification. 90 days allows strategic pre-buying. [Trade policy response frameworks]"
      },
      {
        scenario: "Your 3PL warehouse just failed a surprise FDA audit. They handle all your food-grade products. The facility is shut down pending remediation.",
        options: [
          { text: "Move all inventory to your own facility over the weekend", correct: false },
          { text: "Activate your backup 3PL agreement, transfer only products at risk of expiry or committed orders, and work with the primary 3PL on their corrective action timeline", correct: true },
          { text: "Tell customers all orders are delayed indefinitely", correct: false }
        ],
        explain: "Rushing a move risks damage and cold chain breaks. Indefinite delays lose customers. Having a pre-arranged backup 3PL (even at higher cost) provides resilience. Prioritize by urgency while working the remediation path. [FDA FSMA requirements; 3PL contingency planning]"
      },
      {
        scenario: "A viral social media post accuses your brand of using child labor in your supply chain. It's trending. Your compliance team says the claim is about a sub-supplier three tiers deep that you've never audited.",
        options: [
          { text: "Issue a denial statement — you don't directly employ children", correct: false },
          { text: "Acknowledge the concern publicly, commit to an immediate independent audit of the sub-supplier, publish your supply chain due diligence policy, and join an industry monitoring initiative", correct: true },
          { text: "Quietly cut ties with the Tier-1 supplier to distance yourself", correct: false }
        ],
        explain: "Denial without investigation looks like cover-up. Quiet action without transparency doesn't address public trust. Modern supply chain due diligence (UN Guiding Principles, EU CSDDD) requires proactive human rights assessment across tiers. [UN Guiding Principles on Business and Human Rights]"
      },
      {
        scenario: "You just learned that both your primary and backup suppliers of a critical raw material source from the same mine in the DRC. Your 'dual sourcing' strategy is actually single-sourced at origin.",
        options: [
          { text: "Accept the risk — the mine has been reliable for decades", correct: false },
          { text: "Map your full sub-tier supply network, identify true alternate origins, and develop a sourcing strategy that ensures geographic and ownership diversity at the extraction level", correct: true },
          { text: "Stockpile 2 years of material as a buffer", correct: false }
        ],
        explain: "This is a common hidden concentration risk. Stockpiling ties up capital and has shelf-life issues. True resilience requires sub-tier visibility and genuine diversification of origin, not just diversification of direct suppliers. [Simchi-Levi on hidden supply chain risks]"
      },
      {
        scenario: "Your logistics team discovers that a critical shipment was rerouted through a sanctioned country without your knowledge. The goods may have technically violated export controls.",
        options: [
          { text: "Ignore it — the goods arrived at the right destination eventually", correct: false },
          { text: "Delete the routing records to avoid an audit trail", correct: false },
          { text: "Self-disclose to the relevant export control authority (BIS/OFAC), investigate how the routing occurred, implement controls to prevent recurrence, and review your freight forwarder's compliance procedures", correct: true }
        ],
        explain: "Ignoring or concealing creates massive legal liability. Voluntary self-disclosure typically results in significantly reduced penalties and demonstrates good faith. Export control violations can result in criminal penalties. [BIS voluntary self-disclosure guidelines; OFAC enforcement]"
      },
      {
        scenario: "A natural disaster destroys a key semiconductor fab. Lead times for your critical chips just jumped from 12 weeks to 52 weeks. Every competitor is scrambling for the same allocation.",
        options: [
          { text: "Place massive orders with every available supplier to secure allocation", correct: false },
          { text: "Assess your BOM for redesign opportunities, engage directly with the fab on allocation priority, evaluate last-time-buy options for current stock, and collaborate with customers on demand prioritization", correct: true },
          { text: "Pause new product development until supply normalizes", correct: false }
        ],
        explain: "Panic ordering (double/triple booking) amplifies the bullwhip effect and inflates the shortage. Pausing development loses competitive ground. The strategic response combines demand management, design flexibility, and direct supplier engagement. The 2011 Thailand floods and 2021 chip shortage both demonstrated this. [Sheffi, 2015 on supply chain resilience]"
      },
      {
        scenario: "Your ESG audit reveals that your largest supplier's factory has carbon emissions 3x higher than reported. Your sustainability report, already published, cited their numbers.",
        options: [
          { text: "Issue a correction to your sustainability report, engage the supplier on accurate measurement and reduction targets, and implement independent verification for Scope 3 emissions going forward", correct: true },
          { text: "It's their emissions, not yours — Scope 3 is optional anyway", correct: false },
          { text: "Drop the supplier and find a greener one before anyone notices", correct: false }
        ],
        explain: "Scope 3 reporting is increasingly mandatory (SEC, EU CSRD). Concealing known inaccuracies is greenwashing with legal consequences. The mature response is correction, verification, and collaborative improvement — not blame-shifting or quiet supplier replacement. [GHG Protocol Scope 3 guidance; EU CSRD requirements]"
      },
      {
        scenario: "Your JIT system is working perfectly — until a snowstorm shuts down I-80 for 3 days. You have 4 hours of buffer stock. The assembly line will stop.",
        options: [
          { text: "Nothing to do now — JIT is supposed to minimize inventory", correct: false },
          { text: "Implement a hybrid approach: maintain strategic safety stock for weather-sensitive routes, diversify transport modes (rail backup), and add weather risk to your S&OP planning process", correct: true },
          { text: "Abandon JIT entirely and switch to large safety stock buffers", correct: false }
        ],
        explain: "Pure JIT is fragile to disruption. Abandoning it wastes capital on excess inventory. The balanced approach is 'JIT where you can, JIC (just in case) where you must' — risk-segmenting your supply base and adding resilience where vulnerability is highest. [Shingo Prize research; Toyota's post-2011 supply chain reforms]"
      },
      {
        scenario: "An anonymous tip suggests your procurement manager has been accepting kickbacks from a supplier in exchange for inflated purchase orders. You have no forensic evidence yet.",
        options: [
          { text: "Confront the procurement manager directly and ask if it's true", correct: false },
          { text: "Engage forensic accounting to quietly analyze purchasing patterns, preserve digital evidence, involve legal counsel, and compare the supplier's pricing against market benchmarks", correct: true },
          { text: "Ignore anonymous tips — they're usually from disgruntled employees", correct: false }
        ],
        explain: "Direct confrontation allows evidence destruction. Ignoring tips means ignoring fraud risk. Forensic investigation with evidence preservation is essential — procurement fraud often shows patterns in data (sole-source justifications, split POs below approval thresholds, pricing anomalies). [ACFE Report to the Nations; Roth et al., 2008]"
      },
      {
        scenario: "Your warehouse management system shows 10,000 units of a critical SKU in stock. But a physical count reveals only 2,000. The discrepancy has been growing for months and nobody flagged it.",
        options: [
          { text: "Just adjust the system to match the physical count and move on", correct: false },
          { text: "Conduct a root cause investigation: audit receiving, putaway, and picking processes; review cycle count procedures; check for systematic scan errors or theft; and implement regular cycle counting with variance alerts", correct: true },
          { text: "Fire the warehouse manager for negligence", correct: false }
        ],
        explain: "An 80% inventory discrepancy indicates systemic process failure — possibly receiving errors, phantom inventory, theft, or system integration issues. Simply adjusting numbers hides the root cause and guarantees recurrence. Blaming individuals without understanding the system is ineffective. [DeHoratius & Raman (2008), 'Inventory Record Inaccuracy', Management Science 54(4)]"
      },
      {
        scenario: "Your company is launching a product in the EU market. Last week, a new regulation (similar to REACH) was announced requiring full chemical composition disclosure for all materials in your supply chain. Compliance deadline: 6 months.",
        options: [
          { text: "Ask your Tier-1 suppliers for composition data and assume it's complete", correct: false },
          { text: "Map your full material supply chain, engage a regulatory compliance specialist, send formal disclosure requests to all tiers with legal backing, and establish a material data management system for ongoing compliance", correct: true },
          { text: "Delay the EU launch until the regulation stabilizes", correct: false }
        ],
        explain: "Tier-1 suppliers often don't know what's in their own inputs. Chemical regulations like REACH require full sub-tier transparency. Waiting assumes the regulation will change (risky). The systematic approach builds lasting compliance infrastructure. [EU REACH Regulation (EC) No 1907/2006; Guide to SCIP database requirements]"
      },
      {
        scenario: "A competitor just poached your head of procurement and three senior buyers. They know your pricing, supplier relationships, contract terms, and sourcing strategy. Your next contract renewal cycle starts in 60 days.",
        options: [
          { text: "Sue them for breach of non-compete agreements", correct: false },
          { text: "Accelerate contract renewals where possible, brief remaining team on competitive intelligence risks, diversify supplier relationships the departed staff managed exclusively, and review what proprietary data they had access to", correct: true },
          { text: "Offer remaining procurement staff retention bonuses and hope for the best", correct: false }
        ],
        explain: "Non-competes are hard to enforce and slow to litigate. Passive retention bonuses don't address the strategic exposure. The priority is protecting supplier relationships and contract terms before the competitor can exploit insider knowledge. Knowledge concentration in departed staff is the real vulnerability. [Rethinking supply chain talent risk, Deloitte 2020; Harvard Business Review on key-person dependency]"
      },
      {
        scenario: "You source a specialty chemical from a single factory in a region just hit by a magnitude 7.0 earthquake. The factory is offline with no timeline for restart. This chemical has a 9-month qualification process for any new source.",
        options: [
          { text: "Start the 9-month qualification immediately and halt production of affected products until completion", correct: false },
          { text: "Search for already-qualified alternate sources in your industry network, explore whether customers will accept a temporary specification deviation with risk disclosure, and begin qualification of a new source in parallel", correct: true },
          { text: "Stockpile everything else needed for the product and wait for the factory to restart", correct: false }
        ],
        explain: "9 months of halted production is devastating. Waiting is gambling on an unknown restart timeline. The strategic response leverages industry networks (other companies may have qualified alternatives), negotiates temporary spec flexibility with customers, and starts qualification simultaneously. Post-2011 Japan earthquake, many firms adopted multi-region qualification strategies. [Simchi-Levi et al. (2014), 'Identifying Risks and Mitigating Disruptions', MIT Sloan Management Review]"
      },
      {
        scenario: "Your company's AI-powered demand forecasting system has been running for 6 months and consistently outperforms the old statistical models. But the procurement team doesn't trust it and keeps overriding its recommendations with gut-feel adjustments.",
        options: [
          { text: "Remove the override capability — the AI is more accurate", correct: false },
          { text: "Track both AI recommendations and human overrides separately, share transparent accuracy comparisons with the team, involve procurement in the model's feedback loop, and gradually build trust through demonstrated performance", correct: true },
          { text: "Replace the procurement team with people who understand AI", correct: false }
        ],
        explain: "Removing human oversight creates brittleness when the AI encounters novel situations. Replacing staff is extreme and loses domain knowledge. The change management approach builds trust through transparency — showing when the AI was right AND when human overrides added value. Research shows human-AI hybrid forecasting outperforms either alone when trust is calibrated. [Fildes et al. (2009), 'Effective forecasting and judgmental adjustments', International Journal of Forecasting 25(1)]"
      },
      {
        scenario: "Your company has been using a critical rare earth element sourced from one country that supplies 80% of the world's production. Geopolitical tensions are escalating, and export restrictions are rumored.",
        options: [
          { text: "Stockpile as much as you can afford immediately", correct: false },
          { text: "Develop a multi-horizon response: short-term strategic stockpiling within budget constraints, medium-term qualification of recycled/secondary sources and alternative-country suppliers, and long-term R&D into substitute materials", correct: true },
          { text: "Lobby the government for diplomatic intervention", correct: false }
        ],
        explain: "Pure stockpiling ties up capital and only delays the problem. Government lobbying is slow and uncertain. A multi-horizon strategy addresses immediate exposure while building structural resilience. China's 2010 rare earth export restrictions to Japan demonstrated this exact scenario — companies that had diversified sources recovered faster. [Humphries (2013), CRS Report on Rare Earth Elements; Sprecher et al. (2015), Journal of Cleaner Production]"
      },
      {
        scenario: "A routine compliance check reveals that one of your freight carriers has been systematically overcharging by applying incorrect fuel surcharges for the past 18 months. The overcharges total approximately $2.3 million.",
        options: [
          { text: "Terminate the carrier immediately and find a replacement", correct: false },
          { text: "Document the discrepancy forensically, formally dispute the charges with supporting data, negotiate a recovery plan (credit or refund), audit all other carriers for similar issues, and implement automated freight audit processes", correct: true },
          { text: "Accept it as a cost of doing business — pursuing recovery will damage the relationship", correct: false }
        ],
        explain: "Immediate termination loses leverage for recovery and disrupts logistics. Accepting $2.3M in overcharges is negligent stewardship. The professional approach documents, disputes with evidence, and recovers while addressing the systemic gap (lack of freight audit). Studies show 3-5% of freight invoices contain errors. [Aberdeen Group freight audit research; supply chain finance best practices]"
      }
    ];

    const ROUNDS = 5;
    const picked = BreakRoom.shuffle(scenarios).slice(0, ROUNDS);
    let current = 0;
    let score = 0;

    function renderScenario() {
      const s = picked[current];
      const shuffledOptions = BreakRoom.shuffle(s.options.map((o, i) => ({...o, origIdx: i})));

      container.innerHTML = `
        <div class="score-display">Scenario ${current + 1}/${ROUNDS} &middot; Score: <span>${score}</span></div>
        <div class="progress-bar"><div class="fill" style="width:${(current/ROUNDS)*100}%"></div></div>
        <div class="question-text" style="font-size:1.1rem;">${s.scenario}</div>
        <div class="choice-grid" id="sc-choices"></div>
      `;

      const grid = document.getElementById('sc-choices');
      shuffledOptions.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = opt.text;
        btn.onclick = () => judge(opt.correct, shuffledOptions, grid, s);
        grid.appendChild(btn);
      });
    }

    function judge(correct, options, grid, scenario) {
      if (correct) score++;
      const btns = grid.querySelectorAll('.choice-btn');
      btns.forEach((btn, i) => {
        btn.disabled = true;
        if (options[i].correct) btn.classList.add('correct');
        else btn.classList.add('wrong');
      });

      const feedback = document.createElement('div');
      feedback.className = 'feedback-text';
      feedback.innerHTML = `<strong>${correct ? '\u2705 Correct!' : '\u274C Not the best call.'}</strong><br>${scenario.explain}`;
      container.appendChild(feedback);

      const next = document.createElement('div');
      next.style.marginTop = '20px';
      next.innerHTML = `<button class="btn btn-primary" id="sc-next">${current < ROUNDS - 1 ? 'Next Scenario' : 'See Results'}</button>`;
      container.appendChild(next);

      document.getElementById('sc-next').onclick = () => {
        current++;
        if (current < ROUNDS) renderScenario();
        else BreakRoom.showResult(container, { score, max: ROUNDS, game: 'supply-chain',
          verdicts: [
            "Chief Resilience Officer material. Every call was right.",
            "Strong supply chain instincts. Minor gaps.",
            "Some good calls, some risky ones. Review the explanations.",
            "Your supply chain is on fire. Time to study up."
          ]
        });
      };
    }

    renderScenario();
  }
});
