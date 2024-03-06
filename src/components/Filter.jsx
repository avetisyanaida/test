import React, { useState } from 'react';

const Filter = ({ filters, onFilterChange, onApplyFilters }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  return (
    <div className="filter">
      <button className="btn-hide" onClick={toggleFilterVisibility}>
        {isFilterVisible ? 'Close' : 'Filters'}
      </button>

      {isFilterVisible && (
        <>
          <label>
            Name:
            <input
              type="text"
              value={filters.name}
              onChange={(e) => onFilterChange('name', e.target.value)}
            />
          </label>
          <label>
            Min Price:
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => onFilterChange('minPrice', e.target.value)}
            />
          </label>
          <label>
            Max Price:
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            />
          </label>
          <label>
            Brand:
            <input
              type="text"
              value={filters.brand}
              onChange={(e) => onFilterChange('brand', e.target.value)}
            />
          </label>
          <button className="apply" onClick={onApplyFilters}>
            Apply Filters
          </button>
        </>
      )}
    </div>
  );
};

export default Filter;
