import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="pagination">
    <button onClick={() => onPageChange(currentPage - 1)}>Previous Page</button>
    <span>{`Page ${currentPage} of ${totalPages}`}</span>
    <button onClick={() => onPageChange(currentPage + 1)}>Next Page</button>
  </div>
);

export default Pagination;
