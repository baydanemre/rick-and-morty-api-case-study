import React from 'react';
import "../css/filters.css";

// Filters bileşeni, filtreleme ve sıralama işlemleri için gerekli props'ları alır
const Filters = ({ filters, setFilters, setSortKey, sortKey, speciesOptions }) => {
  return (
    <div className="filters">
      
      {/* İsme göre filtreleme yapan metin girişi */}
      <input
        type="text"
        className="filter-input"
        placeholder="Filter by name"
        value={filters.name}
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
      />
      
      {/* Duruma göre filtreleme yapan açılır menü */}
      <select
        className="filter-select"
        onChange={(e) => {
          // Kullanıcı tarafından seçilen değeri doğrudan API'nin anlayacağı şekilde kullanır
          setFilters({ ...filters, status: e.target.value });
        }}
        value={filters.status || ''}
      >
        <option value="">Status</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">unknown</option>
      </select>
      
      {/* Türüne göre filtreleme yapan açılır menü */}
      <select
        className="filter-select"
        onChange={(e) => setFilters({ ...filters, species: e.target.value })}
        value={filters.species || ''}
      >
        <option value="">Species</option>
        {speciesOptions.map((species, index) => (
          <option key={index} value={species}>
            {species}
          </option>
        ))}
      </select>
      
      {/* Sıralama seçenekleri sunan açılır menü */}
      <select
        className="sort-select"
        onChange={(e) => setSortKey(e.target.value)}
        value={sortKey} // sortKey prop'unu kullanın
      >
        <option value="">No Sorting</option>
        <option value="name">By Name</option>
        <option value="status">By Status</option>
      </select>
    </div>
  );
};

export default Filters;






