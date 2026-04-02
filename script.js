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
const knownForms = ["origin", "black", "white", "10%", "50%", "100%", "alola", "galar", "hisui", "therian", "attack", "defense", "speed", "sky", "resolute", "shock", "chill", "burn", "douse", "unbound"];

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
function saveCards() {
  const cards = [];
  document.querySelectorAll("#pokedex .card").forEach(card => {
    cards.push({
      html: card.innerHTML,
      bg: card.style.backgroundImage,
      category: card.dataset.category
    });
  });
  localStorage.setItem("pokedexCards", JSON.stringify(cards));
}

function loadCards() {
  const cards = JSON.parse(localStorage.getItem("pokedexCards") || "[]");

  cards.forEach(c => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.backgroundImage = c.bg;
    card.dataset.category = c.category;
    card.innerHTML = c.html;

    addCardRemoveButton(card);

    const sectionId = getSectionId(c.category);
    document.querySelector(`#${sectionId} .cards`).appendChild(card);
  });
}
loadCards();

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
    case "background": return "background-section";
    default: return "normal-section";
  }
}

// ================== REMOVE BUTTON ==================
function addCardRemoveButton(card) {
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove-btn");

  removeBtn.addEventListener("click", () => {
    card.remove();
    saveCards();
  });

  card.appendChild(removeBtn);
}

// ================== ADD POKEMON ==================
async function addPokemon() {
  const input = document.getElementById("pokemonInput").value;
  if (!input) return;

  let words = input.trim().toLowerCase().split(" ");

  let shiny = false;
  let form = "";

  // Detect shiny
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

  // 🔥 AUTO-DETECT NAME (COSTUME FIRST)
  for (let i = words.length; i > 0; i--) {
    let testName = words.slice(i - 1).join("_"); // last i words = Pokémon
    let testUrl = `https://raw.githubusercontent.com/slidehops/sprites/main/Normal/${testName}.png`;

    if (await spriteExists(testUrl)) {
      pokemonName = testName;
      costume = words.slice(0, i - 1).join("_"); // remaining = costume
      break;
    }
  }

  if (!pokemonName) {
    alert("Pokémon not found");
    return;
  }

  let spriteName = pokemonName;
  if (form) spriteName += `_${form}`;
  if (costume) spriteName += `_${costume}`;

  let spriteUrl = "";
  const category = document.getElementById("categorySelect").value || "normal";

  if (shiny) {
    if (costume && !form) {
      spriteUrl = `https://raw.githubusercontent.com/slidehops/sprites/main/Event Shiny/${spriteName}.png`;
    } else {
      spriteUrl = `https://raw.githubusercontent.com/slidehops/sprites/main/Shiny/${spriteName}.png`;
    }
  } else {
    switch (category) {
      case "shiny":
        spriteUrl = `https://raw.githubusercontent.com/slidehops/sprites/main/Shiny/${spriteName}.png`;
        break;
      case "costume":
        spriteUrl = `https://raw.githubusercontent.com/slidehops/sprites/main/Event/${spriteName}.png`;
        break;
      default:
        spriteUrl = (costume && !form)
          ? `https://raw.githubusercontent.com/slidehops/sprites/main/Event/${spriteName}.png`
          : `https://raw.githubusercontent.com/slidehops/sprites/main/Normal/${spriteName}.png`;
    }
  }

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

  card.innerHTML = `
    <img loading="lazy" src="${spriteUrl}" 
      onerror="this.onerror=null; this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';">
    <h3>${pokemonName.replace(/_/g, " ")}</h3>
  `;

  addCardRemoveButton(card);

  const sectionId = getSectionId(category);
  document.querySelector(`#${sectionId} .cards`).appendChild(card);

  document.getElementById("pokemonInput").value = "";
  saveCards();
}

// ================== REMOVE ALL ==================
function removeAll() {
  document.querySelectorAll("#pokedex .cards").forEach(sec => sec.innerHTML = "");
  localStorage.removeItem("pokedexCards");
}

// ================== ENTER KEY ==================
document.getElementById("pokemonInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    addPokemon();
  }
});
