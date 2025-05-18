import React, { useState, useEffect } from "react";
import {
  getBreeds,
  searchDogs,
  getDogDetails,
  generateMatch,
  logout,
} from "../../services/api";
import DogList from "./DogList";
import FilterOptions from "./FilterOptions";
import Pagination from "./Pagination";
import DogMatch from "./DogMatch";
import "../../index/DogSearchPage.css";

function DogSearchPage() {
  const [breeds, setBreeds] = useState([]);
  const [dogs, setDogs] = useState([]);
  const [totalDogs, setTotalDogs] = useState(0);

  const [filters, setFilters] = useState({
    breeds: [],
    sort: "breed:asc",
    ageMin: "",
    ageMax: "",
  });
  const [favorites, setFavorites] = useState([]);
  const [match, setMatch] = useState(null);
  const [matchLoading, setMatchLoading] = useState(false);

  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const data = await getBreeds();
        setBreeds(data);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };
    fetchBreeds();
  }, []);

  useEffect(() => {
    fetchDogs();
  }, [filters, currentPage, pageSize]);

  const fetchDogs = async () => {
    setLoading(true);
    try {
      const params = {
        ...filters,
        size: pageSize,
        from: (currentPage - 1) * pageSize,
      };

      const data = await searchDogs(params);

      if (data && data.resultIds) {
        const dogDetails = await getDogDetails(data.resultIds);
        setDogs(dogDetails);
        setTotalDogs(data.total);

        // Set hasMore true if there are more results beyond the current page
        const totalPages = Math.ceil(data.total / pageSize);
        setHasMore(currentPage < totalPages);
      } else {
        setDogs([]);
        setTotalDogs(0);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching dogs:", error);
      setDogs([]);
      setTotalDogs(0);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setPageSize(newSize);
    setCurrentPage(1); // reset to first page when pageSize changes
  };

  const toggleFavorite = (dogId) => {
    setFavorites((prev) =>
      prev.includes(dogId)
        ? prev.filter((id) => id !== dogId)
        : [...prev, dogId]
    );
  };

  const handleGenerateMatch = async () => {
    if (favorites.length === 0) {
      alert("Please select at least one favorite dog to generate a match.");
      return;
    }
    if (favorites.length > 100) {
      alert("You can only select up to 100 favorite dogs.");
      return;
    }

    setMatchLoading(true);
    try {
      const matchData = await generateMatch(favorites);
      if (matchData && matchData.match) {
        const details = await getDogDetails([matchData.match]);
        if (details && details.length > 0) {
          setMatch(details[0]);
        }
      }
    } catch (error) {
      console.error("Error generating match:", error);
      alert("Failed to generate match. Please try again.");
    } finally {
      setMatchLoading(false);
    }
  };

  // Functions to go to next or previous page
  const onNext = () => {
    if (hasMore && !loading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1 && !loading) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to login page or homepage after logout
      window.location.href = "/login";
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="dog-search-page">
      <header className="header">
        <div className="container">
          <h1 className="title">🐶 Find Your Perfect Dog!</h1>
          <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        </div>
        
      </header>

      <main className="main-content">
        <div className="container">
          <div className="filter-and-list">
            <aside className="sidebar">
              <FilterOptions
                breeds={breeds}
                onFilterChange={handleFilterChange}
                initialBreeds={filters.breeds}
                initialSort={filters.sort}
                initialAgeMin={filters.ageMin}
                initialAgeMax={filters.ageMax}
              />
            </aside>
            <section className="dog-list-section">
              {loading ? (
                <div className="loading-indicator">Loading dogs...</div>
              ) : (
                <>
                  <div className="page-size-selector">
                    <label htmlFor="pageSize">Results per page: </label>
                    <select
                      id="pageSize"
                      value={pageSize}
                      onChange={handlePageSizeChange}
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                  <DogList
                    dogs={dogs}
                    onToggleFavorite={toggleFavorite}
                    favorites={favorites}
                  />

                  {dogs.length > 0 && (
                    <Pagination
                      currentPage={currentPage}
                      onNext={onNext}
                      onPrevious={onPrevious}
                      hasMore={hasMore}
                      loading={loading}
                      totalItems={dogs.length}
                    />
                  )}
                </>
              )}
            </section>
          </div>

          <section className="favorites-section">
            <div className="favorites-header">
              <h3>❤️ Favorites ({favorites.length})</h3>
              {favorites.length > 0 && (
                <button
                  onClick={handleGenerateMatch}
                  className="match-button"
                  disabled={matchLoading}
                >
                  {matchLoading ? "Matching..." : "Generate Match"}
                </button>
              )}
            </div>
            <DogMatch match={match} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default DogSearchPage;
