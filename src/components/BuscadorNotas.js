import React from 'react';
import '../styles/buscador.css';

function BuscadorNotas({ onSearchChange }) {
  const handleSearchChange = (event) => {
    onSearchChange(event.target.value);
  };
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search...."
        onChange={handleSearchChange}
      />
      <button>Buscar</button>
    </div>
  );
}

export default BuscadorNotas;
