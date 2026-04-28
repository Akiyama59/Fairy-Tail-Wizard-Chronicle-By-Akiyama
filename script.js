const characters = [
  { id: 1, name: "Natsu" },
  { id: 2, name: "Lucy" }
];

const tiers = { S: [], A: [], B: [] };
let team = [];

const charactersDiv = document.getElementById("characters");
const tierDiv = document.getElementById("tiers");
const teamDiv = document.getElementById("team");

function render() {
  // Characters
  charactersDiv.innerHTML = "";
  characters.forEach(c => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${c.name}</p>
      <button onclick="addToTier(${c.id}, 'S')">S</button>
      <button onclick="addToTier(${c.id}, 'A')">A</button>
      <button onclick="addToTier(${c.id}, 'B')">B</button>
      <button onclick="addToTeam(${c.id})">Team</button>
    `;
    charactersDiv.appendChild(div);
  });

  // Tiers
  tierDiv.innerHTML = "";
  Object.keys(tiers).forEach(t => {
    const div = document.createElement("div");
    div.innerHTML = `<h3>${t}</h3> ${tiers[t].map(c => c.name).join(", ")}`;
    tierDiv.appendChild(div);
  });

  // Team
  teamDiv.innerHTML = team.map(c => c.name).join(", ");
}

function addToTier(id, tier) {
  const char = characters.find(c => c.id === id);
  tiers[tier].push(char);
  render();
}

function addToTeam(id) {
  if (team.length >= 5) return;
  const char = characters.find(c => c.id === id);
  team.push(char);
  render();
}

render();
