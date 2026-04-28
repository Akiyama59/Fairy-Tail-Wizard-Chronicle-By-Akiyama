let characters = JSON.parse(localStorage.getItem("chars")) || [
  { name: "Natsu", pvp: "S", pvm: "A", image: "" },
  { name: "Lucy", pvp: "A", pvm: "S", image: "" }
];

let mode = "pvp";

// NAVIGATION
function showPage(page) {
  document.querySelectorAll("section").forEach(s => s.classList.add("hidden"));
  document.getElementById(page).classList.remove("hidden");
}

// MODE
function setMode(m) {
  mode = m;
  renderTier();
}

// TIER LIST
function renderTier() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  const tiers = { S: [], A: [], B: [] };

  characters.forEach(c => {
    tiers[c[mode]].push(c.name);
  });

  for (let t in tiers) {
    const div = document.createElement("div");
    div.innerHTML = `<h3>${t}</h3> ${tiers[t].join(" / ")}`;
    list.appendChild(div);
  }
}

// CHARACTERS
function renderCharacters() {
  const chars = document.getElementById("chars");
  chars.innerHTML = "";

  characters.forEach(c => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <strong>${c.name}</strong><br>
      PvP: ${c.pvp} | PvM: ${c.pvm}<br>
      ${c.image ? `<img src="${c.image}" width="100">` : ""}
    `;

    chars.appendChild(div);
  });
}

// ADMIN
function addCharacter() {
  const name = document.getElementById("name").value;
  const image = document.getElementById("image").value;
  const pvp = document.getElementById("pvp").value;
  const pvm = document.getElementById("pvm").value;

  if (!name) return alert("Nom requis");

  characters.push({ name, image, pvp, pvm });

  localStorage.setItem("chars", JSON.stringify(characters));

  renderTier();
  renderCharacters();

  alert("Ajouté !");
}

// INIT
renderTier();
renderCharacters();
