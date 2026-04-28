import { useState, useEffect } from "react";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState("tier");
  const [mode, setMode] = useState("pvp");
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");

  const [newChar, setNewChar] = useState({
    name: "",
    role: "",
    image: "",
    pvp: "A",
    pvm: "A",
  });

  // 🔥 LOAD FROM STORAGE
  useEffect(() => {
    const saved = localStorage.getItem("characters");
    if (saved) setCharacters(JSON.parse(saved));
  }, []);

  // 🔥 SAVE TO STORAGE
  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters]);

  // 🔐 SIMPLE LOGIN
  const login = () => {
    if (password === "admin123") {
      setIsAdmin(true);
      setPage("admin");
    } else {
      alert("Wrong password");
    }
  };

  // 📂 IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewChar({ ...newChar, image: reader.result });
    };

    if (file) reader.readAsDataURL(file);
  };

  const addCharacter = () => {
    if (!newChar.name) return;
    setCharacters([...characters, newChar]);
    setNewChar({ name: "", role: "", image: "", pvp: "A", pvm: "A" });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-white shadow p-4">
        <h1 className="text-xl font-bold mb-6">Fairy Tail Wiki</h1>

        <button onClick={() => setPage("tier")} className="block mb-2">Tier List</button>
        <button onClick={() => setPage("characters")} className="block mb-2">Characters</button>

        {!isAdmin && (
          <div>
            <input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-2 p-2 border"
            />
            <button onClick={login} className="bg-black text-white w-full p-2">Login</button>
          </div>
        )}

        {isAdmin && (
          <button onClick={() => setPage("admin")} className="block mt-4 text-red-500">Admin Panel</button>
        )}
      </div>

      <div className="flex-1 p-6">

        {/* TIER */}
        {page === "tier" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Tier List</h2>

            <button onClick={() => setMode("pvp")} className="mr-2">PvP</button>
            <button onClick={() => setMode("pvm")}>PvM</button>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {characters.map((char, i) => (
                <div key={i} className="bg-white p-4 rounded shadow">
                  {char.image && (
                    <img src={char.image} className="w-20 h-20 object-cover mb-2" />
                  )}
                  <p className="font-bold">{char.name}</p>
                  <p>{char.role}</p>
                  <p>{mode === "pvp" ? char.pvp : char.pvm}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* CHARACTERS */}
        {page === "characters" && (
          <>
            <h2 className="text-2xl font-bold mb-4">Characters</h2>
            {characters.map((char, i) => (
              <div key={i} className="bg-white p-4 rounded shadow mb-3">
                {char.image && (
                  <img src={char.image} className="w-16 h-16 object-cover mb-2" />
                )}
                <p className="font-bold">{char.name}</p>
                <p>{char.role}</p>
              </div>
            ))}
          </>
        )}

        {/* ADMIN */}
        {page === "admin" && isAdmin && (
          <>
            <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

            <div className="bg-white p-4 rounded shadow max-w-md">
              <input
                placeholder="Name"
                value={newChar.name}
                onChange={(e) => setNewChar({ ...newChar, name: e.target.value })}
                className="w-full mb-2 p-2 border"
              />

              <input
                placeholder="Role"
                value={newChar.role}
                onChange={(e) => setNewChar({ ...newChar, role: e.target.value })}
                className="w-full mb-2 p-2 border"
              />

              <input type="file" onChange={handleImageUpload} className="mb-2" />

              <select
                value={newChar.pvp}
                onChange={(e) => setNewChar({ ...newChar, pvp: e.target.value })}
                className="w-full mb-2 p-2 border"
              >
                <option>S</option>
                <option>A</option>
                <option>B</option>
              </select>

              <select
                value={newChar.pvm}
                onChange={(e) => setNewChar({ ...newChar, pvm: e.target.value })}
                className="w-full mb-2 p-2 border"
              >
                <option>S</option>
                <option>A</option>
                <option>B</option>
              </select>

              <button onClick={addCharacter} className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Character
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

