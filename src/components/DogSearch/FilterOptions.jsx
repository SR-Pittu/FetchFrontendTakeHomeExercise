import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import '../../index/FilterOptions.css'; // Import the CSS file

const FilterOptions = ({
    breeds,
    onFilterChange,
    initialBreeds = [],
    initialSort = 'breed:asc',
    initialAgeMin = '',
    initialAgeMax = '',
    initialCity = ''
}) => {
    const [selectedBreeds, setSelectedBreeds] = useState(initialBreeds);
    const [sortOption, setSortOption] = useState(initialSort);
    const [ageMin, setAgeMin] = useState(initialAgeMin);
    const [ageMax, setAgeMax] = useState(initialAgeMax);
    const [city, setCity] = useState(initialCity);
    const [selectedReactSelectValue, setSelectedReactSelectValue] = useState(initialBreeds.map(breed => ({ value: breed, label: breed })));

    const breedOptions = breeds.map(breed => ({ value: breed, label: breed }));

    useEffect(() => {
        handleApplyFilters();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const newSelectedOptions = selectedBreeds.map(breed => ({ value: breed, label: breed }));
        setSelectedReactSelectValue(newSelectedOptions);
    }, [selectedBreeds]);

    const handleReactSelectChange = (selectedOptions) => {
        setSelectedReactSelectValue(selectedOptions);
        setSelectedBreeds(selectedOptions ? selectedOptions.map(option => option.value) : []);
    };

    const handleSortChange = (e) => setSortOption(e.target.value);

    const handleCityChange = (e) => setCity(e.target.value);

    const handleApplyFilters = () => {
        onFilterChange({
            breeds: selectedBreeds,
            sort: sortOption,
            ageMin: ageMin ? Number(ageMin) : undefined,
            ageMax: ageMax ? Number(ageMax) : undefined,
        });
    };

    const handleRemoveSelectedBreed = (breedToRemove) => {
        setSelectedBreeds(prevBreeds => prevBreeds.filter(breed => breed !== breedToRemove));
        setSelectedReactSelectValue(prev => prev.filter(option => option.value !== breedToRemove));
    };

    const handleReset = () => {
        setSelectedBreeds([]);
        setSelectedReactSelectValue([]);
        setSortOption('breed:asc');
        setAgeMin('');
        setAgeMax('');
        onFilterChange({});
    };

    return (
        <div className="filter-options-container">
              <h2 className="filter-description">Narrow down your search for the perfect dog.</h2>

            {/* Breeds Search */}
            <div className="filter-section">
                <h4 className="filter-label">Breeds:</h4>
                <Select
                    isMulti
                    options={breedOptions}
                    value={selectedReactSelectValue}
                    onChange={handleReactSelectChange}
                    placeholder="Search and select breeds"
                    hideSelectedOptions={true}
                    className="breed-select"
                    classNamePrefix="react-select"
                />
                {selectedBreeds.length > 0 && (
                    <div className="selected-breeds-container">
                        <strong>Selected Breeds:</strong>
                        <div className="selected-breed-list">
                            {selectedBreeds.map(breed => (
                                <div key={breed} className="selected-breed-item">
                                    {breed}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveSelectedBreed(breed)}
                                        className="remove-breed-button"
                                    >
                                        x
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Age Range */}
            <div className="filter-section">
                <h4 className="filter-label">Age Range:</h4>
                <div className="age-input-group">
                    <input
                        type="number"
                        placeholder="Min Age"
                        value={ageMin}
                        onChange={(e) => setAgeMin(e.target.value)}
                        className="age-input"
                    />
                    <span className="age-separator">-</span>
                    <input
                        type="number"
                        placeholder="Max Age"
                        value={ageMax}
                        onChange={(e) => setAgeMax(e.target.value)}
                        className="age-input"
                    />
                </div>
            </div>
            <div className="filter-section">
                <h4 className="filter-label">City:</h4>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={handleCityChange}
                    className="city-input"
                />
            </div>

            {/* Sort Options */}
            <div className="filter-section">
                <h4 className="filter-label">Sort By:</h4>
                <select value={sortOption} onChange={handleSortChange} className="sort-select">
                    <option value="breed:asc">Breed (A-Z)</option>
                    <option value="breed:desc">Breed (Z-A)</option>
                    <option value="name:asc">Name (A-Z)</option>
                    <option value="name:desc">Name (Z-A)</option>
                    <option value="age:asc">Age (Ascending)</option>
                    <option value="age:desc">Age (Descending)</option>
                </select>
            </div>

            {/* Buttons */}
            <div className="buttons-container">
                <button onClick={handleApplyFilters} className="apply-button">
                    Apply Filters
                </button>
                <button onClick={handleReset} className="reset-button">
                    Reset Filters
                </button>
            </div>
        </div>
    );
};

export default FilterOptions;