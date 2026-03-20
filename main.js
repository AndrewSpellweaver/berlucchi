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

// KPI Definitions for rendering
const kpiDefinitions = [
    { key: 'vignetoProprio', label: 'Ettari vigneto proprio', unit: '', format: 'int' },
    { key: 'ettariPartner', label: 'Ettari partner', unit: '', format: 'int', prefix: 'Rete ' },
    { key: 'valoreGenerato', label: 'generato', unit: 'M€', format: 'float', prefix: 'Valore ' },
    { key: 'bottiglie', label: 'bottiglie', unit: 'M', format: 'float', prefix: 'Volume ' },
    { key: 'paesiServiti', label: 'paesi serviti', unit: '', format: 'int', prefix: 'Export ' },
    { key: 'fotovoltaico', label: 'fotovoltaico', unit: '%', format: 'int', prefix: 'Energia ' },
    { key: 'rifiutiRecupero', label: 'rifiuti recupero', unit: '%', format: 'int', prefix: 'Circolarità ' },
    { key: 'dipendenti', label: 'dipendenti', unit: '', format: 'int', prefix: 'Team ' },
    { key: 'visitatori', label: 'Visitatori annuali', unit: '', format: 'int', separator: true }
];

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

// Handle Year Change
function handleYearChange(year) {
    if (year === currentState.year) return;
    
    // Update active state in UI
    document.querySelectorAll('.year-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-stone-100');
        if (parseInt(btn.dataset.year) === year) {
            btn.classList.add('active', 'bg-stone-100');
        }
    });
    
    // Fade out content
    const contentElements = document.querySelectorAll('.kpi-card, .materialita-card, .filiera-step');
    contentElements.forEach(el => el.style.opacity = '0.5');
    
    setTimeout(() => {
        currentState.previousYear = currentState.year;
        currentState.year = year;
        updateContent(year);
        
        // Fade in
        contentElements.forEach(el => {
            el.style.opacity = '1';
            el.classList.add('animate-fade-in');
        });
    }, 300);
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

// Generate Dynamic Insights
function updateInsight(data, baseData, year) {
    const changes = {
        valore: ((data.valoreGenerato - baseData.valoreGenerato) / baseData.valoreGenerato * 100).toFixed(0),
        energia: ((data.fotovoltaico - baseData.fotovoltaico) / baseData.fotovoltaico * 100).toFixed(0),
        visitatori: ((data.visitatori - baseData.visitatori) / baseData.visitatori * 100).toFixed(0)
    };
    
    let insight = '';
    if (year === 2019) {
        insight = "Anno base di riferimento per l'analisi comparativa";
    } else if (year === 2020) {
        insight = "Impatto pandemia: -7% valore generato, riduzione hospitality";
    } else if (year === 2024) {
        insight = `+${changes.valore}% valore generato dal 2019, transizione energetica accelerata`;
    } else {
        insight = `Crescita costante: +${changes.energia}% energia rinnovabile vs 2019`;
    }
    
    insightText.textContent = insight;
    insightBanner.style.opacity = '1';
}

// Render KPI Grid
function renderKPIs() {
    kpiGrid.innerHTML = '';
    
    kpiDefinitions.forEach((kpi, index) => {
        const card = document.createElement('div');
        card.className = `kpi-card bg-white p-6 rounded-2xl border border-stone-200 shadow-sm stagger-${(index % 4) + 1}`;
        card.innerHTML = `
            <div class="flex items-start justify-between mb-2">
                <span class="text-xs font-medium text-stone-500 uppercase tracking-wider">${kpi.prefix || ''}${kpi.label}</span>
                <span class="delta-indicator hidden text-xs font-bold px-2 py-1 rounded-full"></span>
            </div>
            <div class="flex items-baseline gap-1">
                <span class="text-3xl font-serif text-stone-900 kpi-value" data-key="${kpi.key}" data-format="${kpi.format}">0</span>
                <span class="text-sm text-stone-500 kpi-unit">${kpi.unit}</span>
            </div>
            <div class="mt-3 h-8 w-full opacity-30">
                <svg class="w-full h-full sparkline" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0,${20 - (index * 2)} Q25,${15 - index} 50,${10 + index} T100,${5 + (index % 3)}" />
                </svg>
            </div>
        `;
        kpiGrid.appendChild(card);
    });
}

// Update KPIs with counting animation
function updateKPIs(data, baseData) {
    const values = document.querySelectorAll('.kpi-value');
    const indicators = document.querySelectorAll('.delta-indicator');
    
    values.forEach((el, index) => {
        const key = el.dataset.key;
        const format = el.dataset.format;
        const newValue = data[key];
        const oldValue = currentState.compareMode && currentState.previousYear ? 
            sustainabilityData[currentState.previousYear][key] : 
            (baseData ? baseData[key] : newValue);
        
        // Animate number
        animateNumber(el, parseFloat(el.textContent.replace(/,/g, '')), newValue, format);
        
        // Update comparison indicator
        const indicator = indicators[index];
        if (currentState.compareMode && currentState.year !== 2019) {
            const diff = newValue - oldValue;
            const percent = ((diff / oldValue) * 100).toFixed(1);
            const isPositive = diff >= 0;
            
            indicator.classList.remove('hidden', 'delta-positive', 'delta-negative');
            indicator.classList.add(isPositive ? 'delta-positive' : 'delta-negative');
            indicator.innerHTML = `
                <span class="flex items-center gap-1">
                    <i data-lucide="${isPositive ? 'trending-up' : 'trending-down'}" class="w-3 h-3"></i>
                    ${isPositive ? '+' : ''}${percent}%
                </span>
            `;
            lucide.createIcons();
        } else {
            indicator.classList.add('hidden');
        }
    });
}

// Number Animation
function animateNumber(element, start, end, format) {
    const duration = 800;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out-quart)
        const ease = 1 - Math.pow(1 - progress, 4);
        
        const current = start + (end - start) * ease;
        
        if (format === 'int') {
            element.textContent = Math.round(current).toLocaleString('it-IT');
        } else {
            element.textContent = current.toFixed(1).replace('.', ',');
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
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
    // Comparison Toggle
    compareToggle.addEventListener('click', () => {
        currentState.compareMode = !currentState.compareMode;
        compareToggle.classList.toggle('active');
        
        if (currentState.compareMode) {
            compareHint.classList.remove('hidden');
            compareHint.classList.add('animate-fade-in');
        } else {
            compareHint.classList.add('hidden');
        }
        
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
