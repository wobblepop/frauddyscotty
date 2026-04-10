BreakRoom.register({
  id: 'fact-or-fiction',
  name: 'Fact or Fabrication',
  icon: '\u{1F9E0}',
  description: 'Real science or total BS? Includes paper titles.',
  play(container) {
    const items = [
      // Real science claims
      { text: "Octopuses have three hearts and blue blood.", real: true, explain: "Two branchial hearts pump blood to the gills; one systemic heart pumps it to the body. Copper-based hemocyanin makes it blue. [Marine biology textbooks]" },
      { text: "Humans share about 60% of their DNA with bananas.", real: true, explain: "Many fundamental cellular processes are shared across life. The exact figure varies by methodology but ~60% is widely cited. [NHGRI]" },
      { text: "There are more possible chess games than atoms in the observable universe.", real: true, explain: "Shannon number: ~10^120 possible games vs ~10^80 atoms. [Shannon, 1950]" },
      { text: "Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still edible.", real: true, explain: "Honey's low moisture and high acidity prevent microbial growth. Sealed honey from tombs has been found intact. [Smithsonian]" },
      { text: "A day on Venus is longer than a year on Venus.", real: true, explain: "Venus rotates very slowly (243 Earth days) but orbits the Sun in 225 Earth days. [NASA]" },
      { text: "Crows can recognize individual human faces and hold grudges for years.", real: true, explain: "Researchers at University of Washington demonstrated this with mask experiments. Crows warned other crows about 'dangerous' faces. [Marzluff et al., 2010]" },
      { text: "Your stomach acid is strong enough to dissolve metal.", real: true, explain: "Gastric acid (pH 1.5-3.5) can dissolve zinc and other metals. The stomach lining regenerates rapidly to protect itself. [Physiology textbooks]" },
      { text: "Water can exist as a solid, liquid, and gas simultaneously at its triple point.", real: true, explain: "At 0.01°C and 611.73 Pa, water coexists in all three phases. [Thermodynamics fundamentals]" },

      // Fake science claims
      { text: "Goldfish have been shown to have a memory span of exactly 3 seconds in controlled studies.", real: false, explain: "This is a myth. Goldfish can remember things for months. Studies have trained goldfish to navigate mazes and respond to stimuli over long periods. [University of Plymouth research]" },
      { text: "The Great Wall of China is the only man-made structure visible from space with the naked eye.", real: false, explain: "Not visible from low Earth orbit without aid. Many other structures (highways, cities) are more visible. Astronauts have confirmed this. [NASA]" },
      { text: "Einstein failed math as a child and nearly didn't graduate.", real: false, explain: "Einstein excelled at mathematics from a young age. This myth may stem from a reversed grading scale misunderstanding. [Einstein archives, ETH Zurich]" },
      { text: "Humans use only 10% of their brain at any given time.", real: false, explain: "Brain imaging shows activity throughout the entire brain, even during sleep. Different regions are active at different times, but no large areas are perpetually inactive. [Neuroimaging studies]" },
      { text: "Microwave ovens cook food by exciting water molecules at a specific quantum resonance frequency.", real: false, explain: "Microwaves heat food via dielectric heating — rotating polar molecules (mainly water) — but this is classical electromagnetism, not quantum resonance. The frequency (2.45 GHz) is chosen for practical penetration depth, not molecular resonance. [Physics textbooks]" },
      { text: "Dolphins sleep with both halves of their brain simultaneously but keep their eyes open.", real: false, explain: "Dolphins exhibit unihemispheric sleep — one brain half sleeps while the other stays awake. They close the eye opposite the sleeping hemisphere. [Lyamin et al., 2008]" },

      // Real paper titles
      { text: "Paper title: 'The Unsuccessful Self-Treatment of a Case of Writer's Block'", real: true, explain: "Published in the Journal of Applied Behavior Analysis (1974) by Dennis Upper. The entire paper is a blank page. The editor's note says it was 'clearly rejected by a reviewer.' [JABA, 1974]" },
      { text: "Paper title: 'Will Humans Swim Faster or Slower in Syrup?'", real: true, explain: "Gettelfinger & Cussler (2004) actually tested this. Swimmers' times were the same, supporting predictions from fluid dynamics at high Reynolds numbers. [AIChE Journal]" },
      { text: "Paper title: 'Pressures Produced When Penguins Pooh — Calculations on Avian Defaecation'", real: true, explain: "Won an Ig Nobel Prize. Meyer-Rochow & Gal (2003) calculated internal pressures penguins generate during defecation. [Polar Biology]" },
      { text: "Paper title: 'An Analysis of the Forces Required to Drag Sheep over Various Surfaces'", real: true, explain: "Published by Harvey et al. (2002) in Applied Ergonomics. Genuinely useful for sheep farming workplace safety. [Applied Ergonomics]" },
      { text: "Paper title: 'The Effect of Country Music on Suicide'", real: true, explain: "Stack & Gundlach (1992) found a correlation between country music radio airtime and white urban suicide rates. Published in Social Forces. [Social Forces]" },

      // Fake paper titles
      { text: "Paper title: 'Quantum Entanglement Between Identical Twins: A Double-Blind Study'", real: false, explain: "Not a real paper. Quantum entanglement is a physics phenomenon that does not apply to biological organisms or human consciousness at the macro scale. [Verified absent from PubMed, arXiv, and Google Scholar as of 2024]" },
      { text: "Paper title: 'The Statistical Significance of Horoscope Predictions: A Meta-Analysis of 50 Years of Astrological Research'", real: false, explain: "Fabricated. While there have been studies debunking astrology (e.g., Shawn Carlson's 1985 Nature double-blind test), no legitimate meta-analysis has found statistical significance in horoscope predictions. [Carlson (1985), Nature 318(6045); verified absent from major databases]" },
      { text: "Paper title: 'On the Rheological Properties of Cat: Solid or Liquid?'", real: true, explain: "Trick! This IS real. Marc-Antoine Fardin won an Ig Nobel Prize for this 2014 rheology paper arguing cats can be considered liquid. [Rheology Bulletin]" },
      { text: "Paper title: 'Magnetic Resonance Imaging of Male and Female Genitals During Coitus and Female Sexual Arousal'", real: true, explain: "Trick — this IS real! Schultz et al. (1999), published in the BMJ. Used MRI to image anatomy during intercourse. Won an Ig Nobel Prize. [BMJ]" },
      { text: "Paper title: 'Neural Correlates of Interspecies Perspective Taking in the Domestic Cat Using fMRI'", real: false, explain: "Fabricated. Getting a cat to hold still in an fMRI machine is essentially impossible without anesthesia, which would defeat the purpose of studying active cognition. [Verified absent from PubMed and PsycINFO; see Jongman (2004) on challenges of awake animal fMRI]" },
      { text: "Paper title: 'Optimizing the Aerodynamics of Thrown Playing Cards: A Wind Tunnel Study'", real: false, explain: "Fabricated, though it sounds plausible. No such wind tunnel study of playing card aerodynamics has been formally published. [Verified absent from Google Scholar, IEEE Xplore, and AIAA databases as of 2024]" },

      // Additional real science claims
      { text: "Tardigrades can survive the vacuum of outer space.", real: true, explain: "The ESA's TARDIS experiment (2007) exposed tardigrades to open space on the FOTON-M3 mission. Many survived and reproduced afterward. [Jonsson et al. (2008), Current Biology 18(17)]" },
      { text: "There is a species of jellyfish that is biologically immortal.", real: true, explain: "Turritopsis dohrnii can revert to its polyp stage after reaching maturity, theoretically cycling indefinitely. [Piraino et al. (1996), Biological Bulletin 190(3)]" },
      { text: "Bananas are naturally radioactive.", real: true, explain: "Bananas contain potassium-40, a radioactive isotope. The 'banana equivalent dose' (~0.1 microsieverts) is used in radiation education. [Health Physics Society fact sheet]" },
      { text: "Wombat feces are cube-shaped.", real: true, explain: "The intestinal walls of wombats have varying elasticity that shapes feces into cubes, helping them stack on rocks as territorial markers. [Yang et al. (2021), Soft Matter 17(2); won 2019 Ig Nobel in Physics]" },
      { text: "Glass is a slow-moving liquid, which is why old windows are thicker at the bottom.", real: false, explain: "Glass is an amorphous solid, not a liquid. Old windows are thicker at the bottom because of the manufacturing process (crown glass method), not flow. Glassmakers installed the thicker edge downward. [Zanotto & Gupta (1999), American Journal of Physics 67(3)]" },
      { text: "Humans swallow an average of 8 spiders per year while sleeping.", real: false, explain: "This statistic was fabricated by columnist Lisa Holst in 1993 to demonstrate how easily false facts spread online. Sleeping humans create vibrations and sounds that repel spiders. [Snopes investigation; Scientific American]" },
      { text: "Lightning never strikes the same place twice.", real: false, explain: "Lightning frequently strikes the same place. The Empire State Building is struck about 20-25 times per year. Tall, pointed, isolated objects are preferred strike targets. [NOAA; Rakov & Uman (2003), Lightning: Physics and Effects]" },
      { text: "The human body contains enough iron to make a 3-inch nail.", real: true, explain: "The average adult body contains about 3-4 grams of iron, mostly in hemoglobin. This is roughly enough to forge a small nail. [Beard (2001), Journal of Nutrition 131(2)]" },
      { text: "Sharks are older than trees.", real: true, explain: "Sharks first appeared ~450 million years ago. The earliest trees (Archaeopteris) appeared ~385 million years ago. Sharks predate trees by ~65 million years. [Maisey (2012), Discovering Fossil Fishes; Stein et al. (2007), Nature 446]" },
      { text: "You can see the Great Pyramid of Giza from space with the naked eye.", real: false, explain: "Individual structures, even large ones like pyramids, are not visible to the naked eye from orbit (~400 km). Astronauts can see cities and large infrastructure patterns but not individual buildings. [Chris Hadfield, ISS astronaut testimony; NASA]" },
      { text: "Reading in dim light permanently damages your eyesight.", real: false, explain: "Reading in low light can cause temporary eye strain (asthenopia) but does not cause lasting damage. The myth persists but has no basis in ophthalmological research. [Chua et al. (2006), BMJ 335; Indiana University School of Optometry]" },
      { text: "Mantis shrimp can punch with the force of a bullet.", real: true, explain: "The peacock mantis shrimp's strike accelerates at 10,400g, reaching speeds of 23 m/s. The impact generates cavitation bubbles that produce a secondary shockwave. [Patek & Caldwell (2005), Journal of Experimental Biology 208]" },
      { text: "Some species of bamboo can grow over 3 feet in a single day.", real: true, explain: "Certain bamboo species (Phyllostachys edulis) have been measured growing up to 91 cm (35.8 inches) in 24 hours under ideal conditions. [Guinness World Records; Liese & Köhl (2015), Bamboo: The Plant and its Uses]" },
      { text: "Vitamin C megadoses can cure the common cold.", real: false, explain: "Large-scale meta-analyses show vitamin C does not prevent colds in the general population. It may slightly reduce cold duration (~8%) but does not cure them. [Hemilä & Chalker (2013), Cochrane Database of Systematic Reviews]" },

      // Additional real paper titles
      { text: "Paper title: 'Chickens Prefer Beautiful Humans'", real: true, explain: "Ghirlanda et al. (2002) trained chickens to react to human faces and found they preferred the same faces rated as attractive by humans. Published in Human Nature. [Human Nature 13(3)]" },
      { text: "Paper title: 'Sword Swallowing and Its Side Effects'", real: true, explain: "Witcombe & Meyer (2006) surveyed 46 sword swallowers about injuries. Won an Ig Nobel Prize. Published in the BMJ. [BMJ 333(7582)]" },
      { text: "Paper title: 'Fruit Bat Fellatio Prolongs Copulation Time'", real: true, explain: "Tan et al. (2009) documented oral sex in short-nosed fruit bats as an apparent mating strategy. Published in PLoS ONE. [PLoS ONE 4(10)]" },
      { text: "Paper title: 'The Case of the Disappearing Teaspoons'", real: true, explain: "Lim et al. (2005) tracked 70 teaspoons in a research institute and found 80% disappeared over 5 months. Published in BMJ Christmas edition. [BMJ 331(7531)]" },
      { text: "Paper title: 'A Headache in the Pelvis'", real: true, explain: "This is actually a well-known medical book by Wise & Anderson on chronic pelvic pain syndromes. Multiple editions published by the National Center for Pelvic Pain Research. [ISBN 978-0972775557]" },
      { text: "Paper title: 'Walking With Coffee: Why Does It Spill?'", real: true, explain: "Mayer & Krechetnikov (2012) analyzed the fluid dynamics of coffee spilling while walking. The natural walking frequency matches coffee's oscillation frequency. [Physical Review E 85(4)]" },

      // Additional fake paper titles
      { text: "Paper title: 'Gravitational Effects on the Flavor Profile of Artisanal Cheese: An ISS Experiment'", real: false, explain: "Fabricated. While NASA has studied food science in microgravity, no study has specifically examined cheese flavor in space. [Verified absent from NASA Technical Reports Server and PubMed as of 2024]" },
      { text: "Paper title: 'The Dunbar Number of Houseplants: Social Network Limits in Botanical Collections'", real: false, explain: "Fabricated. Dunbar's number applies to cognitive limits on social relationships in primates. Plants do not form social networks in the Dunbar sense. [Verified absent from Google Scholar; Dunbar (1992), Journal of Human Evolution 22(6)]" },
      { text: "Paper title: 'A Randomized Controlled Trial of Motivational Interviewing with Domestic Cats'", real: false, explain: "Fabricated. Motivational interviewing requires verbal communication and is used in human behavioral health. Cats lack the cognitive-linguistic capacity for this therapeutic modality. [Verified absent from PubMed and PsycINFO as of 2024]" },
      { text: "Paper title: 'Do Pigeons Dream of Electromagnetic Sheep? REM Sleep and Magnetic Navigation'", real: false, explain: "Fabricated, though pigeons do navigate using magnetic fields and do experience REM sleep. No paper has combined these topics with this title. [Verified absent from Web of Science and Google Scholar as of 2024]" },
    ];

    const ROUNDS = 8;
    const picked = BreakRoom.shuffle(items).slice(0, ROUNDS);
    let current = 0;
    let score = 0;

    function renderItem() {
      const item = picked[current];
      const isTitle = item.text.startsWith('Paper title:');
      container.innerHTML = `
        <div class="score-display">Round ${current + 1}/${ROUNDS} &middot; Score: <span>${score}</span></div>
        <div class="progress-bar"><div class="fill" style="width:${(current/ROUNDS)*100}%"></div></div>
        <div style="font-size:0.85rem; color:var(--text-dim); margin-bottom:8px; text-transform:uppercase; letter-spacing:1px;">
          ${isTitle ? 'Real or Fake Paper Title?' : 'Real or Fake Science Claim?'}
        </div>
        <div class="question-text" style="${isTitle ? 'font-style:italic;' : ''}">${item.text.replace('Paper title: ', '')}</div>
        <div style="display:flex; gap:12px; margin-top:24px;">
          <button class="btn btn-primary" style="flex:1; font-size:1.1rem;" id="fof-real">\u2705 Real</button>
          <button class="btn btn-primary" style="flex:1; font-size:1.1rem; background:var(--card);" id="fof-fake">\u274C Fake</button>
        </div>
      `;
      document.getElementById('fof-real').onclick = () => judge(true);
      document.getElementById('fof-fake').onclick = () => judge(false);
    }

    function judge(guessedReal) {
      const item = picked[current];
      const correct = guessedReal === item.real;
      if (correct) score++;

      container.innerHTML = `
        <div class="score-display">Round ${current + 1}/${ROUNDS} &middot; Score: <span>${score}</span></div>
        <div class="progress-bar"><div class="fill" style="width:${((current+1)/ROUNDS)*100}%"></div></div>
        <div class="question-text" style="${item.text.startsWith('Paper title:') ? 'font-style:italic;' : ''}">${item.text.replace('Paper title: ', '')}</div>
        <div style="font-size:1.4rem; font-weight:700; margin:16px 0; color:${correct ? 'var(--success)' : 'var(--danger)'};">
          ${correct ? 'Correct!' : 'Wrong!'} It's ${item.real ? 'REAL' : 'FAKE'}.
        </div>
        <div class="feedback-text">${item.explain}</div>
        <div style="margin-top:20px;">
          <button class="btn btn-primary" id="fof-next">${current < ROUNDS - 1 ? 'Next' : 'See Results'}</button>
        </div>
      `;
      document.getElementById('fof-next').onclick = () => {
        current++;
        if (current < ROUNDS) renderItem();
        else BreakRoom.showResult(container, { score, max: ROUNDS, game: 'fact-or-fiction',
          verdicts: [
            "Supreme BS detector. Peer review needs you.",
            "Solid instincts. Most fakes didn't fool you.",
            "Some good calls, some bad. Trust but verify.",
            "You'd believe anything. Stay off social media."
          ]
        });
      };
    }

    renderItem();
  }
});
