BreakRoom.register({
  id: 'wordl',
  name: 'Wordl',
  icon: '\u{2728}',
  description: 'Guess the word. Pick your letters, pick your chances.',
  play(container) {

    // ─── Word Lists ───
    const WORDS = {
      4: 'ABLE ARCH BAKE BAND BASE BEAM BEAR BEAT BELL BEST BIND BITE BLOW BLUE BOAT BOLD BOLT BOND BONE BOOK BORE BORN BOWL BURN CAGE CAKE CALM CAMP CARD CARE CASE CASH CAST CAVE CHIP CITY CLAM CLAP CLAY CLIP CLUE COAL COAT CODE COIL COIN COLD COOK COOL COPE COPY CORD CORE CORN COST CREW CROP CUBE CURB CURE CURL DARE DARK DART DASH DATA DAWN DEAL DEAR DECK DEEP DENY DESK DIAL DIRT DISH DOCK DOME DONE DOOR DOSE DOWN DRAG DRAW DROP DRUM DUAL DUKE DULL DUMP DUNE DUST DUTY EACH EARN EASE EAST EDGE EDIT EMIT EPIC EVEN EVIL EXAM FACE FACT FADE FAIL FAIR FAKE FAME FARM FAST FATE FEAR FEED FEEL FILM FIND FINE FIRE FIRM FISH FLAG FLAT FLAW FLIP FLOW FOLD FOLK FOND FOOD FOOL FORK FORM FORT FOUL FREE FROM FUEL FULL FUND FURY FUSE GAIN GALE GAME GAZE GEAR GIFT GLAD GLOW GLUE GOAT GOLD GOLF GONE GOOD GRAB GRAY GREW GRID GRIM GRIN GRIP GROW GULF GUST HACK HAIL HAIR HALF HALL HALT HAND HANG HARM HASH HATE HAUL HAWK HAZE HEAD HEAL HEAP HEAR HEAT HEEL HELD HELM HELP HERB HERD HERE HERO HIDE HIGH HIKE HILL HINT HIRE HOLD HOLE HOME HOOD HOOK HOPE HORN HOST HOUR HOWL HUGE HULL HUNG HUNT HURT ICON IDEA INTO IRON ISLE ITEM JAIL JEST JOKE JUMP JURY JUST KEEN KEEP KICK KIND KING KISS KNOT KNOW LACE LACK LAID LAKE LAMB LAMP LAND LANE LARK LAST LATE LAWN LEAD LEAF LEAN LEAP LEFT LEND LENS LIAR LIFE LIFT LIKE LIMB LIME LINE LINK LION LIST LIVE LOAD LOAF LOAN LOCK LOFT LONE LONG LOOK LOOP LORD LOSE LOSS LOST LOUD LOVE LUCK LUMP LUNG LURE LURK MADE MAIL MAIN MAKE MALE MALL MANE MANY MARK MAST MATE MATH MAZE MEAL MEAN MEET MELT MEMO MEND MENU MERE MESH MILD MILK MILL MIND MINE MINT MISS MIST MODE MOLD MOOD MOON MORE MOSS MOST MOVE MUCH MULE MUSE MUST MYTH NAIL NAME NAVY NEAR NEAT NECK NEED NEST NEWS NEXT NINE NODE NONE NOON NORM NOSE NOTE NOUN OBEY ODDS OMEN OMIT ONCE ONLY ONTO OPEN OVEN OVER PACE PACK PAGE PAID PAIN PAIR PALE PALM PARK PART PASS PAST PATH PEAK PEEL PEER PINE PINK PIPE PLAN PLAY PLEA PLOT PLUG PLUM PLUS POEM POET POLE POLL POND POOL POOR PORT POSE POST POUR PRAY PREY PROP PULL PUMP PURE PUSH QUIT RACE RACK RAGE RAID RAIL RAIN RANK RARE RASH RATE READ REAL REAP REAR REED REEF REEL RELY RENT REST RICE RICH RIDE RING RIOT RISE RISK ROAD ROAM ROBE ROCK RODE ROLE ROLL ROOF ROOM ROOT ROPE ROSE RUIN RULE RUSH RUST SAFE SAGE SAID SAIL SAKE SALE SALT SAME SAND SANE SAVE SCAN SEAL SEAT SEED SEEK SEEM SEEN SELF SELL SEND SHED SHIP SHOP SHOT SHOW SHUT SICK SIDE SIGH SIGN SILK SING SINK SITE SIZE SKIN SKIP SLAM SLAP SLIM SLIP SLOT SLOW SNAP SNOW SOAK SOAP SOAR SOCK SOFT SOIL SOLD SOLE SOME SONG SOON SORT SOUL SPIN SPIT SPOT STAR STAY STEM STEP STEW STIR STOP SUIT SURE SURF SWAN SWAP SWIM TAIL TAKE TALE TALL TANK TAPE TASK TAXI TEAL TEAM TEAR TELL TEND TENT TERM TEST TEXT THEM THEN THEY THIN THIS THUS TICK TIDE TIED TIER TILE TIME TINY TIRE TOIL TOLD TOLL TOMB TONE TOOK TOOL TORE TORN TOUR TOWN TRAP TRAY TREE TRIM TRIO TRIP TRUE TUBE TUCK TUNE TURN TWIN TYPE UNIT UPON URGE USED USER VALE VARY VAST VERB VERY VEST VICE VIEW VINE VOID VOLT VOTE WADE WAGE WAIT WAKE WALK WALL WANT WARD WARM WARN WASH WAVE WEAK WEAR WEED WEEK WELL WENT WEST WHAT WHEN WHOM WIDE WIFE WILD WILL WIND WINE WING WINK WIPE WIRE WISE WISH WITH WOKE WOLF WOOD WORD WORE WORK WORM WORN WRAP YARD YARN YEAR YELL YOUR ZEAL ZERO ZONE ZOOM'.split(' '),

      5: 'ABOUT ABOVE ABUSE ADMIT ADOPT ADULT AFTER AGAIN AGENT AGREE AHEAD ALARM ALBUM ALIEN ALIGN ALIVE ALONE ALONG ALTER AMONG ANGER ANGLE ANGRY APART APPLE ARENA ARISE ARMOR ASIDE AUDIO AUDIT AVOID AWAKE AWARD AWARE BADGE BADLY BASED BASIC BASIN BATCH BEACH BEGUN BEING BELOW BENCH BIRTH BLACK BLADE BLAME BLANK BLAST BLAZE BLEND BLIND BLOCK BLOWN BOARD BONUS BOOTH BOUND BRAIN BRAND BRAVE BREAD BREAK BREED BRICK BRIEF BRING BROAD BROWN BRUSH BUILD BUNCH BURNT BUYER CABIN CABLE CARGO CARRY CATCH CAUSE CHAIN CHAIR CHALK CHAOS CHARM CHART CHASE CHEAP CHECK CHEER CHEST CHIEF CHILD CHUNK CIVIL CLAIM CLASS CLEAN CLEAR CLIMB CLOCK CLOSE CLOTH CLOUD COACH COAST COLOR COUNT COURT COVER CRACK CRAFT CRASH CRAZY CREAM CRIME CRISP CROSS CROWD CRUSH CURVE CYCLE DAILY DANCE DEATH DEBUT DELAY DENSE DEPOT DEPTH DEVIL DIRTY DOUBT DRAFT DRAIN DRAMA DRAWN DREAM DRESS DRIFT DRILL DRINK DRIVE DROWN DRUNK DYING EAGER EARLY EARTH EIGHT ELECT ELITE EMPTY ENEMY ENJOY ENTER EQUAL ERROR EVENT EVERY EXACT EXILE EXIST EXTRA FAITH FALSE FAULT FEAST FIBER FIELD FIFTY FIGHT FINAL FLAME FLASH FLEET FLESH FLOAT FLOOD FLOOR FLUID FLUSH FORCE FORGE FOUND FRAME FRANK FRAUD FRESH FRONT FROST FRUIT FULLY FUNNY GHOST GIANT GIVEN GLASS GLOBE GLOOM GLORY GRACE GRADE GRAIN GRAND GRANT GRAPH GRASP GRASS GRAVE GREAT GREEN GRIEF GROSS GROUP GROWN GUARD GUESS GUEST GUIDE GUILT HABIT HAPPY HARSH HAVEN HEART HEAVY HENCE HOBBY HONOR HORSE HOTEL HOUSE HUMAN HUMOR IMAGE IMPLY INDEX INNER INPUT IRONY ISSUE IVORY JEWEL JOINT JUDGE JUICE KNOCK KNOWN LABEL LARGE LATER LAUGH LAYER LEARN LEASE LEAST LEAVE LEGAL LEVEL LIGHT LIMIT LIVER LOCAL LOGIC LOOSE LOVER LOWER LOYAL LUNCH LYING MAGIC MAJOR MANOR MAPLE MARCH MATCH MAYBE MAYOR MEANS MEDIA MERCY MERIT METAL MIGHT MINOR MINUS MODEL MONEY MONTH MORAL MOTOR MOUNT MOUTH MOVIE MUSIC NAIVE NAVAL NERVE NEVER NIGHT NOBLE NOISE NORTH NOTED NOVEL OCCUR OCEAN OFFER OFTEN OLIVE ONSET OPERA ORDER OTHER OUTER OWNER PAINT PANEL PANIC PAPER PARTY PATCH PAUSE PEACE PEARL PHASE PHOTO PIANO PIECE PILOT PITCH PLACE PLAIN PLANE PLANT PLATE PLAZA PLEAD POINT POLAR POUND POWER PRESS PRICE PRIDE PRIME PRINT PRIOR PRIZE PROOF PROUD PROVE PULSE PUNCH QUEEN QUEST QUICK QUIET QUOTA QUOTE RADAR RADIO RAISE RALLY RANGE RAPID RATIO REACH REALM REBEL REIGN RELAX REPLY RIDER RIDGE RIGHT RIGID RIVAL RIVER ROBOT ROCKY ROUGH ROUND ROUTE ROYAL RURAL SAINT SALAD SAUCE SCALE SCENE SCOPE SCORE SENSE SERVE SEVEN SHADE SHAKE SHALL SHAME SHAPE SHARE SHARP SHEER SHELF SHELL SHIFT SHINE SHIRT SHOCK SHOOT SHORT SHOUT SIEGE SIGHT SINCE SIXTH SIXTY SKILL SKULL SLATE SLEEP SLICE SLIDE SLOPE SMILE SMOKE SNAKE SOLAR SOLVE SORRY SOUND SOUTH SPACE SPARE SPEAK SPEED SPEND SPENT SPIKE SPINE SPLIT SPOKE SPOON SPORT SPRAY SQUAD STACK STAFF STAGE STAIN STAKE STALL STAMP STAND STARK START STATE STEAL STEAM STEEL STEEP STEER STICK STILL STOCK STONE STOOD STORE STORM STORY STOVE STRAP STRIP STUCK STUDY STUFF STYLE SUITE SUPER SURGE SWAMP SWEAR SWEET SWEPT SWIFT SWING SWORN TABLE TASTE TEACH TEMPO TENSE THEFT THEME THERE THICK THING THINK THIRD THOSE THREE THREW THROW THUMB TIGHT TIMER TITLE TOKEN TOUCH TOUGH TOWER TOXIC TRACE TRACK TRADE TRAIL TRAIN TRAIT TRASH TREAT TREND TRIAL TRIBE TRICK TROOP TRUCK TRULY TRUNK TRUST TRUTH TUMOR TWICE TWIST ULTRA UNCLE UNDER UNION UNITY UNTIL UPPER UPSET URBAN USAGE USUAL UTTER VAGUE VALID VALUE VAULT VENUE VERSE VIDEO VIGOR VIRAL VISIT VITAL VIVID VOCAL VOICE VOTER WAGES WASTE WATCH WATER WEAVE WEIGH WHEAT WHEEL WHERE WHICH WHILE WHITE WHOLE WHOSE WIDTH WOMAN WORLD WORRY WORSE WORST WORTH WOULD WOUND WRATH WRONG WROTE YACHT YIELD YOUNG YOUTH'.split(' '),

      6: 'ABSORB ACCEPT ACCESS ACROSS ACTION ACTIVE ACTUAL ADJUST ADVICE AFFIRM AFFORD AGENDA ALMOST AMOUNT ANCHOR ANNUAL ANSWER ANYONE APPEAL APPEAR ARRIVE ARTIST ASSERT ASSIGN ASSIST ASSUME ATTACH ATTACK ATTEND AUTUMN AVENUE BARELY BATTLE BEACON BEAUTY BECOME BEFORE BEHIND BELIEF BELONG BESIDE BEYOND BITTER BLANCH BONDED BORDER BOUNCE BREACH BRIGHT BROKEN BROKER BUBBLE BUDGET BUNDLE BURDEN BUREAU CAMPUS CANCEL CARBON CAREER CASTLE CAUGHT CENTER CHANGE CHOICE CIRCLE CLEVER CLIMAX CLOSED COBALT COLUMN COMBAT COMMIT COMMON CONVEY COPPER CORNER COSTLY COTTON COUNTY COUPLE COURSE COUSIN CREATE CRISIS CUSTOM DAMAGE DANGER DEBATE DECADE DECODE DEFEAT DEFEND DEFINE DEGREE DEMAND DEPLOY DESERT DESIGN DETAIL DETECT DEVOTE DIFFER DIRECT DIVIDE DOMAIN DOUBLE DRIVEN EARNED EASILY EFFECT EFFORT EMERGE EMPIRE ENABLE ENDURE ENERGY ENGAGE ENGINE ENOUGH ENSURE ENTIRE EQUITY ESCAPE ESTATE EVOLVE EXCEED EXCEPT EXCITE EXCUSE EXEMPT EXPAND EXPECT EXPERT EXPOSE EXTEND EXTENT FABRIC FACTOR FAIRLY FAMILY FAMOUS FATHOM FEEBLE FELLOW FIGURE FILTER FINGER FISCAL FLIGHT FLOWER FOLLOW FORBID FOREST FORGET FORMAL FORMAT FORMER FOSSIL FOSTER FREEZE FROZEN GENTLE GEYSER GLOBAL GOVERN GRAVEL GROWTH GUITAR GUTTER HANDLE HAPPEN HARBOR HEALTH HEAVEN HIDDEN HOLLOW HONEST HUNGER IGNITE IMPACT IMPOSE INCOME INDEED INDOOR INFORM INJECT INJURY INSANE INSIDE INSIST INSULT INTACT INTEND INVEST INWARD ISLAND ITSELF JACKET JARGON JOCKEY KERNEL LADDER LAUNCH LAVISH LAWYER LAYOUT LEADER LEAGUE LENDER LESSON LETTER LIKELY LINING LIQUID LISTEN LIVELY LIVING LONELY LUXURY MAIDEN MANAGE MANNER MANUAL MARGIN MARKET MASTER MATTER MEDIUM MEMBER MEMORY MENTAL MERGER METHOD MIDDLE MINGLE MIRROR MOBILE MODERN MODULE MOMENT MOTIVE MOVING MUSCLE MUTUAL MYSELF NARROW NATION NATURE NEARBY NEARLY NEEDLE NEPHEW NEURAL NIMBLE NORMAL NOTION NUCLEI OBLIGE OBTAIN OFFEND OFFICE OPPOSE OPTION ORANGE ORIGIN OUTPUT OUTSET PADDLE PALACE PARENT PARTLY PATENT PATROL PATRON PAYOFF PEBBLE PENCIL PEOPLE PERIOD PERMIT PHRASE PILLAR PLAGUE PLANET PLENTY PLUNGE POCKET POISON POLICE POLICY POLISH POLITE POORLY POWDER PRAYER PREFER PREFIX PROFIT PROMPT PROPEL PROVEN PUBLIC PUNISH PURSUE PUZZLE QUOTAS RANDOM RANKED RATHER RATING REASON RECALL RECENT RECORD REDUCE REFORM REFUND REGARD REGIME REGION REJECT RELATE RELIEF REMAIN REMEDY REMOTE REMOVE RENDER RENTAL REPAIR REPEAT REPORT RESIGN RESIST RESORT RESULT RETAIN RETIRE RETORT RETURN REVEAL REVIEW REVOLT REWARD RIBBON RIPPLE ROBUST RUBBER RUMBLE SAFELY SAFETY SALARY SAMPLE SAVING SCARCE SCHEME SCHOOL SCREEN SCRIPT SEARCH SEASON SECOND SECRET SECURE SELECT SELLER SENIOR SERIES SETTLE SEVERE SHADOW SHIELD SIGNAL SILENT SILVER SIMPLE SINGLE SKETCH SLEEPY SLIGHT SMOOTH SNATCH SOCKET SOFTEN SOLEMN SORROW SOURCE SPEECH SPHERE SPIRIT SPLASH SPREAD SQUARE STABLE STANCE STARCH STEADY STOLEN STRAIN STRAND STREAK STREAM STREET STRESS STRICT STRIDE STRIKE STRING STRIPE STRIVE STRONG SUBMIT SUBURB SUDDEN SUFFER SUMMIT SUMMON SUNDAY SUPPLY SURELY SURVEY SWITCH SYMBOL SYSTEM TACKLE TALENT TARGET TEMPLE TENANT TENDER THIRST THREAD THRILL THRONE TICKET TIMBER TISSUE TOGGLE TOMATO TONGUE TOWARD TRAUMA TREATY TREMOR TRIBAL TROPHY TRUANT TUNNEL UNFAIR UNFOLD UNIQUE UNLOCK UNREST UNVEIL UPDATE UPHOLD UPTAKE USEFUL UTMOST VACANT VACUUM VALLEY VANISH VANITY VENDOR VERIFY VESSEL VICTIM VIRTUE VISION VOLUME VOYAGE WANDER WARMTH WEALTH WEAPON WEEKLY WHISKY WICKED WIDELY WINERY WINNER WINTER WISDOM WITHIN WONDER WORKER WORTHY WREATH YEARLY ZENITH ZIGZAG'.split(' '),

      7: 'ABANDON ABILITY ABOLISH ABSENCE ABSOLVE ABSTAIN ACADEMY ACCOUNT ACHIEVE ACQUIRE ADDRESS ADVANCE ADVISOR AGAINST AIRLINE ALGEBRA ALREADY AMAZING ANALYST ANCIENT ANOTHER ANXIETY APPLIED APPROVE ARCHIVE ARRANGE ARTICLE ASSAULT ATTEMPT ATTRACT AUCTION BALANCE BARGAIN BARRIER BATTERY BECAUSE BELIEVE BENEATH BENEFIT BETWEEN BILLION BISCUIT BLANKET BLOSSOM BOMBING BOROUGH BREADTH CABINET CALIBER CAPABLE CAPITAL CAPTAIN CAPTURE CATALOG CAUTION CENTRAL CERTAIN CHAMBER CHANNEL CHAPTER CHRONIC CIRCUIT CITIZEN CLIMATE CLUSTER COASTAL COLLECT COLLEGE COMBINE COMMAND COMPACT COMPANY COMPARE COMPLEX COMPOSE COMPUTE CONCEPT CONCERN CONDUCT CONFIRM CONFUSE CONNECT CONSENT CONTAIN CONTENT CONTEXT CONTROL CONVERT COOKING CORRECT COUNCIL COUNTER COUNTRY COURAGE COVERED CRUCIAL CRUSADE CULTURE CURRENT CUSTODY CUSTOMS DAMAGED DATASET DEALING DEBRIEF DECLINE DEEPEST DEFENSE DEFICIT DEFINED DELIVER DENSITY DEPOSIT DERIVED DESPAIR DESPITE DESTINY DESTROY DEVELOP DEVOTED DIGITAL DIPLOMA DISPLAY DISPUTE DISTANT DIVERGE DIVERSE DROPOUT EARLIER EASTERN ECLIPSE EDITING EDITION ELECTED ELEMENT ELEVATE EMBASSY EMBRACE EMOTION ENABLED ENDLESS ENFORCE ENGAGED EARNEST EPISODE ESSENCE ETERNAL ETHICAL EVIDENT EXAMINE EXAMPLE EXCITED EXECUTE EXHIBIT EXPENSE EXPLAIN EXPLOIT EXPLORE EXPOSED EXPRESS EXTRACT EXTREME FACTORY FACULTY FAILURE FASHION FEEDING FICTION FIGHTER FINALLY FINANCE FISHING FITNESS FOREIGN FOREVER FORMULA FORTUNE FOUNDED FREEDOM FREIGHT FURTHER GALLERY GATEWAY GENERAL GENETIC GENUINE GESTURE GLIMPSE GRANDMA GRAVITY GREATER GROCERY GROWING HABITAT HALFWAY HAPPILY HARMONY HARVEST HEADING HEALTHY HEATING HELPFUL HIGHWAY HIMSELF HISTORY HOLDING HOLIDAY HONORED HORIZON HOSTILE HOUSING HOWEVER HUNDRED HUNTING ILLEGAL IMAGINE IMMENSE IMPLANT IMPULSE INCLUDE INDEXED INITIAL INSPECT INSTALL INSTEAD INTERIM INVALID INVOLVE ISOLATE JEWELRY JOURNAL JOURNEY JUSTICE JUSTIFY KEEPING KEYWORD KINGDOM KITCHEN LANDING LATERAL LEADING LEATHER LECTURE LEGALLY LENDING LENGTHY LIBERAL LIBERTY LIGHTER LIMITED LOGICAL LONGEST LOTTERY LOYALTY LUGGAGE MACHINE MANAGER MANDATE MASSIVE MASTERY MEANING MEASURE MEDICAL MEETING MENTION MILITIA MILLION MINERAL MINIMAL MIRACLE MISSING MISSION MISTAKE MIXTURE MONITOR MONSTER MONTHLY MORNING MUNDANE MYSTERY NATIONS NATURAL NEAREST NEGLECT NEITHER NERVOUS NEUTRAL NOTABLE NOTHING NOWHERE NUCLEAR NURSERY NURTURE OBVIOUS OFFENSE OFFICER OPINION ORGANIC OUTDOOR OUTLOOK OUTSIDE OVERALL OVERLAP OVERRUN PAINFUL PALETTE PARADOX PARSLEY PARTIAL PARTNER PASSIVE PATIENT PATTERN PAYMENT PENALTY PENSION PERCENT PERFECT PERHAPS PERSIST PICKING PIONEER PLANNED PLASTIC PLATTER PLEASED PLUNDER POINTED POLITIC POLLUTE POPULAR PORTION POVERTY PRECISE PREDICT PREMIER PREMIUM PREPARE PRESENT PRESUME PRETEND PREVENT PRIMARY PRINTER PRIVATE PROBLEM PROCEED PROCESS PRODUCE PRODUCT PROFILE PROGRAM PROJECT PROMISE PROMOTE PROPOSE PROTECT PROTEST PROVIDE PUBLISH PURSUIT QUARTER RADICAL RAPIDLY READING READILY REALITY REBUILD RECEIPT RECEIVE RECLAIM RECOVER RECRUIT REFLECT REFRESH REFUGEE REGIONS REGULAR RELATED RELEASE REMAINS REMOVAL RENEWAL REPLACE REQUIRE RESCIND RESERVE RESOLVE RESPECT RESPOND RESTORE RESULTS REVENUE REVERSE REVIVAL ROUTINE RUNNING RUPTURE SATISFY SCATTER SCHOLAR SCIENCE SCRATCH SECTION SEEKING SEGMENT SEISMIC SERIOUS SERVICE SESSION SETTING SEVENTH SHELTER SHERIFF SILENCE SIMILAR SKEPTIC SKILLED SHORTLY SMOKING SOLDIER SOMEHOW SPEAKER SPECIAL SPECIES SPONSOR SQUEEZE STADIUM STARTER STELLAR STORAGE STRANGE STUDENT SUBJECT SUCCEED SUCCESS SUGGEST SUMMARY SUNRISE SUPPORT SUPREME SURFACE SURGEON SURPLUS SUSPEND TEACHER TENSION TERRAIN THERAPY THOUGHT TICKETS TOPLINE TOURISM TRACKER TRADING TRAINED TRIGGER TROUBLE TRUSTED TURNING TYPICAL UNDERGO UNEQUAL UNIFIED UNIFORM UPDATED UPSCALE VACCINE VARIETY VENTURE VERDICT VETERAN VILLAGE VINTAGE VIOLENT VIRTUAL VISIBLE WARRANT WEALTHY WEATHER WEBSITE WEEKEND WELFARE WESTERN WHETHER WILLING WITHOUT WITNESS WORKERS WORSHIP WRITING'.split(' ')
    };

    const WIN_MESSAGES = [
      'NAILED IT!! The chaos bows to you.',
      'Wait... you actually got it?? Respect.',
      'Big brain energy right there.',
      'The chaos smiled upon you today.',
      'Okay genius, do it again. I dare you.',
      'Look at you, solving things and stuff!'
    ];

    const CLOSE_WIN_MESSAGES = [
      'BY THE SKIN OF YOUR TEETH.',
      'That was TOO close. My heart.',
      'Cutting it real close there, bestie.',
      'The chaos almost had you that time.'
    ];

    const LOSE_MESSAGES = [
      'The chaos consumed you. No backsies.',
      'RIP. Go pet a dog about it.',
      'The word wins this round. Shake it off.',
      'Sometimes the chaos wins. This was one of those times.'
    ];

    const LETTER_HINTS = { 4: 'smol', 5: 'classic', 6: 'spicy', 7: 'unhinged' };
    const GUESS_HINTS = { 4: 'yolo', 5: 'sweaty', 6: 'normal', 7: 'chill', 8: 'tourist' };
    const TILE_SIZES = { 4: 62, 5: 58, 6: 52, 7: 46 };

    // ─── State ───
    let wordLength = 5;
    let maxGuesses = 6;
    let target = '';
    let guesses = [];
    let evaluations = [];
    let currentGuess = '';
    let gameOver = false;
    let isRevealing = false;
    let keyStates = {};

    // ─── Style Injection ───
    const styleEl = document.createElement('style');
    styleEl.id = 'wordl-styles';
    styleEl.textContent = `
      .wordl-setup { text-align:center; padding:30px 20px; max-width:420px; margin:0 auto; }
      .wordl-title {
        font-size:2.8rem; font-weight:800; letter-spacing:10px; margin-bottom:6px;
        background:linear-gradient(90deg,#ff61d8,#74b0ff,#5cf0e3,#a5ea9b,#ffcc81);
        -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
      }
      .wordl-subtitle { color:#b0b6cc; font-size:1.05rem; margin-bottom:32px; font-family:'Segoe UI','Comic Sans MS',cursive,sans-serif; }
      .wordl-setting { margin-bottom:24px; }
      .wordl-setting-label {
        font-size:0.8rem; font-weight:600; text-transform:uppercase; letter-spacing:2px;
        color:#b0b6cc; margin-bottom:10px;
      }
      .wordl-opt-group { display:flex; gap:10px; justify-content:center; }
      .wordl-opt {
        width:56px; height:56px; border-radius:14px; border:2px solid #363c54; background:#212638;
        color:#e8ecf4; font-size:1.3rem; font-weight:700; cursor:pointer; transition:all 0.3s;
        display:flex; flex-direction:column; align-items:center; justify-content:center;
        font-family:'Segoe UI','Comic Sans MS',cursive,sans-serif;
      }
      .wordl-opt:hover { border-color:#ff85e2; background:#282d42; }
      .wordl-opt.sel { border-color:#ff61d8; background:rgba(255,97,216,0.15); box-shadow:0 0 12px rgba(255,97,216,0.3); }
      .wordl-opt-hint { font-size:0.5rem; font-weight:400; color:#b0b6cc; margin-top:1px; }
      .wordl-start {
        margin-top:32px; padding:14px 48px; border-radius:14px; border:2px solid #ff61d8;
        background:rgba(255,97,216,0.15); color:#ff85e2; font-size:1.4rem; font-weight:800;
        letter-spacing:6px; cursor:pointer; transition:all 0.3s; animation:wordl-glow 2s ease-in-out infinite;
        font-family:'Segoe UI','Comic Sans MS',cursive,sans-serif;
      }
      .wordl-start:hover { background:rgba(255,97,216,0.25); box-shadow:0 0 24px rgba(255,97,216,0.5); transform:scale(1.05); }
      @keyframes wordl-glow {
        0%,100% { box-shadow:0 0 8px rgba(255,97,216,0.2); }
        50% { box-shadow:0 0 20px rgba(255,97,216,0.4); }
      }

      .wordl-game { text-align:center; max-width:520px; margin:0 auto; }
      .wordl-hdr {
        display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;
        flex-wrap:wrap; gap:8px;
      }
      .wordl-hdr-title {
        font-size:1.3rem; font-weight:800; letter-spacing:5px;
        background:linear-gradient(90deg,#ff61d8,#74b0ff,#5cf0e3,#a5ea9b,#ffcc81);
        -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
      }
      .wordl-hdr-info { color:#b0b6cc; font-size:0.8rem; }
      .wordl-board { display:inline-flex; flex-direction:column; gap:6px; margin-bottom:16px; }
      .wordl-row { display:flex; gap:6px; justify-content:center; }
      .wordl-tile {
        display:flex; align-items:center; justify-content:center;
        border:2px solid #363c54; border-radius:8px;
        font-size:1.5rem; font-weight:700; text-transform:uppercase;
        color:#e8ecf4; font-family:'Segoe UI','Comic Sans MS',cursive,sans-serif;
        transition:border-color 0.15s;
      }
      .wordl-tile.filled { border-color:#b0b6cc; animation:wordl-pop 0.1s ease; }
      @keyframes wordl-pop { 50%{transform:scale(1.08);} }
      .wordl-row.current .wordl-tile:not(.revealed) { border-color:#ff61d8; }
      .wordl-row.current .wordl-tile.filled:not(.revealed) { border-color:#ff85e2; }
      .wordl-row.current .wordl-tile:not(.filled):not(.revealed) { animation:wordl-cozy 3s linear infinite; }
      @keyframes wordl-cozy {
        0%{border-color:#ff61d8;} 25%{border-color:#74b0ff;} 50%{border-color:#a5ea9b;} 75%{border-color:#ffcc81;} 100%{border-color:#ff61d8;}
      }
      .wordl-tile.correct { background:#a5ea9b; border-color:#a5ea9b; color:#1a1e2d; }
      .wordl-tile.present { background:#ffcc81; border-color:#ffcc81; color:#1a1e2d; }
      .wordl-tile.absent  { background:#363c54; border-color:#363c54; color:#888; }
      .wordl-tile.flip { animation:wordl-flip 0.5s ease; }
      @keyframes wordl-flip { 0%{transform:rotateX(0);} 50%{transform:rotateX(90deg);} 100%{transform:rotateX(0);} }
      .wordl-row.shake { animation:wordl-shake 0.4s ease; }
      @keyframes wordl-shake {
        0%,100%{transform:translateX(0);} 15%,45%,75%{transform:translateX(-5px);} 30%,60%,90%{transform:translateX(5px);}
      }
      .wordl-tile.bounce { animation:wordl-bounce 0.5s ease; }
      @keyframes wordl-bounce { 0%,100%{transform:translateY(0);} 40%{transform:translateY(-18px);} 65%{transform:translateY(-6px);} }

      .wordl-kb { margin-top:6px; }
      .wordl-kb-row { display:flex; gap:5px; justify-content:center; margin-bottom:5px; }
      .wordl-key {
        height:50px; min-width:34px; padding:0 6px; border-radius:8px; border:none;
        background:#282d42; color:#e8ecf4; font-size:0.9rem; font-weight:700; cursor:pointer;
        transition:all 0.15s; font-family:'Segoe UI','Comic Sans MS',cursive,sans-serif;
        text-transform:uppercase;
      }
      .wordl-key:hover { background:#31374e; }
      .wordl-key.wide { min-width:52px; font-size:0.7rem; padding:0 10px; }
      .wordl-key.correct { background:#a5ea9b; color:#1a1e2d; }
      .wordl-key.present { background:#ffcc81; color:#1a1e2d; }
      .wordl-key.absent  { background:#1a1e2d; color:#555; }

      .wordl-toast {
        position:fixed; top:80px; left:50%; transform:translateX(-50%);
        background:#e8ecf4; color:#1a1e2d; padding:10px 22px; border-radius:8px;
        font-weight:700; font-size:0.9rem; z-index:1000; pointer-events:none;
        animation:wordl-toast-in 0.3s ease;
        font-family:'Segoe UI','Comic Sans MS',cursive,sans-serif;
      }
      @keyframes wordl-toast-in { from{opacity:0;transform:translateX(-50%) translateY(-10px);} to{opacity:1;transform:translateX(-50%) translateY(0);} }

      .wordl-end {
        margin-top:16px; padding:18px; border-radius:14px; background:#212638; border:2px solid #363c54;
      }
      .wordl-end-msg {
        font-size:1.15rem; font-weight:700; margin-bottom:6px;
        background:linear-gradient(90deg,#ff61d8,#74b0ff,#5cf0e3,#a5ea9b,#ffcc81);
        -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
      }
      .wordl-end-msg.loss { background:none; -webkit-text-fill-color:#ff85e2; color:#ff85e2; }
      .wordl-end-word { color:#b0b6cc; font-size:0.9rem; margin-bottom:14px; }
      .wordl-end-actions { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }
      .wordl-end-btn {
        padding:10px 22px; border-radius:10px; border:2px solid #363c54; background:#282d42;
        color:#e8ecf4; font-weight:600; font-size:0.9rem; cursor:pointer; transition:all 0.2s;
        font-family:'Segoe UI','Comic Sans MS',cursive,sans-serif;
      }
      .wordl-end-btn:hover { border-color:#ff85e2; background:#31374e; }
      .wordl-end-btn.primary { border-color:#ff61d8; background:rgba(255,97,216,0.15); color:#ff85e2; }
      .wordl-end-btn.primary:hover { background:rgba(255,97,216,0.25); }

      .wordl-celebration { animation:wordl-neon-flash 0.8s ease; }
      @keyframes wordl-neon-flash {
        0%{box-shadow:0 0 5px #ff61d8;} 25%{box-shadow:0 0 25px #74b0ff,0 0 50px rgba(116,176,255,0.3);}
        50%{box-shadow:0 0 25px #a5ea9b,0 0 50px rgba(165,234,155,0.3);}
        75%{box-shadow:0 0 25px #ffcc81,0 0 50px rgba(255,204,129,0.3);} 100%{box-shadow:0 0 5px #ff61d8;}
      }

      @media(max-width:500px) {
        .wordl-tile { font-size:1.2rem; }
        .wordl-key { height:44px; min-width:28px; font-size:0.8rem; }
        .wordl-key.wide { min-width:44px; font-size:0.6rem; }
        .wordl-title { font-size:2rem; letter-spacing:6px; }
      }
    `;
    document.head.appendChild(styleEl);

    // ─── Helpers ───
    function pick(arr) {
      if (!arr || arr.length === 0) return null;
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function showToast(msg, duration) {
      const existing = document.querySelector('.wordl-toast');
      if (existing) existing.remove();
      const el = document.createElement('div');
      el.className = 'wordl-toast';
      el.textContent = msg;
      document.body.appendChild(el);
      setTimeout(() => { if (el.parentNode) el.remove(); }, duration || 1500);
    }

    function getTileSize() {
      const base = TILE_SIZES[wordLength] || 52;
      if (window.innerWidth <= 380) return Math.max(base - 18, 36);
      if (window.innerWidth <= 500) return Math.max(base - 10, 38);
      return base;
    }

    // ─── Guess Evaluation (handles duplicate letters correctly) ───
    function evaluateGuess(guess, answer) {
      if (!guess || !answer || guess.length !== answer.length) return [];
      const result = new Array(guess.length).fill('absent');
      const counts = {};
      for (const c of answer) counts[c] = (counts[c] || 0) + 1;

      for (let i = 0; i < guess.length; i++) {
        if (guess[i] === answer[i]) {
          result[i] = 'correct';
          counts[guess[i]]--;
        }
      }
      for (let i = 0; i < guess.length; i++) {
        if (result[i] === 'absent' && counts[guess[i]] > 0) {
          result[i] = 'present';
          counts[guess[i]]--;
        }
      }
      return result;
    }

    function updateKeyStates(guess, evaluation) {
      for (let i = 0; i < guess.length; i++) {
        const letter = guess[i];
        const state = evaluation[i];
        const current = keyStates[letter];
        if (state === 'correct') keyStates[letter] = 'correct';
        else if (state === 'present' && current !== 'correct') keyStates[letter] = 'present';
        else if (state === 'absent' && !current) keyStates[letter] = 'absent';
      }
    }

    // ─── Setup Screen ───
    function showSetup() {
      gameOver = false;
      guesses = [];
      evaluations = [];
      currentGuess = '';
      keyStates = {};
      isRevealing = false;

      container.innerHTML = `
        <div class="wordl-setup">
          <div class="wordl-title">WORDL</div>
          <div class="wordl-subtitle">how much chaos do you want?</div>
          <div class="wordl-setting">
            <div class="wordl-setting-label">Letters</div>
            <div class="wordl-opt-group" id="wl-letters"></div>
          </div>
          <div class="wordl-setting">
            <div class="wordl-setting-label">Chances</div>
            <div class="wordl-opt-group" id="wl-guesses"></div>
          </div>
          <button class="wordl-start" id="wl-start">YEET</button>
        </div>
      `;

      const lettersGroup = container.querySelector('#wl-letters');
      [4, 5, 6, 7].forEach(n => {
        const btn = document.createElement('button');
        btn.className = 'wordl-opt' + (n === wordLength ? ' sel' : '');
        btn.innerHTML = `${n}<span class="wordl-opt-hint">${LETTER_HINTS[n]}</span>`;
        btn.onclick = () => {
          wordLength = n;
          lettersGroup.querySelectorAll('.wordl-opt').forEach(b => b.classList.remove('sel'));
          btn.classList.add('sel');
        };
        lettersGroup.appendChild(btn);
      });

      const guessesGroup = container.querySelector('#wl-guesses');
      [4, 5, 6, 7, 8].forEach(n => {
        const btn = document.createElement('button');
        btn.className = 'wordl-opt' + (n === maxGuesses ? ' sel' : '');
        btn.innerHTML = `${n}<span class="wordl-opt-hint">${GUESS_HINTS[n]}</span>`;
        btn.onclick = () => {
          maxGuesses = n;
          guessesGroup.querySelectorAll('.wordl-opt').forEach(b => b.classList.remove('sel'));
          btn.classList.add('sel');
        };
        guessesGroup.appendChild(btn);
      });

      container.querySelector('#wl-start').onclick = startGame;
    }

    // ─── Start Game ───
    function startGame() {
      const wordList = WORDS[wordLength];
      if (!wordList || wordList.length === 0) {
        showToast('No words for that length!');
        return;
      }
      target = pick(wordList);
      guesses = [];
      evaluations = [];
      currentGuess = '';
      gameOver = false;
      isRevealing = false;
      keyStates = {};
      renderGame();
      document.addEventListener('keydown', onKeyDown);
    }

    // ─── Render Game ───
    function renderGame() {
      const tileSize = getTileSize();

      let boardHTML = '<div class="wordl-board">';
      for (let r = 0; r < maxGuesses; r++) {
        const isCurrent = r === guesses.length && !gameOver;
        const rowClass = 'wordl-row' + (isCurrent ? ' current' : '');
        boardHTML += `<div class="${rowClass}" data-row="${r}">`;

        for (let c = 0; c < wordLength; c++) {
          let letter = '';
          let classes = 'wordl-tile';
          let style = `width:${tileSize}px;height:${tileSize}px;`;

          if (r < guesses.length) {
            letter = guesses[r][c];
            classes += ' revealed ' + evaluations[r][c];
          } else if (r === guesses.length && c < currentGuess.length) {
            letter = currentGuess[c];
            classes += ' filled';
          }

          boardHTML += `<div class="${classes}" style="${style}" data-row="${r}" data-col="${c}">${letter}</div>`;
        }
        boardHTML += '</div>';
      }
      boardHTML += '</div>';

      const kbRows = [
        ['Q','W','E','R','T','Y','U','I','O','P'],
        ['A','S','D','F','G','H','J','K','L'],
        ['ENTER','Z','X','C','V','B','N','M','DEL']
      ];

      let kbHTML = '<div class="wordl-kb">';
      kbRows.forEach(row => {
        kbHTML += '<div class="wordl-kb-row">';
        row.forEach(key => {
          const isWide = key === 'ENTER' || key === 'DEL';
          const ks = keyStates[key] || '';
          const label = key === 'DEL' ? '⌫' : key;
          kbHTML += `<button class="wordl-key${isWide ? ' wide' : ''}${ks ? ' ' + ks : ''}" data-key="${key}">${label}</button>`;
        });
        kbHTML += '</div>';
      });
      kbHTML += '</div>';

      container.innerHTML = `
        <div class="wordl-game">
          <div class="wordl-hdr">
            <div class="wordl-hdr-title">WORDL</div>
            <div class="wordl-hdr-info">${wordLength} letters · ${maxGuesses - guesses.length} left</div>
          </div>
          ${boardHTML}
          ${kbHTML}
          <div id="wordl-end-slot"></div>
        </div>
      `;

      container.querySelectorAll('.wordl-key').forEach(btn => {
        btn.addEventListener('click', () => handleKey(btn.dataset.key));
      });
    }

    // ─── Key Handling ───
    function handleKey(key) {
      if (gameOver || isRevealing) return;

      if (key === 'ENTER') {
        submitGuess();
      } else if (key === 'DEL' || key === 'BACKSPACE') {
        if (currentGuess.length > 0) {
          currentGuess = currentGuess.slice(0, -1);
          renderGame();
        }
      } else if (/^[A-Z]$/.test(key) && currentGuess.length < wordLength) {
        currentGuess += key;
        renderGame();
      }
    }

    function onKeyDown(e) {
      if (gameOver || isRevealing) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key.toUpperCase();
      if (key === 'ENTER') {
        e.preventDefault();
        handleKey('ENTER');
      } else if (key === 'BACKSPACE' || key === 'DELETE') {
        e.preventDefault();
        handleKey('DEL');
      } else if (/^[A-Z]$/.test(key)) {
        e.preventDefault();
        handleKey(key);
      }
    }

    // ─── Submit Guess ───
    function submitGuess() {
      if (currentGuess.length < wordLength) {
        showToast('Not enough letters!');
        shakeCurrentRow();
        return;
      }

      if (guesses.includes(currentGuess)) {
        showToast('Already tried that one!');
        shakeCurrentRow();
        return;
      }

      const evaluation = evaluateGuess(currentGuess, target);
      const rowIdx = guesses.length;

      guesses.push(currentGuess);
      evaluations.push(evaluation);
      updateKeyStates(currentGuess, evaluation);

      isRevealing = true;
      revealRow(rowIdx, evaluation, () => {
        isRevealing = false;
        const won = currentGuess === target;
        currentGuess = '';

        if (won) {
          gameOver = true;
          bounceRow(rowIdx, () => {
            renderGame();
            showEndScreen(true);
          });
        } else if (guesses.length >= maxGuesses) {
          gameOver = true;
          renderGame();
          showEndScreen(false);
        } else {
          renderGame();
        }
      });
    }

    // ─── Row Animations ───
    function revealRow(rowIdx, evaluation, callback) {
      const row = container.querySelector(`.wordl-row[data-row="${rowIdx}"]`);
      if (!row) { callback(); return; }
      const tiles = row.querySelectorAll('.wordl-tile');

      tiles.forEach((tile, i) => {
        setTimeout(() => {
          tile.classList.add('flip');
          setTimeout(() => {
            tile.classList.add('revealed', evaluation[i]);
            tile.classList.remove('flip');
          }, 250);
        }, i * 280);
      });

      setTimeout(callback, tiles.length * 280 + 250);
    }

    function shakeCurrentRow() {
      const row = container.querySelector('.wordl-row.current');
      if (!row) return;
      row.classList.add('shake');
      setTimeout(() => row.classList.remove('shake'), 500);
    }

    function bounceRow(rowIdx, callback) {
      const row = container.querySelector(`.wordl-row[data-row="${rowIdx}"]`);
      if (!row) { callback(); return; }
      const tiles = row.querySelectorAll('.wordl-tile');
      tiles.forEach((tile, i) => {
        setTimeout(() => tile.classList.add('bounce'), i * 100);
      });

      const board = container.querySelector('.wordl-board');
      if (board) board.classList.add('wordl-celebration');

      setTimeout(callback, tiles.length * 100 + 500);
    }

    // ─── End Screen ───
    function showEndScreen(won) {
      const slot = container.querySelector('#wordl-end-slot');
      if (!slot) return;

      let msg, word;
      if (won) {
        const usedGuesses = guesses.length;
        if (usedGuesses === 1) msg = 'WHAT. First try?? Are you a wizard??';
        else if (usedGuesses >= maxGuesses) msg = pick(CLOSE_WIN_MESSAGES);
        else msg = pick(WIN_MESSAGES);
        word = `${usedGuesses} / ${maxGuesses}`;
      } else {
        msg = pick(LOSE_MESSAGES);
        word = `The word was ${target}`;
      }

      slot.innerHTML = `
        <div class="wordl-end">
          <div class="wordl-end-msg${won ? '' : ' loss'}">${msg}</div>
          <div class="wordl-end-word">${word}</div>
          <div class="wordl-end-actions">
            <button class="wordl-end-btn primary" id="wl-again">Again!</button>
            <button class="wordl-end-btn" id="wl-settings">New Setup</button>
          </div>
        </div>
      `;

      container.querySelector('#wl-again').onclick = startGame;
      container.querySelector('#wl-settings').onclick = () => {
        document.removeEventListener('keydown', onKeyDown);
        showSetup();
      };
    }

    // ─── Init ───
    showSetup();

    // ─── Cleanup ───
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
      const toast = document.querySelector('.wordl-toast');
      if (toast) toast.remove();
    };
  }
});
