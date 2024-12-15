import React from 'react';
import "../css/pagination.css"

const Pagination = ({ totalItems, pageSize, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="pagination">
      <div className="poison-button">
        <button
          className="pagination-button"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Önceki
        </button>
        <div className="poison-img"></div>
      </div>

      <span className="pagination-info">
        Sayfa {currentPage} / {totalPages}
      </span>
      
      <div className="poison-button">
        <button
          className="pagination-button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Sonraki
        </button>
        <div className="poison-img"></div>
      </div>

    </div>
  );
};

export default Pagination;



