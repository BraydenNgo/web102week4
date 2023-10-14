import React, { useState } from 'react';
import './App.css';

function App() {
  const [pokemonImage, setPokemonImage] = useState(null);
  const [attributes, setAttributes] = useState([]);
  const [bannedAttributes, setBannedAttributes] = useState([]);

  const fetchPokemon = async () => {
    try {
      const randomID = Math.floor(Math.random() * 898) + 1; 
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomID}/`);
      const data = await response.json();

      const currentAttributes = [
        data.name,
        `Base Experience: ${data.base_experience}`,
        `Height: ${data.height}`,
        `Weight: ${data.weight}`,
      ];

      if (!currentAttributes.some(attr => bannedAttributes.includes(attr))) {
        setPokemonImage(data.sprites.front_default);
        setAttributes(currentAttributes);
      } else {
        fetchPokemon();  // Recursively fetch another Pokémon if any attribute is banned
      }
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  const toggleBan = (attribute) => {
    if (bannedAttributes.includes(attribute)) {
      setBannedAttributes(bannedAttributes.filter(attr => attr !== attribute));
    } else {
      setBannedAttributes([...bannedAttributes, attribute]);
    }
  };

  return (
    <div className="App">
      <h1>Pokémon Traits</h1>
      
      {pokemonImage && (
        <div className="photo-container">
          <img src={pokemonImage} alt="Random Pokémon" />
          <div className="buttons">
            {attributes.map((attr, index) => (
              <p key={index}>
                {attr}
                <button onClick={() => toggleBan(attr)}>
                  {bannedAttributes.includes(attr) ? 'Unban' : 'Ban'}
                </button>
              </p>
            ))}
          </div>
        </div>
      )}
      <button onClick={fetchPokemon}>New Pokémon</button>
      <h2>Banned Attributes</h2>
      <ul>
        {bannedAttributes.map((attribute, index) => (
          <li key={index} onClick={() => toggleBan(attribute)} style={{cursor: 'pointer'}}>
            {attribute}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
