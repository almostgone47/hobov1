import React from 'react';

const Pagination = (props) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(props.reviews.length / props.reviewsPerPage);

  if (totalPages < 6) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else if (totalPages >= 6) {
    for (let i = 1; i <= 3; i++) {
      const nextPage = props.currentPage + i;
      if (nextPage < totalPages) {
        pageNumbers.push(Number(props.currentPage) + i);
      }
    }
    pageNumbers.push('...', totalPages);
  }

  return (
    <ul className="Pagination">
      <li className="PaginationArrow" onClick={props.pageBack}>
        {' '}
        «{' '}
      </li>
      {pageNumbers.map((number) => {
        return (
          <li key={number} className="ReviewItem">
            {number}
          </li>
        );
      })}
      <li className="PaginationArrow" onClick={props.pageForward}>
        {' '}
        »{' '}
      </li>
    </ul>
  );
};

export default Pagination;
