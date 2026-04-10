BreakRoom.register({
  id: 'fermi',
  name: 'Fermi Estimator',
  icon: '\u{1F522}',
  description: 'Guess the order of magnitude. How close can you get?',
  play(container) {
    const questions = [
      { q: "How many golf balls can fit in a school bus?", a: 500000, unit: "", source: "Classic Fermi estimation; volume ratio of bus (~2.5m\u00B3 usable) to golf ball (~40.7cm\u00B3)" },
      { q: "How many piano tuners are there in Chicago?", a: 225, unit: "", source: "Fermi's original estimation problem; BLS Occupational Employment data corroborates ~200-300 range" },
      { q: "How many gas stations are in the United States?", a: 150000, unit: "", source: "US Census Bureau, County Business Patterns; NACS (National Association of Convenience Stores) 2023 report" },
      { q: "How many words does the average person speak per day?", a: 16000, unit: "", source: "Mehl et al. (2007), 'Are Women Really More Talkative Than Men?', Science 317(5834)" },
      { q: "How many tennis balls would fit in this room (a typical bedroom)?", a: 250000, unit: "", source: "Geometric packing estimation; ~35m\u00B3 room / ~140cm\u00B3 per ball at ~64% packing efficiency" },
      { q: "How many commercial flights take off worldwide each day?", a: 100000, unit: "", source: "IATA World Air Transport Statistics, 2023 edition; ~37M flights/year" },
      { q: "How many hot dogs are eaten at US baseball games each year?", a: 26000000, unit: "", source: "National Hot Dog and Sausage Council annual report, 2023" },
      { q: "How many neurons are in the human brain?", a: 86000000000, unit: "", source: "Azevedo et al. (2009), 'Equal numbers of neuronal and nonneuronal cells', J. Comp. Neurology 513(5)" },
      { q: "How many grains of sand on a typical beach (1 km)?", a: 1e15, unit: "", source: "Calculation: ~1km x 50m x 2m depth x packing; see Krulwich, NPR (2012) and Univ. of Hawaii grain-count method" },
      { q: "How many books have ever been published in human history?", a: 130000000, unit: "", source: "Google Books project metadata analysis (2010); Leonid Taycher, Google engineer estimate" },
      { q: "How many shipping containers are on the ocean right now?", a: 25000000, unit: "", source: "World Shipping Council, 'Containers in Service' report 2023; ~250M TEU capacity globally" },
      { q: "How many smartphones are currently in use worldwide?", a: 6800000000, unit: "", source: "Statista, 'Number of smartphone subscriptions worldwide', 2024 edition" },
      { q: "How many bacteria live in the human gut?", a: 38000000000000, unit: "", source: "Sender, Fuchs & Milo (2016), 'Revised estimates for the number of human and bacteria cells', Cell 164(3)" },
      { q: "How many people are airborne over the US at any given time?", a: 1300000, unit: "", source: "FAA Air Traffic Organization data; ~45,000 flights/day x avg 150 pax x avg 2.5hr flight / 24hr" },
      { q: "How many gallons of paint would it take to paint every road line in the US?", a: 50000000, unit: "gallons", source: "Federal Highway Administration (FHWA), Highway Statistics series; ~4M lane-miles of road" },
      { q: "How many Google searches happen per day?", a: 8500000000, unit: "", source: "Internet Live Stats & Statista 2024; Google processes ~99,000 searches/second" },
      { q: "How many trees are on Earth?", a: 3000000000000, unit: "", source: "Crowther et al. (2015), 'Mapping tree density at a global scale', Nature 525(7568)" },
      { q: "How many barbers/hairdressers are in the US?", a: 800000, unit: "", source: "Bureau of Labor Statistics, Occupational Employment and Wage Statistics (OEWS), SOC 39-5011/39-5012" },
      { q: "How many potholes are filled in NYC each year?", a: 500000, unit: "", source: "NYC Department of Transportation annual performance reports; Mayor's Management Report" },
      { q: "How many soccer balls are manufactured globally per year?", a: 40000000, unit: "", source: "Forward Intelligence / Sialkot Chamber of Commerce (Pakistan produces ~70% of hand-stitched balls)" },
      { q: "How many emails are sent worldwide per day?", a: 330000000000, unit: "", source: "Radicati Group, 'Email Statistics Report 2023-2027'" },
      { q: "How many calories does humanity consume per day total?", a: 1.6e13, unit: "kcal", source: "FAO Food Balance Sheets; ~8B people x ~2000 kcal/day average" },
      { q: "How many unique species have been catalogued on Earth?", a: 2100000, unit: "", source: "Catalogue of Life (2024 checklist); IUCN Red List database statistics" },
      { q: "How many car tires are discarded in the US per year?", a: 300000000, unit: "", source: "US Tire Manufacturers Association, '2023 Scrap Tire Management Summary'" },
      { q: "How many heartbeats does the average person have in a lifetime?", a: 2500000000, unit: "", source: "AHA: avg resting HR ~72 bpm x 525,600 min/year x ~75 years; Levine (1997), Rest heart rate and life expectancy, JACC" },
      { q: "How many ants are alive on Earth right now?", a: 2e16, unit: "", source: "Schultheiss et al. (2022), 'The abundance, biomass, and distribution of ants on Earth', PNAS 119(40)" },
      { q: "How many academic papers are published per year worldwide?", a: 3000000, unit: "", source: "UNESCO Science Report; STM Report 2021 (International Association of STM Publishers)" },
      { q: "How many miles of blood vessels are in the human body?", a: 60000, unit: "miles", source: "NIH fact sheet; Franklin Institute. Capillaries make up ~80% of total length" },
      { q: "How many photos are taken per day worldwide?", a: 1400000000, unit: "", source: "Rise Above Research / InfoTrends (2023); ~92.5% taken on smartphones" },
      { q: "How many satellites are currently orbiting Earth?", a: 10000, unit: "", source: "UCS Satellite Database (2024); ESA Space Environment Report. ~7,500 operational as of early 2024" },
      { q: "How many distinct languages are spoken on Earth today?", a: 7000, unit: "", source: "Ethnologue (27th edition, SIL International). 7,168 known living languages as of 2024" },
      { q: "How many transistors are in a modern smartphone processor?", a: 15000000000, unit: "", source: "Apple A17 Pro: ~19 billion; Snapdragon 8 Gen 3: ~12.1 billion. [Chipmaker spec sheets, 2024]" },
      { q: "How many people are alive who are over 100 years old?", a: 600000, unit: "", source: "UN World Population Prospects (2024 revision); Gerontology Research Group database" },
      { q: "How many different species of beetles exist?", a: 400000, unit: "", source: "Bouchard et al. (2017), 'Biodiversity of Coleoptera', ZooKeys; Haldane's famous quip about God's fondness for beetles" },
      { q: "How many words are in the English language?", a: 170000, unit: "", source: "Oxford English Dictionary (current use): ~170,000+ entries. Webster's Third: ~470,000 entries including archaic. [OED FAQ]" },
      { q: "How many planes are in the air worldwide at any given moment?", a: 10000, unit: "", source: "FlightAware / Flightradar24 live tracking data; FAA Air Traffic Organization reports ~5,000 over US alone at peak" },
      { q: "How many Olympic-sized swimming pools could you fill with all the gold ever mined?", a: 4, unit: "pools", source: "World Gold Council: ~212,582 tonnes mined through 2023. Gold density 19.3 g/cm\u00B3. Olympic pool = 2,500m\u00B3. [World Gold Council annual report]" },
      { q: "How many McDonald's restaurants exist worldwide?", a: 40000, unit: "", source: "McDonald's Corporation 2023 Annual Report: 40,275 restaurants in 100+ countries" },
      { q: "How many synapses are in the human brain?", a: 100000000000000, unit: "", source: "Drachman (2005), Neurology 64(12); estimates range from 100-500 trillion. ~7,000 synapses per neuron average" },
      { q: "How many lightning strikes hit the Earth per day?", a: 8000000, unit: "", source: "NASA Global Hydrology and Climate Center; ~100 lightning strikes per second globally" }
    ];

    const ROUNDS = 5;
    const picked = BreakRoom.shuffle(questions).slice(0, ROUNDS);
    let current = 0;
    let score = 0;

    function renderQuestion() {
      const q = picked[current];
      container.innerHTML = `
        <div class="score-display">Round ${current + 1}/${ROUNDS} &middot; Score: <span>${score}</span></div>
        <div class="progress-bar"><div class="fill" style="width:${(current/ROUNDS)*100}%"></div></div>
        <div class="question-text">${q.q}</div>
        <input class="game-input" id="fermi-input" type="text" placeholder="Enter your estimate (e.g. 50000 or 5e4)" autofocus>
        <div style="margin-top:16px">
          <button class="btn btn-primary" id="fermi-submit">Submit</button>
        </div>
      `;
      const input = document.getElementById('fermi-input');
      const submit = document.getElementById('fermi-submit');
      input.focus();

      function doSubmit() {
        let raw = input.value.trim().replace(/,/g, '');
        let guess = parseFloat(raw);
        if (isNaN(guess) || guess <= 0) { input.style.borderColor = 'var(--danger)'; return; }
        showFeedback(guess);
      }

      submit.onclick = doSubmit;
      input.onkeydown = (e) => { if (e.key === 'Enter') doSubmit(); };
    }

    function showFeedback(guess) {
      const q = picked[current];
      const actual = q.a;
      const guessLog = Math.log10(guess);
      const actualLog = Math.log10(actual);
      const diff = Math.abs(guessLog - actualLog);

      let pts = 0, rating;
      if (diff < 0.3) { pts = 10; rating = "Spot on!"; }
      else if (diff < 0.7) { pts = 8; rating = "Very close!"; }
      else if (diff < 1.0) { pts = 6; rating = "Right ballpark"; }
      else if (diff < 1.5) { pts = 3; rating = "Off by a bit"; }
      else if (diff < 2.0) { pts = 1; rating = "Way off"; }
      else { pts = 0; rating = "Not even close"; }

      score += pts;

      function fmt(n) {
        if (n >= 1e12) return (n/1e12).toFixed(1) + ' trillion';
        if (n >= 1e9) return (n/1e9).toFixed(1) + ' billion';
        if (n >= 1e6) return (n/1e6).toFixed(1) + ' million';
        if (n >= 1e3) return (n/1e3).toFixed(1) + 'k';
        return n.toString();
      }

      container.innerHTML = `
        <div class="score-display">Round ${current + 1}/${ROUNDS} &middot; Score: <span>${score}</span></div>
        <div class="progress-bar"><div class="fill" style="width:${((current+1)/ROUNDS)*100}%"></div></div>
        <div class="question-text">${q.q}</div>
        <div style="margin-bottom:20px;">
          <div style="font-size:1.1rem; margin-bottom:8px;">
            Your guess: <strong>${fmt(guess)}</strong> &middot; Actual: <strong>${fmt(actual)}</strong> ${q.unit}
          </div>
          <div style="font-size:1.4rem; font-weight:700; color: ${pts >= 6 ? 'var(--success)' : pts >= 3 ? 'var(--warning)' : 'var(--danger)'}">
            ${rating} (+${pts} pts)
          </div>
        </div>
        <div class="feedback-text">[${q.source}]</div>
        <div style="margin-top:20px">
          <button class="btn btn-primary" id="fermi-next">${current < ROUNDS - 1 ? 'Next Question' : 'See Results'}</button>
        </div>
      `;
      document.getElementById('fermi-next').onclick = () => {
        current++;
        if (current < ROUNDS) renderQuestion();
        else BreakRoom.showResult(container, { score, max: ROUNDS * 10, game: 'fermi' });
      };
    }

    renderQuestion();
  }
});
