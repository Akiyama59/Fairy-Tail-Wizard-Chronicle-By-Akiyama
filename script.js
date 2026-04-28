// Simple Next.js (App Router) project for Vercel
// Features:
// - Tier list builder
// - Team composition (PVP / PVM)
// - Admin page to upload characters (local state demo)

// To use:
// 1. npx create-next-app@latest fairy-tail-tierlist
// 2. Replace /app/page.tsx with this file
// 3. Add other pages as shown below
// 4. Deploy on Vercel

'use client'

import { useState } from 'react'

const initialCharacters = [
  { id: 1, name: 'Natsu', image: '' },
  { id: 2, name: 'Lucy', image: '' },
]

export default function Home() {
  const [characters, setCharacters] = useState(initialCharacters)
  const [tiers, setTiers] = useState({ S: [], A: [], B: [] })
  const [team, setTeam] = useState([])

  const addToTier = (char, tier) => {
    setTiers(prev => ({
      ...prev,
      [tier]: [...prev[tier], char]
    }))
  }

  const addToTeam = (char) => {
    if (team.length < 5) {
      setTeam([...team, char])
    }
  }

  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-2xl font-bold">Fairy Tail Tier List Builder</h1>

      {/* Characters */}
      <div>
        <h2 className="text-xl">Personnages</h2>
        <div className="flex gap-2 flex-wrap">
          {characters.map(c => (
            <div key={c.id} className="border p-2 rounded">
              <p>{c.name}</p>
              <div className="flex gap-1 mt-2">
                <button onClick={() => addToTier(c, 'S')}>S</button>
                <button onClick={() => addToTier(c, 'A')}>A</button>
                <button onClick={() => addToTier(c, 'B')}>B</button>
                <button onClick={() => addToTeam(c)}>Team</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tier List */}
      <div>
        <h2 className="text-xl">Tier List</h2>
        {Object.keys(tiers).map(tier => (
          <div key={tier} className="mb-2">
            <h3>{tier}</h3>
            <div className="flex gap-2">
              {tiers[tier].map(c => (
                <span key={c.id}>{c.name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Team Builder */}
      <div>
        <h2 className="text-xl">Equipe (PVP / PVM)</h2>
        <div className="flex gap-2">
          {team.map(c => (
            <span key={c.id}>{c.name}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- Admin Page Example ---
// Create /app/admin/page.tsx

/*
'use client'

import { useState } from 'react'

export default function Admin() {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')

  const handleAdd = () => {
    console.log({ name, image })
    alert('Saved (connect to DB later)')
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Admin</h1>

      <input
        placeholder="Nom du personnage"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border p-2 block mb-2"
      />

      <input
        placeholder="URL image"
        value={image}
        onChange={e => setImage(e.target.value)}
        className="border p-2 block mb-2"
      />

      <button onClick={handleAdd}>Ajouter</button>
    </div>
  )
}
*/

// --- Improvements to add later ---
// - Drag & drop (react-beautiful-dnd)
// - Database (Firebase / Supabase)
// - Auth admin (NextAuth)
// - Image upload (Cloudinary)
