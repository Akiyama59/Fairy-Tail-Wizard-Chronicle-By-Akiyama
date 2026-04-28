import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://TON-PROJECT.supabase.co",
  "TA-KEY"
);

let user = null;

// LOGIN
async function login() {
  const email = prompt("Email");
  const password = prompt("Mot de passe");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) return alert("Erreur login");

  user = data.user;
  alert("Connecté !");
  loadChars();
}

// LOAD
async function loadChars() {
  const { data } = await supabase.from("characters").select("*");
  render(data);
}

// ADD
async function addChar() {
  if (!user) return alert("Admin only");

  const name = prompt("Nom");
  const image = prompt("Image URL");

  await supabase.from("characters").insert([{ name, image }]);
  loadChars();
}

// DELETE
async function deleteChar(id) {
  if (!user) return alert("Admin only");

  await supabase.from("characters").delete().eq("id", id);
  loadChars();
}

// RENDER
function render(chars) {
  const div = document.getElementById("pool");
  div.innerHTML = "";

  chars.forEach(c => {
    const el = document.createElement("div");

    el.innerHTML = `
      ${c.image ? `<img src="${c.image}" width="50">` : ""}
      ${c.name}
      ${user ? `<button onclick="deleteChar('${c.id}')">❌</button>` : ""}
    `;

    div.appendChild(el);
  });
}

loadChars();
