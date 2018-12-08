import React from "react";
import _ from "lodash";
import PropTypes from "prop-types"; 

const Pagination = (props) => {
  const { itemCount, pageSize, currentPage, onPageChange } = props;
  const pageCount = Math.ceil(itemCount / pageSize);
  const pages = _.range(1, pageCount + 1);

  if (pageCount === 1) {
    return null;
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className={currentPage === page ? "page-item active" : "page-item"}>
            <div className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
