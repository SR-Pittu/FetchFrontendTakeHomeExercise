import React from 'react';
import '../../index/Pagination.css';

const Pagination = ({
  onNext,
  onPrevious,
  hasMore,
  loading,
  currentPage,
  totalItems,
}) => {
  return (
    <div className="pagination-container">
      <div className="pagination-controls">
        <button
          onClick={onPrevious}
          disabled={currentPage === 1 || loading}
          className="pagination-button"
        >
          ◀ Previous
        </button>
        <span className="pagination-button active">
          Page {currentPage}
        </span>
        <button
          onClick={onNext}
          disabled={!hasMore || loading}
          className="pagination-button"
        >
          Next ▶
        </button>
      </div>
      <div className="pagination-info">
        <p>Total Dogs Loaded: <strong>{totalItems}</strong></p>
      </div>
    </div>
  );
};

export default Pagination;
