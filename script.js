let mode = "pvp";

const characters = [
  { name: "Natsu", role:"DPS", pvp:"S", pvm:"A"},
  { name: "Erza", role:"Tank", pvp:"S", pvm:"S"},
  { name: "Gray", role:"DPS", pvp:"A", pvm:"B"},
  { name: "Wendy", role:"Support", pvp:"B", pvm:"S"},
];

function renderTier() {
  const list = document.getElementById("list");
  list.innerHTML = "";
  characters.forEach(c => {
    const tier = mode==="pvp"?c.pvp:c.pvm;
    list.innerHTML += `<div class="card">${c.name} (${c.role}) - <span class="${tier}">${tier}</span></div>`;
  });
}

function renderChars() {
  const chars = document.getElementById("chars");
  chars.innerHTML="";
  characters.forEach(c=>{
    chars.innerHTML += `<div class="card">${c.name} - ${c.role}</div>`;
  });
}

function setMode(m){
  mode=m;
  renderTier();
}

function showPage(p){
  ["tier","teams","characters"].forEach(id=>{
    document.getElementById(id).classList.add("hidden");
  });
  document.getElementById(p).classList.remove("hidden");
}

renderTier();
renderChars();
