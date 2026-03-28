function initEditorialTimelineV2() {
  const root = document.querySelector(".timeline-v2");
  if (!root) return;

  const rail = root.querySelector(".timeline-v2__rail");
  const panel = root.querySelector(".timeline-v2__panel");

  if (!rail || !panel) return;

  const items = [
    {
      year: "1879",
      short: "Registro storico",
      kicker: "Radice storica",
      title: "La memoria precede il marchio",
      body:
        "La datazione del registro vitivinicolo della famiglia Lana-Berlucchi fissa una radice storica anteriore al brand: Berlucchi nasce da una continuità territoriale, non da una costruzione artificiale.",
      facts: [
        "Origine documentata",
        "Radice familiare e agricola"
      ]
    },
    {
      year: "1955",
      short: "Nasce l’impresa",
      kicker: "Fondazione",
      title: "L’impresa prende forma",
      body:
        "Con la fondazione dell’azienda prende avvio il percorso imprenditoriale che porterà Berlucchi a diventare un riferimento della Franciacorta: una visione produttiva che nasce dal territorio e si struttura come impresa.",
      facts: [
        "Avvio della storia aziendale",
        "Origine del progetto imprenditoriale"
      ]
    },
    {
      year: "1961",
      short: "Primo Franciacorta",
      kicker: "Primogenitura",
      title: "La primogenitura costruisce il posizionamento",
      body:
        "Nel 1961 nasce il primo Franciacorta. È il passaggio più identitario di tutti, perché assegna a Berlucchi un ruolo fondativo nel racconto stesso della denominazione e spiega perché la linea ’61 sia ancora oggi così centrale.",
      facts: [
        "Primo Metodo Classico del territorio",
        "Origine del racconto di marca",
        "Linea ’61 come memoria attiva"
      ]
    },
    {
      year: "1967",
      short: "Denominazione",
      kicker: "Riconoscimento",
      title: "La denominazione consolida il ruolo pionieristico",
      body:
        "Con il riconoscimento della denominazione, il percorso avviato da Berlucchi trova una cornice istituzionale. Il valore dell’intuizione originaria diventa così parte della costruzione collettiva della Franciacorta.",
      facts: [
        "Consolidamento del territorio",
        "Passaggio da intuizione a sistema"
      ]
    },
    {
      year: "1995",
      short: "Consacrazione",
      kicker: "Maturità",
      title: "Il brand entra nella piena maturità",
      body:
        "Negli anni Novanta Berlucchi completa il proprio posizionamento come maison di riferimento della Franciacorta: qualità, riconoscibilità e solidità produttiva iniziano a muoversi come un unico sistema coerente.",
      facts: [
        "Rafforzamento reputazionale",
        "Crescita della riconoscibilità"
      ]
    },
    {
      year: "2007",
      short: "Nuovo paradigma",
      kicker: "Evoluzione",
      title: "Il modello si apre a una visione più ampia",
      body:
        "Il percorso aziendale entra in una fase nuova: la qualità non è più solo esito enologico, ma sistema che intreccia impresa, filiera, territorio e capacità di innovazione. È qui che il paradigma Berlucchi si amplia.",
      facts: [
        "Qualità come sistema",
        "Impresa e territorio più integrati"
      ]
    },
    {
      year: "2019",
      short: "Academia",
      kicker: "Dialogo",
      title: "La relazione con il territorio diventa piattaforma culturale",
      body:
        "Con Academia Berlucchi il rapporto con il territorio si esprime anche come spazio di confronto e approfondimento. La marca non racconta solo sé stessa, ma si propone come soggetto attivo nel dialogo tra vino, cultura e sostenibilità.",
      facts: [
        "Spazio di confronto",
        "Valorizzazione culturale del territorio"
      ]
    },
    {
      year: "2020",
      short: "Report + PBVS",
      kicker: "Metodo",
      title: "La sostenibilità entra nella struttura del racconto",
      body:
        "L’avvio della rendicontazione e il Protocollo Berlucchi di Viticoltura Sostenibile segnano un passaggio decisivo: la sostenibilità smette di essere un orientamento implicito e diventa metodo, presidio e linguaggio aziendale.",
      facts: [
        "Avvio della rendicontazione",
        "Protocollo agricolo strutturato"
      ]
    },
    {
      year: "2023",
      short: "Validazione",
      kicker: "Conferma",
      title: "Il percorso trova validazione esterna",
      body:
        "La sostenibilità viene sempre più trattata come leva di credibilità e di governo. Il sistema costruito negli anni precedenti trova conferme, rafforzando la capacità dell’azienda di rendere leggibili risultati e presìdi.",
      facts: [
        "Conferma del percorso",
        "Maggiore leggibilità del presidio ESG"
      ]
    },
    {
      year: "2024",
      short: "Riconoscimento",
      kicker: "Marchio storico",
      title: "La storia diventa riconoscimento istituzionale",
      body:
        "Il riconoscimento come Marchio Storico rende esplicito ciò che la timeline racconta per intero: Berlucchi non è solo un’impresa del vino, ma un soggetto che ha contribuito a costruire identità, linguaggio e reputazione della Franciacorta.",
      facts: [
        "Riconoscimento istituzionale",
        "Valore storico della marca"
      ]
    }
  ];

  function createFactsMarkup(facts) {
    return facts.map((fact) => `<li>${fact}</li>`).join("");
  }

  function renderPanel(item) {
    panel.innerHTML = `
      <div class="timeline-v2__panel-year">${item.year}</div>
      <div class="timeline-v2__panel-body">
        <span class="timeline-v2__panel-kicker">${item.kicker}</span>
        <h3>${item.title}</h3>
        <p>${item.body}</p>
        <ul class="timeline-v2__facts">
          ${createFactsMarkup(item.facts)}
        </ul>
      </div>
    `;
  }

  function activateNode(index) {
    const nodes = rail.querySelectorAll(".timeline-v2__node");
    const item = items[index];
    if (!item || !nodes.length) return;

    nodes.forEach((node, nodeIndex) => {
      const isActive = nodeIndex === index;
      node.classList.toggle("is-active", isActive);
      node.setAttribute("aria-selected", String(isActive));
      node.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    renderPanel(item);
  }

  function buildRail() {
    rail.innerHTML = items
      .map(
        (item, index) => `
          <button
            class="timeline-v2__node ${index === 0 ? "is-active" : ""}"
            type="button"
            role="tab"
            aria-selected="${index === 0 ? "true" : "false"}"
            tabindex="${index === 0 ? "0" : "-1"}"
            data-index="${index}"
          >
            <span class="timeline-v2__dot" aria-hidden="true"></span>
            <span class="timeline-v2__year">${item.year}</span>
            <span class="timeline-v2__short">${item.short}</span>
          </button>
        `
      )
      .join("");
  }

  function bindEvents() {
    rail.addEventListener("click", (event) => {
      const button = event.target.closest(".timeline-v2__node");
      if (!button) return;

      const index = Number(button.dataset.index);
      if (Number.isNaN(index)) return;

      activateNode(index);
    });

    rail.addEventListener("keydown", (event) => {
      const current = event.target.closest(".timeline-v2__node");
      if (!current) return;

      const nodes = Array.from(rail.querySelectorAll(".timeline-v2__node"));
      const currentIndex = nodes.indexOf(current);
      if (currentIndex < 0) return;

      let nextIndex = currentIndex;

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        nextIndex = Math.min(currentIndex + 1, nodes.length - 1);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        nextIndex = Math.max(currentIndex - 1, 0);
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = nodes.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      activateNode(nextIndex);
      nodes[nextIndex]?.focus({ preventScroll: false });
    });
  }

  buildRail();
  renderPanel(items[0]);
  bindEvents();
}