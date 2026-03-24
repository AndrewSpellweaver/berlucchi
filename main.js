// Data Store: Historical sustainability data 2019-2024
const sustainabilityData = {
    2019: {
        vignetoProprio: 80,
        ettariPartner: 200,
        valoreGenerato: 45.2,
        bottiglie: 3.5,
        paesiServiti: 35,
        fotovoltaico: 20,
        rifiutiRecupero: 70,
        dipendenti: 65,
        visitatori: 15000,
        materialitaFocus: ["Ambiente", "Governance"],
        filieraHighlights: ["Vigneto", "Vinificazione"],
        insight: "Anno base: definizione standard ESG"
    },
    2020: {
        vignetoProprio: 82,
        ettariPartner: 205,
        valoreGenerato: 42.1, // COVID impact
        bottiglie: 3.2,
        paesiServiti: 36,
        fotovoltaico: 28,
        rifiutiRecupero: 75,
        dipendenti: 62, // Reduced due to pandemic
        visitatori: 5000, // COVID impact
        materialitaFocus: ["Sociale", "Ambiente"],
        filieraHighlights: ["Confezionamento", "Distribuzione"],
        insight: "-7% fatturato, +40% energia rinnovabile"
    },
    2021: {
        vignetoProprio: 85,
        ettariPartner: 215,
        valoreGenerato: 48.5,
        bottiglie: 3.6,
        paesiServiti: 40,
        fotovoltaico: 38,
        rifiutiRecupero: 82,
        dipendenti: 68,
        visitatori: 8000,
        materialitaFocus: ["Territorio", "Sociale"],
        filieraHighlights: ["Hospitality", "Vigneto"],
        insight: "Ripresa post-pandemica, focus territorio"
    },
    2022: {
        vignetoProprio: 90,
        ettariPartner: 225,
        valoreGenerato: 52.3,
        bottiglie: 3.9,
        paesiServiti: 45,
        fotovoltaico: 48,
        rifiutiRecupero: 88,
        dipendenti: 72,
        visitatori: 12000,
        materialitaFocus: ["Ambiente", "Innovazione"],
        filieraHighlights: ["Vinificazione", "Hospitality"],
        insight: "+15% export, espansione fotovoltaico"
    },
    2023: {
        vignetoProprio: 92,
        ettariPartner: 235,
        valoreGenerato: 56.1,
        bottiglie: 4.1,
        paesiServiti: 48,
        fotovoltaico: 58,
        rifiutiRecupero: 92,
        dipendenti: 75,
        visitatori: 16000,
        materialitaFocus: ["Governance", "Ambiente"],
        filieraHighlights: ["Distribuzione", "Confezionamento"],
        insight: "Governance rinforzata, 92% recupero rifiuti"
    },
    2024: {
        vignetoProprio: 95,
        ettariPartner: 250,
        valoreGenerato: 59.6,
        bottiglie: 4.3,
        paesiServiti: 50,
        fotovoltaico: 65,
        rifiutiRecupero: 95,
        dipendenti: 78,
        visitatori: 19619,
        materialitaFocus: ["Ambiente", "Sociale", "Territorio", "Governance"],
        filieraHighlights: ["Vigneto", "Vendemmia", "Vinificazione", "Confezionamento", "Distribuzione", "Hospitality"],
        insight: "+32% valore generato dal 2019, 65% energia solare"
    }
};

// KPI Definitions with hierarchy and directional meaning
const kpiDefinitions = [
    { key: 'valoreGenerato', label: 'generato', unit: 'M€', format: 'float', prefix: 'Valore ', hero: true, microLabel: 'crescita costante' },
    { key: 'fotovoltaico', label: 'fotovoltaico', unit: '%', format: 'int', prefix: 'Energia ', hero: true, microLabel: 'transizione energetica' },
    { key: 'vignetoProprio', label: 'Ettari vigneto proprio', unit: '', format: 'int', microLabel: 'espansione patrimoniale' },
    { key: 'ettariPartner', label: 'Ettari partner', unit: '', format: 'int', prefix: 'Rete ', microLabel: 'consolidamento filiera' },
    { key: 'bottiglie', label: 'bottiglie', unit: 'M', format: 'float', prefix: 'Volume ', microLabel: 'crescita volumetrica' },
    { key: 'paesiServiti', label: 'paesi serviti', unit: '', format: 'int', prefix: 'Export ', microLabel: 'espansione internazionale' },
    { key: 'rifiutiRecupero', label: 'rifiuti recupero', unit: '%', format: 'int', prefix: 'Circolarità ', environmental: true, microLabel: 'economia circolare' },
    { key: 'dipendenti', label: 'dipendenti', unit: '', format: 'int', prefix: 'Team ', microLabel: 'sviluppo organizzativo' },
    { key: 'visitatori', label: 'Visitatori annuali', unit: '', format: 'int', separator: true, microLabel: 'rilancio hospitality' }
];

// Interpretive insights by year (not descriptive)
const interpretiveInsights = {
    2019: [
        "L'anno della definizione degli standard ESG: posizionamento strategico per la misurazione futura.",
        "Baseline stabilita: 80 ettari, 65 dipendenti, 20% energia rinnovabile come punto di partenza."
    ],
    2020: [
        "Resilienza testata: la sostenibilità come ancoraggio in un anno di contrazione globale.",
        "Contrazione del -7% compensata da accelerazione energetica (+40% fotovoltaico)."
    ],
    2021: [
        "Ripresa guidata dal territorio: l'hospitality ritorna con focus su relazione locale.",
        "Espansione della rete partner a 215 ettari: consolidamento della filiera corta."
    ],
    2022: [
        "Svolta internazionale: esportazione in 45 paesi guida la crescita del valore generato.",
        "Innovazione agronomica: PBVS e sperimentazione rendono la sostenibilità campo di apprendimento."
    ],
    2023: [
        "Governance matura: il comitato strategico rende la sostenibilità struttura decisionale.",
        "Circolarità quasi totale: 92% di recupero rifiuti segna l'adozione di economia circolare."
    ],
    2024: [
        "Trasformazione compiuta: +32% valore generato dal 2019 attraverso espansione internazionale.",
        "Energia come identità: 65% da fonti rinnovabili rende Berlucchi esempio di transizione energetica nel settore."
    ]
};

// Hero taglines by year
const heroTaglines = {
    2019: "L'inizio del percorso misurato: definizione degli standard ESG.",
    2020: "Resilienza e adaptability: la sostenibilità come ancora nella tempesta.",
    2021: "Ripartenza territoriale: l'hospitality riscopre le radici locali.",
    2022: "Espansione internazionale: la sostenibilità accompagna la crescita globale.",
    2023: "Governance matura: la sostenibilità diventa struttura decisionale.",
    2024: "Trasformazione compiuta: sei anni di evoluzione responsabile."
};

const yearVisuals = {
    2019: {
        heroImage: 'http://static.photos/vineyard/1200x630/88',
        filieraImage: 'http://static.photos/wine/1024x576/42',
        territoryQuote: "La sostenibilità nasce come disciplina del fare: prima struttura, poi racconto."
    },
    2020: {
        heroImage: 'http://static.photos/nature/1200x630/42',
        filieraImage: 'http://static.photos/workspace/1024x576/31',
        territoryQuote: "Nel tempo della crisi, la sostenibilità smette di essere promessa e diventa tenuta."
    },
    2021: {
        heroImage: 'http://static.photos/people/1200x630/77',
        filieraImage: 'http://static.photos/wine/1024x576/61',
        territoryQuote: "La ripartenza rimette al centro la relazione: territorio, persone, ospitalità."
    },
    2022: {
        heroImage: 'http://static.photos/wine/1200x630/61',
        filieraImage: 'http://static.photos/vineyard/1024x576/12',
        territoryQuote: "La crescita internazionale ha valore solo se resta coerente con l’origine."
    },
    2023: {
        heroImage: 'http://static.photos/workspace/1200x630/88',
        filieraImage: 'http://static.photos/people/1024x576/77',
        territoryQuote: "La governance rende la sostenibilità leggibile: non iniziativa episodica, ma struttura."
    },
    2024: {
        heroImage: 'http://static.photos/vineyard/1200x630/88',
        filieraImage: 'http://static.photos/wine/1024x576/42',
        territoryQuote: "La sostenibilità nasce dalla terra, si traduce in gesto, si completa in bottiglia."
    }
};

const governanceByYear = {
    2019: [
        { level: 'Impostazione', title: 'Definizione perimetro', text: 'Anno base di formalizzazione del perimetro ESG e dei primi criteri di misurazione.' },
        { level: 'Priorità', title: 'Ambiente e governance', text: 'La struttura è ancora essenziale ma già orientata alla leggibilità delle responsabilità.' }
    ],
    2020: [
        { level: 'Resilienza', title: 'Continuità decisionale', text: 'La sostenibilità sostiene la tenuta organizzativa in fase di contrazione e incertezza.' },
        { level: 'Priorità', title: 'Energia e protezione sociale', text: 'L’attenzione si sposta su sicurezza, continuità operativa e accelerazione energetica.' }
    ],
    2021: [
        { level: 'Riconnessione', title: 'Territorio e relazioni', text: 'La governance torna a legarsi con forza a hospitality, territorio e filiera partner.' },
        { level: 'Priorità', title: 'Filiera corta', text: 'La rete di conferitori consolida la sostenibilità come sistema relazionale.' }
    ],
    2022: [
        { level: 'Espansione', title: 'Sostenibilità e crescita', text: 'L’aumento dell’export rende più rilevante il presidio dei processi e della coerenza narrativa.' },
        { level: 'Priorità', title: 'Innovazione e processo', text: 'La sostenibilità si lega alla sperimentazione agronomica e alla qualità operativa.' }
    ],
    2023: [
        { level: 'Maturità', title: 'Governance rinforzata', text: 'La struttura decisionale diventa più leggibile e il reporting più coerente con i processi.' },
        { level: 'Priorità', title: 'Economia circolare', text: 'Il recupero rifiuti e la gestione strutturata rafforzano la credibilità del sistema.' }
    ],
    2024: [
        { level: 'Assetto', title: 'Governance integrata', text: 'La sostenibilità appare come management integrato: visibile, ordinato, con responsabilità distribuite.' },
        { level: 'Priorità', title: 'Equilibrio a quattro assi', text: 'Ambiente, sociale, territorio e governance convergono in una struttura pienamente leggibile.' }
    ]
};

const archiveDocuments = [2024, 2023, 2022, 2021, 2020, 2019];

// State Management
let currentState = {
    year: 2024,
    compareMode: false,
    previousYear: null
};

// DOM Elements
const yearSelector = document.getElementById('year-selector');
const kpiGrid = document.getElementById('kpi-grid');
const compareToggle = document.getElementById('compare-toggle');
const compareToggleKnob = document.getElementById('compare-toggle-knob');
const insightBanner = document.getElementById('insight-banner');
const insightText = document.getElementById('insight-text');
const heroYear = document.getElementById('hero-year');
const heroAnnualita = document.getElementById('hero-annualita');
const perfYear = document.getElementById('perf-year');
const filieraYear = document.getElementById('filiera-year');
const compareHint = document.getElementById('compare-hint');
const yearsHistory = document.getElementById('years-history');
const navbar = document.getElementById('navbar');
const yearNavShell = document.getElementById('year-nav');
const heroMedia = document.getElementById('hero-image') || document.querySelector('.hero-media');
const heroStage = document.querySelector('.hero-stage');
const heroCopy = document.querySelector('.hero-copy');
const heroMetaPanel = document.querySelector('.hero-meta-panel');
const heroBadgeWrap = document.querySelector('.hero-badge-wrap');
const desktopNavLinks = document.querySelectorAll('.nav-link');
const observedSections = document.querySelectorAll('section[id], section[data-reveal]');
const heroImage = document.getElementById('hero-image');
const filieraImage = document.getElementById('filiera-image');
const governanceContent = document.getElementById('governance-content');
const archiveGrid = document.getElementById('archive-grid');
const territoryQuote = document.getElementById('territory-quote');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initYearSelector();
    renderKPIs();
    updateContent(currentState.year);
    setupEventListeners();
    setupIntersectionObserver();
    setupSectionSpy();
    setupHeroParallax();
    setupScrollChrome();

    // Set initial temporal progress
    const progressPercent = ((currentState.year - 2019) / 5) * 100;
    document.getElementById('temporal-progress').style.width = `${progressPercent}%`;

    // Prime visible sections above the fold
    requestAnimationFrame(() => {
        document.querySelectorAll('.reveal-section').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.88) {
                section.classList.add('is-visible');
            }
        });
    });
});

// Year Selector Initialization
function initYearSelector() {
    const years = Object.keys(sustainabilityData);
    
    years.forEach(year => {
        const btn = document.createElement('button');
        btn.className = `year-btn px-4 py-2 rounded-full text-sm font-medium text-stone-600 hover:text-red-900 hover:bg-stone-100 whitespace-nowrap ${year == currentState.year ? 'active bg-stone-100' : ''}`;
        btn.textContent = year;
        btn.dataset.year = year;
        btn.onclick = () => handleYearChange(parseInt(year));
        yearSelector.appendChild(btn);
    });
}

// Handle Year Change with Temporal Transitions
function handleYearChange(year) {
    if (year === currentState.year) return;
    
    // Update active state in UI
    document.querySelectorAll('.year-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-stone-100');
        if (parseInt(btn.dataset.year) === year) {
            btn.classList.add('active', 'bg-stone-100');
        }
    });
    
    // Apply temporal blur effect
    const kpiCards = document.querySelectorAll('.kpi-card');
    const perfSection = document.getElementById('performance');
    
    perfSection.classList.add('temporal-shift');
    
    kpiCards.forEach(card => {
        card.classList.add('temporal-blur');
        card.classList.remove('temporal-focus');
    });
    
    // Animate hero year with flip effect
    const heroYearEl = document.getElementById('hero-year');
    heroYearEl.style.transform = 'rotateX(90deg)';
    heroYearEl.style.opacity = '0';
    
    // Update temporal progress indicator
    const progressPercent = ((year - 2019) / 5) * 100;
    document.getElementById('temporal-progress').style.width = `${progressPercent}%`;
    document.getElementById('years-elapsed').textContent = `${year - 2019} anni di evoluzione`;
    
    setTimeout(() => {
        currentState.previousYear = currentState.year;
        currentState.year = year;
        updateContent(year);
	currentState.previousYear = currentState.year;
        perfSection.classList.remove('temporal-shift');
        
        // Restore with focus effect
        kpiCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.remove('temporal-blur');
                card.classList.add('temporal-focus');
            }, index * 50); // Staggered re-entry
        });
        
        // Restore hero year
        heroYearEl.textContent = year;
        heroYearEl.style.transform = 'rotateX(0deg)';
        heroYearEl.style.opacity = '1';
        heroYearEl.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
    }, 400);
}

// Update All Content
function updateContent(year) {
    const data = sustainabilityData[year];
    const baseData = sustainabilityData[2019];

    heroYear.textContent = year;
    heroAnnualita.textContent = year;
    perfYear.textContent = year;
    filieraYear.textContent = year;
    yearsHistory.textContent = 63 + (year - 2024);

    updateInsight(data, baseData, year);
    updateKPIs(data, baseData);
    updateMaterialita(data.materialitaFocus);
    updateFiliera(year);
    updateGovernance(year);
    updateArchive(year);
    updateHeroVisuals(year);

    document.querySelectorAll('.current-year-label').forEach(el => {
        el.textContent = year;
    });
}

// Generate Interpretive Insights (Editorial Commentary)
function updateInsight(data, baseData, year) {
    const insights = interpretiveInsights[year] || interpretiveInsights[2024];
    const randomInsight = insights[Math.floor(Math.random() * insights.length)];
    
    // Animate out
    insightBanner.style.opacity = '0';
    insightBanner.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        insightText.textContent = randomInsight;
        
        // Rotate insights every 5 seconds if multiple available
        if (insights.length > 1 && window.insightInterval) {
            clearInterval(window.insightInterval);
        }
        
        if (insights.length > 1) {
            let insightIndex = 0;
            window.insightInterval = setInterval(() => {
                insightIndex = (insightIndex + 1) % insights.length;
                insightBanner.style.opacity = '0';
                setTimeout(() => {
                    insightText.textContent = insights[insightIndex];
                    insightBanner.style.opacity = '1';
                    insightBanner.style.transform = 'translateY(0)';
                }, 300);
            }, 6000);
        }
        
        // Animate in
        insightBanner.style.opacity = '1';
        insightBanner.style.transform = 'translateY(0)';
        
        // metadata line intentionally omitted in current layout
    }, 300);
    
    // Update hero tagline
    const tagline = document.getElementById('hero-tagline');
    if (tagline && heroTaglines[year]) {
        tagline.style.opacity = '0';
        setTimeout(() => {
            tagline.textContent = heroTaglines[year];
            tagline.style.opacity = '1';
        }, 300);
    }
}

// Render KPI Grid with Hierarchy and Ghost Values
function renderKPIs() {
    kpiGrid.innerHTML = '';

    const heroMetrics = kpiDefinitions.filter(kpi => kpi.hero);
    const secondaryMetrics = kpiDefinitions.filter(kpi => !kpi.hero);

    const heroColumn = document.createElement('div');
    heroColumn.className = 'kpi-board__hero';

    const sideColumn = document.createElement('div');
    sideColumn.className = 'kpi-board__side';

    heroMetrics.forEach((kpi, index) => {
        const progressPercent = ((currentState.year - 2019) / 5) * 100;
        const baseValue = sustainabilityData[2019][kpi.key];
        const ghostDisplay = kpi.format === 'int'
            ? Math.round(baseValue).toLocaleString('it-IT')
            : baseValue.toFixed(1).replace('.', ',');

        const card = document.createElement('article');
        card.className = `kpi-card kpi-card--hero ${kpi.environmental ? 'kpi-card--environmental' : ''}`;
        card.innerHTML = `
            <div class="kpi-card__header flex items-start justify-between mb-3 relative">
                <span class="kpi-card__label text-xs font-medium text-stone-500 uppercase tracking-wider">
                    ${kpi.prefix || ''}${kpi.label}
                </span>
                <span class="delta-indicator hidden text-xs font-bold px-2 py-1 rounded-full"></span>
                ${currentState.compareMode ? `<span class="ghost-value">2019: ${ghostDisplay}</span>` : ''}
            </div>

            <div class="kpi-card__value-wrap flex items-baseline gap-2 relative">
                <span
                    class="kpi-value text-4xl md:text-6xl font-serif text-stone-900"
                    data-key="${kpi.key}"
                    data-format="${kpi.format}"
                    data-micro-label="${kpi.microLabel || ''}"
                >0</span>
                <span class="kpi-unit text-base text-stone-500">${kpi.unit}</span>
            </div>

            <div class="micro-label">${kpi.microLabel || ''}</div>

            <div class="mini-timeline" style="--progress-start: 0%; --progress-end: ${progressPercent}%"></div>

            <div class="kpi-card__sparkline mt-4 h-10 w-full opacity-30">
                <svg class="w-full h-full sparkline" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,12 Q25,10 50,8 T100,4" />
                </svg>
            </div>
        `;
        heroColumn.appendChild(card);
    });

    secondaryMetrics.forEach((kpi, index) => {
        const progressPercent = ((currentState.year - 2019) / 5) * 100;
        const baseValue = sustainabilityData[2019][kpi.key];
        const ghostDisplay = kpi.format === 'int'
            ? Math.round(baseValue).toLocaleString('it-IT')
            : baseValue.toFixed(1).replace('.', ',');

        const card = document.createElement('article');
        card.className = `kpi-card kpi-card--secondary ${kpi.environmental ? 'kpi-card--environmental' : ''}`;
        card.innerHTML = `
            <div class="kpi-card__header flex items-start justify-between mb-2 relative">
                <span class="kpi-card__label text-xs font-medium text-stone-500 uppercase tracking-wider">
                    ${kpi.prefix || ''}${kpi.label}
                </span>
                <span class="delta-indicator hidden text-xs font-bold px-2 py-1 rounded-full"></span>
                ${currentState.compareMode ? `<span class="ghost-value">2019: ${ghostDisplay}</span>` : ''}
            </div>

            <div class="kpi-card__value-wrap flex items-baseline gap-1 relative">
                <span
                    class="kpi-value text-3xl font-serif text-stone-900"
                    data-key="${kpi.key}"
                    data-format="${kpi.format}"
                    data-micro-label="${kpi.microLabel || ''}"
                >0</span>
                <span class="kpi-unit text-sm text-stone-500">${kpi.unit}</span>
            </div>

            <div class="micro-label">${kpi.microLabel || ''}</div>

            <div class="mini-timeline" style="--progress-start: 0%; --progress-end: ${progressPercent}%"></div>

            <div class="kpi-card__sparkline mt-3 h-8 w-full opacity-25">
                <svg class="w-full h-full sparkline" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,${20 - (index % 5) * 2} Q25,12 50,10 T100,${6 + (index % 4)}" />
                </svg>
            </div>
        `;
        sideColumn.appendChild(card);
    });

    kpiGrid.appendChild(heroColumn);
    kpiGrid.appendChild(sideColumn);
}
// Update KPIs with Ghost Values and Enhanced Comparison
function updateKPIs(data) {
    const cards = document.querySelectorAll('.kpi-card');
    const baselineData = sustainabilityData[2019];

    cards.forEach((card) => {
        const valueEl = card.querySelector('.kpi-value');
        const indicator = card.querySelector('.delta-indicator');
        const microLabel = card.querySelector('.micro-label');
        const header = card.querySelector('.kpi-card__header');

        if (!valueEl || !indicator || !microLabel || !header) return;

        const key = valueEl.dataset.key;
        const format = valueEl.dataset.format;
        const unitEl = card.querySelector('.kpi-unit');

        const currentValue = data[key];
        const baselineValue = baselineData[key];

        const inCompareMode = currentState.compareMode && currentState.year !== 2019;
        const isBaseYear = currentState.year === 2019;

        // -------- Number animation --------
        animateNumber(valueEl, 0, currentValue, format, 1000);

        // -------- Qualitative editorial label --------
        let qualitativeText = 'anno base';

        if (!isBaseYear) {
            const diff = currentValue - baselineValue;
            const percent = (diff / baselineValue) * 100;

            if (percent >= 30) {
                qualitativeText = `trasformazione significativa (+${percent.toFixed(0)}%)`;
            } else if (percent >= 10) {
                qualitativeText = `crescita solida (+${percent.toFixed(0)}%)`;
            } else if (percent > 0) {
                qualitativeText = `evoluzione graduale (+${percent.toFixed(0)}%)`;
            } else if (percent === 0) {
                qualitativeText = `stabilità (0%)`;
            } else {
                qualitativeText = `contrazione (${percent.toFixed(0)}%)`;
            }
        }

        microLabel.textContent = qualitativeText;

        // -------- Card mode classes --------
        card.classList.toggle('is-compare', inCompareMode);
        card.classList.toggle('is-standard', !inCompareMode);

        // -------- Ghost value (2019 baseline) --------
        let ghostEl = card.querySelector('.ghost-value');

        if (inCompareMode) {
            const formattedBaseline =
                format === 'int'
                    ? Math.round(baselineValue).toLocaleString('it-IT')
                    : baselineValue.toFixed(1).replace('.', ',');

            const unitText = unitEl ? unitEl.textContent.trim() : '';

            if (!ghostEl) {
                ghostEl = document.createElement('span');
                ghostEl.className = 'ghost-value';
                header.appendChild(ghostEl);
            }

            ghostEl.textContent = `2019: ${formattedBaseline}${unitText ? ' ' + unitText : ''}`;
            ghostEl.style.display = '';
        } else if (ghostEl) {
            ghostEl.style.display = 'none';
        }

        // -------- Delta pill --------
        if (inCompareMode) {
            const diff = currentValue - baselineValue;
            const percent = ((diff / baselineValue) * 100);
            const isPositive = diff >= 0;

            let magnitudeLabel = '';
            const absPercent = Math.abs(percent);

            if (absPercent >= 20) {
                magnitudeLabel = 'strutturale';
            } else if (absPercent >= 10) {
                magnitudeLabel = 'significativa';
            } else {
                magnitudeLabel = 'graduale';
            }

            indicator.classList.remove('hidden');
            indicator.style.display = 'inline-flex';
            indicator.innerHTML = `
                <i data-lucide="${isPositive ? 'arrow-up-right' : 'arrow-down-right'}" class="w-3 h-3"></i>
                ${isPositive ? '+' : ''}${percent.toFixed(1)}%
                <span class="delta-indicator__meta">${magnitudeLabel}</span>
            `;
        } else {
            indicator.classList.add('hidden');
            indicator.style.display = 'none';
            indicator.innerHTML = '';
        }

        // -------- Micro-label visibility logic --------
        // Standard: hidden until hover/focus
        // Compare: completely suppressed
        microLabel.classList.toggle('is-suppressed', inCompareMode || isBaseYear);

        // -------- Timeline progress --------
        const miniTimeline = card.querySelector('.mini-timeline');
        if (miniTimeline) {
            const progress = ((currentState.year - 2019) / 5) * 100;
            miniTimeline.style.setProperty('--progress-end', `${progress}%`);
        }
    });

    lucide.createIcons();
}
// Enhanced Number Animation with Re-measurement Effect
function animateNumber(element, start, end, format, customDuration = 800) {
    const duration = customDuration;
    const startTime = performance.now();
    
    // Add a slight scale pulse at start
    element.style.transform = 'scale(0.95)';
    element.style.transition = 'transform 0.2s ease';
    
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out-quart) with slight overshoot for emphasis
        const ease = 1 - Math.pow(1 - progress, 4);
        
        const current = start + (end - start) * ease;
        
        if (format === 'int') {
            element.textContent = Math.round(current).toLocaleString('it-IT');
        } else {
            element.textContent = current.toFixed(1).replace('.', ',');
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // Final pulse when complete
            element.style.transform = 'scale(1.02)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 150);
        }
    }
    
    requestAnimationFrame(update);
}

// Update Materialità Section
function updateMaterialita(focusAreas) {
    const container = document.getElementById('materialita-grid');
    const themes = [
        { id: 'ambiente', title: 'Ambiente', desc: 'Rende visibili gli impatti collegati al vigneto, ai consumi e alla gestione delle risorse.' },
        { id: 'sociale', title: 'Sociale', desc: 'Mostra che la sostenibilità riguarda anche condizioni di lavoro e responsabilità verso il consumatore.' },
        { id: 'territorio', title: 'Territorio', desc: 'Collega sostenibilità, reputazione e radicamento territoriale.' },
        { id: 'governance', title: 'Governance', desc: 'Rende credibile la sostenibilità come management integrato.' }
    ];
    
    container.innerHTML = themes.map((theme, index) => {
        const isActive = focusAreas.includes(theme.title);
        const opacity = isActive ? 'opacity-100' : 'opacity-60';
        const border = isActive ? 'border-amber-300 bg-amber-50/30' : 'border-stone-200';
        
        return `
            <div class="materialita-card p-6 rounded-xl border ${border} ${opacity} transition-all duration-500">
                <div class="flex items-center justify-between mb-4">
                    <span class="font-serif text-3xl ${isActive ? 'text-amber-700' : 'text-stone-400'}">0${index + 1}</span>
                    ${isActive ? '<i data-lucide="check-circle" class="w-5 h-5 text-amber-700"></i>' : ''}
                </div>
                <h3 class="font-serif text-xl text-stone-900 mb-2">${theme.title}</h3>
                <p class="text-stone-600 text-sm leading-relaxed">${theme.desc}</p>
                ${isActive ? '<div class="mt-3 text-xs font-medium text-amber-700">Focus anno corrente</div>' : ''}
            </div>
        `;
    }).join('');
    
    lucide.createIcons();
}

// Update Filiera Content
function updateFiliera(year) {
    const steps = [
        { num: '01', title: 'Vigneto e approvvigionamento', desc: 'La base agricola diretta e la relazione con i viticoltori partner.' },
        { num: '02', title: 'Vendemmia', desc: 'La fase di raccolta collega qualità della materia prima e organizzazione operativa.' },
        { num: '03', title: 'Vinificazione', desc: 'La trasformazione integra processo produttivo e attenzione alle risorse.' },
        { num: '04', title: 'Confezionamento', desc: 'Materiali, gestione degli scarti e logiche di circolarità.' },
        { num: '05', title: 'Distribuzione', desc: 'Presenza internazionale e responsabilità commerciale.' },
        { num: '06', title: 'Hospitality', desc: 'Il rapporto con visitatori e territorio oltre la bottiglia.' }
    ];
    
    const container = document.getElementById('filiera-steps');
    const yearProgress = (year - 2019) / 5; // 0 to 1
    
    container.innerHTML = steps.map((step, index) => {
        const isHighlighted = index < (yearProgress * 6); // Progressive revelation
        const activeClass = isHighlighted ? 'active border-l-2 border-amber-700 pl-4' : 'border-l-2 border-stone-200 pl-4';
        
        return `
            <div class="filiera-step ${activeClass} cursor-pointer" onclick="highlightStep(this)">
                <div class="flex items-center gap-3 mb-2">
                    <span class="font-serif text-sm ${isHighlighted ? 'text-amber-700' : 'text-stone-400'}">Fase ${step.num}</span>
                    <div class="h-px flex-1 ${isHighlighted ? 'bg-amber-200' : 'bg-stone-200'}"></div>
                </div>
                <h3 class="font-serif text-xl text-stone-900 mb-2">${step.title}</h3>
                <p class="text-stone-600 text-sm leading-relaxed">${step.desc}</p>
            </div>
        `;
    }).join('');
}

function updateGovernance(year) {
    if (!governanceContent) return;

    const items = governanceByYear[year] || governanceByYear[2024];

    governanceContent.innerHTML = items.map((item, index) => `
        <article class="governance-node governance-node--${index + 1}">
            <div class="governance-node__meta">${item.level}</div>
            <h3 class="governance-node__title">${item.title}</h3>
            <p class="governance-node__text">${item.text}</p>
        </article>
    `).join('');
}

function updateArchive(activeYear) {
    if (!archiveGrid) return;

    archiveGrid.innerHTML = archiveDocuments.map(year => {
        const data = sustainabilityData[year];
        const isCurrent = year === activeYear;

        return `
            <article class="archive-card ${isCurrent ? 'is-current' : ''}">
                <div class="archive-card__year">${year}</div>
                <div class="archive-card__body">
                    <h3 class="archive-card__title">Report di Sostenibilità ${year}</h3>
                    <p class="archive-card__text">${data.insight}</p>
                    <dl class="archive-card__meta">
                        <div><dt>Valore</dt><dd>${data.valoreGenerato.toFixed(1).replace('.', ',')} M€</dd></div>
                        <div><dt>Fotovoltaico</dt><dd>${data.fotovoltaico}%</dd></div>
                        <div><dt>Visitatori</dt><dd>${Math.round(data.visitatori).toLocaleString('it-IT')}</dd></div>
                    </dl>
                </div>
                <div class="archive-card__cta">
                    <button
                        class="archive-btn ${isCurrent ? 'is-current' : ''}"
                        data-archive-year="${year}"
                        ${isCurrent ? 'disabled aria-disabled="true"' : ''}
                    >
                        ${isCurrent ? 'Edizione attiva' : 'Apri scheda'}
                    </button>
                </div>
            </article>
        `;
    }).join('');

    archiveGrid.querySelectorAll('[data-archive-year]').forEach(btn => {
        btn.addEventListener('click', () => {
            const year = parseInt(btn.dataset.archiveYear, 10);
            if (year !== currentState.year) {
                handleYearChange(year);

                const perf = document.getElementById('performance');
                if (perf) {
                    perf.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

function updateHeroVisuals(year) {
    const visual = yearVisuals[year] || yearVisuals[2024];

    if (heroImage) {
        heroImage.style.opacity = '0';
        setTimeout(() => {
            heroImage.src = visual.heroImage;
            heroImage.style.opacity = '0.9';
        }, 220);
    }

    if (filieraImage) {
        filieraImage.style.opacity = '0';
        setTimeout(() => {
            filieraImage.src = visual.filieraImage;
            filieraImage.style.opacity = '1';
        }, 220);
    }

    if (territoryQuote) {
        territoryQuote.style.opacity = '0';
        setTimeout(() => {
            territoryQuote.textContent = `“${visual.territoryQuote}”`;
            territoryQuote.style.opacity = '1';
        }, 220);
    }
}

// Step Highlight Interaction
function highlightStep(element) {
    document.querySelectorAll('.filiera-step').forEach(el => {
        el.classList.remove('active', 'border-amber-700');
        el.classList.add('border-stone-200');
    });
    element.classList.add('active', 'border-amber-700');
    element.classList.remove('border-stone-200');
}

// Event Listeners
function setupEventListeners() {
    // Comparison Toggle with Enhanced Visual States
    compareToggle.addEventListener('click', () => {
        currentState.compareMode = !currentState.compareMode;
        compareToggle.classList.toggle('active');
        
        const perfSection = document.getElementById('performance');
        const kpiGrid = document.getElementById('kpi-grid');
        
        if (currentState.compareMode) {
            // Activate comparison visual states
            perfSection.classList.add('comparison-active-section');
            kpiGrid.classList.add('comparison-active');
            compareHint.classList.remove('hidden');
            compareHint.classList.add('animate-fade-in');
            
            // Add ghost values to all cards
            document.querySelectorAll('.kpi-card').forEach(card => {
                const key = card.querySelector('.kpi-value').dataset.key;
                const format = card.querySelector('.kpi-value').dataset.format;
                const baseValue = sustainabilityData[2019][key];
                
                if (!card.querySelector('.ghost-value')) {
                    const ghost = document.createElement('span');
                    ghost.className = 'ghost-value';
                    ghost.textContent = `2019: ${format === 'int' ? 
                        Math.round(baseValue).toLocaleString('it-IT') : 
                        baseValue.toFixed(1).replace('.', ',')}`;
                    card.querySelector('.kpi-card__header').appendChild(ghost);
                    
                    // Fade in ghost
                    setTimeout(() => {
                        ghost.style.opacity = '1';
                    }, 50);
                }
            });
            
        } else {
            // Deactivate comparison visual states
            perfSection.classList.remove('comparison-active-section');
            kpiGrid.classList.remove('comparison-active');
            compareHint.classList.add('hidden');
            
            // Remove ghost values
            document.querySelectorAll('.ghost-value').forEach(ghost => {
                ghost.style.opacity = '0';
                setTimeout(() => {
                    ghost.remove();
                }, 300);
            });
        }
        
        // Re-render KPIs with comparison state
        updateKPIs(sustainabilityData[currentState.year], sustainabilityData[2019]);
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Intersection Observer for Scroll Animations
function setupIntersectionObserver() {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px'
    });

    document.querySelectorAll('.reveal-section').forEach(section => {
        revealObserver.observe(section);
    });

    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.kpi-card, .materialita-card, .filiera-step').forEach(el => {
        itemObserver.observe(el);
    });
}

function setupSectionSpy() {
    const sectionsForSpy = document.querySelectorAll('#identita, #performance, #filiera, #governance, #archivio');
    const mobileLinks = document.querySelectorAll('#mobile-menu a[href^="#"]');

    sectionsForSpy.forEach(section => {
        section.classList.add('section-active-anchor');
    });

    const spy = new IntersectionObserver((entries) => {
        const visibleEntries = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) return;

        const activeEntry = visibleEntries[0];
        const id = activeEntry.target.id;

        desktopNavLinks.forEach(a => a.classList.remove('is-active'));
        mobileLinks.forEach(a => a.classList.remove('text-red-900', 'font-medium'));
        document.querySelectorAll('.section-active-anchor').forEach(sec => sec.classList.remove('is-current'));

        const desktopLink = document.querySelector(`.nav-link[data-section="${id}"]`);
        const mobileLink = document.querySelector(`#mobile-menu a[href="#${id}"]`);

        if (desktopLink) desktopLink.classList.add('is-active');
        if (mobileLink) mobileLink.classList.add('text-red-900', 'font-medium');

        activeEntry.target.classList.add('is-current');
    }, {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: '-18% 0px -30% 0px'
    });

    sectionsForSpy.forEach(section => spy.observe(section));
}

function setupHeroParallax() {
    if (!heroMedia || !heroStage) return;

    let ticking = false;

    const updateParallax = () => {
        const scrollY = window.scrollY;
        const heroLimit = window.innerHeight * 1.05;

        if (scrollY <= heroLimit) {
            const mediaY = scrollY * 0.16;
            const stageY = scrollY * 0.04;
            const copyY = scrollY * -0.018;
            const panelY = scrollY * -0.01;
            const badgeY = scrollY * -0.025;
            const fade = Math.max(0.82, 1 - scrollY / (window.innerHeight * 2));

            heroMedia.style.transform = `scale(1.06) translate3d(0, ${mediaY}px, 0)`;
            heroStage.style.transform = `translate3d(0, ${stageY}px, 0)`;

            if (heroCopy) heroCopy.style.transform = `translate3d(0, ${copyY}px, 0)`;
            if (heroMetaPanel) heroMetaPanel.style.transform = `translate3d(0, ${panelY}px, 0)`;
            if (heroBadgeWrap) heroBadgeWrap.style.transform = `translate3d(0, ${badgeY}px, 0)`;

            heroStage.style.opacity = fade.toString();
        } else {
            heroStage.style.opacity = '0.82';
        }

        ticking = false;
    };

    updateParallax();

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener('resize', updateParallax, { passive: true });
}

function setupScrollChrome() {
    const onScroll = () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 24) {
            navbar.classList.add('nav-compact');
            yearNavShell.classList.add('year-nav-condensed');
        } else {
            navbar.classList.remove('nav-compact');
            yearNavShell.classList.remove('year-nav-condensed');
        }

        yearNavShell.style.transform = 'translateY(0)';
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}
