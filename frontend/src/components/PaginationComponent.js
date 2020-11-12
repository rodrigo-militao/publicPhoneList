import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

function PaginationComponent({ listCount, onPageChange }) {
  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
      if (listCount % 5 === 0)
        setNumberOfPages(Math.floor(listCount / 5));
      else
        setNumberOfPages(Math.floor(listCount / 5) + 1);
  }, [listCount]);

  const handlePageClick = (data) => {
    onPageChange(data.selected + 1);
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <nav aria-label="Page navigation example">
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={numberOfPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(data) => handlePageClick(data)}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'page-item active'}
          pageClassName={'page-item'}
          nextClassName={'page-item'}
          pageLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          previousLinkClassName={'page-link'}
          disabledClassName={'page-item disabled'}
        />
      </nav>
    </div>
  );
}

export default PaginationComponent;