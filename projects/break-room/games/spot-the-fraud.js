BreakRoom.register({
  id: 'spot-the-fraud',
  name: 'Spot the Fraud',
  icon: '\u{1F50D}',
  description: 'Find the red flag in the data. Five rounds of forensic auditing.',
  play(container) {

    const SCENARIOS = [
      {
        context: "You're reviewing vendor invoices for Q3. Company policy requires VP approval for any purchase over $10,000.",
        columns: ['Invoice #', 'Vendor', 'Date', 'Amount', 'Approver'],
        rows: [
          ['INV-3847', 'Acme Supply Co.', '2024-07-15', '$23,450.00', 'VP Finance'],
          ['INV-3851', 'Metro Office Inc.', '2024-07-22', '$8,325.50', 'Dept Manager'],
          ['INV-3856', 'ProTech Services', '2024-08-01', '$9,997.00', 'Dept Manager'],
          ['INV-3862', 'Acme Supply Co.', '2024-08-12', '$15,780.00', 'VP Finance'],
          ['INV-3870', 'GlobalParts Ltd.', '2024-08-28', '$31,200.00', 'VP Finance'],
          ['INV-3873', 'ProTech Services', '2024-09-05', '$9,850.00', 'Dept Manager'],
          ['INV-3878', 'Metro Office Inc.', '2024-09-18', '$6,450.75', 'Dept Manager']
        ],
        target: 2,
        reasons: [
          'Amount is just below the $10,000 approval threshold',
          'Vendor name is not on the approved supplier list',
          'Invoice date falls on a federal holiday',
          'The dollar amount includes suspicious cents'
        ],
        correctReason: 0,
        explanation: 'This invoice for $9,997 sits just $3 below the $10,000 VP approval threshold. ProTech Services also appears at $9,850 — a pattern of structuring invoices to avoid senior oversight. This is called "threshold splitting" or "smurfing."',
        acfeType: 'Billing Scheme',
        acfeLoss: '$100,000'
      },
      {
        context: "You're vetting new vendor registrations. The accounts payable clerk who set these up was recently flagged by the ethics hotline.",
        columns: ['Vendor', 'Address', 'Contact', 'Setup Date', 'First Invoice'],
        rows: [
          ['Delta Supply Co.', '450 Industrial Blvd, Ste 200', 'J. Martinez', '2024-01-15', '$12,400'],
          ['Greenfield Consulting', '1823 Elm Street, Apt 4B', 'R. Thompson', '2024-03-22', '$8,750'],
          ['National Parts Inc.', '8900 Commerce Dr', 'K. Anderson', '2024-02-08', '$45,600'],
          ['Premier Logistics', '2100 Harbor Way', 'S. Chen', '2024-04-10', '$22,350'],
          ['Westridge Tech', '6750 Innovation Pkwy', 'M. Davis', '2024-01-30', '$18,900']
        ],
        target: 1,
        reasons: [
          'Vendor address is a residential apartment, not a business location',
          'The contact name uses only an initial, not a full name',
          'The first invoice amount seems too low',
          'The setup date is earlier than the others'
        ],
        correctReason: 0,
        explanation: '"Greenfield Consulting" operates from "Apt 4B" — a residential apartment. Legitimate consulting firms can work remotely, but combined with an ethics hotline flag on the AP clerk, this matches the ghost vendor pattern: a fictitious company at an employee-linked address.',
        acfeType: 'Shell Company / Ghost Vendor',
        acfeLoss: '$100,000'
      },
      {
        context: "You're reviewing consulting invoices. The client company operates Monday–Friday and was closed July 4–5, 2024 for Independence Day.",
        columns: ['Consultant', 'Service Date', 'Hours', 'Rate', 'Total'],
        rows: [
          ['J. Williams', '2024-07-01 (Mon)', '8', '$150/hr', '$1,200'],
          ['M. Patel', '2024-07-02 (Tue)', '6', '$175/hr', '$1,050'],
          ['S. Lee', '2024-07-04 (Thu)', '8', '$150/hr', '$1,200'],
          ['J. Williams', '2024-07-08 (Mon)', '8', '$150/hr', '$1,200'],
          ['R. Garcia', '2024-07-09 (Tue)', '7', '$200/hr', '$1,400'],
          ['M. Patel', '2024-07-10 (Wed)', '8', '$175/hr', '$1,400']
        ],
        target: 2,
        reasons: [
          'Services billed on Independence Day when the office was closed',
          'The hourly rate is lower than the other consultants',
          'Eight hours is too many for a single consulting day',
          'The consultant name appears only once in the list'
        ],
        correctReason: 0,
        explanation: 'S. Lee billed 8 hours on July 4th — Independence Day — when the company was closed. Either the consultant was not actually on-site, or the date was fabricated. Billing for services on dates when the client was closed is a common indicator of fictitious invoicing.',
        acfeType: 'Billing Scheme (Fictitious Invoice)',
        acfeLoss: '$100,000'
      },
      {
        context: "You're auditing purchase card transactions for the facilities department. Most purchases reflect actual vendor pricing with natural decimal amounts.",
        columns: ['Cardholder', 'Date', 'Vendor', 'Amount', 'Category'],
        rows: [
          ['D. Wilson', '2024-08-05', 'Home Depot #4521', '$237.84', 'Maintenance'],
          ['K. Nguyen', '2024-08-07', 'Staples Business', '$89.47', 'Office Supply'],
          ['D. Wilson', '2024-08-12', 'Amazon Business', '$500.00', 'Equipment'],
          ['K. Nguyen', '2024-08-15', 'Grainger Supply', '$1,243.67', 'Maintenance'],
          ['J. Rivera', '2024-08-18', 'Lowe\'s #2890', '$412.53', 'Maintenance'],
          ['J. Rivera', '2024-08-22', 'Office Depot', '$67.29', 'Office Supply']
        ],
        target: 2,
        reasons: [
          'Exact round dollar amount ($500.00) is unusual for a real purchase',
          'Amazon is not an approved vendor for equipment',
          'The purchase was made on a Monday',
          'Two transactions from the same cardholder is suspicious'
        ],
        correctReason: 0,
        explanation: 'Exactly $500.00 for an Amazon purchase stands out among amounts like $237.84 and $1,243.67. Legitimate retail purchases almost never land on round numbers. Round amounts suggest an estimated, fabricated, or gift-card purchase rather than an actual business expense.',
        acfeType: 'Expense Reimbursement Fraud',
        acfeLoss: '$50,000'
      },
      {
        context: "You're reviewing invoices from three IT consulting firms hired for separate projects. Each firm should have its own independent invoicing system.",
        columns: ['Invoice #', 'Vendor', 'Project', 'Date', 'Amount'],
        rows: [
          ['LC-10234', 'LogicCore Systems', 'Server Migration', '2024-05-10', '$18,500'],
          ['NX-10235', 'NexBridge Solutions', 'Network Audit', '2024-05-12', '$22,750'],
          ['QM-10301', 'Quantum Methods', 'Data Analytics', '2024-05-20', '$14,800'],
          ['LC-10240', 'LogicCore Systems', 'Server Migration', '2024-06-10', '$18,500'],
          ['TF-10455', 'TrueForm Digital', 'Website Redesign', '2024-06-22', '$9,750']
        ],
        target: 1,
        reasons: [
          'Invoice number (10235) is sequential to another vendor\'s (10234) — shared invoicing system',
          'The project name is too vague for an IT engagement',
          'The amount is the highest in the table',
          'The invoice date is only two days after the previous one'
        ],
        correctReason: 0,
        explanation: 'NexBridge\'s invoice #10235 is sequential to LogicCore\'s #10234. Independent companies maintain separate numbering systems — sequential numbers across different vendors indicate they likely share an invoicing system, or are the same entity operating under different names.',
        acfeType: 'Shell Company / Vendor Fraud',
        acfeLoss: '$100,000'
      },
      {
        context: "You're checking procurement compliance. Company policy requires a purchase order (PO) to be approved before any vendor work begins.",
        columns: ['PO #', 'PO Date', 'Vendor', 'Invoice Date', 'Amount'],
        rows: [
          ['PO-2240', '2024-03-01', 'Allied Equipment', '2024-03-15', '$28,400'],
          ['PO-2243', '2024-03-10', 'Summit Supplies', '2024-03-22', '$5,600'],
          ['PO-2247', '2024-03-18', 'Pinnacle Consulting', '2024-03-08', '$42,000'],
          ['PO-2251', '2024-04-01', 'Allied Equipment', '2024-04-12', '$15,750'],
          ['PO-2255', '2024-04-08', 'Coastal Logistics', '2024-04-20', '$33,100']
        ],
        target: 2,
        reasons: [
          'Invoice date (Mar 8) precedes the PO date (Mar 18) — work before authorization',
          'The amount is the highest in the table',
          'Pinnacle Consulting is the only vendor that appears once',
          'The PO number gap between 2243 and 2247 is suspicious'
        ],
        correctReason: 0,
        explanation: 'Pinnacle Consulting invoiced on March 8 but the PO wasn\'t issued until March 18. Work started ten days before authorization. This "after-the-fact PO" pattern often indicates unauthorized commitments, kickbacks, or attempts to legitimize unapproved spending.',
        acfeType: 'Procurement Fraud / Corruption',
        acfeLoss: '$200,000'
      },
      {
        context: "You're reconciling accounts payable for the quarter. Each vendor invoice should be paid exactly once.",
        columns: ['Payment ID', 'Vendor', 'Invoice #', 'Date Paid', 'Amount'],
        rows: [
          ['PAY-5501', 'Meridian Supply', 'INV-8834', '2024-04-05', '$14,250.00'],
          ['PAY-5509', 'Atlas Transport', 'INV-7721', '2024-04-12', '$8,900.00'],
          ['PAY-5515', 'Meridian Supply', 'INV-8834', '2024-04-19', '$14,250.00'],
          ['PAY-5522', 'Falcon Electronics', 'INV-9103', '2024-04-25', '$22,600.00'],
          ['PAY-5530', 'Crestwood Services', 'INV-8891', '2024-05-02', '$6,400.00']
        ],
        target: 2,
        reasons: [
          'Same invoice number (INV-8834) already paid — duplicate payment',
          'Meridian Supply should not appear twice in one quarter',
          'The payment ID gap between 5509 and 5515 is too large',
          'The amount should include sales tax'
        ],
        correctReason: 0,
        explanation: 'Payment PAY-5515 pays invoice INV-8834 for $14,250 — but that exact invoice was already paid as PAY-5501 two weeks earlier. Duplicate payments are one of the most common billing frauds, often disguised by different payment dates or slightly modified vendor names.',
        acfeType: 'Billing Scheme (Duplicate Payment)',
        acfeLoss: '$100,000'
      },
      {
        context: "You're reviewing sealed bids for a $2M building renovation. Three firms submitted proposals through the formal RFP process.",
        columns: ['Bidder', 'Base Bid', 'Timeline', 'References', 'Sub Detail'],
        rows: [
          ['Apex Construction', '$1,847,500', '14 months', '8 projects', '12 named subs'],
          ['BuildRight Corp', '$2,000,000', '18 months', '3 projects', '"Various"'],
          ['Cornerstone Group', '$2,100,000', '16 months', '5 projects', '4 named subs']
        ],
        target: 1,
        reasons: [
          'Exact round bid with vague details — likely a complementary "cover" bid',
          'The timeline is the longest of the three bidders',
          'Only three references is below the RFP minimum',
          'The bid amount exceeds the project budget'
        ],
        correctReason: 0,
        explanation: 'BuildRight\'s bid is a perfectly round $2,000,000, lists only "Various" for subcontractors, and has the weakest references. This is a classic complementary (cover) bid — submitted to create the illusion of competition so the pre-selected winner (Apex) gets the contract. Cornerstone at $2.1M is similarly round, reinforcing the bid-rigging pattern.',
        acfeType: 'Corruption / Bid Rigging',
        acfeLoss: '$200,000'
      },
      {
        context: "You're reviewing a regional sales manager's expense report from a two-week road trip through Texas.",
        columns: ['Date', 'Description', 'Vendor', 'Amount', 'City'],
        rows: [
          ['2024-09-02', 'Hotel', 'Marriott #4432', '$189.00', 'Dallas'],
          ['2024-09-03', 'Client lunch', 'Applebee\'s', '$47.82', 'Dallas'],
          ['2024-09-04', 'Hotel', 'Marriott #4432', '$189.00', 'Dallas'],
          ['2024-09-05', 'Client dinner', 'Chili\'s', '$52.14', 'Houston'],
          ['2024-09-05', 'Hotel', 'Hilton #2201', '$219.00', 'Houston'],
          ['2024-09-06', 'Team lunch', 'Applebee\'s', '$47.82', 'Houston']
        ],
        target: 5,
        reasons: [
          'Same vendor and exact amount as an earlier meal in a different city — duplicated receipt',
          'Two meals on the same day violates the expense policy',
          'Applebee\'s is not an approved dining vendor',
          'The amount is too low for a team lunch'
        ],
        correctReason: 0,
        explanation: 'The Houston Applebee\'s charge is exactly $47.82 — the same vendor, same amount as the Dallas meal on Sept 3. Different Applebee\'s locations in different cities landing on the exact same total is extremely unlikely. This suggests a duplicated or photo-copied receipt.',
        acfeType: 'Expense Reimbursement Fraud',
        acfeLoss: '$50,000'
      },
      {
        context: "You're auditing incoming shipments at a distribution center. Product X weighs approximately 22 kg per unit.",
        columns: ['Shipment ID', 'Qty Ordered', 'Declared Weight', 'Origin', 'Carrier'],
        rows: [
          ['SH-4401', '50 units', '1,105 kg', 'Rotterdam', 'Maersk'],
          ['SH-4405', '25 units', '548 kg', 'Guangzhou', 'MSC'],
          ['SH-4408', '100 units', '2,198 kg', 'São Paulo', 'CMA CGM'],
          ['SH-4412', '75 units', '820 kg', 'Istanbul', 'Maersk'],
          ['SH-4415', '30 units', '662 kg', 'Rotterdam', 'CMA CGM']
        ],
        target: 3,
        reasons: [
          'Declared weight (820 kg) is far below expected (75 × 22 = 1,650 kg)',
          'Maersk is used more often than CMA CGM',
          'The shipment quantity of 75 is an unusual order size',
          'The shipment ID numbering has an inconsistent gap'
        ],
        correctReason: 0,
        explanation: '75 units at ~22 kg each should weigh approximately 1,650 kg, but SH-4412 declares only 820 kg — roughly half the expected weight. Either the shipment is short (50% of goods missing) or the weight declaration is fraudulent, potentially to reduce shipping costs or customs duties.',
        acfeType: 'Shipping / Customs Fraud',
        acfeLoss: '$150,000'
      },
      {
        context: "You're reviewing quality certificates for electronic components received from overseas suppliers. Each certificate should post-date the manufacture of the part it certifies.",
        columns: ['Part #', 'Supplier', 'Mfg Date', 'Cert Date', 'Cert Body'],
        rows: [
          ['EC-7701', 'NovaTech GmbH', '2024-01-15', '2024-02-03', 'SGS'],
          ['EC-7702', 'Atlantic Components', '2024-02-20', '2024-03-05', 'Intertek'],
          ['EC-7703', 'Meridian Electronics', '2024-04-10', '2024-03-18', 'UL Labs'],
          ['EC-7704', 'NovaTech GmbH', '2024-03-08', '2024-03-22', 'SGS'],
          ['EC-7705', 'Atlantic Components', '2024-05-01', '2024-05-15', 'Intertek']
        ],
        target: 2,
        reasons: [
          'Certificate date (Mar 18) is before manufacture date (Apr 10) — impossible',
          'UL Labs is not a recognized certification body',
          'Meridian Electronics is the only vendor that appears once',
          'The part number sequence skips from 7702 to 7703'
        ],
        correctReason: 0,
        explanation: 'EC-7703 has a certification date of March 18 but a manufacture date of April 10. A quality test certificate cannot predate the part it certifies by 23 days. This is a hallmark of counterfeit component documentation — the certificate was likely copied from a different batch or fabricated entirely.',
        acfeType: 'Counterfeit Product Fraud',
        acfeLoss: '$150,000'
      },
      {
        context: "You're reviewing bills of lading for imported textiles. The declared country of origin should be consistent with the port where goods were loaded.",
        columns: ['BOL #', 'Product', 'Declared Origin', 'Port of Loading', 'Consignee'],
        rows: [
          ['BOL-9901', 'Cotton fabric', 'India', 'Mumbai', 'TextileCo USA'],
          ['BOL-9905', 'Silk blend', 'China', 'Shanghai', 'FashionWorks Inc.'],
          ['BOL-9908', 'Polyester weave', 'Turkey', 'Hamburg, Germany', 'TextileCo USA'],
          ['BOL-9912', 'Denim', 'Mexico', 'Veracruz', 'JeansCraft LLC'],
          ['BOL-9915', 'Linen', 'Italy', 'Genoa', 'LuxFabrics Inc.']
        ],
        target: 2,
        reasons: [
          'Port of loading (Hamburg, Germany) is inconsistent with declared origin (Turkey)',
          'Polyester is not typically produced in Turkey',
          'TextileCo USA appears twice as a consignee',
          'The BOL number gap between 9905 and 9908 is irregular'
        ],
        correctReason: 0,
        explanation: 'Goods declared as Turkish origin were loaded in Hamburg, Germany. Turkish exports ship from Istanbul, Mersin, or Izmir — not German ports. This origin mismatch may indicate transshipment fraud: routing goods through a third country to evade tariffs, quotas, or sanctions.',
        acfeType: 'Trade / Customs Fraud (Transshipment)',
        acfeLoss: '$150,000'
      },
      {
        context: "You're reviewing the change-order log for a building renovation. The original contract was awarded at $500,000.",
        columns: ['CO #', 'Date', 'Description', 'Amount', 'Running Total'],
        rows: [
          ['CO-01', '2024-02-15', 'Foundation soil remediation', '$28,000', '$528,000'],
          ['CO-02', '2024-03-10', 'HVAC specification upgrade', '$35,000', '$563,000'],
          ['CO-03', '2024-03-28', 'Additional electrical outlets', '$12,000', '$575,000'],
          ['CO-04', '2024-04-15', 'Window specification change', '$45,000', '$620,000'],
          ['CO-05', '2024-05-02', 'Parking lot drainage revision', '$38,000', '$658,000'],
          ['CO-06', '2024-05-20', 'General site improvements', '$52,000', '$710,000']
        ],
        target: 5,
        reasons: [
          'Vague description ("General site improvements") with a large amount — contract now 42% over budget',
          'The date is too close to CO-05',
          '$52,000 exceeds the average change order amount',
          'Six change orders on one project is too many'
        ],
        correctReason: 0,
        explanation: '"General site improvements" is far too vague for a $52,000 charge, and the cumulative change orders have inflated the original $500,000 contract to $710,000 — a 42% increase. Each CO was individually small enough to seem reasonable, but the pattern suggests change-order abuse: deliberately low-balling the initial bid, then making it up through vague additions.',
        acfeType: 'Corruption / Contract Fraud',
        acfeLoss: '$200,000'
      },
      {
        context: "An internal auditor ran a Benford's Law analysis on one vendor's invoice amounts. Benford's Law predicts the leading digit distribution of naturally occurring financial data.",
        columns: ['Leading Digit', 'Expected %', 'Actual %', 'Count', 'Deviation'],
        rows: [
          ['1', '30.1%', '29.8%', '149', '-0.3%'],
          ['2', '17.6%', '18.2%', '91', '+0.6%'],
          ['3', '12.5%', '11.9%', '60', '-0.6%'],
          ['5', '7.9%', '7.5%', '38', '-0.4%'],
          ['8', '5.1%', '15.6%', '78', '+10.5%'],
          ['9', '4.6%', '4.8%', '24', '+0.2%']
        ],
        target: 4,
        reasons: [
          'Leading digit 8 is over-represented by 10.5% — a Benford\'s Law violation',
          'Digit 3 has a negative deviation which is concerning',
          'The total count of invoices is too low for statistical analysis',
          'Digits 4, 6, and 7 are missing from the analysis'
        ],
        correctReason: 0,
        explanation: 'Leading digit 8 appears in 15.6% of invoices versus the expected 5.1% — a massive deviation of +10.5%. In naturally occurring data, digits 1–3 dominate (Benford\'s Law). An over-abundance of 8s (e.g., $80K, $85K, $8,500) suggests amounts were fabricated rather than arising from real transactions. [Benford, 1938; Nigrini, 2012]',
        acfeType: 'Financial Statement Fraud / Fabrication',
        acfeLoss: '$150,000'
      },
      {
        context: "You're verifying certificates of origin for goods claiming preferential tariff rates. Each trading partner uses a standardized certificate number format.",
        columns: ['Cert #', 'Product', 'Origin', 'Issuing Body', 'Tariff Claimed'],
        rows: [
          ['MX-2024-08834', 'Auto parts', 'Mexico', 'Mexican Chamber of Commerce', '0% (USMCA)'],
          ['KR-2024-15567', 'Electronics', 'South Korea', 'KCCI Seoul', '0% (KORUS)'],
          ['VN-44821', 'Textiles', 'Vietnam', 'Hanoi Trade Bureau', '0% (CPTPP)'],
          ['JP-2024-22103', 'Machinery', 'Japan', 'Tokyo CoC', '0% (CPTPP)'],
          ['AU-2024-07789', 'Minerals', 'Australia', 'ACCI Canberra', '0% (AUSFTA)']
        ],
        target: 2,
        reasons: [
          'Certificate format (VN-44821) is missing the year field other certs include',
          'The serial number (44821) is too low for a 2024 issuance',
          'Textiles are not eligible for preferential tariff rates',
          'Hanoi Trade Bureau is not an authorized issuing body'
        ],
        correctReason: 0,
        explanation: 'Every other certificate follows the format CC-YYYY-NNNNN (country code, year, serial number), but VN-44821 is missing the year component entirely. A certificate that doesn\'t match the issuing country\'s standard format is a strong indicator of forgery — it was likely fabricated rather than issued by a legitimate authority.',
        acfeType: 'Trade Fraud / Document Forgery',
        acfeLoss: '$150,000'
      }
    ];

    let round = 0;
    let score = 0;
    let scenarios = [];
    let phase = 'pick-row';
    let selectedRow = -1;

    function start() {
      scenarios = BreakRoom.shuffle([...SCENARIOS]).slice(0, 5);
      round = 0;
      score = 0;
      phase = 'pick-row';
      selectedRow = -1;
      renderRound();
    }

    function renderRound() {
      const s = scenarios[round];
      const isRowPhase = phase === 'pick-row';

      container.innerHTML = `
        <div class="sf-game">
          <div class="sf-header">
            <div class="sf-round">Round ${round + 1} of 5</div>
            <div class="sf-score">Score: <strong>${score}</strong> / ${(round) * 2}</div>
          </div>
          <div class="progress-bar"><div class="fill" style="width:${((round) / 5) * 100}%"></div></div>

          <div class="sf-context">
            <div class="sf-context-label">SCENARIO</div>
            ${s.context}
          </div>

          ${isRowPhase ? '<div class="sf-instruction">Click the suspicious row.</div>' : ''}

          <div class="sf-table-wrap">
            <table class="sf-table">
              <thead><tr>${s.columns.map(c => `<th>${c}</th>`).join('')}</tr></thead>
              <tbody>
                ${s.rows.map((row, i) => {
                  let cls = 'sf-row';
                  if (isRowPhase) cls += ' hoverable';
                  if (selectedRow === i && phase === 'pick-reason') cls += ' selected';
                  if (phase === 'feedback' && i === s.target) cls += ' correct-row';
                  if (phase === 'feedback' && selectedRow === i && i !== s.target) cls += ' wrong-row';
                  return `<tr class="${cls}" data-idx="${i}">${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
                }).join('')}
              </tbody>
            </table>
          </div>

          <div id="sf-lower"></div>
        </div>
      `;

      if (isRowPhase) {
        container.querySelectorAll('.sf-row.hoverable').forEach(tr => {
          tr.onclick = () => pickRow(parseInt(tr.dataset.idx));
        });
      }

      if (phase === 'pick-reason') renderReasons();
      if (phase === 'feedback') renderFeedback();
    }

    function pickRow(idx) {
      if (phase !== 'pick-row') return;
      selectedRow = idx;
      phase = 'pick-reason';
      renderRound();
    }

    function renderReasons() {
      const s = scenarios[round];
      const lower = container.querySelector('#sf-lower');
      lower.innerHTML = `
        <div class="sf-reasons-title">Why is this row suspicious?</div>
        <div class="sf-reasons">
          ${s.reasons.map((r, i) => `<button class="sf-reason" data-idx="${i}">${r}</button>`).join('')}
        </div>
      `;
      lower.querySelectorAll('.sf-reason').forEach(btn => {
        btn.onclick = () => pickReason(parseInt(btn.dataset.idx));
      });
    }

    function pickReason(idx) {
      if (phase !== 'pick-reason') return;
      const s = scenarios[round];
      const rowCorrect = selectedRow === s.target;
      const reasonCorrect = idx === s.correctReason;

      let pts = 0;
      if (rowCorrect && reasonCorrect) pts = 2;
      else if (rowCorrect) pts = 1;
      score += pts;

      phase = 'feedback';
      renderRound();

      const lower = container.querySelector('#sf-lower');
      const feedbackEl = lower.querySelector('.sf-feedback');
      if (feedbackEl) {
        const ptLabel = pts === 2 ? 'Nailed it! +2' : pts === 1 ? 'Right row, wrong reason. +1' : 'Missed it. +0';
        const ptClass = pts === 2 ? 'perfect' : pts === 1 ? 'partial' : 'miss';
        feedbackEl.querySelector('.sf-fb-score').className = `sf-fb-score ${ptClass}`;
        feedbackEl.querySelector('.sf-fb-score').textContent = ptLabel;
      }

      const reasonBtns = lower.querySelectorAll('.sf-reason');
      reasonBtns.forEach((btn, i) => {
        btn.disabled = true;
        if (i === s.correctReason) btn.classList.add('correct');
        if (i === idx && i !== s.correctReason) btn.classList.add('wrong');
      });
    }

    function renderFeedback() {
      const s = scenarios[round];
      const lower = container.querySelector('#sf-lower');

      const rowCorrect = selectedRow === s.target;
      const pts = lower ? 0 : 0;

      lower.innerHTML = `
        <div class="sf-reasons-title">Why is this row suspicious?</div>
        <div class="sf-reasons">
          ${s.reasons.map((r, i) => {
            let cls = 'sf-reason';
            if (i === s.correctReason) cls += ' correct';
            return `<button class="${cls}" disabled>${r}</button>`;
          }).join('')}
        </div>
        <div class="sf-feedback">
          <div class="sf-fb-score"></div>
          <div class="sf-fb-explanation">${s.explanation}</div>
          <div class="sf-fb-cite">[${s.acfeType} — Median loss: ${s.acfeLoss}]</div>
        </div>
        <div class="sf-actions">
          <button class="btn btn-primary" id="sf-next">${round < 4 ? 'Next Round →' : 'See Results'}</button>
        </div>
      `;

      container.querySelector('#sf-next').onclick = () => {
        round++;
        if (round >= 5) {
          showResults();
        } else {
          phase = 'pick-row';
          selectedRow = -1;
          renderRound();
        }
      };
    }

    function showResults() {
      BreakRoom.showResult(container, {
        score, max: 10, game: 'spot-the-fraud',
        verdicts: [
          'Forensic accountant energy. The fraudsters can\'t hide.',
          'Sharp eye. Most red flags caught.',
          'Some fraud slipped past. Review the ACFE typologies.',
          'The fraudsters are winning. Read the explanations.'
        ]
      });
    }

    start();
  }
});
