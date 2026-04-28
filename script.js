import { useState, useEffect } from "react";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState("tier");
  const [mode, setMode] = useState("pvp");
  const [isAdmin, setIsAdmin] = useState(false);

  const [newChar, setNewChar] = useState({
    name: "",
    role: "",
    image: "",
    pvp: "A",
    pvm: "A",
  });

  useEffect(() => {
    const saved = localStorage.getItem("characters");
    if (saved) setCharacters(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters]);

  const loginAdmin = () => {
    const pass = prompt("Mot de passe admin ?");
    if (pass === "admin123") setIsAdmin(true);
    else alert("Mauvais mot de passe");
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setNewChar({ ...newChar, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const addChar = () => {
    if (!newChar.name) return;
    setCharacters([...characters, newChar]);
    setNewChar({ name: "", role: "", image: "", pvp: "A", pvm: "A" });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* MENU */}
      <div className="w-64 bg-white p-4 shadow">
        <h1 className="font-bold mb-4">Fairy Tail Guide</h1>

        <button onClick={() => setPage("tier")} className="block mb-2">Tier List</button>
        <button onClick={() => setPage("characters")} className="block mb-2">Characters</button>

        <button onClick={loginAdmin} className="mt-4 bg-black text-white w-full p-2">
          Admin Login
        </button>

        {isAdmin && (
          <button onClick={() => setPage("admin")} className="mt-2 text-red-500">
            Admin Panel
          </button>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6">

        {/* TIER */}
        {page === "tier" && (
          <>
            <h2 className="text-2xl font-bold">Tier List</h2>

            <button onClick={() => setMode("pvp")}>PvP</button>
            <button onClick={() => setMode("pvm")}>PvM</button>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {characters.map((c, i) => (
                <div key={i} className="bg-white p-4">
                  {c.image && <img src={c.image} className="w-20 h-20" />}
                  <p>{c.name}</p>
                  <p>{mode === "pvp" ? c.pvp : c.pvm}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CHARACTERS */}
        {page === "characters" && (
          <>
            <h2 className="text-2xl font-bold">Characters</h2>
            {characters.map((c, i) => (
              <div key={i} className="bg-white p-4">
                {c.image && <img src={c.image} className="w-16 h-16" />}
                <p>{c.name}</p>
                <p>{c.role}</p>
              </div>
            ))}
          </>
        )}

        {/* ADMIN */}
        {page === "admin" && isAdmin && (
          <>
            <h2 className="text-2xl font-bold">Admin Panel</h2>

            <input
              placeholder="Name"
              value={newChar.name}
              onChange={(e) => setNewChar({ ...newChar, name: e.target.value })}
              className="border p-2 block mb-2"
            />

            <input
              placeholder="Role"
              value={newChar.role}
              onChange={(e) => setNewChar({ ...newChar, role: e.target.value })}
              className="border p-2 block mb-2"
            />

            <input type="file" onChange={handleImage} />

            <button onClick={addChar} className="bg-blue-500 text-white p-2 mt-2">
              Add
            </button>
          </>
        )}

      </div>
    </div>
  );
}
