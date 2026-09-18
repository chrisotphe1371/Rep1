const players = [
  {
    name: "Victor Axelsen",
    club: "Copenhague BC",
    country: "Danemark",
    category: "Simple messieurs",
    hand: "Droite",
    rating: 94,
    tags: ["Rapide", "Attaque", "Top 10"],
  },
  {
    name: "Chen Long",
    club: "Beijing Elite",
    country: "Chine",
    category: "Simple messieurs",
    hand: "Droite",
    rating: 91,
    tags: ["Puissance", "Contrôle", "Expérience"],
  },
  {
    name: "Kento Momota",
    club: "Osaka Smash",
    country: "Japon",
    category: "Simple messieurs",
    hand: "Droite",
    rating: 93,
    tags: ["Explosif", "Retour", "Technique"],
  },
  {
    name: "Akane Yamaguchi",
    club: "Tokyo Stars",
    country: "Japon",
    category: "Simple dames",
    hand: "Droite",
    rating: 92,
    tags: ["Vitesse", "Défense", "Cadrage"],
  },
  {
    name: "Tai Tzu Ying",
    club: "Taipei Academy",
    country: "Taïwan",
    category: "Simple dames",
    hand: "Droite",
    rating: 95,
    tags: ["Feinte", "Créativité", "Mieux classée"],
  },
  {
    name: "P. V. Sindhu",
    club: "Hyderabad Club",
    country: "Inde",
    category: "Simple dames",
    hand: "Droite",
    rating: 90,
    tags: ["Puissance", "Mental", "Courage"],
  },
  {
    name: "Marcus Fernaldi Gideon",
    club: "Jakarta Hawks",
    country: "Indonésie",
    category: "Double messieurs",
    hand: "Droite",
    rating: 89,
    tags: ["Ménage", "Pressing", "Leadership"],
  },
  {
    name: "Kevin Sanjaya",
    club: "Surabaya Rise",
    country: "Indonésie",
    category: "Double messieurs",
    hand: "Droite",
    rating: 88,
    tags: ["Vitesse", "Couverture", "Sérénité"],
  },
  {
    name: "Nami Matsuyama",
    club: "Fukuoka United",
    country: "Japon",
    category: "Double dames",
    hand: "Droite",
    rating: 87,
    tags: ["Synchronisation", "Réception", "Énergie"],
  },
  {
    name: "Chiharu Shida",
    club: "Sapporo Spirit",
    country: "Japon",
    category: "Double dames",
    hand: "Gauche",
    rating: 86,
    tags: ["Défense", "Placement", "Stabilité"],
  },
  {
    name: "Yuta Watanabe",
    club: "Tokyo Peak",
    country: "Japon",
    category: "Double mixte",
    hand: "Droite",
    rating: 90,
    tags: ["Vision", "Variante", "Rythme"],
  },
  {
    name: "Zheng Siwei",
    club: "Shanghai Kings",
    country: "Chine",
    category: "Double mixte",
    hand: "Droite",
    rating: 94,
    tags: ["Puissance", "Combat", "Finales"],
  },
];

const searchInput = document.querySelector("#searchInput");
const countryFilter = document.querySelector("#countryFilter");
const categoryFilter = document.querySelector("#categoryFilter");
const playerList = document.querySelector("#playerList");
const playerCount = document.querySelector("#playerCount");
const avgRating = document.querySelector("#avgRating");
const resultsTag = document.querySelector("#resultsTag");
const playerTemplate = document.querySelector("#playerCardTemplate");

const countries = [...new Set(players.map((player) => player.country))].sort();

countries.forEach((country) => {
  const option = document.createElement("option");
  option.value = country;
  option.textContent = country;
  countryFilter.appendChild(option);
});

function getInitials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function renderPlayers(items) {
  playerList.innerHTML = "";

  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "Aucun joueur ne correspond à votre recherche.";
    playerList.appendChild(empty);
    return;
  }

  items.forEach((player) => {
    const fragment = playerTemplate.content.cloneNode(true);
    fragment.querySelector('[data-role="avatar"]').textContent = getInitials(player.name);
    fragment.querySelector('[data-role="name"]').textContent = player.name;
    fragment.querySelector('[data-role="club"]').textContent = player.club;
    fragment.querySelector('[data-role="rating"]').textContent = `${player.rating}`;
    fragment.querySelector('[data-role="country"]').textContent = player.country;
    fragment.querySelector('[data-role="category"]').textContent = player.category;
    fragment.querySelector('[data-role="hand"]').textContent = player.hand;

    const tagsContainer = fragment.querySelector('[data-role="tags"]');
    player.tags.forEach((tag) => {
      const tagEl = document.createElement("span");
      tagEl.textContent = tag;
      tagsContainer.appendChild(tagEl);
    });

    playerList.appendChild(fragment);
  });
}

function getFilteredPlayers() {
  const query = searchInput.value.trim().toLowerCase();
  const countryValue = countryFilter.value;
  const categoryValue = categoryFilter.value;

  return players.filter((player) => {
    const matchesQuery =
      !query ||
      [player.name, player.club, player.country, player.category]
        .join(" ")
        .toLowerCase()
        .includes(query);

    const matchesCountry = countryValue === "all" || player.country === countryValue;
    const matchesCategory = categoryValue === "all" || player.category === categoryValue;

    return matchesQuery && matchesCountry && matchesCategory;
  });
}

function updateSummary(filteredPlayers) {
  playerCount.textContent = String(filteredPlayers.length);
  resultsTag.textContent = `${filteredPlayers.length} profil${filteredPlayers.length > 1 ? "s" : ""}`;

  const average =
    filteredPlayers.length > 0
      ? Math.round(filteredPlayers.reduce((sum, player) => sum + player.rating, 0) / filteredPlayers.length)
      : 0;

  avgRating.textContent = average > 0 ? `${average}/100` : "0";
}

function refresh() {
  const filteredPlayers = getFilteredPlayers();
  renderPlayers(filteredPlayers);
  updateSummary(filteredPlayers);
}

searchInput.addEventListener("input", refresh);
countryFilter.addEventListener("change", refresh);
categoryFilter.addEventListener("change", refresh);

refresh();
