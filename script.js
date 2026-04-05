// === Background JSON arrays ===
const locationBackgrounds = [
    "Air Adventures Jeju", "American Family Field Milwaukee", "Anaheim", "Bali", "CFD",
    "Cardinals", "Carnival Cologne", "Carnival Rio", "Chase Field Arizona", "Citi Field New York",
    "City Safair Mexico City", "City Safair Seoul", "City Safari Amsterdam", "City Safari Bangkok",
    "City Safari Barcelona", "City Safari Buenos Aires", "City Safari Cancun", "City Safari Hong Kong",
    "City Safari Jakarta", "City Safari Miami", "City Safari Milan", "City Safari Mumbai", "City Safari Santiago",
    "City Safari Sao Paulo", "City Safari Singapore", "City Safari Sydney", "City Safari Tainan", "City Safari Valencia",
    "City Safari Vancouver", "Fenway Park Boston", "Globe Life Field Arlington", "Go Fest 2023 London",
    "Go Fest 2023 New York", "Go Fest 2023 Osaka", "Go Fest 2024 Madrid", "Go Fest 2024 New York",
    "Go Fest 2024 Sendai", "Go Fest 2025 New Jersey", "Go Fest 2025 Osaka", "Go Fest 2025 Paris",
    "Go Tour 2023 Las Vegas", "Go Tour 2024 Los Angeles", "Go Tour 2025 Los Angeles", "Go Tour 2025 New Taipei City",
    "Go Tour 2026 Los Angeles", "Go Tour 2026 Tainan", "Korea Blossom", "LoanDepot Park Miami",
    "Mega Evolution Paris 2", "Mega Evolution Paris", "Nationals Park Washington", "Oracle Park San Francisco",
    "Oriole Park Baltimore", "Osaka Expo Kanto", "Osaka Expo Pika", "Pokepark Kanto", "Progressive Field Cleveland",
    "Pyeongchang", "Rate Field Chicago", "Road Trip 2025 Berlin", "Road Trip 2025 Cologne", "Road Trip 2025 Hague",
    "Road Trip 2025 Jangheung", "Road Trip 2025 London", "Road Trip 2025 Manchester", "Road Trip 2025 Paris",
    "Road Trip 2025 Valencia", "Safari Zone Incheon", "Sajik Stadium", "Stamp Rally Aichi", "Stamp Rally Akita",
    "Stamp Rally Aomori", "Stamp Rally Chiba", "Stamp Rally Ehime", "Stamp Rally Fukui", "Stamp Rally Fukuoka",
    "Stamp Rally Fukushima", "Stamp Rally Gifu", "Stamp Rally Hokkaido", "Stamp Rally Hyogo", "Stamp Rally Ibaraki",
    "Stamp Rally Ishikawa", "Stamp Rally Iwate", "Stamp Rally Jeju", "Stamp Rally Kagawa", "Stamp Rally Kagoshima",
    "Stamp Rally Kanagawa", "Stamp Rally Kochi", "Stamp Rally Kyoto", "Stamp Rally Mie", "Stamp Rally Miyagi",
    "Stamp Rally Miyazaki", "Stamp Rally Nagasaki", "Stamp Rally Nara", "Stamp Rally Niigata", "Stamp Rally Okayama",
    "Stamp Rally Okinawa", "Stamp Rally Osaka", "Stamp Rally Saga", "Stamp Rally Saitama", "Stamp Rally Shiga",
    "Stamp Rally Shinmane", "Stamp Rally Shizuoka", "Stamp Rally Tochigi", "Stamp Rally Tokushima", "Stamp Rally Tokyo",
    "Stamp Rally Tottori", "Stamp Rally Toyama", "Stamp Rally Wakayama", "Stamp Rally Yamagata", "Stamp Rally Yamaguchi",
    "Steinbrenner Field Tampa", "Suita", "Surabaya", "T-Mobile Park Seattle", "Taipei Amusement Park",
    "Taipei Flower Festival", "Target Field Minneapolis", "Wild Area 2024 Fukuoka", "Wild Area 2025 Nagasaki",
    "World Championships 2024 Honolulu", "Yogyakarta"
];

const specialBackgrounds = [
    "Community Day 2026", "Concierge", "Dark Skies", "December Community Day 2024", "Delightful Days",
    "Dual Destiny Community Day", "Festival Of Colors", "Go Fest 2024 Moon Wormhole", "Go Fest 2024 Sun Wormhole",
    "Go Fest 2025 Global", "Go Fest 2025 Shield", "Go Fest 2025 Sword", "Go Tour 2025 Black and White",
    "Go Tour 2025 Black", "Go Tour 2025 Enigma", "Go Tour 2025 White", "Go Tour 2026 Diamond",
    "Go Tour 2026 Gold", "Go Tour 2026 Mega", "Go Tour 2026 Pearl", "Go Tour 2026 Ruby", "Go Tour 2026 Sapphire",
    "Go Tour 2026 Silver", "Go Tour 2026 X", "Go Tour 2026 Y", "Instinct", "Might and Mastery Community Day",
    "Moon", "Mystic", "Observatory", "Pokopia", "Sun", "Tales Of Transformation", "Valor", "Wild Area 2024",
    "Wild Area 2025", "Wormhole"
];

// Forms
const knownForms = ["origin", "black", "white", "10%", "50%", "100%", "alola", "galar", "hisui", "therian", "attack", "defense", "speed", "sky", "resolute", "shock", "chill", "burn", "douse", "unbound", "modern", "baile", "pom-pom", "pau", "sensu", "blue", "red", "yellow", "heart", "star", "diamond", "debutante", "matron", "dandy", "lareine", "kabuki", "pharaoh", "01", "02", "03", "04", "05", "06", "07", "08"];

// ================== DROPDOWNS ==================
const locationSelectEl = document.getElementById("locationSelect");
locationBackgrounds.forEach(name => {
  const opt = document.createElement("option");
  opt.value = `Location Backgrounds/${name}.png`;
  opt.textContent = name;
  locationSelectEl.appendChild(opt);
});

const specialSelectEl = document.getElementById("specialSelect");
specialBackgrounds.forEach(name => {
  const opt = document.createElement("option");
  opt.value = `Special Backgrounds/${name}.png`;
  opt.textContent = name;
  specialSelectEl.appendChild(opt);
});

// ================== STORAGE ==================
// Each card is stored as a clean object: { name, cp, ivs, image, bg, category }
// localStorage is used as a session cache between saves.

function getCardData() {
  const cards = [];
  document.querySelectorAll("#pokedex .card").forEach(card => {
    if (!card.dataset.category) return;

    const nameEl  = card.querySelector("h3");
    const cpEl    = card.querySelector(".card-cp");
    const ivsEl   = card.querySelector(".card-ivs");
    const imgEl   = card.querySelector("img");

    const name = nameEl ? nameEl.textContent.trim() : "";

    const cpText = cpEl ? cpEl.textContent.replace("CP:", "").replace("—", "").trim() : "";
    const cp = cpText ? parseInt(cpText) : null;

    const ivsText = ivsEl ? ivsEl.textContent.trim() : "";
    const ivs = (ivsText && ivsText !== "—/—/—") ? ivsText : null;

    const image = imgEl ? imgEl.src : "";
    const bg = card.style.backgroundImage || "";

    cards.push({
      name,
      cp,
      ivs,
      image,
      bg,
      category: card.dataset.category
    });
  });
  return cards;
}

function saveCards() {
  if (document.querySelector(".card.dragging")) return;
  try {
    localStorage.setItem("pokedexCards_session", JSON.stringify(getCardData()));
  } catch(e) {}
}

function buildCard(c) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.backgroundImage = c.bg || "";
  card.dataset.category = c.category;

  const cpDisplay = c.cp ? `CP: ${c.cp}` : "CP: —";
  const ivsDisplay = c.ivs || "—/—/—";
  const imgSrc = c.image || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";

  card.innerHTML = `
    <img loading="lazy" src="${imgSrc}"
      onerror="this.onerror=null; this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';">
    <div class="card-info">
      <span class="card-cp">${cpDisplay}</span>
      <h3>${c.name || ""}</h3>
      <span class="card-ivs">${ivsDisplay}</span>
    </div>
  `;

  addCardRemoveButton(card);
  addCpEditListener(card);
  addIvsEditListener(card);
  addDragListeners(card);
  return card;
}

function renderCards(cards) {
  document.querySelectorAll("#pokedex .cards").forEach(s => s.innerHTML = "");
  cards.forEach(c => {
    try {
      if (!c.category) return;
      // Support both new clean format and old html-blob format
      const card = c.html ? buildCardFromLegacy(c) : buildCard(c);
      const sectionId = getSectionId(c.category);
      const section = document.querySelector(`#${sectionId} .cards`);
      if (section) section.appendChild(card);
    } catch(err) {
      console.error("Error rendering card:", c, err);
    }
  });
}

function buildCardFromLegacy(c) {
  // Old format had raw html — extract fields from it and use buildCard
  const tmp = document.createElement("div");
  tmp.innerHTML = c.html.replace(/ data-listener-attached="1"/g, "");

  const nameEl = tmp.querySelector("h3");
  const cpEl   = tmp.querySelector(".card-cp");
  const ivsEl  = tmp.querySelector(".card-ivs");
  const imgEl  = tmp.querySelector("img");

  const cpText = cpEl ? cpEl.textContent.replace("CP:", "").replace("CP", "").replace("—", "").trim() : "";

  return buildCard({
    name:     nameEl ? nameEl.textContent.trim() : "",
    cp:       cpText ? parseInt(cpText) : null,
    ivs:      ivsEl && ivsEl.textContent.trim() !== "—/—/—" ? ivsEl.textContent.trim() : null,
    image:    imgEl ? imgEl.src : "",
    bg:       c.bg || "",
    category: c.category
  });
}

// Load from session cache on startup.
function loadCards() {
  try {
    let raw = localStorage.getItem("pokedexCards_session");

    // Migrate old key if needed
    if (!raw || raw === "[]") {
      const legacy = localStorage.getItem("pokedexCards");
      if (legacy && legacy !== "[]") {
        raw = legacy;
        localStorage.setItem("pokedexCards_session", raw);
        localStorage.removeItem("pokedexCards");
      }
    }

    if (raw && raw !== "[]") renderCards(JSON.parse(raw));
  } catch(e) {
    console.warn("Failed to load session cache:", e);
  }
}
loadCards();

// ================== SAVE DATA TO FILE ==================
function saveDataToFile() {
  // Export clean format — strip internal bg field, only keep user-facing fields
  const cards = getCardData().map(c => {
    const obj = { name: c.name, cp: c.cp, ivs: c.ivs, image: c.image, category: c.category };
    if (c.bg) obj.bg = c.bg; // keep bg only if set (background image)
    return obj;
  });
  const json = JSON.stringify(cards, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const link = document.createElement("a");
  link.download = "pokedex_save.json";
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
}

// ================== LOAD DATA FROM FILE ==================
function loadDataFromFile() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        // Strip BOM and any invisible Unicode characters that break JSON.parse
        const text = e.target.result.replace(/^\uFEFF/, "").replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
        const cards = JSON.parse(text);
        if (!Array.isArray(cards)) throw new Error("Expected a JSON array");
        renderCards(cards);
        // Cache to session so edits persist until next save
        try {
          localStorage.setItem("pokedexCards_session", JSON.stringify(getCardData()));
        } catch(storageErr) {
          console.warn("Could not cache to localStorage:", storageErr);
        }
      } catch(err) {
        console.error("Load error:", err);
        alert("Failed to load save file: " + err.message);
      }
    };
    reader.readAsText(file);
  });
  input.click();
}

// Save before the page unloads as a final safety net
window.addEventListener("beforeunload", () => {
  saveCards();
});

// ================== HELPER ==================
async function spriteExists(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

// ================== CATEGORY ==================
function getSectionId(category) {
  switch (category) {
    case "shiny": return "shiny-section";
    case "legendary": return "legendary-section";
    case "mythical": return "mythical-section";
    case "ultra": return "ultra-section";
    case "perfect": return "perfect-section";
    case "costume": return "costume-section";
    case "traded": return "traded-section";
    default: return "shiny-section";
  }
}

// ================== REMOVE BUTTON ==================
function addCardRemoveButton(card) {
  if (card.querySelector(".remove-btn")) return;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove-btn");

  removeBtn.addEventListener("click", () => {
    card.remove();
    saveCards();
  });

  card.appendChild(removeBtn);
}

// ================== CP EDIT ON CLICK ==================
function addCpEditListener(card) {
  const cpEl = card.querySelector(".card-cp");
  if (!cpEl || cpEl._listenerAttached) return;
  cpEl._listenerAttached = true;
  cpEl.style.cursor = "pointer";
  cpEl.title = "Click to edit CP";

  cpEl.addEventListener("click", (e) => {
    e.stopPropagation();

    // Strip "CP " prefix and dash placeholder to get raw number
    const current = cpEl.textContent.replace("CP:", "").replace("—", "").trim();

    const input = document.createElement("input");
    input.type = "number";
    input.value = current;
    input.placeholder = "CP";
    input.style.cssText = `
      width: 70px;
      font-size: 11px;
      text-align: center;
      border-radius: 4px;
      border: none;
      padding: 2px 4px;
      position: relative;
      z-index: 10;
    `;

    cpEl.replaceWith(input);
    input.focus();
    input.select();

    function commitEdit() {
      const newCp = input.value.trim();
      const newSpan = document.createElement("span");
      newSpan.className = "card-cp";
      newSpan.style.cursor = "pointer";
      newSpan.title = "Click to edit CP";
      newSpan.textContent = newCp ? `CP: ${newCp}` : "CP: —";
      input.replaceWith(newSpan);
      addCpEditListener(card);
      saveCards();
    }

    input.addEventListener("blur", commitEdit);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") { e.preventDefault(); commitEdit(); }
      if (e.key === "Escape") { commitEdit(); }
    });
  });
}


// ================== IVS EDIT ON CLICK ==================
function addIvsEditListener(card) {
  const ivsEl = card.querySelector(".card-ivs");
  if (!ivsEl || ivsEl._listenerAttached) return;
  ivsEl._listenerAttached = true;
  ivsEl.style.cursor = "pointer";
  ivsEl.title = "Click to edit IVs (HP/ATK/DEF)";

  ivsEl.addEventListener("click", (e) => {
    e.stopPropagation();

    // Parse current values, strip dashes
    const parts = ivsEl.textContent.split("/").map(v => v.trim() === "—" ? "" : v.trim());
    const [curHp, curAtk, curDef] = parts;

    const wrapper = document.createElement("div");
    wrapper.style.cssText = "display:flex; gap:2px; justify-content:center; position:relative; z-index:10;";

    function makeInput(val, ph) {
      const inp = document.createElement("input");
      inp.type = "number";
      inp.value = val || "";
      inp.placeholder = ph;
      inp.min = 0; inp.max = 15;
      inp.style.cssText = "width:30px; font-size:10px; text-align:center; border-radius:4px; border:none; padding:2px 2px;";
      return inp;
    }

    const hpIn  = makeInput(curHp,  "HP");
    const atkIn = makeInput(curAtk, "ATK");
    const defIn = makeInput(curDef, "DEF");

    const sep1 = document.createElement("span");
    sep1.textContent = "/"; sep1.style.color = "white"; sep1.style.alignSelf = "center";
    const sep2 = document.createElement("span");
    sep2.textContent = "/"; sep2.style.color = "white"; sep2.style.alignSelf = "center";

    wrapper.appendChild(hpIn);
    wrapper.appendChild(sep1);
    wrapper.appendChild(atkIn);
    wrapper.appendChild(sep2);
    wrapper.appendChild(defIn);

    ivsEl.replaceWith(wrapper);
    hpIn.focus();
    hpIn.select();

    function commitIvs() {
      const h = hpIn.value.trim();
      const a = atkIn.value.trim();
      const d = defIn.value.trim();
      const newSpan = document.createElement("span");
      newSpan.className = "card-ivs";
      newSpan.textContent = `${h || "—"}/${a || "—"}/${d || "—"}`;
      wrapper.replaceWith(newSpan);
      addIvsEditListener(card);
      saveCards();
    }

    [hpIn, atkIn, defIn].forEach(inp => {
      inp.addEventListener("blur", () => {
        // Small delay so clicking another field in same card doesn't trigger commit
        setTimeout(() => {
          if (!wrapper.contains(document.activeElement)) commitIvs();
        }, 150);
      });
      inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") { e.preventDefault(); commitIvs(); }
        if (e.key === "Escape") { commitIvs(); }
      });
    });
  });
}


// ================== DRAG AND DROP ==================
let dragSrc = null;

function addDragListeners(card) {
  card.setAttribute("draggable", "true");

  card.addEventListener("dragstart", (e) => {
    dragSrc = card;
    card.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
    document.querySelectorAll(".cards").forEach(c => c.classList.remove("drag-over"));
    dragSrc = null;
    saveCards();
  });
}

// Wire up drop zones for all .cards containers
function initDropZones() {
  document.querySelectorAll(".cards").forEach(zone => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      zone.classList.add("drag-over");

      // Find the card we're hovering over to insert before it
      const afterCard = getDragAfterElement(zone, e.clientY, e.clientX);
      if (dragSrc) {
        if (afterCard == null) {
          zone.appendChild(dragSrc);
        } else {
          zone.insertBefore(dragSrc, afterCard);
        }
      }
    });

    zone.addEventListener("dragleave", (e) => {
      // Only remove highlight if leaving the zone entirely
      if (!zone.contains(e.relatedTarget)) {
        zone.classList.remove("drag-over");
      }
    });

    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      zone.classList.remove("drag-over");

      if (!dragSrc) return;

      // Update the card's category to match the section it was dropped into
      const section = zone.closest("[id$='-section']");
      if (section) {
        const newCategory = section.id.replace("-section", "");
        dragSrc.dataset.category = newCategory;
      }
    });
  });
}

function getDragAfterElement(container, y, x) {
  const draggableElements = [...container.querySelectorAll(".card:not(.dragging)")];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const cardMidY = box.top + box.height / 2;
    const cardMidX = box.left + box.width / 2;

    // Check if we're on the same row (within half a card height)
    const onSameRow = Math.abs(y - cardMidY) < box.height / 2;

    let offset;
    if (onSameRow) {
      // Same row — compare horizontally
      offset = x - cardMidX;
    } else {
      // Different row — compare vertically
      offset = y - cardMidY;
    }

    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    }
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

initDropZones();

// ================== ADD POKEMON ==================
async function addPokemon() {
  const input = document.getElementById("pokemonInput").value;
  if (!input) return;

  let words = input.trim().toLowerCase().split(" ");

  let shiny = false;
  let form = "";

  // Detect shiny prefix
  if (words[0] === "shiny") {
    shiny = true;
    words.shift();
  }

  // Detect form
  if (knownForms.includes(words[0])) {
    form = words[0];
    words.shift();
  }

  if (words.length === 0) return;

  let pokemonName = "";
  let costume = "";

  // AUTO-DETECT NAME
  // Try every contiguous slice of words as the Pokémon name, longest first.
  // Checks Normal folder first, then Shiny as fallback (handles size variants
  // like gourgeist_large that may only exist in Shiny but not Normal).
  const sizeSuffixList = ["large", "small", "super", "average", "xl", "xs"];

  async function nameExists(testName) {
    return await spriteExists(`https://raw.githubusercontent.com/slidehops/sprites/main/Normal/${testName}.png`)
        || await spriteExists(`https://raw.githubusercontent.com/slidehops/sprites/main/Shiny/${testName}.png`);
  }

  let found = false;
  for (let len = words.length; len > 0 && !found; len--) {
    for (let start = 0; start <= words.length - len && !found; start++) {
      const testName = words.slice(start, start + len).join("_");
      if (await nameExists(testName)) {
        pokemonName = testName;
        const before = words.slice(0, start);
        const after  = words.slice(start + len);
        costume = [...before, ...after].join("_");
        found = true;
      }
    }
  }

  if (!pokemonName) {
    alert("Pokémon not found");
    return;
  }

  // Build sprite filename.
  // For Pokémon whose name includes a size suffix (e.g. pumpkaboo_large),
  // the repo stores costumes BETWEEN the base name and size:
  //   pumpkaboo_spooky_large  (not pumpkaboo_large_spooky)
  // So we split name into base + size, then assemble: base_form_costume_size
  const sizeSuffixes = sizeSuffixList;
  const nameParts = pokemonName.split("_");
  const lastPart = nameParts[nameParts.length - 1];
  const hasSize = sizeSuffixes.includes(lastPart);
  const baseName = hasSize ? nameParts.slice(0, -1).join("_") : pokemonName;
  const sizePart = hasSize ? lastPart : "";

  let spriteName = baseName;
  if (form)    spriteName += `_${form}`;
  if (costume) spriteName += `_${costume}`;
  if (sizePart) spriteName += `_${sizePart}`;

  const category = document.getElementById("categorySelect").value || "normal";

  // ================== SPRITE URL ==================
  // Shiny category automatically uses shiny sprite (same as typing "shiny" prefix)
  const useShiny = shiny || category === "shiny";

  let spriteUrl = "";
  if (useShiny) {
    if (costume && !form) {
      spriteUrl = `https://raw.githubusercontent.com/slidehops/sprites/main/Event Shiny/${spriteName}.png`;
    } else {
      spriteUrl = `https://raw.githubusercontent.com/slidehops/sprites/main/Shiny/${spriteName}.png`;
    }
  } else {
    switch (category) {
      case "costume":
        spriteUrl = `https://raw.githubusercontent.com/slidehops/sprites/main/Event/${spriteName}.png`;
        break;
      default:
        spriteUrl = (costume && !form)
          ? `https://raw.githubusercontent.com/slidehops/sprites/main/Event/${spriteName}.png`
          : `https://raw.githubusercontent.com/slidehops/sprites/main/Normal/${spriteName}.png`;
    }
  }

  // ================== CP / IV INPUTS ==================
  const cp = document.getElementById("cpInput").value;

  // Auto 15/15/15 for 100% IV category; otherwise use manual inputs
  const hp  = category === "perfect" ? "15" : document.getElementById("hpInput").value;
  const atk = category === "perfect" ? "15" : document.getElementById("attackInput").value;
  const def = category === "perfect" ? "15" : document.getElementById("defenseInput").value;

  const locationBg = locationSelect.value;
  const specialBg = specialSelect.value;

  // ================== CARD ==================
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.category = category;

  let bgStyle = "";
  if (locationBg) {
    bgStyle = `url('https://raw.githubusercontent.com/slidehops/backgrounds/main/${encodeURIComponent(locationBg)}')`;
  }
  if (specialBg) {
    if (bgStyle) bgStyle += ", ";
    bgStyle += `url('https://raw.githubusercontent.com/slidehops/backgrounds/main/${encodeURIComponent(specialBg)}')`;
  }
  if (bgStyle) card.style.backgroundImage = bgStyle;

  const hasIVs = hp || atk || def;

  card.innerHTML = `
    <img loading="lazy" src="${spriteUrl}" 
      onerror="this.onerror=null; this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';">
    <div class="card-info">
      <span class="card-cp">${cp ? `CP: ${cp}` : "CP: —"}</span>
      <h3>${baseName.replace(/_/g, " ")}</h3>
      <span class="card-ivs">${hp || '—'}/${atk || '—'}/${def || '—'}</span>
    </div>
  `;

  addCardRemoveButton(card);
  addCpEditListener(card);
  addIvsEditListener(card);
  addDragListeners(card);

  const sectionId = getSectionId(category);
  document.querySelector(`#${sectionId} .cards`).appendChild(card);

  // Clear all inputs
  document.getElementById("pokemonInput").value = "";
  ["cpInput", "hpInput", "attackInput", "defenseInput"].forEach(id => {
    document.getElementById(id).value = "";
  });

  saveCards();
}

// ================== REMOVE ALL ==================
function removeAll() {
  document.querySelectorAll("#pokedex .cards").forEach(sec => sec.innerHTML = "");
  localStorage.removeItem("pokedexCards_session");
}

// ================== BUILD SECTION WRAPPER (shared by saveAsImage) ==================
function buildSectionWrapper(realCards, label) {
  const CARD_SIZE = 100;
  const COLUMNS = 10;
  const TOTAL_WIDTH = COLUMNS * CARD_SIZE + (COLUMNS - 1) * 6 + 20;

  const wrapper = document.createElement("div");
  wrapper.style.cssText = `
    position: fixed;
    left: -9999px;
    top: 0;
    width: ${TOTAL_WIDTH}px;
    background-color: #000912;
    padding: 10px;
    font-family: Arial, sans-serif;
    box-sizing: border-box;
  `;

  const heading = document.createElement("h2");
  heading.textContent = label;
  heading.style.cssText = `
    color: white;
    border-bottom: 2px solid #444;
    padding-bottom: 4px;
    margin: 0 0 8px 0;
    font-size: 13px;
  `;
  wrapper.appendChild(heading);

  const grid = document.createElement("div");
  grid.style.cssText = `
    display: grid;
    grid-template-columns: repeat(${COLUMNS}, ${CARD_SIZE}px);
    gap: 6px;
  `;

  realCards.forEach(realCard => {
    const clone = document.createElement("div");

    // Bake the gradient directly into background-image layers to avoid
    // html2canvas misrendering a separate overlay div as a horizontal line
    const cardBg = realCard.style.backgroundImage;
    const gradient = "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)";
    const fullBg = cardBg
      ? `${gradient}, ${cardBg}`
      : gradient;

    clone.style.cssText = `
      width: ${CARD_SIZE}px;
      height: ${CARD_SIZE}px;
      border-radius: 8px;
      overflow: hidden;
      background-color: #333;
      background-image: ${fullBg};
      background-size: cover;
      background-position: center;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      text-align: center;
      color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.4);
    `;

    const origImg = realCard.querySelector("img");
    if (origImg) {
      const img = document.createElement("img");
      img.src = origImg.src;
      img.style.cssText = `
        width: 75px;
        height: 75px;
        margin: 0 auto -8px auto;
        display: block;
      `;
      clone.appendChild(img);
    }

    const info = document.createElement("div");
    info.style.cssText = `padding-bottom: 3px;`;

    const cpEl = realCard.querySelector(".card-cp");
    if (cpEl) {
      const cpText = cpEl.textContent.trim();
      if (cpText && cpText !== "CP: —") {
        const cp = document.createElement("div");
        cp.textContent = cpText;
        cp.style.cssText = `font-size: 8px; font-weight: bold; color: white; text-shadow: 1px 1px 2px black;`;
        info.appendChild(cp);
      }
    }

    const nameEl = realCard.querySelector("h3");
    if (nameEl) {
      const name = document.createElement("div");
      name.textContent = nameEl.textContent;
      name.style.cssText = `font-size: 8px; color: white; text-transform: capitalize; text-shadow: 1px 1px 2px black; font-weight: bold;`;
      info.appendChild(name);
    }

    const ivsEl = realCard.querySelector(".card-ivs");
    if (ivsEl) {
      const ivsText = ivsEl.textContent.trim();
      if (ivsText && ivsText !== "—/—/—") {
        const ivs = document.createElement("div");
        ivs.textContent = ivsText;
        ivs.style.cssText = `font-size: 7px; color: #ddd; text-shadow: 1px 1px 2px black;`;
        info.appendChild(ivs);
      }
    }

    clone.appendChild(info);
    grid.appendChild(clone);
  });

  wrapper.appendChild(grid);
  return wrapper;
}

// ================== SAVE AS IMAGE (one file per section) ==================
async function saveAsImage() {
  const sections = [
    { id: "shiny-section",     label: "Shiny Pokemon" },
    { id: "legendary-section", label: "Legendary Pokemon" },
    { id: "mythical-section",  label: "Mythical Pokemon" },
    { id: "ultra-section",     label: "Ultra Beast Pokemon" },
    { id: "perfect-section",   label: "100% IV Pokemon" },
    { id: "costume-section",   label: "Costume Pokemon" },
    { id: "traded-section",   label: "Traded Pokemon" },
  ];

  // Filter to only sections that have cards
  const populated = sections.filter(sec => {
    const el = document.getElementById(sec.id);
    return el && el.querySelectorAll(".card").length > 0;
  });

  if (populated.length === 0) {
    alert("No cards to save.");
    return;
  }

  for (const sec of populated) {
    const realCards = document.getElementById(sec.id).querySelectorAll(".card");
    const wrapper = buildSectionWrapper(realCards, sec.label);
    document.body.appendChild(wrapper);

    // Wait for images in this section to load
    const images = wrapper.querySelectorAll("img");
    await Promise.all(Array.from(images).map(img =>
      img.complete ? Promise.resolve() : new Promise(res => { img.onload = res; img.onerror = res; })
    ));

    try {
      const canvas = await html2canvas(wrapper, {
        backgroundColor: "#000912",
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        width: wrapper.offsetWidth,
        height: wrapper.offsetHeight
      });

      const link = document.createElement("a");
      link.download = `pokedex_${sec.label.replace(/ /g, "_").toLowerCase()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      // Small delay between downloads so browser doesn't block them
      await new Promise(res => setTimeout(res, 500));
    } catch (err) {
      alert(`Failed to save ${sec.label}. Make sure all sprites have loaded.`);
      console.error(err);
    } finally {
      document.body.removeChild(wrapper);
    }
  }
}

// ================== ENTER KEY ==================
document.getElementById("pokemonInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addPokemon();
  }
});
