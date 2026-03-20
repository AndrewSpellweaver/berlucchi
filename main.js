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

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initYearSelector();
    renderKPIs();
    updateContent(currentState.year);
    setupEventListeners();
    setupIntersectionObserver();
    
    // Set initial temporal progress
    const progressPercent = ((currentState.year - 2019) / 5) * 100;
    document.getElementById('temporal-progress').style.width = `${progressPercent}%`;
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
    
    // Update text elements
    heroYear.textContent = year;
    heroAnnualita.textContent = year;
    perfYear.textContent = year;
    filieraYear.textContent = year;
    yearsHistory.textContent = 63 + (year - 2024); // Dynamic years since 1961
    
    // Update insight
    updateInsight(data, baseData, year);
    
    // Update KPIs with animation
    updateKPIs(data, baseData);
    
    // Update Materialità
    updateMaterialita(data.materialitaFocus);
    
    // Update Filiera
    updateFiliera(year);
    
    // Update year labels across page
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
        
        // Update meta line
        const metaLine = document.getElementById('insight-meta');
        if (year === 2019) {
            metaLine.textContent = 'Anno base';
        } else {
            const yearsDelta = year - 2019;
            metaLine.textContent = `Analisi comparativa ${yearsDelta} anni • vs 2019`;
        }
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
    
    kpiDefinitions.forEach((kpi, index) => {
        const isHero = kpi.hero ? 'kpi-hero md:col-span-2' : '';
        const isEnvironmental = kpi.environmental ? 'kpi-environmental' : '';
        const progressPercent = ((currentState.year - 2019) / 5) * 100;
        
        const card = document.createElement('div');
        card.className = `kpi-card ${isHero} ${isEnvironmental} bg-white p-6 rounded-2xl border border-stone-200 shadow-sm stagger-${(index % 4) + 1}`;
        
        // Calculate ghost value (2019 baseline)
        const baseValue = sustainabilityData[2019][kpi.key];
        const ghostDisplay = kpi.format === 'int' ? 
            Math.round(baseValue).toLocaleString('it-IT') : 
            baseValue.toFixed(1).replace('.', ',');
        
        card.innerHTML = `
            <div class="flex items-start justify-between mb-2 relative">
                <span class="text-xs font-medium text-stone-500 uppercase tracking-wider">${kpi.prefix || ''}${kpi.label}</span>
                <span class="delta-indicator hidden text-xs font-bold px-2 py-1 rounded-full"></span>
                ${currentState.compareMode ? `<span class="ghost-value">2019: ${ghostDisplay}</span>` : ''}
            </div>
            <div class="flex items-baseline gap-1 relative">
                <span class="text-3xl font-serif text-stone-900 kpi-value ${kpi.hero ? 'text-5xl' : ''}" data-key="${kpi.key}" data-format="${kpi.format}" data-micro-label="${kpi.microLabel || ''}">0</span>
                <span class="text-sm text-stone-500 kpi-unit">${kpi.unit}</span>
            </div>
            <div class="micro-label">${kpi.microLabel || ''}</div>
            <div class="mini-timeline" style="--progress-start: 0%; --progress-end: ${progressPercent}%"></div>
            <div class="mt-3 h-8 w-full opacity-30">
                <svg class="w-full h-full sparkline" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,${20 - (index * 2)} Q25,${15 - index} 50,${10 + index} T100,${5 + (index % 3)}" />
                </svg>
            </div>
        `;
        kpiGrid.appendChild(card);
    });
}

// Update KPIs with Ghost Values and Enhanced Comparison
function updateKPIs(data, baseData) {
    const cards = document.querySelectorAll('.kpi-card');
    const baseLineData = sustainabilityData[2019];
    
    cards.forEach((card, index) => {
        const valueEl = card.querySelector('.kpi-value');
        const indicator = card.querySelector('.delta-indicator');
        const ghostEl = card.querySelector('.ghost-value');
        const microLabel = card.querySelector('.micro-label');
        
        const key = valueEl.dataset.key;
        const format = valueEl.dataset.format;
        const newValue = data[key];
        const baseValue = baseLineData[key];
        
        // Update ghost value visibility based on comparison mode
        if (currentState.compareMode && currentState.year !== 2019) {
            if (!ghostEl) {
                const ghost = document.createElement('span');
                ghost.className = 'ghost-value';
                ghost.textContent = `2019: ${format === 'int' ? 
                    Math.round(baseValue).toLocaleString('it-IT') : 
                    baseValue.toFixed(1).replace('.', ',')}`;
                card.querySelector('.flex.items-start').appendChild(ghost);
            } else {
                ghostEl.style.opacity = '1';
            }
            
            // Show connector line for hero KPIs
            if (kpiDefinitions[index].hero) {
                card.style.borderLeftWidth = '4px';
                card.style.borderLeftColor = '#b45309';
            }
        } else if (ghostEl) {
            ghostEl.style.opacity = '0';
        }
        
        // Animate number from zero (re-measurement effect)
        animateNumber(valueEl, 0, newValue, format, 1000); // Slower, more dramatic
        
        // Update directional micro-label
        if (microLabel && valueEl.dataset.microLabel) {
            const diff = newValue - baseValue;
            const percent = ((diff / baseValue) * 100).toFixed(0);
            
            if (currentState.year === 2019) {
                microLabel.textContent = 'anno base';
            } else if (percent > 30) {
                microLabel.textContent = `trasformazione significativa (+${percent}%)`;
            } else if (percent > 10) {
                microLabel.textContent = `crescita solida (+${percent}%)`;
            } else if (percent > 0) {
                microLabel.textContent = `evoluzione graduale (+${percent}%)`;
            } else {
                microLabel.textContent = 'stabilizzazione';
            }
        }
        
        // Update comparison indicator with interpretive styling
        if (currentState.compareMode && currentState.year !== 2019) {
            const diff = newValue - baseValue;
            const percent = ((diff / baseValue) * 100).toFixed(1);
            const isPositive = diff >= 0;
            
            indicator.classList.remove('hidden');
            indicator.className = `delta-indicator inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${isPositive ? 'bg-amber-100 text-amber-800' : 'bg-stone-200 text-stone-600'}`;
            indicator.innerHTML = `
                <i data-lucide="${isPositive ? 'arrow-up-right' : 'minus'}" class="w-3 h-3"></i>
                ${isPositive ? '+' : ''}${percent}%
            `;
            
            // Add directional meaning based on magnitude
            if (percent > 20) {
                indicator.innerHTML += ` <span class="text-[10px] opacity-70 ml-1">strutturale</span>`;
            }
            
            lucide.createIcons();
        } else if (indicator) {
            indicator.classList.add('hidden');
        }
        
        // Update mini timeline progress
        const miniTimeline = card.querySelector('.mini-timeline');
        if (miniTimeline) {
            const progress = ((currentState.year - 2019) / 5) * 100;
            miniTimeline.style.setProperty('--progress-end', `${progress}%`);
        }
    });
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
                    card.querySelector('.flex.items-start').appendChild(ghost);
                    
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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.kpi-card, .materialita-card, .filiera-step').forEach(el => {
        observer.observe(el);
    });
}

// Sticky Year Navigation behavior
let lastScroll = 0;
const yearNav = document.getElementById('year-nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        yearNav.style.transform = 'translateY(-100%)';
    } else {
        yearNav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});
